const buttons = document.querySelectorAll('.show-info-btn');

buttons.forEach(button =>
{
  button.addEventListener('click', function (event)
  {
    event.stopPropagation(); // prevent closing instantly

    const priceBox = button.closest('.price-box');
    if (!priceBox)
    {
      console.error('Could not find parent .price-box');
      return;
    }

    const infoBox = priceBox.querySelector('.info-box');
    if (!infoBox)
    {
      console.error('Could not find .info-box inside price-box');
      return;
    }

    infoBox.classList.toggle('show');

    // Close other info-boxes
    document.querySelectorAll('.info-box').forEach(box =>
    {
      if (box !== infoBox)
      {
        box.classList.remove('show');
      }
    });
  });
});

// Clicking outside closes info boxes
document.addEventListener('click', function ()
{
  document.querySelectorAll('.info-box').forEach(box =>
  {
    box.classList.remove('show');
  });
});


(function ()
{
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // Default = dark (unless a saved choice exists)
  const saved = localStorage.getItem(STORAGE_KEY);
  const startTheme = saved === 'light' || saved === 'dark' ? saved : 'dark';
  root.setAttribute('data-theme', startTheme);
  updateToggle(startTheme);

  btn?.addEventListener('click', () =>
  {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    updateToggle(next);
  });

  function updateToggle(theme) {
  if (!btn) return;
  const isDark = theme === 'dark';

  btn.setAttribute('aria-pressed', String(isDark));
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.setAttribute(
    'aria-label',
    isDark ? 'Switch to light theme' : 'Switch to dark theme'
  );
}

})();





// Language handling


/* =========================
   I18N (Finska default)
   ========================= */
(() =>
{
  const STORAGE_KEY = 'site-lang';
  const DEFAULT_LANG = 'fi'; // Finnish by default

  // Helper: reuse your <img> / <kbd> snippets inside translations
  const dlBtn = '<img id="downloadbtn" src="/media/downloadbutton.png" alt="">';
  const genBtn = '<img id="generatebtn" src="/media/generatebtn.png" alt="">';

  const MESSAGES = {
    /* ========== SWEDISH ========== */
    sv: {
      // NAV
      'nav.about': 'Om oss',
      'nav.prices': 'Priser',
      'nav.services':'Tjänster',
      'nav.contact': 'Kontakt',

      // HERO
      'hero.title': 'Håll din teknik i skick. Vi reparerar, uppgraderar och hjälper dig.',
      'hero.subtitle': 'Fixinus är din lokala partner för datorservice och tekniksupport i Borgå – för både privatpersoner och småföretag. Stationära datorer, bärbara datorer och vardagselektronik hanteras med omsorg och tydlig kommunikation.',

      // ABOUT
      'about.title': 'Om Fixinus',
      'about.lead': 'Fixinus är en lokal IT- och teknikhjälp i Borgå. Vi ser till att din teknik fungerar smidigt, oavsett om du är privatperson eller driver ett litet företag. Vi kan också komma till grannstäder om det behövs; reseersättning tillkommer.',
      'about.drop.title': 'Inlämning, upphämtning & på plats',
      'about.drop.body': 'Enheter kan lämnas in enligt överenskommelse, eller så kan vi hämta dem. Om det ser ut som en snabb åtgärd – eller om arbetet behöver göras där enheten finns – kommer vi gärna på plats. Tid och plats bestäms i förväg via telefon eller e-post.',
      'about.fast.title': 'Snabb service',
      'about.fast.body': 'De flesta standardreparationer blir klara inom 1–3 dagar och enklare problem ofta samma dag. Om ett jobb är brådskande så strävar vi till att börja så snart som möjligt.',
      'about.exp.title': 'Erfarenhet',
      'about.exp.body': 'Vi har formell utbildning inom teknik och över 15 års praktisk erfarenhet. Vi håller oss uppdaterade om branschens utveckling för att kunna leverera tydliga och praktiska lösningar.',
      'about.pay.title': 'Betalningsmetoder',
      'about.pay.body': 'Kontanter, alla större bank- och kreditkort, MobilePay eller faktura.',

      // WARRANTY (SV)
      'warranty.title': 'Arbetsgaranti',
      'warranty.about': 'Vi lämnar sex månaders garanti på vårt arbete. Om ett problem beror på vårt utförande åtgärdar vi det utan kostnad. Garantin kompletterar dina lagstadgade konsumenträttigheter.',
      'warranty.not.title': 'Detta omfattas inte:',
      'warranty.not.1': 'Hårdvarufel eller normalt slitage',
      'warranty.not.2': 'Programvarubuggar, virus/malware eller tredjepartsuppdateringar',
      'warranty.not.3': 'Olycksskador, felanvändning eller ändringar som gjorts efter vår service',
      'warranty.not.4': 'Reservdelar (täcks av tillverkarens garanti om sådan finns)',
      'warranty.how': 'Så fungerar det: Lämna in enheten till oss (eller boka ett hembesök) så inspekterar vi den. Garantin gäller den ursprungliga enheten och det arbete vi har utfört.',


      // SERVICES
      'services.title': 'Tjänster',

      'services.pc.title': ' Stationära & bärbara datorer',
      'services.pc.1': 'Diagnostik & felsökning',
      'services.pc.2': 'Hårdvarureparationer & delar (SSD, RAM-minne, Grafikkort, batteri, skärm, fläktar)',
      'services.pc.3': 'Komponentbyten & uppgraderingar (prestanda, lagringsutrymme, grafik)',
      'services.pc.4': 'Custom-PC-byggen (gaming/arbete): rådgivning, montering & installation',
      'services.pc.5': 'Rengöring & kylservice (damm, ny kylpasta)',
      'services.pc.6': 'Årlig servicekontroll',
      'services.pc.7': 'Alla märken',
      'services.pc.8': 'Hälsorapport efter service (vad vi gjort, rekommendationer)',

      'services.os.title': ' Programvara & operativsystem',
      'services.os.1': 'Installera om Windows eller macOS (behåll filer när möjligt)',
      'services.os.2': 'Ny dator – första uppsättning & filflytt',
      'services.os.3': 'Installera program & drivrutiner',
      'services.os.4': 'Ta bort virus och oönskade appar',
      'services.os.5': 'Frigör diskutrymme (stora/tillfälliga filer)',
      'services.os.6': 'Säkerhetskopiering till extern disk eller moln',
      'services.os.7': 'Nätverk & internet (Wi-Fi/Ethernet, låg hastighet)',
      'services.os.8': 'Åtgärda krascher och felmeddelanden',
      'services.os.9': 'Konto & lösenord (Microsoft/Apple, e-post)',
      'services.os.10': 'E-post och moln (OneDrive, iCloud, Google)',

      'services.mobile.title': ' Telefoner & surfplattor (endast mjukvara och lätt rengöring)',
      'services.mobile.1': 'Ny enhet – grundinställning',
      'services.mobile.2': 'Byte av telefon (flytta bilder, meddelanden, WhatsApp, appar)',
      'services.mobile.3': 'Föräldrakontroller & säkerhet (Skärmtid/Family Link)',
      'services.mobile.4': 'E-post, kontakter & kalender',
      'services.mobile.5': 'App- & kontohjälp (Apple ID, Google)',
      'services.mobile.6': 'iCloud/Google – säkerhetskopior & återställning',
      'services.mobile.7': 'Lagringsstädning (frigör utrymme säkert)',
      'services.mobile.8': 'Säkerhetskontroll (uppdateringar, koder, tvåstegsverifiering (2FA) )',
      'services.mobile.9': 'Felsökning (synkproblem, aviseringar, batteri)',

      'services.home.title': ' Hemmateknik',
      'services.home.1': 'Wi-Fi-installation & täckning (router/mesh)',
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
      'remote.title': 'Fjärrhjälp – så här fungerar det',
      'remote.lead': 'På Windows 10/11 använder vi Snabbhjälp (Quick Assist). Har du inget Microsoft-konto eller fungerar Snabbhjälp inte? Då använder vi TeamViewer QuickSupport. På Mac och Linux använder vi också TeamViewer. Passar inget av alternativen? Då ordnar vi hembesök eller inlämning.',

      'remote.step.1.html': '<strong>Kontakta oss:</strong> Ring +358 400 664 767 eller mejla <a href="mailto:info@fixinus.fi">info@fixinus.fi</a> så bekräftar vi att fjärrhjälp passar ditt ärende.',

      'remote.step.2.html': `<strong>Ladda ned rätt app:</strong><br>
        • <u>Windows 10/11:</u> Öppna Snabbhjälp genom att trycka <kbd><kbd>Ctrl</kbd>+<kbd>Windows</kbd>+<kbd>Q</kbd></kbd>.<br>
        • <u>Om Snabbhjälp inte fungerar eller du saknar Microsoft-konto:</u> Ladda ned TeamViewer QuickSupport: <a href="https://www.teamviewer.com/download/">teamviewer.com/download</a>.<br>
        • <u>Mac eller Linux:</u> Ladda ned TeamViewer QuickSupport från länken ovan.`,

      'remote.step.3.html': '<strong>Ge åtkomst:</strong> Öppna appen och godkänn anslutningen när du blir tillfrågad. Du ser allt vi gör hela tiden.',

      'remote.step.4.html': '<strong>Dela koden:</strong> Appen visar en engångskod. Meddela oss koden så kan vi ansluta. Koden kan inte användas igen efter sessionen.',

      'remote.step.5.html': '<strong>Vi löser problemet:</strong> Du kan följa allt på skärmen och pausa eller avbryta när som helst.',

      'remote.step.6.html': '<strong>Klart:</strong> Vi stänger sessionen och bekräftar eventuella nästa steg.',



      // CONTACT
      'contact.title': 'Kontakta oss',
      'contact.lead': 'Har du en fråga eller behöver hjälp med din teknik? Hör av dig.',
      'contact.info': 'Kontaktuppgifter',
      'contact.address.title': 'Adress',
      'contact.address.line1': 'Yrittäjäntie 11',
      'contact.address.line2': '06450 Borgå ',
      'contact.phone.title': 'Telefon',
      'contact.phone.value': '+358 40 066 4767',
      'contact.email.title': 'E-post',
      'contact.email.value': 'info@fixinus.fi',
      'contact.hours.title': 'Öppettider',
      'contact.hours.monfri': 'Måndag–Fredag: 09:00 – 17:00',
      'contact.hours.sat': 'Lördag: 10:00 – 17:00',
      'contact.hours.sun': 'Söndag: 12:00 – 17:00',
      'contact.hours.urgent': 'Akuta ärenden dygnet runt. Om vi inte svarar direkt – ring gärna igen. För icke-akuta frågor, lämna ett meddelande.',

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
      'form.status.cooldown': 'Vänta {sec} sekunder innan du skickar ett nytt meddelande.',
      'form.status.success': 'Tack! Ditt meddelande har skickats.',
      'form.status.error.general': 'Något gick fel. Försök igen senare.',
      'form.status.error.network': 'Nätverksfel. Kontrollera din anslutning och försök igen.',
      'form.status.error.required': 'Fyll i alla obligatoriska fält.',
      'form.status.error.email': 'Ge en giltig e-postadress.',
      'form.status.error.phone': 'Ge ett giltigt telefonnummer.',


      // FOOTER
      'footer.tagline': 'Professionell datorservice med fokus på kundnöjdhet och hög kvalitet.',
      'footer.quick': 'Snabblänkar',
      'footer.links.about': 'Om oss',
      'footer.links.pricing': 'Priser',
      'footer.links.services': 'Tjänster',
      'footer.links.contact': 'Kontakt',
      'footer.links.warranty': 'Garanti',
      'footer.copy': '© 2025 Fixinus. Alla rättigheter förbehållna.'
    },

    /* ========== FINNISH ========== */
    fi: {
      // NAV
      'nav.about': 'Tietoa meistä',
      'nav.prices': 'Hinnat',
      'nav.services':'Palvelut',
      'nav.contact': 'Yhteystiedot',

      // HERO
      'hero.title': 'Pidä tekniikka kunnossa. Korjaamme, päivitämme ja autamme.',
      'hero.subtitle':
        'Fixinus on paikallinen kumppani tietokonehuoltoon ja tekniseen tukeen Porvoossa – sekä yksityisille että pienyrityksille. Pöytäkoneet, kannettavat ja arkielektroniikka hoidetaan huolellisesti ja selkeällä viestinnällä.',

      // ABOUT
      'about.title': 'Tietoa Fixinuksesta',
      'about.lead':
        'Fixinus on Porvoossa toimiva IT- ja tekninen tukipalvelu. Huolehdimme, että tekniikka toimii sujuvasti – olit sitten yksityisasiakas tai pienyritys. Voimme tulla myös lähikaupunkeihin; matkakorvaus lisätään tarvittaessa.',
      'about.drop.title': 'Tuonti, nouto & paikan päällä',
      'about.drop.body':
        'Meillä ei ole vielä kiinteää toimistoa. Laitteet voi tuoda sovittuna aikana tai noudamme ne. Jos kyseessä on pikakorjaus – tai työ on tehtävä paikan päällä – tulemme mielellämme. Aika ja paikka sovitaan etukäteen puhelimitse tai sähköpostitse.',
      'about.fast.title': 'Nopea palvelu',
      'about.fast.body':
        'Useimmat peruskorjaukset valmistuvat 1–3 päivässä, ja yksinkertaiset viat usein saman päivän aikana. Jos asia on kiireellinen, pyrimme aloittamaan mahdollisimman pian.',
      'about.exp.title': 'Kokemus',
      'about.exp.body':
        'Meillä on tekninen koulutus ja yli 15 vuoden käytännön kokemus. Pidämme osaamisen ajan tasalla tarjotaksemme selkeitä ja käytännöllisiä ratkaisuja.',
      'about.pay.title': 'Maksutavat',
      'about.pay.body':
        'Käteinen, yleisimmät pankki- ja luottokortit, MobilePay tai lasku.',

      // WARRANTY
      'warranty.title': 'Takuuehdot',
      'warranty.about':
        'Annamme työllemme kuuden kuukauden takuun. Jos ongelma johtuu tekemästämme työstä, korjaamme sen ilman lisäkustannuksia. Takuu täydentää lakisääteisiä kuluttajaoikeuksiasi.',
      'warranty.not.title': 'Takuun ulkopuolella:',
      'warranty.not.1': 'Laitteiston viat tai normaali kuluminen',
      'warranty.not.2': 'Ohjelmistovirheet, haittaohjelmat tai kolmannen osapuolen päivitykset',
      'warranty.not.3': 'Tapaturmainen vaurio, väärinkäyttö tai muutokset, jotka on tehty palvelun jälkeen',
      'warranty.not.4': 'Varaosat (valmistajan takuun piirissä, jos sellainen on)',
      'warranty.how':
        'Näin se toimii: Toimita laite meille (tai varaa kotikäynti), jotta voimme tarkistaa sen. Takuu koskee alkuperäistä laitetta ja työtä, jonka olemme suorittaneet.',

      // SERVICES
      'services.title': 'Palvelut',

      'services.pc.title': 'Pöytäkoneet & kannettavat',
      'services.pc.1': 'Diagnostiikka & vianetsintä',
      'services.pc.2':
        'Laitteistokorjaukset & osat (SSD, RAM-muisti, näytönohjain, akku, näyttö, tuulettimet)',
      'services.pc.3': 'Komponenttien vaihdot & päivitykset (suorituskyky, tallennustila, grafiikka)',
      'services.pc.4':
        'Custom-PC-rakennukset (pelaaminen/työ): neuvonta, kokoonpano & käyttöönotto',
      'services.pc.5': 'Puhdistus & jäähdytyshuolto (pölynpoisto, uusi lämpötahna)',
      'services.pc.6': 'Vuosihuolto',
      'services.pc.7': 'Kaikki merkit',
      'services.pc.8': 'Huoltoraportti työn jälkeen (tehdyt toimet & suositukset)',

      'services.os.title': 'Ohjelmisto & käyttöjärjestelmä',
      'services.os.1':
        'Windowsin tai macOS:n uudelleenasennus (tiedot säilyttäen, kun mahdollista)',
      'services.os.2': 'Uuden koneen käyttöönotto & tiedonsiirto',
      'services.os.3': 'Ohjelmien & ajureiden asennus',
      'services.os.4': 'Virusten ja ei-toivottujen sovellusten poisto',
      'services.os.5': 'Tallennustilan siivous (suuret & väliaikaiset tiedostot)',
      'services.os.6': 'Varmuuskopiointi ulkoiselle levylle tai pilveen',
      'services.os.7': 'Verkko & internet (Wi-Fi/Ethernet, hidas nopeus)',
      'services.os.8': 'Kaatumisten ja virheilmoitusten korjaus',
      'services.os.9': 'Tilit & salasanat (Microsoft/Apple, sähköposti)',
      'services.os.10': 'Sähköposti & pilvipalvelut (OneDrive, iCloud, Google)',

      'services.mobile.title':'Puhelimet & tabletit (vain ohjelmisto + kevyt puhdistus)',
      'services.mobile.1': 'Uuden laitteen käyttöönotto',
      'services.mobile.2': 'Puhelimen vaihto (kuvat, viestit, WhatsApp, sovellukset)',
      'services.mobile.3': 'Lapsilukot & turvallisuus (Ruudun aika / Family Link)',
      'services.mobile.4': 'Sähköposti, yhteystiedot & kalenteri',
      'services.mobile.5': 'Sovellus- & tiliapu (Apple ID, Google-tili)',
      'services.mobile.6': 'iCloud/Google – varmuuskopiot & palautus',
      'services.mobile.7': 'Tallennustilan siivous (tilan vapautus turvallisesti)',
      'services.mobile.8':
        'Laitteen turvallisuus (päivitykset, koodit, kaksivaiheinen vahvistus / 2FA)',
      'services.mobile.9': 'Vianetsintä (synkronointi, ilmoitukset, akku)',

      'services.home.title': 'Kotitekniikka',
      'services.home.1': 'Wi-Fi-asennus & kattavuus (reititin/mesh)',
      'services.home.2': 'TV & suoratoisto (äly-TV, Apple TV, Chromecast jne.)',
      'services.home.3':
        'Pelikonsolit (korjaus, käyttöönotto, online-asetukset, perheasetukset)',
      'services.home.4': 'Tulostimet & skannerit (asennus, liitäntä, yleiset viat)',
      'services.home.5': 'Jaettu tallennus / NAS (tiedostot useilla laitteilla)',
      'services.home.6': 'Älykoti (valot, kamerat, kaiuttimet)',

      // PRICES
      'prices.title': 'Yrityshinnasto',
      'prices.lead':
        'Kiinteä kuukausipaketti. Rajoittamaton tuki, 1–3 päivän aikataulu. Päivystyksestä voi tulla lisäkuluja.',
      'prices.basic': 'Perusdiagnostiikka',
      'prices.standard': 'Vakiokorjaus',
      'prices.premium': 'Premium-palvelut',
      'prices.onetime': '/ kertamaksu',
      'prices.showmore': 'Näytä lisää',
      'prices.infobox.basic': 'Hyvä pieniin tarpeisiin. Päivitä milloin vain!',
      'prices.infobox.standard': 'Sopii toistuviin tarpeisiin. Päivitä milloin vain!',
      'prices.infobox.premium': 'Edistyneempiin palveluihin. Päivitä milloin vain!',

      // REMOTE
      'remote.title': 'Etätuki – näin se toimii',
      'remote.lead':
        'Windows 10/11 -laitteissa käytämme Quick Assist -toimintoa. Jos sinulla ei ole Microsoft-tiliä tai Quick Assist ei toimi, käytämme TeamViewer QuickSupportia. Mac- ja Linux-laitteissa käytämme myös TeamVieweria. Jos mikään vaihtoehto ei sovi, järjestämme kotikäynnin tai laitteen tuonnin.',
      'remote.step.1.html':
        '<strong>Ota yhteyttä:</strong> Soita +358 40 066 4767 tai lähetä sähköpostia <a href="mailto:info@fixinus.fi">info@fixinus.fi</a>, niin varmistamme että etätuki sopii tilanteeseesi.',
      'remote.step.2.html': `<strong>Lataa oikea sovellus:</strong><br>
        • <u>Windows 10/11:</u> Avaa Quick Assist painamalla <kbd><kbd>Ctrl</kbd>+<kbd>Windows</kbd>+<kbd>Q</kbd></kbd>.<br>
        • <u>Ei Microsoft-tiliä tai Quick Assist ei toimi?</u> Lataa TeamViewer QuickSupport: <a href="https://www.teamviewer.com/download/">teamviewer.com/download</a>.<br>
        • <u>Mac tai Linux:</u> Lataa TeamViewer QuickSupport yllä olevasta linkistä.`,
      'remote.step.3.html':
        '<strong>Salli yhteys:</strong> Avaa sovellus ja hyväksy yhteyspyyntö. Näet kaiken mitä teemme.',
      'remote.step.4.html':
        '<strong>Jaa koodi:</strong> Sovellus näyttää kertakäyttöisen koodin. Kerro koodi meille, niin voimme muodostaa yhteyden. Koodia ei voi käyttää uudelleen.',
      'remote.step.5.html':
        '<strong>Ratkaisemme ongelman:</strong> Näet kaiken näytöltäsi ja voit keskeyttää tai lopettaa istunnon milloin tahansa.',
      'remote.step.6.html':
        '<strong>Valmista:</strong> Suljemme istunnon ja vahvistamme mahdolliset seuraavat vaiheet.',

      // CONTACT
      'contact.title': 'Ota yhteyttä',
      'contact.lead':
        'Onko kysyttävää tai tarvitsetko apua tekniikan kanssa? Ota yhteyttä.',
      'contact.info': 'Yhteystiedot',
      'contact.address.title': 'Osoite',
      'contact.address.line1': 'Yrittäjäntie 11',
      'contact.address.line2': '06450 Porvoo',
      'contact.phone.title': 'Puhelin',
      'contact.phone.value': '+358 40 066 4767',
      'contact.email.title': 'Sähköposti',
      'contact.email.value': 'info@fixinus.fi',
      'contact.hours.title': 'Aukioloajat',
      'contact.hours.monfri': 'Ma–Pe: 09:00 – 17:00',
      'contact.hours.sat': 'La: 10:00 – 16:00',
      'contact.hours.sun': 'Su: Suljettu',
      'contact.hours.urgent':
        'Kiireelliset asiat 24/7. Jos emme vastaa heti, yritä soittaa uudelleen. Ei-kiireellisissä asioissa jätä viesti.',

      // FORM
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
      'form.status.cooldown': 'Odota {sec} sekuntia ennen uuden viestin lähettämistä.',
      'form.status.success': 'Kiitos! Viestisi on lähetetty.',
      'form.status.error.general': 'Jotain meni pieleen. Yritä myöhemmin uudelleen.',
      'form.status.error.network': 'Verkkovirhe. Tarkista yhteytesi ja yritä uudelleen.',
      'form.status.error.required': 'Täytä kaikki vaaditut kentät.',
      'form.status.error.email': 'Syötä kelvollinen sähköpostiosoite.',
      'form.status.error.phone': 'Syötä kelvollinen puhelinnumero.',


      // FOOTER
      'footer.tagline':'Laadukasta ja asiakaslähtöistä tietokonehuoltoa – ammattitaidolla ja luotettavasti.',
      'footer.quick': 'Pikalinkit',
      'footer.links.about': 'Tietoa meistä',
      'footer.links.pricing': 'Hinnat',
      'footer.links.services': 'Palvelut',
      'footer.links.contact': 'Yhteystiedot',
      'footer.links.warranty': 'Takuuehdot',
      'footer.copy': '© 2025 Fixinus. Kaikki oikeudet pidätetään.'
    },


    /* ========== ENGLISH ========== */
    en: {
      // NAV
      'nav.about': 'About',
      'nav.prices': 'Prices',
      'nav.services':'Services',
      'nav.contact': 'Contact',

      // HERO
      'hero.title': 'Keep your tech running right. We fix, upgrade and support.',
      'hero.subtitle':
        'Fixinus is your local partner for computer repairs and tech support in Porvoo — for individuals and small businesses. Desktops, laptops and everyday electronics, handled with care and clear communication.',

      // ABOUT
      'about.title': 'About Fixinus',
      'about.lead':
        'Fixinus is a local IT and tech support service based in Porvoo. We help individuals and small businesses keep their technology running smoothly. We can also travel to nearby cities; a travel fee applies.',
      'about.drop.title': 'Drop-off, pickup & on-site',
      'about.drop.body':
        'We don’t have a fixed office (yet). Devices can be dropped off by appointment, or we can pick them up. If it looks like a quick fix — or the work needs to be done where the device is — we’re happy to come on-site. We’ll agree on the time and location in advance by phone or email.',
      'about.fast.title': 'Fast service',
      'about.fast.body':
        'Most standard repairs are completed within 1–3 days, and simpler issues are often handled the same day. If a job is urgent, we aim to start as soon as possible.',
      'about.exp.title': 'Experience',
      'about.exp.body':
        'We have formal technical training and over 15 years of hands-on experience. We keep up with industry developments to provide clear, practical solutions.',
      'about.pay.title': 'Payment methods',
      'about.pay.body':
        'Cash, major debit and credit cards, MobilePay, Google Pay, Apple Pay or invoice.',

      // WARRANTY
      'warranty.title': 'Warranty',
      'warranty.about':
        'We provide a six-month warranty on our labor. If an issue is caused by our work, we’ll fix it at no cost. This warranty supplements your statutory consumer rights.',
      'warranty.not.title': 'Not covered:',
      'warranty.not.1': 'Hardware failures or normal wear and tear',
      'warranty.not.2': 'Software bugs, malware or third-party updates',
      'warranty.not.3': 'Accidental damage, misuse or changes made after our service',
      'warranty.not.4': 'Parts (covered by the manufacturer’s warranty, if applicable)',
      'warranty.how':
        'How it works: Bring the device to us (or book a visit) so we can inspect it. The warranty applies to the original device and the work we performed.',

      // SERVICES
      'services.title': 'Services',

      'services.pc.title': 'Desktops & Laptops',
      'services.pc.1': 'Diagnostics & troubleshooting',
      'services.pc.2':
        'Hardware repairs & parts (SSD, RAM, GPU, battery, screen, fans)',
      'services.pc.3':
        'Component replacements & upgrades (performance, storage, graphics)',
      'services.pc.4':
        'Custom PC builds (gaming/work): advice on parts, assembly & setup',
      'services.pc.5': 'Cleaning & cooling service (dust removal, fresh thermal paste)',
      'services.pc.6': 'Annual service check',
      'services.pc.7': 'All brands supported',
      'services.pc.8':
        'Service report after work (what we did & recommended actions)',

      'services.os.title': 'Software & Operating System',
      'services.os.1': 'Reinstall Windows or macOS (keep files when possible)',
      'services.os.2': 'New computer setup & file migration',
      'services.os.3': 'Install programs & drivers',
      'services.os.4': 'Remove viruses and unwanted software',
      'services.os.5': 'Free up disk space (large & temporary files)',
      'services.os.6': 'Backups to an external drive or cloud',
      'services.os.7':
        'Network & internet issues (Wi-Fi/Ethernet, slow or unstable connection)',
      'services.os.8': 'Fix crashes and error messages',
      'services.os.9': 'Account & password help (Microsoft/Apple, email accounts)',
      'services.os.10': 'Email and cloud services (OneDrive, iCloud, Google)',

      'services.mobile.title': 'Phones & Tablets (software only + light cleaning)',
      'services.mobile.1': 'New device setup',
      'services.mobile.2':
        'Switching phones made easy (move photos, messages, WhatsApp, apps)',
      'services.mobile.3':
        'Parental controls & safety (Screen Time / Family Link setup)',
      'services.mobile.4': 'Email, contacts & calendar sync',
      'services.mobile.5': 'App & account help (Apple ID, Google account)',
      'services.mobile.6': 'iCloud/Google backups & restores',
      'services.mobile.7': 'Storage cleanup (free up space safely)',
      'services.mobile.8': 'Security check (updates, passcodes, 2FA)',
      'services.mobile.9': 'Troubleshooting (sync, notifications, battery)',

      'services.home.title': 'Home Tech Help',
      'services.home.1': 'Wi-Fi setup & coverage improvements (router/mesh)',
      'services.home.2': 'TV & streaming (smart TV, Apple TV, Chromecast, etc.)',
      'services.home.3':
        'Game consoles (repair, setup, online features, family settings)',
      'services.home.4': 'Printers & scanners (install, connect, common issues)',
      'services.home.5': 'Shared storage / NAS (files across devices)',
      'services.home.6': 'Smart home devices (lights, cameras, speakers)',

      // PRICES
      'prices.title': 'Business Pricing',
      'prices.lead':
        'One simple monthly plan. Unlimited support, 1–3 day scheduling. Emergency support may incur additional costs.',
      'prices.basic': 'Basic Diagnostics',
      'prices.standard': 'Standard Repair',
      'prices.premium': 'Premium Services',
      'prices.onetime': '/ one-time',
      'prices.showmore': 'Show more',
      'prices.infobox.basic': 'Ideal for smaller needs. Upgrade anytime!',
      'prices.infobox.standard': 'Great for recurring needs. Upgrade anytime!',
      'prices.infobox.premium': 'For more advanced needs. Upgrade anytime!',

      // REMOTE
      'remote.title': 'Remote Help – How It Works',
      'remote.lead':
        'On Windows 10/11 we use Quick Assist. If you don’t have a Microsoft account or Quick Assist isn’t available, we use TeamViewer QuickSupport instead. On Mac and Linux, we also use TeamViewer. If neither option fits, we arrange a home visit or drop-off.',
      'remote.step.1.html':
        '<strong>Contact us:</strong> Call +358 40 066 4767 or email <a href="mailto:info@fixinus.fi">info@fixinus.fi</a> to confirm that remote help is suitable for your issue.',
      'remote.step.2.html': `<strong>Download the right app:</strong><br>
        • <u>Windows 10/11:</u> Open Quick Assist by pressing <kbd><kbd>Ctrl</kbd>+<kbd>Windows</kbd>+<kbd>Q</kbd></kbd>.<br>
        • <u>No Microsoft account or Quick Assist not working?</u> Download TeamViewer QuickSupport: <a href="https://www.teamviewer.com/download/">teamviewer.com/download</a>.<br>
        • <u>Mac or Linux:</u> Download TeamViewer QuickSupport from the link above.`,
      'remote.step.3.html':
        '<strong>Allow access:</strong> Open the app and approve the connection when prompted. You can see everything we do.',
      'remote.step.4.html':
        '<strong>Share the code:</strong> The app will show a one-time code. Tell us the code so we can connect. It cannot be reused.',
      'remote.step.5.html':
        '<strong>We fix the issue:</strong> You can watch everything on your screen and pause or stop the session at any time.',
      'remote.step.6.html':
        '<strong>All done:</strong> We close the session and confirm any next steps.',

      // CONTACT
      'contact.title': 'Contact Us',
      'contact.lead':
        'Have a question or need help with your tech? Get in touch.',
      'contact.info': 'Contact Information',
      'contact.address.title': 'Address',
      'contact.address.line1': 'Yrittäjäntie 11',
      'contact.address.line2': '06450 Porvoo',
      'contact.phone.title': 'Phone',
      'contact.phone.value': '+358 40 066 4767',
      'contact.email.title': 'Email',
      'contact.email.value': 'info@fixinus.fi',
      'contact.hours.title': 'Hours',
      'contact.hours.monfri': 'Monday–Friday: 09:00 – 17:00',
      'contact.hours.sat': 'Saturday: 10:00 – 16:00',
      'contact.hours.sun': 'Sunday: Closed',
      'contact.hours.urgent':
        'Urgent matters 24/7. If we don’t answer right away, please call again. For non-urgent matters, leave a message.',
      

      // FORM
      'form.sendus': 'Send Us a Message',
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
      'form.status.cooldown': 'Please wait {sec} second(s) before sending another message.',
      'form.status.success': 'Thank you! Your message has been sent.',
      'form.status.error.general': 'Something went wrong. Please try again later.',
      'form.status.error.network': 'Network error. Please check your connection and try again.',
      'form.status.error.required': 'Please fill in all required fields.',
      'form.status.error.email': 'Please enter a valid email address.',
      'form.status.error.phone': 'Please enter a valid phone number.',
      // FOOTER
      'footer.tagline':'Professional computer repair with a focus on customer satisfaction and high-quality workmanship.',
      'footer.quick': 'Quick Links',
      'footer.links.about': 'About Us',
      'footer.links.pricing': 'Pricing',
      'footer.links.services': 'Services',
      'footer.links.contact': 'Contact',
      'footer.links.warranty': 'Warranty',
      'footer.copy': '© 2025 Fixinus. All rights reserved.'
    }

  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function applyTranslations(lang)
  {
    const dict = MESSAGES[lang] || MESSAGES[DEFAULT_LANG];

    // Simple text nodes
    $$('[data-i18n]').forEach(el =>
    {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    // InnerHTML content (allows <a>, <kbd>, <img> etc.)
    $$('[data-i18n-html]').forEach(el =>
    {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    // Attribute mappings, e.g., data-i18n-attr="placeholder:form.name|value:form.opt..."
    $$('[data-i18n-attr]').forEach(el =>
    {
      const map = el.getAttribute('data-i18n-attr'); // "placeholder:form.name|aria-label:contact.phone"
      map.split('|').forEach(pair =>
      {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key && dict[key]) el.setAttribute(attr, dict[key]);
      });
    });

    // HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
  }

    // --- Language menu helpers ---

    // --- Language menu helpers ---

  function updateLangMenu(lang) {
    const menu = $('#lang-menu');
    if (!menu) return;

    const currentBtn = menu.querySelector('.lang-current');
    const currentFlagEl = currentBtn?.querySelector('[data-current-flag]');

    // Map language → flag
    const flagMap = {
      fi: '🇫🇮',
      sv: '🇸🇪',
      en: '🇬🇧'
    };

    if (currentFlagEl) {
      currentFlagEl.textContent = flagMap[lang] || '🌐';
    }

    // Mark active item
    menu.querySelectorAll('.lang-option').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
    });
  }

  /** Change language, store it, re-render text, update menu */
  function setLang(lang) {
    const safeLang = MESSAGES[lang] ? lang : DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, safeLang);

    applyTranslations(safeLang);             // update text & placeholders
    updateLangMenu(safeLang);                // update flag & active option
    document.documentElement.setAttribute('lang', safeLang);
  }

  function initLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const startLang = (saved && MESSAGES[saved]) ? saved : DEFAULT_LANG;

    // Initial language
    setLang(startLang);

    const menu = $('#lang-menu');
    if (menu) {
      const options = menu.querySelectorAll('.lang-option');
      const currentBtn = menu.querySelector('.lang-current');

      let hideTimeout;

      // 🔹 Open dropdown on hover (and keep it open while inside menu)
      menu.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        menu.classList.add('open');
        if (currentBtn) {
          currentBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // 🔹 Close dropdown shortly after leaving
      menu.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
          menu.classList.remove('open');
          if (currentBtn) {
            currentBtn.setAttribute('aria-expanded', 'false');
          }
        }, 120); // small delay so tiny mouse gaps don’t instantly close
      });

      // 🔹 Click behaviour: change language + close dropdown immediately
      options.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = btn.dataset.lang;
          setLang(lang);

          clearTimeout(hideTimeout);
          menu.classList.remove('open');
          if (currentBtn) {
            currentBtn.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLang);
  } else {
    initLang();
  }
})();



(function () {
  const modal = document.getElementById('warranty-modal');
  const openBtn = document.getElementById('warranty-trigger');
  const closeBtn = document.getElementById('warranty-close');

  if (!modal || !openBtn || !closeBtn) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Click on backdrop closes modal
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();


// FORM FUNCTIONALITY

(function () {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  if (!form || !statusEl) return;

  // 🔐 Replace this with your real Formspree endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgebwdw';

  // Simple rate limiting: cooldown between submissions (ms)
  const COOLDOWN_MS = 30000; // 30 seconds
  let lastSubmitTime = 0;

  // Small, self-contained translation table JUST for form status messages
  const FORM_MESSAGES = {
    fi: {
      cooldown: 'Odota {sec} sekuntia ennen uuden viestin lähettämistä.',
      success: 'Kiitos! Viestisi on lähetetty.',
      error_general: 'Jotain meni pieleen. Yritä myöhemmin uudelleen.',
      error_network: 'Verkkovirhe. Tarkista yhteytesi ja yritä uudelleen.',
      error_required: 'Täytä kaikki vaaditut kentät.',
      error_email: 'Syötä kelvollinen sähköpostiosoite.',
      error_phone: 'Syötä kelvollinen puhelinnumero.'
    },
    en: {
      cooldown: 'Please wait {sec} second(s) before sending another message.',
      success: 'Thank you! Your message has been sent.',
      error_general: 'Something went wrong. Please try again later.',
      error_network: 'Network error. Please check your connection and try again.',
      error_required: 'Please fill in all required fields.',
      error_email: 'Please enter a valid email address.',
      error_phone: 'Please enter a valid phone number.'
    },
    sv: {
      cooldown: 'Vänta {sec} sekunder innan du skickar ett nytt meddelande.',
      success: 'Tack! Ditt meddelande har skickats.',
      error_general: 'Något gick fel. Försök igen senare.',
      error_network: 'Nätverksfel. Kontrollera din anslutning och försök igen.',
      error_required: 'Fyll i alla obligatoriska fält.',
      error_email: 'Ange en giltig e-postadress.',
      error_phone: 'Ange ett giltigt telefonnummer.'
    }
  };

  function getLang() {
    const stored = localStorage.getItem('site-lang');
    if (stored && FORM_MESSAGES[stored]) return stored;
    return 'fi'; // fallback
  }

  function translate(key, vars = {}) {
    const lang = getLang();
    const dict = FORM_MESSAGES[lang] || FORM_MESSAGES.fi;
    let template = dict[key] || FORM_MESSAGES.fi[key] || key;

    return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ''));
  }

  function showStatus(key, type, vars) {
    const msg = translate(key, vars);
    statusEl.textContent = msg;
    statusEl.classList.remove('success', 'error');
    if (type) statusEl.classList.add(type);
  }

  function sanitize(str) {
    // Basic encoding to avoid HTML/script injection in any future use
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function validate(formData) {
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const service = formData.get('service');
    const message = formData.get('message')?.trim();

    if (!name || !email || !phone || !service || !message) {
      return 'error_required';
    }

    // Email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'error_email';
    }

    // Very basic phone validation (at least 6 digits)
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 6) {
      return 'error_phone';
    }

    return null;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const now = Date.now();
    const sinceLast = now - lastSubmitTime;

    if (sinceLast < COOLDOWN_MS && lastSubmitTime !== 0) {
      const remainingMs = COOLDOWN_MS - sinceLast;
      const remainingSec = Math.ceil(remainingMs / 1000);
      showStatus('cooldown', 'error', { sec: remainingSec });
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    const formData = new FormData(form);

    // Honeypot: if filled, silently pretend success but do nothing
    if (formData.get('website')) {
      showStatus('success', 'success');
      form.reset();
      lastSubmitTime = Date.now();
      return;
    }

    const errorKey = validate(formData);
    if (errorKey) {
      showStatus(errorKey, 'error');
      return;
    }

    // Build a safe payload with sanitized values
    const payload = {
      name: sanitize(formData.get('name')),
      email: sanitize(formData.get('email')),
      phone: sanitize(formData.get('phone')),
      service: sanitize(formData.get('service')),
      message: sanitize(formData.get('message')),
    };

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...'; // you can localize this too if you want
      }
      showStatus('', null);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showStatus('success', 'success');
        form.reset();
        lastSubmitTime = Date.now();
      } else {
        showStatus('error_general', 'error');
      }
    } catch (err) {
      console.error(err);
      showStatus('error_network', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
})();
