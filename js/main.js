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

/* ---- CONSTANT OF THE MOMENT -------------------------------------------
   Entirely decorative. A physics constant sits in the footer and swaps for
   another one when clicked. Nothing navigates through it and nothing else
   reads it — it is here because a physics portfolio may as well have one. */

const CONSTANTS = [
    { sym: 'c',   val: '299 792 458 m s⁻¹',            en: 'Speed of light in vacuum' },
    { sym: 'h',   val: '6.626 070 15 × 10⁻³⁴ J s',     en: 'Planck constant' },
    { sym: 'ħ',   val: '1.054 571 817 × 10⁻³⁴ J s',    en: 'Reduced Planck constant' },
    { sym: 'e',   val: '1.602 176 634 × 10⁻¹⁹ C',      en: 'Elementary charge' },
    { sym: 'k_B', val: '1.380 649 × 10⁻²³ J K⁻¹',      en: 'Boltzmann constant' },
    { sym: 'N_A', val: '6.022 140 76 × 10²³ mol⁻¹',    en: 'Avogadro constant' },
    { sym: 'G',   val: '6.674 30 × 10⁻¹¹ m³ kg⁻¹ s⁻²', en: 'Gravitational constant' },
    { sym: 'α',   val: '1 / 137.035 999 177',          en: 'Fine-structure constant' },
    { sym: 'σ',   val: '5.670 374 419 × 10⁻⁸ W m⁻² K⁻⁴', en: 'Stefan–Boltzmann constant' }
];

const constantBtn  = document.getElementById('constant');
const constantVal  = document.getElementById('constantValue');
const constantName = document.getElementById('constantName');

if (constantBtn) {
    let constantIdx = Math.floor(Math.random() * CONSTANTS.length);

    const renderConstant = () => {
        const k = CONSTANTS[constantIdx];
        /* subscripts are written k_B / N_A in the data and marked up here */
        constantVal.innerHTML = '<b>' + k.sym.replace(/_(.)/, '<sub>$1</sub>') + '</b> = ' + k.val;
        constantName.textContent = k.en;
    };

    constantBtn.addEventListener('click', () => {
        constantIdx = (constantIdx + 1) % CONSTANTS.length;
        renderConstant();
    });

    renderConstant();
}
