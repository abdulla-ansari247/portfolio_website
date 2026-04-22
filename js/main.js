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

const translations = {
    en: {
        'nav-about':      'About',
        'nav-projects':   'Projects',
        'nav-skills':     'Skills',
        'nav-experience': 'Experience',
        'nav-contact':    'Contact',

        'hero-tag':     'Available for work',
        'hero-heading': 'Hi, I\'m<br><span class="accent">Abdulla Ansari</span>',
        'hero-desc':    'Physics undergraduate with a passion for simulation and problem-solving. I am always eager to learn and advance myself to my potential.',
        'btn-work':     'View My Work',
        'btn-contact':  'Get in Touch',

        'about-p1': 'I\'m a Physics undergraduate at the <strong>University of Debrecen</strong>, building a solid grounding in classical mechanics, thermodynamics, quantum and nuclear physics, and the mathematical methods that define them.',
        'about-p2': 'I use tools like GEANT4, Python, and Linux to turn physical models into working simulations, whether that\'s optimising X-ray imaging systems or modelling the reliability of offshore energy infrastructure.',
        'about-p3': 'Outside of physics, I\'ve worked as a freelance developer and private tutor, which has sharpened both my technical range and my ability to communicate complex ideas clearly. I\'m methodical, detail-oriented, and comfortable picking up new tools when the problem calls for it.',
        'about-p4': 'My biggest strength is how I approach problems. I don\'t move to solutions until I\'ve properly understood the full picture. Working with GEANT4 for my thesis, for instance, meant building a deep understanding of particle interaction geometry before a single simulation run made sense. That instinct to understand before acting has shaped how I work across physics, programming, and tutoring.',

        'projects-sub': 'A collection of things I\'ve worked on — simulations, experiments, and open source contributions.',
        'proj1-title':  'X-Ray Imaging Optimization',
        'proj1-status': 'Research',
        'proj1-desc':   'Designed and optimized a multi-source X-ray imaging configuration using GEANT4 simulations to improve depth perception and structural resolution in radiographic imaging. Evaluated performance through statistical analysis of contrast, spatial resolution, and structural visibility.',
        'proj2-title':  'Wind Turbine Reliability Simulation',
        'proj2-status': 'Simulation',
        'proj2-desc':   'Built a Monte Carlo simulation system in Python and SQL to model failure rates and reliability behavior of offshore wind turbine components. Applied Poisson distribution methods to predict maintenance intervals and optimize system performance.',

        'skills-prog':   'Programming',
        'skills-tools':  'Tools &amp; Frameworks',
        'skills-domain': 'Domain Knowledge',
        'pill-stats':    'Statistical Analysis',
        'pill-num':      'Numerical Modelling',
        'pill-stat':     'Statistical Modelling',
        'pill-data':     'Data Analysis',

        'exp1-title': 'B.Sc Physics',
        'exp1-date':  'Sept. 2023 — Present',
        'exp1-org':   'University of Debrecen, Hungary',
        'exp1-desc':  'Coursework spanning classical mechanics, electrodynamics, quantum mechanics, nuclear physics, thermodynamics, and computational physics. Research focused on simulation development with GEANT4 and Python in Linux environments.',
        'exp2-title': 'Freelance Programming Developer',
        'exp2-date':  'Jan. 2021 — Present',
        'exp2-org':   'Independent / Remote',
        'exp2-desc':  'Built custom software solutions for client projects using Python, JavaScript (Node.js), Java, and HTML. Handled backend logic, interactive web components, and end-to-end delivery while managing client communication independently.',
        'exp3-title': 'Private Tutor',
        'exp3-date':  'Sept. 2020 — Present',
        'exp3-org':   'Independent / Remote',
        'exp3-desc':  'One-to-one tutoring in Mathematics, Physics, and Computer Science at primary and secondary level. Focus on structured problem-solving, conceptual understanding, and exam preparation.',
        'exp4-title': 'Relationship Manager',
        'exp4-date':  'Feb. 2023 — Jul. 2023',
        'exp4-org':   'Bellavista Real Estate, Dubai, UAE',
        'exp4-desc':  'Acted as the central point of contact between clients, agents, developers, and international agencies, coordinating across multiple parties to keep deals moving and ensure everyone stayed aligned. Built strong working relationships in a fast-paced, people-driven environment.',

        'cv-sub':      'Interested in me? You can view or download my CV from here.',
        'contact-sub': 'Have a question, opportunity, or just want to chat? I\'m happy to hear from you.',
    },
    hu: {
        'nav-about':      'Rólam',
        'nav-projects':   'Projektek',
        'nav-skills':     'Készségek',
        'nav-experience': 'Tapasztalat',
        'nav-contact':    'Kapcsolat',

        'hero-tag':     'Munkát keresek',
        'hero-heading': 'Szia, én vagyok<br><span class="accent">Ansari Abdulla</span>',
        'hero-desc':    'Fizika hallgató, aki szenvedélyesen foglalkozik szimulációkkal és problémamegoldással. Mindig készen állok tanulni és kibontakoztatni a bennem rejlő lehetőségeket.',
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

        'skills-prog':   'Programozás',
        'skills-tools':  'Eszközök &amp; Keretrendszerek',
        'skills-domain': 'Szakterületi Tudás',
        'pill-stats':    'Statisztikai Elemzés',
        'pill-num':      'Numerikus Modellezés',
        'pill-stat':     'Statisztikai Modellezés',
        'pill-data':     'Adatelemzés',

        'exp1-title': 'BSc Fizika',
        'exp1-date':  '2023. szept. — jelenleg',
        'exp1-org':   'Debreceni Egyetem, Magyarország',
        'exp1-desc':  'Tantárgyak: klasszikus mechanika, elektrodinamika, kvantummechanika, magfizika, termodinamika és számítógépes fizika. A kutatás GEANT4 és Python szimulációk fejlesztésére összpontosult Linux környezetben.',
        'exp2-title': 'Szabadúszó Programozó Fejlesztő',
        'exp2-date':  '2021. jan. — jelenleg',
        'exp2-org':   'Önálló / Távmunka',
        'exp2-desc':  'Egyedi szoftvermegoldásokat készítettem ügyféli projektekhez Python, JavaScript (Node.js), Java és HTML használatával. Kezeltem a backend logikát, interaktív webes komponenseket és a végponttól végpontig tartó szállítást, miközben önállóan kezeltem az ügyfélkommunikációt.',
        'exp3-title': 'Magántanár',
        'exp3-date':  '2020. szept. — jelenleg',
        'exp3-org':   'Önálló / Távmunka',
        'exp3-desc':  'Egyéni oktatás matematikából, fizikából és számítástechnikából általános és középiskolai szinten. Fókusz a strukturált problémamegoldáson, fogalmi megértésen és vizsgafelkészítésen.',
        'exp4-title': 'Kapcsolati Manager',
        'exp4-date':  '2023. febr. — 2023. júl.',
        'exp4-org':   'Bellavista Ingatlan, Dubai, UAE',
        'exp4-desc':  'Az ügyfelek, ügynökök, fejlesztők és nemzetközi ügynökségek közötti kapcsolattartó pontként működtem, koordinálva több fél között az ügyletek előrehaladásának biztosítása érdekében. Erős munkakapcsolatokat építettem ki egy gyors tempójú, emberközpontú környezetben.',

        'cv-sub':      'Felkeltette az érdeklődésedet? Az önéletrajzomat innen töltheted le vagy tekintheted meg.',
        'contact-sub': 'Kérdésed van, lehetőséget kínálsz, vagy csak szeretnél csevegni? Szívesen hallom.',
    }
};

function applyLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
    langBtn.childNodes[0].textContent = lang.toUpperCase() + ' ';
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
}

applyLanguage(currentLang);
