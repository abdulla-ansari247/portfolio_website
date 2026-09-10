// ── Side-nav ──────────────────────────────────────────────────────────────────
const toggle   = document.getElementById('menuToggle');
const sideNav  = document.getElementById('sideNav');
const overlay  = document.getElementById('navOverlay');

function openMenu()  { toggle.classList.add('open');    sideNav.classList.add('open');    overlay.classList.add('open'); }
function closeMenu() { toggle.classList.remove('open'); sideNav.classList.remove('open'); overlay.classList.remove('open'); }

toggle.addEventListener('click', () => sideNav.classList.contains('open') ? closeMenu() : openMenu());
overlay.addEventListener('click', closeMenu);
sideNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// ── Active nav on scroll ───────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-nav a');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => scrollObserver.observe(s));

// ── Theme ──────────────────────────────────────────────────────────────────────
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// ── Language ───────────────────────────────────────────────────────────────────
const langBtn      = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
let currentLang    = localStorage.getItem('lang') || 'en';

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => langDropdown.classList.remove('open'));

document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
        currentLang = opt.dataset.lang;
        localStorage.setItem('lang', currentLang);
        applyLanguage(currentLang);
        langDropdown.classList.remove('open');
    });
});

// English copy lives in index.html: the text inside each [data-i18n] element is the
// single source of truth for EN, snapshotted below before anything overwrites it.
// Only translations *away* from English belong in here — so there is no duplicated
// English string that can drift out of sync with the markup.
const translations = {
    hu: {
        'nav-about':      'Rólam',
        'nav-projects':   'Projektek',
        'nav-skills':     'Készségek',
        'nav-experience': 'Tapasztalat',
        'nav-contact':    'Kapcsolat',

        'hero-tag':     'Munkát keresek',
        'hero-heading': 'Szia, én vagyok<br><span class="accent">Ansari Abdulla</span>',
        'hero-desc':    'Fizika hallgató, aki szenvedélyesen foglalkozik szimulációkkal és problémamegoldással. Mindig készen állok tanulni és kibontakoztatni a bennem rejlő lehetőségeket. Március 1-jétől elérhető vagyok munkavállalásra Hollandiában.',
        'btn-work':     'Munkáim megtekintése',
        'btn-contact':  'Kapcsolatba lépés',

        'about-p1': 'Fizika alapszakos hallgató vagyok a <strong>Debreceni Egyetemen</strong>, ahol szilárd alapokat építek klasszikus mechanikában, termodinamikában, kvantum- és magfizikában, valamint az ezeket meghatározó matematikai módszerekben.',
        'about-p2': 'Olyan eszközöket használok, mint a GEANT4, Python és Linux, hogy fizikai modelleket működő szimulációkká alakítsak — legyen szó röntgen képalkotó rendszerek optimalizálásáról vagy offshore energiainfrastruktúra megbízhatóságának modellezéséről.',
        'about-p3': 'A fizikán kívül szabadúszó fejlesztőként és magántanárként is dolgoztam, ami mind a technikai szélességemet, mind az összetett gondolatok világos kommunikálásának képességét fejlesztette. Módszeres és részletorientált vagyok, és szívesen veszek fel új eszközöket, ha a feladat megköveteli.',
        'about-p4': 'A legnagyobb erősségem a problémamegközelítésem. Nem lépek megoldások felé, amíg teljesen nem értem a teljes képet. A GEANT4-gyel való munka a diplomamunkámhoz például azt jelentette, hogy mélyen meg kellett értenem a részecske-kölcsönhatás geometriáját, mielőtt egyetlen szimulációs futtatás is értelmet nyert. Ez az ösztön — érteni mielőtt cselekedni — meghatározta, hogyan dolgozom a fizikában, a programozásban és az oktatásban egyaránt.',

        'projects-sub': 'Munkáim gyűjteménye — szimulációk, kísérletek és nyílt forráskódú projektek.',
        'proj1-title':  'Röntgen Képalkotás Optimalizálása',
        'proj1-status': 'Kutatás',
        'proj1-desc':   'Többforrású röntgen képalkotó konfigurációt terveztem és optimalizáltam GEANT4 szimulációk segítségével, a mélységérzékelés és strukturális felbontás javítása érdekében. A teljesítményt kontraszt, térbeli felbontás és strukturális láthatóság statisztikai elemzésével értékeltem.',
        'proj2-title':  'Szélturbina Megbízhatósági Szimuláció',
        'proj2-status': 'Szimuláció',
        'proj2-desc':   'Monte Carlo szimulációs rendszert építettem Python és SQL segítségével offshore szélturbina-alkatrészek meghibásodási arányainak modellezésére. Poisson-eloszlási módszereket alkalmaztam a karbantartási intervallumok előrejelzésére és a rendszerteljesítmény optimalizálására.',
        'proj3-title':  '2D AI Versenyőjáték',
        'proj3-status': 'Folyamatban',
        'proj3-desc':   'Felülnézetes 2D autóverseny-játék, amelyet a nulláról építettem Pythonban Pygame segítségével. Vektoralapú autófizikát valósít meg \u2014 gyorsulást, lassulást és forgási kormányzást trigonometrikus mozgással \u2014 pixelmaszkos pályahatárokkal, megalapozva egy önvezető ügynököt, amely megtanulja az ideális ívet.',
        'proj4-title':  'Portfólió Weboldal',
        'proj4-status': 'Web',
        'proj4-desc':   'Ez az oldal \u2014 reszponzív, egyoldalas portfólió, amelyet kézzel írtam tiszta HTML, CSS és JavaScript nyelven, keretrendszer és build-lépés nélkül. Görgetéshez igazított navigációt, megőrzött világos/sötét témát és teljes angol/magyar lokalizációt tartalmaz egy könnyű, saját i18n réteggel.',
        'proj-github':  'Megtekintés a GitHubon',
        'proj-live':    'Élő oldal',

        'skills-prog':   'Programozás',
        'skills-tools':  'Eszközök &amp; Keretrendszerek',
        'skills-domain': 'Szakterületi Tudás',
        'pill-stats':    'Statisztikai Elemzés',
        'pill-physics':  'Játékfizika',
        'pill-num':      'Numerikus Modellezés',
        'pill-stat':     'Statisztikai Modellezés',
        'pill-data':     'Adatelemzés',

        'exp1-title':  'Akkumulátorcella Minőségellenőr és Osztályozó',
        'exp1-date':   '2026. jún. — jelenleg',
        'exp1-org':    'CATL (Contemporary Amperex Technology), Debrecen, Magyarország',
        'exp1-desc':   'A világ egyik legnagyobb lítium-ion akkumulátorgyártójának gyártósorán dolgozom. Szűk tűréshatárok között, precizitásra épülő gyártási környezetben végzem a munkát, ahol a következetesség és a részletekre való odafigyelés közvetlenül meghatározza a végtermék megbízhatóságát.',
        'exp2-title':  'BSc Fizika',
        'exp2-date':   '2023. szept. — jelenleg',
        'exp2-org':    'Debreceni Egyetem, Magyarország',
        'exp2-desc':   'Tantárgyak: klasszikus mechanika, elektrodinamika, kvantummechanika, magfizika, termodinamika és számítógépes fizika. A kutatás GEANT4 és Python szimulációk fejlesztésére összpontosult Linux környezetben.',
        'exp3-title':  'Magántanár',
        'exp3-date':   '2020. szept. — 2026. júl.',
        'exp3-org':    'Önálló / Távmunka',
        'exp3-desc':   'Egyéni oktatás matematikából, fizikából és számítástechnikából általános és középiskolai szinten. Fókusz a strukturált problémamegoldáson, fogalmi megértésen és vizsgafelkészítésen.',
        'exp4-title':  'Kapcsolati Manager',
        'exp4-date':   '2023. febr. — 2023. júl.',
        'exp4-org':    'Bellavista Ingatlan, Dubai, UAE',
        'exp4-desc':   'Az ügyfelek, ügynökök, fejlesztők és nemzetközi ügynökségek közötti kapcsolattartó pontként működtem, koordinálva több fél között az ügyletek előrehaladásának biztosítása érdekében. Erős munkakapcsolatokat építettem ki egy gyors tempójú, emberközpontú környezetben.',
        'exp5-title':  'Szabadúszó Programozó Fejlesztő',
        'exp5-date':   '2021. jan. — 2023. febr.',
        'exp5-org':    'Önálló / Távmunka',
        'exp5-desc':   'Egyedi szoftvermegoldásokat készítettem ügyféli projektekhez Python, JavaScript (Node.js), Java és HTML használatával. Kezeltem a backend logikát, interaktív webes komponenseket és a végponttól végpontig tartó szállítást, miközben önállóan kezeltem az ügyfélkommunikációt.',

        'cv-sub':      'Felkeltette az érdeklődésedet? Az önéletrajzomat innen töltheted le vagy tekintheted meg.',
        'contact-sub': 'Kérdésed van, lehetőséget kínálsz, vagy csak szeretnél csevegni? Szívesen hallom.',
    }
};

// Captured once, before the first applyLanguage() call, so it holds the untouched
// English markup. Switching back to EN restores from here.
const englishCopy = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
    englishCopy[el.getAttribute('data-i18n')] = el.innerHTML;
});

function applyLanguage(lang) {
    const t = translations[lang] || englishCopy;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = t[key] !== undefined ? t[key] : englishCopy[key];
        if (value !== undefined) el.innerHTML = value;
    });
    langBtn.childNodes[0].textContent = lang.toUpperCase() + ' ';
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
}

applyLanguage(currentLang);
