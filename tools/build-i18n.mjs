/**
 * build-i18n.mjs — generate one static HTML file per language.
 *
 * Why: the site is trilingual but was served from a single URL with the text
 * swapped client-side. Google therefore only ever had one listing (Finnish) to
 * show, including for English-language searches. Separate crawlable URLs plus
 * hreflang let Google pick the right language for the searcher.
 *
 * index.html is both the structural template and the Finnish output: the build
 * rewrites its data-i18n text to Finnish in place and emits en/ and sv/ beside
 * it. Running it twice is a no-op. Structure is edited in index.html; wording
 * is edited in the MESSAGES object in script.js.
 *
 *   node tools/build-i18n.mjs          # write files
 *   node tools/build-i18n.mjs --check  # exit 1 if output is stale (no writes)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://fixinus.fi';

/** Language → subdirectory ('' = site root) and Open Graph locale. */
const LANGS = {
  fi: { dir: '', locale: 'fi_FI' },
  sv: { dir: 'sv', locale: 'sv_FI' },
  en: { dir: 'en', locale: 'en_GB' },
};

const urlFor = lang => (LANGS[lang].dir ? `${ORIGIN}/${LANGS[lang].dir}/` : `${ORIGIN}/`);

/* ---------------------------------------------------------------- messages */

/** Pull the MESSAGES object literal out of script.js by brace matching. */
function readMessages() {
  const src = readFileSync(join(ROOT, 'script.js'), 'utf8');
  const start = src.indexOf('const MESSAGES = {');
  if (start === -1) throw new Error('MESSAGES object not found in script.js');

  const open = src.indexOf('{', start);
  let depth = 0, end = -1, inStr = null, prev = '';
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === inStr && prev !== '\\') inStr = null;
    } else if (c === '"' || c === "'" || c === '`') {
      inStr = c;
    } else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) { end = i + 1; break; }
    prev = prev === '\\' ? '' : c;
  }
  if (end === -1) throw new Error('Unbalanced braces in MESSAGES');

  // The literal interpolates two helper consts defined just above it.
  const dlBtn = '<img id="downloadbtn" src="/media/downloadbutton.png" alt="">';
  const genBtn = '<img id="generatebtn" src="/media/generatebtn.png" alt="">';
  return new Function('dlBtn', 'genBtn', `return ${src.slice(open, end)};`)(dlBtn, genBtn);
}

/**
 * Pull LANG_PATHS out of script.js and check it against LANGS above. The runtime
 * decides the current language from the URL using its own copy of this mapping,
 * so if the two drift apart a page renders in one language while claiming
 * another. Failing the build is the only way that divergence gets noticed.
 */
function assertLangPathsAgree() {
  const src = readFileSync(join(ROOT, 'script.js'), 'utf8');
  const m = /const LANG_PATHS = (\{[^}]*\})/.exec(src);
  if (!m) throw new Error('LANG_PATHS not found in script.js — the build can no longer verify it');

  const runtime = new Function(`return ${m[1]};`)();
  const expected = Object.fromEntries(
    Object.keys(LANGS).map(l => [l, LANGS[l].dir ? `/${LANGS[l].dir}/` : '/']));

  const keys = [...new Set([...Object.keys(expected), ...Object.keys(runtime)])].sort();
  const bad = keys.filter(k => expected[k] !== runtime[k]);
  if (bad.length) {
    throw new Error(
      `LANGS here and LANG_PATHS in script.js disagree for: ${bad.join(', ')}\n` +
      `  build:   ${JSON.stringify(expected)}\n` +
      `  runtime: ${JSON.stringify(runtime)}`);
  }
}

/* ------------------------------------------------------------------- html  */

const escAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Make relative asset references root-absolute so the same markup works from
 * /, /en/ and /sv/. Anchors, tel:, mailto: and absolute URLs are left alone.
 */
function absolutiseAssets(html) {
  return html.replace(/(\s(?:src|href))="(?!https?:|\/\/|\/|#|tel:|mailto:|data:)([^"]+)"/g,
    (_m, attr, path) => `${attr}="/${path.replace(/^\.\//, '')}"`);
}

/** Replace the text of every [data-i18n], [data-i18n-html] and [data-i18n-attr]. */
function applyTranslations(html, dict, missing) {
  const need = key => {
    if (!(key in dict)) { missing.add(key); return null; }
    return String(dict[key]).replace('{year}', String(new Date().getFullYear()));
  };

  // <tag ... data-i18n="key" ...>text</tag>  — these hold plain text only.
  html = html.replace(
    /(<([a-zA-Z][\w-]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
    (m, open, _tag, key, _body, close) => {
      const value = need(key);
      return value === null ? m : `${open}${escText(value)}${close}`;
    });

  // data-i18n-html holds markup (links, <img>), so it is injected verbatim.
  html = html.replace(
    /(<([a-zA-Z][\w-]*)\b[^>]*\bdata-i18n-html="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
    (m, open, _tag, key, _body, close) => {
      const value = need(key);
      return value === null ? m : `${open}${value}${close}`;
    });

  // data-i18n-attr="placeholder:form.email|aria-label:contact.phone"
  html = html.replace(/<[a-zA-Z][\w-]*\b[^>]*\bdata-i18n-attr="([^"]+)"[^>]*>/g, tag => {
    const map = /data-i18n-attr="([^"]+)"/.exec(tag)[1];
    let out = tag;
    for (const pair of map.split('|')) {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (!attr || !key) continue;
      const value = need(key);
      if (value === null) continue;
      const re = new RegExp(`\\s${attr}="[^"]*"`);
      out = re.test(out)
        ? out.replace(re, ` ${attr}="${escAttr(value)}"`)
        : out.replace(/>$/, ` ${attr}="${escAttr(value)}">`);
    }
    return out;
  });

  return html;
}

/** Swap every language-dependent tag in <head>. */
function applyHead(html, lang, dict) {
  const title = dict['meta.title'];
  const desc = dict['meta.description'];
  const self = urlFor(lang);

  const alternates = [
    ...Object.keys(LANGS).map(l => `  <link rel="alternate" hreflang="${l}" href="${urlFor(l)}" />`),
    `  <link rel="alternate" hreflang="x-default" href="${urlFor('fi')}" />`,
  ].join('\n');

  return html
    // index.html is its own template, so drop the previous run's alternates
    // before re-inserting them — otherwise they accumulate on every build.
    .replace(/ *<link rel="alternate" hreflang="[^"]*"[^>]*>\n?/g, '')
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escAttr(desc)}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${LANGS[lang].locale}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${self}$2`)
    // canonical points at the page itself; hreflang alternates follow it
    .replace(/ *<link rel="canonical"[^>]*>/,
      `  <link rel="canonical" href="${self}" />\n${alternates}`)
    // the JSON-LD description is the only translated field in the block
    .replace(/("@type": "LocalBusiness",\s*\n\s*"name": "Fixinus",\s*\n\s*"description": ")[^"]*(")/,
      `$1${desc.replace(/"/g, '\\"')}$2`);
}

/* -------------------------------------------------------------------- run  */

const checkOnly = process.argv.includes('--check');
assertLangPathsAgree();
const MESSAGES = readMessages();

const rawTemplate = readFileSync(join(ROOT, 'index.html'), 'utf8');
// The repo's files are CRLF. Work in LF, then restore on write, so generated
// files don't end up with mixed endings and a diff full of phantom changes.
const CRLF = rawTemplate.includes('\r\n');
const toDisk = s => (CRLF ? s.replace(/\n/g, '\r\n') : s);
const template = rawTemplate.replace(/\r\n/g, '\n');

let stale = false;
const report = [];

for (const lang of Object.keys(LANGS)) {
  const dict = MESSAGES[lang];
  if (!dict) throw new Error(`No MESSAGES entry for "${lang}"`);

  const missing = new Set();
  let html = absolutiseAssets(template);
  html = applyTranslations(html, dict, missing);
  html = applyHead(html, lang, dict);

  const dir = LANGS[lang].dir ? join(ROOT, LANGS[lang].dir) : ROOT;
  const out = join(dir, 'index.html');

  // Compare the exact bytes we would write, so a file with mixed line endings
  // gets rewritten rather than reported as already up to date.
  const previous = existsSync(out) ? readFileSync(out, 'utf8') : null;
  const changed = previous !== toDisk(html);
  if (changed) {
    stale = true;
    if (!checkOnly) {
      mkdirSync(dir, { recursive: true });
      writeFileSync(out, toDisk(html), 'utf8');
    }
  }

  report.push({
    lang,
    file: LANGS[lang].dir ? `${LANGS[lang].dir}/index.html` : 'index.html',
    changed,
    missingKeys: [...missing],
  });
}

/* sitemap.xml — one <url> per language, each listing all alternates */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.keys(LANGS).map(lang => `  <url>
    <loc>${urlFor(lang)}</loc>
${Object.keys(LANGS).map(l =>
  `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('fi')}" />
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>`).join('\n')}
</urlset>
`;
const sitemapPath = join(ROOT, 'sitemap.xml');
const sitemapPrev = existsSync(sitemapPath)
  ? readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n')
  : null;
// Rewrite the sitemap when the URL list changes, and also whenever any page's
// content changed — lastmod is a recrawl hint, so it has to move when the pages
// actually move. Comparing with lastmod stripped keeps a no-op rebuild a no-op,
// so the date does not churn on every run.
const structureChanged = (sitemapPrev ?? '').replace(/<lastmod>[^<]*<\/lastmod>/g, '')
  !== sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, '');
const contentChanged = report.some(r => r.changed);
const sitemapChanged = structureChanged || contentChanged;
if (sitemapChanged) {
  stale = true;
  if (!checkOnly) writeFileSync(sitemapPath, toDisk(sitemap), 'utf8');
}

/* ----------------------------------------------------------------- output  */

for (const r of report) {
  const flag = r.missingKeys.length ? `MISSING ${r.missingKeys.length}` : 'ok';
  console.log(`${r.lang.padEnd(3)} ${r.file.padEnd(16)} ${r.changed ? 'written' : 'unchanged'}  ${flag}`);
  if (r.missingKeys.length) console.log(`    ${r.missingKeys.join(', ')}`);
}
console.log(`sitemap.xml      ${sitemapChanged ? 'written' : 'unchanged'}`);

const anyMissing = report.some(r => r.missingKeys.length);
if (anyMissing) {
  console.error('\nSome data-i18n keys have no translation; those elements kept their previous text.');
}
if (checkOnly && stale) {
  console.error('\nGenerated files are out of date. Run: node tools/build-i18n.mjs');
  process.exit(1);
}
