const buttons = document.querySelectorAll('.show-info-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation(); // prevent closing instantly

    const priceBox = button.closest('.price-box');
    if (!priceBox) {
      console.error('Could not find parent .price-box');
      return;
    }

    const infoBox = priceBox.querySelector('.info-box');
    if (!infoBox) {
      console.error('Could not find .info-box inside price-box');
      return;
    }

    infoBox.classList.toggle('show');

    // Close other info-boxes
    document.querySelectorAll('.info-box').forEach(box => {
      if (box !== infoBox) {
        box.classList.remove('show');
      }
    });
  });
});

// Clicking outside closes info boxes
document.addEventListener('click', function() {
  document.querySelectorAll('.info-box').forEach(box => {
    box.classList.remove('show');
  });
});


(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // Default = dark (unless a saved choice exists)
  const saved = localStorage.getItem(STORAGE_KEY);
  const startTheme = saved === 'light' || saved === 'dark' ? saved : 'dark';
  root.setAttribute('data-theme', startTheme);
  updateToggle(startTheme);

  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    updateToggle(next);
  });

  function updateToggle(theme) {
    if (!btn) return;
    btn.setAttribute('aria-pressed', theme === 'dark');
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
})();





// Language handling


/* =========================
   I18N (Svenska default)
   ========================= */
(() => {
  const STORAGE_KEY = 'site-lang';
  const DEFAULT_LANG = 'sv'; // Swedish by default

  // Helper: reuse your <img> / <kbd> snippets inside translations
  const dlBtn = '<img id="downloadbtn" src="/media/downloadbutton.png" alt="">';
  const genBtn = '<img id="generatebtn" src="/media/generatebtn.png" alt="">';

  const MESSAGES = {
    /* ========== SWEDISH (default) ========== */
    sv: {
      // NAV
      'nav.about': 'Om oss',
      'nav.prices': 'Priser',
      'nav.contact': 'Kontakt',

      // HERO
      'hero.title': 'Håll din teknik igång. Vi fixar, uppgraderar och stöttar.',
      'hero.subtitle': 'Fixinus är din lokala datorservice och tekniksupport i Borgå för privatpersoner och småföretag. Stationära, bärbara och vardagselektronik – hanteras med omsorg och tydlig kommunikation.',

      // ABOUT
      'about.title': 'Om Fixinus',
      'about.lead': 'Fixinus är en IT- och digitalsupporttjänst baserad i Borgå. Vi hjälper privatpersoner och småföretag att hålla tekniken igång. Vi kan även resa till närliggande städer; en liten resekostnad kan tillkomma.',
      'about.drop.title': 'Inlämning, upphämtning & på plats',
      'about.drop.body': 'Vi har inget fast kontor (än). Enheter kan lämnas in enligt överenskommelse eller så kan vi hämta dem. Om det ser ut som en snabb åtgärd – eller om jobbet behöver göras på plats – kommer vi gärna ut. Tid och plats bestäms i förväg via telefon eller e-post.',
      'about.fast.title': 'Snabb service',
      'about.fast.body': 'De flesta standardreparationer blir klara inom 1–3 dagar och enklare problem ofta samma dag. Om ett jobb är brådskande och inget annat akut pågår, börjar vi så snart enheten har anlänt.',
      'about.exp.title': 'Erfarenhet',
      'about.exp.body': 'Vi har formell telekomutbildning och 15+ års praktisk erfarenhet. Vi håller oss uppdaterade om branschen för att leverera tydliga och praktiska lösningar.',
      'about.pay.title': 'Betalningsmetoder',
      'about.pay.body': 'Kontanter, alla större bank- och kreditkort, Google Pay, Apple Pay eller faktura (lasku).',

      // WARRANTY
      'warranty.title': 'Arbetsgaranti',
      'warranty.about': 'Vi lämnar sex månaders garanti på vårt arbete. Om ett problem beror på vårt utförande åtgärdar vi det utan kostnad.',
      'warranty.not.title': 'Detta omfattas inte:',
      'warranty.not.1': 'Hårdvarufel eller normalt slitage',
      'warranty.not.2': 'Programvarubuggar, virus/malware eller tredjepartsuppdateringar',
      'warranty.not.3': 'Olycksskador, felanvändning eller ändringar efter vår service',
      'warranty.not.4': 'Reservdelar (täcks av tillverkarens garanti om sådan finns)',
      'warranty.how': 'Så fungerar det: Lämna in enheten till oss (eller boka ett hembesök) så inspekterar vi den. Garantin gäller den ursprungliga enheten och det arbete vi utfört.',

      // SERVICES
      'services.title': 'Tjänster',

      'services.pc.title': '💻 Stationära & bärbara',
      'services.pc.1': 'Diagnostik & felsökning',
      'services.pc.2': 'Hårdvarureparationer & delar (SSD, RAM, GPU, batteri, skärm, fläktar)',
      'services.pc.3': 'Komponentbyten & uppgraderingar (prestanda, lagring, grafik)',
      'services.pc.4': 'Skräddarsydda PC-byggen (gaming/arbete): rådgivning, montering & setup',
      'services.pc.5': 'Rengöring & kylservice (damm, ny kylpasta)',
      'services.pc.6': 'Årlig servicekontroll',
      'services.pc.7': 'Alla märken',
      'services.pc.8': 'Hälsorapport efter service (vad vi gjort, rekommendationer)',

      'services.os.title': '🏢 Programvara & operativsystem',
      'services.os.1': 'Installera om Windows eller macOS (behåll filer när möjligt)',
      'services.os.2': 'Ny dator – första uppsättning & filflytt',
      'services.os.3': 'Installera program & drivrutiner',
      'services.os.4': 'Ta bort virus och oönskade appar',
      'services.os.5': 'Frigör utrymme (stora/temp-filer)',
      'services.os.6': 'Säkerhetskopiering till extern disk eller moln',
      'services.os.7': 'Nätverk & internet (Wi-Fi/Ethernet, låg hastighet)',
      'services.os.8': 'Åtgärda krascher och felmeddelanden',
      'services.os.9': 'Konto & lösenord (Microsoft/Apple, e-post)',
      'services.os.10': 'E-post och moln (OneDrive, iCloud, Google)',

      'services.mobile.title': '🚗 Telefoner & surfplattor (endast mjukvara)',
      'services.mobile.1': 'Ny enhet – grundinställning',
      'services.mobile.2': 'Byte av telefon (flytta bilder, meddelanden, WhatsApp, appar)',
      'services.mobile.3': 'Föräldrakontroller & säkerhet (Skärmtid/Family Link)',
      'services.mobile.4': 'E-post, kontakter & kalender',
      'services.mobile.5': 'App- & kontohjälp (Apple ID, Google)',
      'services.mobile.6': 'iCloud/Google – säkerhetskopior & återställning',
      'services.mobile.7': 'Lagringsstädning (frigör utrymme säkert)',
      'services.mobile.8': 'Säkerhetskontroll (uppdateringar, koder, 2FA)',
      'services.mobile.9': 'Felsökning (synk, aviseringar, batteri)',

      'services.home.title': '🌐 Hemmateknik',
      'services.home.1': 'Wi-Fi-setup & täckning (router/mesh)',
      'services.home.2': 'TV & streaming (smart-TV, Apple TV, Chromecast m.m.)',
      'services.home.3': 'Spelkonsoler (reparation, setup, onlinespel, familjeinställningar)',
      'services.home.4': 'Skrivare & skannrar (installera, anslut, vanliga fel)',
      'services.home.5': 'Delad lagring / NAS (filer på flera enheter)',
      'services.home.6': 'Smarta hem (lampor, kameror, högtalare)',

      // PRICES
      'prices.title': 'Företagspriser',
      'prices.lead': 'En fast månadsplan. Obegränsad support, 1–3 dagars schemaläggning. Akut stöd kan medföra extra kostnad.',
      'prices.basic': 'Grundläggande diagnostik',
      'prices.standard': 'Standardreparation',
      'prices.premium': 'Premiumtjänster',
      'prices.onetime': '/ engångs',
      'prices.showmore': 'Visa mer',
      'prices.infobox.basic': 'Perfekt för mindre behov. Uppgradera när som helst!',
      'prices.infobox.standard': 'Bra för återkommande ärenden. Uppgradera när som helst!',
      'prices.infobox.premium': 'För mer avancerade tjänster. Uppgradera när som helst!',

      // REMOTE
      'remote.title': 'Fjärrhjälp & så här fungerar det',
      'remote.lead': 'Vi använder Snabbhjälp i Windows 10/11 (inbyggt i Windows 11; enkel installation via Microsoft Store i Windows 10). På Mac, Linux eller ChromeOS – eller om Snabbhjälp inte finns – använder vi Chrome Remote Desktop. Passar inget? Då ordnar vi hembesök eller inlämning.',
      'remote.step.1.html': '<strong>Ring oss:</strong> +358 400 664 767 (eller mejla <a href="mailto:info@fixinus.fi">info@fixinus.fi</a>) för att bekräfta att fjärrhjälp passar ditt ärende.',
      'remote.step.2.html': `<strong>Ladda ned hjälparappen:</strong> Öppna eller ladda ned hjälparappen: För Snabbhjälp, tryck <kbd><kbd>Ctrl</kbd>+<kbd>Windows</kbd>+<kbd>Q</kbd></kbd> eller <a href="https://remotedesktop.google.com/support">klicka här</a> och klicka sedan på ${dlBtn} för att ladda ned Chrome Remote Desktop. Efter nedladdning – tillåt installationen och tillägget i webbläsaren.`,
      'remote.step.3.html': '<strong>Ge åtkomst:</strong> öppna appen och tillåt när du blir tillfrågad. Du ser allt vi gör.',
      'remote.step.4.html': `<strong>Skapa koden:</strong> Tryck ${genBtn} för att generera en engångskod och meddela den till oss. Du ser allt på skärmen och koden kan inte användas igen efter sessionen.`,
      'remote.step.5.html': '<strong>Vi fixar problemet:</strong> du kan följa på skärmen och pausa/stoppa när som helst.',
      'remote.step.6.html': '<strong>Klart:</strong> vi stänger sessionen och bekräftar nästa steg (om några).',

      // CONTACT
      'contact.title': 'Kontakta oss',
      'contact.lead': 'Har du en fråga eller behöver hjälp med din dator? Hör av dig.',
      'contact.info': 'Kontaktuppgifter',
      'contact.address.title': 'Adress',
      'contact.address.line1': 'Hurrigatan 123',
      'contact.address.line2': 'Borgå 12345',
      'contact.phone.title': 'Telefon',
      'contact.phone.value': '+358 400 664 767',
      'contact.email.title': 'E-post',
      'contact.email.value': 'info@fixinus.fi',
      'contact.hours.title': 'Öppettider',
      'contact.hours.monfri': 'Måndag–Fredag: 09:00 – 17:00',
      'contact.hours.sat': 'Lördag: 10:00 – 16:00',
      'contact.hours.sun': 'Söndag: Stängt',
      'contact.hours.urgent': 'Akuta ärenden dygnet runt mot extra kostnad',

      // FORM
      'form.sendus': 'Skicka ett meddelande',
      'form.name': 'Namn',
      'form.email': 'E-post',
      'form.phone': 'Telefon',
      'form.service': 'Önskad tjänst',
      'form.select': 'Välj en tjänst',
      'form.opt.diagnostics': 'Grundläggande diagnostik',
      'form.opt.standard': 'Standardreparation',
      'form.opt.premium': 'Premiumtjänster',
      'form.opt.remote': 'Fjärrsupport',
      'form.opt.onsite': 'Platsbesök',
      'form.message': 'Meddelande',
      'form.send': 'Skicka',

      // FOOTER
      'footer.quick': 'Snabblänkar',
      'footer.links.about': 'Om oss',
      'footer.links.pricing': 'Priser',
      'footer.links.contact': 'Kontakt',
      'footer.copy': '© 2025 Fixinus. Alla rättigheter förbehållna.'
    },

    /* ========== FINNISH ========== */
    fi: {
      'nav.about': 'Tietoa meistä',
      'nav.prices': 'Hinnat',
      'nav.contact': 'Yhteys',

      'hero.title': 'Pidä tekniikka kunnossa. Korjaamme, päivitämme ja autamme.',
      'hero.subtitle': 'Fixinus on paikallinen tietokonehuolto ja tuki Porvoossa yksityisille ja pienyrityksille. Pöytäkoneet, läppärit ja arkielektroniikka – huolellisesti ja selkeästi viestien.',

      'about.title': 'Tietoa Fixinuksesta',
      'about.lead': 'Fixinus on Porvoossa toimiva IT- ja digitukipalvelu. Autamme yksityisiä ja pienyrityksiä pitämään tekniikan kunnossa. Voimme tulla myös lähikaupunkeihin; pieni matkakulu voi lisäytyä.',
      'about.drop.title': 'Tuonti, nouto & paikan päällä',
      'about.drop.body': 'Meillä ei ole vielä kiinteää toimistoa. Laitteet voi tuoda sovittuna aikana tai noudamme ne. Jos kyse on pikakorjauksesta – tai työ on tehtävä paikan päällä – tulemme mielellämme. Sovimme ajan ja paikan etukäteen puhelimella tai sähköpostilla.',
      'about.fast.title': 'Nopea palvelu',
      'about.fast.body': 'Useimmat peruskorjaukset valmistuvat 1–3 päivässä, ja yksinkertaiset viat usein saman päivän aikana. Jos asia on kiireellinen eikä muuta akuuttia ole, aloitamme heti laitteen saavuttua.',
      'about.exp.title': 'Kokemus',
      'about.exp.body': 'Taustalla on telealan koulutus ja yli 15 vuoden käytännön kokemus. Pidämme osaamisen ajan tasalla ja tarjoamme selkeitä, käytännöllisiä ratkaisuja.',
      'about.pay.title': 'Maksutavat',
      'about.pay.body': 'Käteinen, yleisimmät pankki- ja luottokortit, Google Pay, Apple Pay tai lasku.',

      'warranty.title': 'Työtakuu',
      'warranty.about': 'Annamme kuuden kuukauden takuun työllemme. Jos ongelma johtuu työstämm e, korjaamme sen maksutta.',
      'warranty.not.title': 'Ei kata:',
      'warranty.not.1': 'Laitteistoviat tai normaali kuluminen',
      'warranty.not.2': 'Ohjelmistobugit, virukset/malware tai kolmannen osapuolen päivitykset',
      'warranty.not.3': 'Tapaturmat, väärinkäyttö tai muutokset palvelun jälkeen',
      'warranty.not.4': 'Varaosat (valmistajan takuu, jos sellainen on)',
      'warranty.how': 'Näin se toimii: Toimita laite meille (tai varaa käynti), jotta voimme tarkistaa sen. Takuu koskee alkuperäistä laitetta ja tekemäämme työtä.',

      'services.title': 'Palvelut',

      'services.pc.title': '💻 Pöytäkoneet & kannettavat',
      'services.pc.1': 'Diagnostiikka & vianetsintä',
      'services.pc.2': 'Laitteistokorjaukset & osat (SSD, RAM, GPU, akku, näyttö, tuulettimet)',
      'services.pc.3': 'Komponenttien vaihdot & päivitykset (suorituskyky, tallennus, grafiikka)',
      'services.pc.4': 'Räätälöidyt PC-rakennukset (pelaaminen/työ): neuvonta, kokoonpano & käyttöönotto',
      'services.pc.5': 'Puhdistus & jäähdytyshuolto (pölyt pois, uusi tahna)',
      'services.pc.6': 'Vuosihuolto',
      'services.pc.7': 'Kaikki merkit',
      'services.pc.8': 'Huoltoraportti työn jälkeen (mitä tehtiin, suositukset)',

      'services.os.title': '🏢 Ohjelmisto & käyttöjärjestelmä',
      'services.os.1': 'Windowsin tai macOS:n uudelleenasennus (tiedot säilyttäen, kun mahdollista)',
      'services.os.2': 'Uuden koneen käyttöönotto & tiedonsiirto',
      'services.os.3': 'Ohjelmien & ajureiden asennus',
      'services.os.4': 'Virusten ja ei-toivottujen sovellusten poisto',
      'services.os.5': 'Tilaa lisää (suurten & väliaikaisten tiedostojen siivous)',
      'services.os.6': 'Varmuuskopiointi ulkoiselle levylle tai pilveen',
      'services.os.7': 'Verkko & internet (Wi-Fi/Ethernet, hidas nopeus)',
      'services.os.8': 'Kaatumisten ja virheilmoitusten korjaus',
      'services.os.9': 'Tilit & salasanat (Microsoft/Apple, sähköposti)',
      'services.os.10': 'Sähköposti ja pilvi (OneDrive, iCloud, Google)',

      'services.mobile.title': '🚗 Puhelimet & tabletit (vain ohjelmisto)',
      'services.mobile.1': 'Uuden laitteen käyttöönotto',
      'services.mobile.2': 'Puhelimen vaihto helpoksi (kuvat, viestit, WhatsApp, sovellukset)',
      'services.mobile.3': 'Lapsilukot & turvallisuus (Ruudun aika/Family Link)',
      'services.mobile.4': 'Sähköposti, yhteystiedot & kalenteri',
      'services.mobile.5': 'Sovellus- & tiliapu (Apple ID, Google)',
      'services.mobile.6': 'iCloud/Google – varmuuskopiot & palautukset',
      'services.mobile.7': 'Tallennustilan siivous (vapauta tilaa turvallisesti)',
      'services.mobile.8': 'Turvatsekki (päivitykset, koodit, kaksivaiheinen vahvistus)',
      'services.mobile.9': 'Vianetsintä (synkronointi, ilmoitukset, akku)',

      'services.home.title': '🌐 Kotitekniikka',
      'services.home.1': 'Wi-Fi-asennus & kattavuus (reititin/mesh)',
      'services.home.2': 'TV & suoratoisto (äly-TV, Apple TV, Chromecast jne.)',
      'services.home.3': 'Pelikonsolit (korjaus, käyttöönotto, online, perheasetukset)',
      'services.home.4': 'Tulostimet & skannerit (asennus, liitäntä, yleiset viat)',
      'services.home.5': 'Jaettu tallennus / NAS (tiedostot useilla laitteilla)',
      'services.home.6': 'Älykoti (valot, kamerat, kaiuttimet)',

      'prices.title': 'Yrityshinnasto',
      'prices.lead': 'Yksi kiinteä kuukausipaketti. Rajoittamaton tuki, 1–3 päivän aikataulu. Päivystyksestä voi tulla lisäkuluja.',
      'prices.basic': 'Perusdiagnostiikka',
      'prices.standard': 'Vakiokorjaus',
      'prices.premium': 'Premium-palvelut',
      'prices.onetime': '/ kertamaksu',
      'prices.showmore': 'Näytä lisää',
      'prices.infobox.basic': 'Sopii pieniin tarpeisiin. Päivitä milloin vain!',
      'prices.infobox.standard': 'Hyvä toistuviin tarpeisiin. Päivitä milloin vain!',
      'prices.infobox.premium': 'Edistyneempiin palveluihin. Päivitä milloin vain!',

      'remote.title': 'Etätuki & näin se toimii',
      'remote.lead': 'Käytämme Quick Assistia Windows 10/11:ssä (Windows 11:ssä sisäänrakennettu; Windows 10:ssä helppo asennus Microsoft Storesta). Macilla, Linuxilla tai ChromeOS:llä – tai jos Quick Assist ei sovi – käytämme Chrome Remote Desktopia. Jos kumpikaan ei sovi, sovimme paikan päällä käynnin tai tuonnin.',
      'remote.step.1.html': '<strong>Soita meille:</strong> +358 400 664 767 (tai sähköposti <a href="mailto:info@fixinus.fi">info@fixinus.fi</a>) varmistaaksesi, että etätuki sopii tilanteeseen.',
      'remote.step.2.html': `<strong>Lataa apusovellus:</strong> Avaa tai lataa apusovellus: Quick Assistissa paina <kbd><kbd>Ctrl</kbd>+<kbd>Windows</kbd>+<kbd>Q</kbd></kbd> tai <a href="https://remotedesktop.google.com/support">paina tästä</a> ja klikkaa sitten ${dlBtn} ladataksesi Chrome Remote Desktopin. Latauksen jälkeen salli asennus ja selaimen lisäosa.`,
      'remote.step.3.html': '<strong>Salli käyttöoikeus:</strong> avaa sovellus ja myönnä lupa pyydettäessä. Näet kaiken mitä teemme.',
      'remote.step.4.html': `<strong>Luo koodi:</strong> Paina ${genBtn} luodaksesi KERTAKÄYTTÖisen koodin ja kerro se meille. Näet kaiken näytölläsi, eikä koodia voi käyttää uudelleen istunnon jälkeen.`,
      'remote.step.5.html': '<strong>Korjaamme ongelman:</strong> voit seurata ruudulta ja keskeyttää/lopettaa milloin tahansa.',
      'remote.step.6.html': '<strong>Valmista:</strong> suljemme istunnon ja varmistamme jatkotoimet (jos tarpeen).',

      'contact.title': 'Ota yhteyttä',
      'contact.lead': 'Kysyttävää tai tarvitsetko apua tietokoneen kanssa? Ota yhteyttä.',
      'contact.info': 'Yhteystiedot',
      'contact.address.title': 'Osoite',
      'contact.address.line1': 'Hurrigatan 123',
      'contact.address.line2': 'Porvoo 12345',
      'contact.phone.title': 'Puhelin',
      'contact.phone.value': '+358 400 664 767',
      'contact.email.title': 'Sähköposti',
      'contact.email.value': 'info@fixinus.fi',
      'contact.hours.title': 'Aukioloajat',
      'contact.hours.monfri': 'Ma–Pe: 09:00 – 17:00',
      'contact.hours.sat': 'La: 10:00 – 16:00',
      'contact.hours.sun': 'Su: Suljettu',
      'contact.hours.urgent': 'Kiireelliset asiat 24/7 lisämaksusta',

      'form.sendus': 'Lähetä viesti',
      'form.name': 'Nimi',
      'form.email': 'Sähköposti',
      'form.phone': 'Puhelin',
      'form.service': 'Tarvittava palvelu',
      'form.select': 'Valitse palvelu',
      'form.opt.diagnostics': 'Perusdiagnostiikka',
      'form.opt.standard': 'Vakiokorjaus',
      'form.opt.premium': 'Premium-palvelut',
      'form.opt.remote': 'Etätuki',
      'form.opt.onsite': 'Paikan päällä',
      'form.message': 'Viesti',
      'form.send': 'Lähetä',

      'footer.quick': 'Pikalinkit',
      'footer.links.about': 'Tietoa meistä',
      'footer.links.pricing': 'Hinnat',
      'footer.links.contact': 'Yhteys',
      'footer.copy': '© 2025 Fixinus. Kaikki oikeudet pidätetään.'
    },

    /* ========== ENGLISH ========== */
    en: {
      'nav.about': 'About',
      'nav.prices': 'Prices',
      'nav.contact': 'Contact',

      'hero.title': 'Keep your tech running right. We fix, upgrade and support.',
      'hero.subtitle': 'Fixinus is a local computer repair and tech support partner in Porvoo for individuals and small businesses. Desktops, laptops, and everyday electronics—handled with care and clear communication.',

      'about.title': 'About Fixinus',
      'about.lead': 'Fixinus is an IT and digital tech support service based in Porvoo. We help individuals and small businesses keep their tech running smoothly. We can also travel to nearby cities; a small travel fee may apply.',
      'about.drop.title': 'Drop-off, pickup & on-site',
      'about.drop.body': 'We don’t have a fixed office (yet). Devices can be dropped off by appointment or we can pick them up. If it looks like a quick fix—or the job needs to be done where the device is—we’re happy to come on-site. We’ll agree the time and location by phone or email in advance.',
      'about.fast.title': 'Fast service',
      'about.fast.body': 'Most standard repairs are finished within 1–3 days, and simple issues are often handled the same day. If a job is urgent and there’s no other urgent work in progress, we’ll start on your device as soon as it arrives.',
      'about.exp.title': 'Experience',
      'about.exp.body': 'Our background includes formal telecommunications education and 15+ years of hands-on experience. We stay current with industry developments to deliver clear, practical solutions.',
      'about.pay.title': 'Payment methods',
      'about.pay.body': 'Cash, all major debit and credit cards, Google Pay, Apple Pay, or invoice (lasku).',

      'warranty.title': 'Workmanship warranty',
      'warranty.about': 'We provide a six-month warranty on our labor. If an issue is caused by our work, we’ll correct it free of charge.',
      'warranty.not.title': 'What’s not covered:',
      'warranty.not.1': 'Hardware failures or normal wear-and-tear',
      'warranty.not.2': 'Software bugs, viruses/malware, or third-party updates',
      'warranty.not.3': 'Accidental damage, misuse, or changes made after our service',
      'warranty.not.4': 'Parts (covered by the manufacturer’s warranty, if any)',
      'warranty.how': 'How it works: Bring the device to us (or book a visit) so we can inspect it. The warranty applies to the original device and the work we performed.',

      'services.title': 'Services',

      'services.pc.title': '💻 Desktop & Laptop',
      'services.pc.1': 'Diagnostics & troubleshooting',
      'services.pc.2': 'Hardware repairs & parts (SSD, RAM, GPU, battery, screen, fans)',
      'services.pc.3': 'Component replacements & upgrades (performance, storage, graphics)',
      'services.pc.4': 'Custom PC builds (gaming/work): parts advice, assembly & setup',
      'services.pc.5': 'Cleaning & thermal service (dust out, fresh paste)',
      'services.pc.6': 'Annual service check',
      'services.pc.7': 'All brands supported',
      'services.pc.8': 'Health report after service (what we did, recommendations)',

      'services.os.title': '🏢 Software & Operating System',
      'services.os.1': 'Reinstall Windows or macOS (keep files when possible)',
      'services.os.2': 'New computer setup & file transfer',
      'services.os.3': 'Install programs & drivers',
      'services.os.4': 'Remove viruses and unwanted apps',
      'services.os.5': 'Free up space (clean large & temporary files)',
      'services.os.6': 'Set up backups to an external drive or cloud',
      'services.os.7': 'Network & internet issues (Wi-Fi/Ethernet not connecting, slow speeds)',
      'services.os.8': 'Fix crashes and error messages',
      'services.os.9': 'Account & password recovery (Microsoft/Apple, email accounts)',
      'services.os.10': 'Set up email and cloud (OneDrive, iCloud, Google)',

      'services.mobile.title': '🚗 Phones & Tablets (software only)',
      'services.mobile.1': 'New device setup',
      'services.mobile.2': 'Switching phones made easy (move photos, messages, WhatsApp, apps)',
      'services.mobile.3': 'Parental controls & safety (Screen Time/Family Link setup)',
      'services.mobile.4': 'Email, contacts & calendar sync',
      'services.mobile.5': 'App & account help (Apple ID, Google)',
      'services.mobile.6': 'iCloud/Google backups & restores',
      'services.mobile.7': 'Storage cleanup (free up space safely)',
      'services.mobile.8': 'Security check (updates, passcodes, 2-step verification)',
      'services.mobile.9': 'Troubleshooting issues (sync, notifications, battery life)',

      'services.home.title': '🌐 Home Tech Help',
      'services.home.1': 'Wi-Fi setup & coverage boost (router/mesh)',
      'services.home.2': 'TV & streaming setup (smart TVs, Apple TV, Chromecast, etc.)',
      'services.home.3': 'Game consoles (repair, setup, online play, family settings)',
      'services.home.4': 'Printers & scanners (install, connect, fix common issues)',
      'services.home.5': 'Shared storage / NAS (files across devices)',
      'services.home.6': 'Smart home devices (lights, cameras, speakers)',

      'prices.title': 'Business Pricing',
      'prices.lead': 'One flat monthly plan. Unlimited support, 1–3 day scheduling. Emergency support may add additional costs.',
      'prices.basic': 'Basic Diagnostics',
      'prices.standard': 'Standard Repair',
      'prices.premium': 'Premium Services',
      'prices.onetime': '/ one-time',
      'prices.showmore': 'Show more',
      'prices.infobox.basic': 'Perfect for small needs. Upgrade anytime!',
      'prices.infobox.standard': 'Great for recurring needs. Upgrade anytime!',
      'prices.infobox.premium': 'For advanced needs. Upgrade anytime!',

      'remote.title': 'Remote Help & How it works',
      'remote.lead': 'We use Quick Assist on Windows 10/11 (built in on Windows 11; easy install from the Microsoft Store on Windows 10). On Mac, Linux, or ChromeOS—or if Quick Assist isn’t available—we use Chrome Remote Desktop. If neither option fits, we’ll arrange an on-site visit or drop-off.',
      'remote.step.1.html': '<strong>Call us:</strong> +358 400 664 767 (or email <a href="mailto:info@fixinus.fi">info@fixinus.fi</a>) to confirm remote help suits your case.',
      'remote.step.2.html': `<strong>Download the helper app:</strong> Open or download the helper app: For Quick Assist, press <kbd><kbd>Ctrl</kbd>+<kbd>Windows</kbd>+<kbd>Q</kbd></kbd> or <a href="https://remotedesktop.google.com/support">press here</a> and then click the ${dlBtn} button to download Chrome Remote Desktop. After it has downloaded, allow it to install and allow it to be added to your browser.`,
      'remote.step.3.html': '<strong>Allow access:</strong> open the app and grant permission when prompted. You’ll see what we do.',
      'remote.step.4.html': `<strong>Generate the code:</strong> Press ${genBtn} to create a ONE-TIME code and tell us what it is. You will see everything we do on your screen, and the code cannot be used again after the session.`,
      'remote.step.5.html': '<strong>We fix the issue:</strong> you can watch on your screen and pause/stop any time.',
      'remote.step.6.html': '<strong>All done:</strong> we close the session and confirm next steps (if any).',

      'contact.title': 'Contact Us',
      'contact.lead': 'Have a question or need help with your computer? Get in touch.',
      'contact.info': 'Contact Information',
      'contact.address.title': 'Address',
      'contact.address.line1': 'Hurrigatan 123',
      'contact.address.line2': 'Borgå 12345',
      'contact.phone.title': 'Phone',
      'contact.phone.value': '+358 400 664 767',
      'contact.email.title': 'Email',
      'contact.email.value': 'info@fixinus.fi',
      'contact.hours.title': 'Business Hours',
      'contact.hours.monfri': 'Monday–Friday: 09:00 – 17:00',
      'contact.hours.sat': 'Saturday: 10:00 – 16:00',
      'contact.hours.sun': 'Sunday: Closed',
      'contact.hours.urgent': 'Urgent matters 24/7 at extra cost',

      'form.sendus': 'Send Us A Message',
      'form.name': 'Name',
      'form.email': 'Email',
      'form.phone': 'Phone',
      'form.service': 'Service Needed',
      'form.select': 'Select a service',
      'form.opt.diagnostics': 'Basic Diagnostics',
      'form.opt.standard': 'Standard Repair',
      'form.opt.premium': 'Premium Services',
      'form.opt.remote': 'Remote Support',
      'form.opt.onsite': 'On-Site Visit',
      'form.message': 'Message',
      'form.send': 'Send',

      'footer.quick': 'Quick Links',
      'footer.links.about': 'About Us',
      'footer.links.pricing': 'Pricing',
      'footer.links.contact': 'Contact',
      'footer.copy': '© 2025 Fixinus. All rights reserved.'
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function applyTranslations(lang) {
    const dict = MESSAGES[lang] || MESSAGES[DEFAULT_LANG];

    // Simple text nodes
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    // InnerHTML content (allows <a>, <kbd>, <img> etc.)
    $$('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    // Attribute mappings, e.g., data-i18n-attr="placeholder:form.name|value:form.opt..."
    $$('[data-i18n-attr]').forEach(el => {
      const map = el.getAttribute('data-i18n-attr'); // "placeholder:form.name|aria-label:contact.phone"
      map.split('|').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key && dict[key]) el.setAttribute(attr, dict[key]);
      });
    });

    // HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
  }

  function initLang() {
    const select = $('#lang-switcher');
    const saved = localStorage.getItem(STORAGE_KEY);
    const startLang = (saved && MESSAGES[saved]) ? saved : DEFAULT_LANG;

    applyTranslations(startLang);
    if (select) {
      select.value = startLang;
      select.addEventListener('change', () => {
        const lang = select.value;
        localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations(lang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();