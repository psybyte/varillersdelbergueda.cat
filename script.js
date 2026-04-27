'use strict';

// ===== NAV: scroll shadow & burger =====
const nav     = document.getElementById('nav');
const burger  = document.getElementById('navBurger');
const menu    = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target)) {
    menu.classList.remove('open');
    burger.classList.remove('open');
  }
});

// ===== LIGHTBOX =====
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ===== LANGUAGE TOGGLE =====
const langBtn = document.getElementById('langToggle');
let lang = 'ca';

const t = {
  ca: {
    nav_inici:     'Inici',
    nav_serveis:   'Serveis',
    nav_com:       'Com treballem',
    nav_galeria:   'Galeria',
    nav_qui:       'Qui som',
    nav_contacte:  'Contacte',
    hero_badge:    'Tècnica PDR · Sense pintura · Sense massilla',
    hero_tagline:  'Reparació de vehicles sense pintar',
    hero_sub:      'Eliminem pedregades i bonys per impacte sense massilla ni pintura. Pressupost sense compromís.',
    hero_cta:      'Truca ara',
    hero_more:     'Coneix els serveis',
    serveis_title: 'Els nostres serveis',
    serveis_sub:   'Reparació professional sense alterar la pintura original del vehicle',
    serveis_p1:    'Reparació de pedregades',
    serveis_p1desc:'Recuperem la xapa afectada per granís sense necessitat de repintar. La pintura original queda intacta.',
    serveis_p2:    'Bonys per impacte',
    serveis_p2desc:'Cops en portes, aletes, capó o maleter. Resultats perfectes sense passar per xapa i pintura.',
    serveis_p3:    'Desplaçament a domicili',
    serveis_p3desc:'Treballem al Berguedà i a tot Catalunya. Ens desplacem on necessitis, sense cap cost addicional.',
    com_title:     'Com treballem',
    com_p1:        "Fem servir la tècnica PDR (Paintless Dent Repair), també coneguda com a DSP (Desabollat Sense Pintar). Utilitzem varilles professionals i llums d'inspecció especials per accedir a la xapa des de l'interior i restaurar-ne la forma original.",
    com_p2:        "El resultat és un acabat perfecte sense massilla, imprimació ni pintura. El vehicle conserva l'acabat de fàbrica i el seu valor de mercat.",
    com_li1:       'Sense massilla ni pintura',
    com_li2:       "L'acabat de fàbrica queda intacte",
    com_li3:       'Resultat en menys temps',
    com_li4:       'Preu molt inferior a xapa i pintura',
    galeria_title: 'Treballs realitzats',
    galeria_sub:   'Alguns exemples dels nostres treballs de reparació PDR',
    qui_title:     'Qui som',
    qui_p1:        "Som en Jordi i en Pep Mollar, dos professionals especialitzats en la tècnica PDR al Berguedà. Portem anys treballant en la reparació de carrosseries sense pintar i ens apassiona el nostre ofici.",
    qui_p2:        "Treballem amb vehicles de totes les marques i models, tant per a particulars com per a empreses i asseguradores. Ens desplacem a tot el territori.",
    contacte_title:"Contacta'ns",
    contacte_sub:  'Ens desplacem a tot el territori. Pressupost sense compromís.',
    cta_jordi:     'Truca a Jordi',
    cta_pep:       'Truca a Pep',
    cta_email:     'Envia un correu',
    zone_text:     'Zona principal: Berguedà \u00a0·\u00a0 Treballem a tot Catalunya \u00a0·\u00a0 Desplaçament a domicili',
    footer_zone:   'Varillersdelberguedà',
    cta_info_title:'Informació general',
    cta_info_desc: 'Per a consultes generals, pressupostos o qualsevol informació.',
    cta_info_btn:  'Envia un correu',
  },
  es: {
    nav_inici:     'Inicio',
    nav_serveis:   'Servicios',
    nav_com:       'Cómo trabajamos',
    nav_galeria:   'Galería',
    nav_qui:       'Quiénes somos',
    nav_contacte:  'Contacto',
    hero_badge:    'Técnica PDR · Sin pintura · Sin masilla',
    hero_tagline:  'Reparación de vehículos sin pintar',
    hero_sub:      'Eliminamos granizo y golpes por impacto sin masilla ni pintura. Presupuesto sin compromiso.',
    hero_cta:      'Llama ahora',
    hero_more:     'Ver servicios',
    serveis_title: 'Nuestros servicios',
    serveis_sub:   'Reparación profesional sin alterar la pintura original del vehículo',
    serveis_p1:    'Reparación de granizo',
    serveis_p1desc:'Recuperamos la chapa afectada por granizo sin necesidad de repintar. La pintura original queda intacta.',
    serveis_p2:    'Golpes por impacto',
    serveis_p2desc:'Golpes en puertas, aletas, capó o maletero. Resultados perfectos sin pasar por chapa y pintura.',
    serveis_p3:    'Desplazamiento a domicilio',
    serveis_p3desc:'Trabajamos en el Berguedà y toda Cataluña. Nos desplazamos donde nos necesites, sin coste adicional.',
    com_title:     'Cómo trabajamos',
    com_p1:        'Utilizamos la técnica PDR (Paintless Dent Repair), también conocida como DSP (Desabollado Sin Pintar). Usamos varillas profesionales y lámparas de inspección especiales para acceder a la chapa desde el interior y restaurar su forma original.',
    com_p2:        'El resultado es un acabado perfecto sin masilla, imprimación ni pintura. El vehículo conserva su acabado de fábrica y su valor de mercado.',
    com_li1:       'Sin masilla ni pintura',
    com_li2:       'El acabado de fábrica queda intacto',
    com_li3:       'Resultado en menos tiempo',
    com_li4:       'Precio muy inferior a chapa y pintura',
    galeria_title: 'Trabajos realizados',
    galeria_sub:   'Algunos ejemplos de nuestros trabajos de reparación PDR',
    qui_title:     'Quiénes somos',
    qui_p1:        'Somos Jordi y Pep Mollar, dos profesionales especializados en la técnica PDR en el Berguedà. Llevamos años trabajando en la reparación de carrocerías sin pintar y nos apasiona nuestro oficio.',
    qui_p2:        'Trabajamos con vehículos de todas las marcas y modelos, tanto para particulares como para empresas y aseguradoras. Nos desplazamos a todo el territorio.',
    contacte_title:'Contáctanos',
    contacte_sub:  'Nos desplazamos a todo el territorio. Presupuesto sin compromiso.',
    cta_jordi:     'Llama a Jordi',
    cta_pep:       'Llama a Pep',
    cta_email:     'Enviar correo',
    zone_text:     'Zona principal: Berguedà \u00a0·\u00a0 Trabajamos en toda Cataluña \u00a0·\u00a0 Desplazamiento a domicilio',
    footer_zone:   'Varillersdelberguedà',
    cta_info_title:'Información general',
    cta_info_desc: 'Para consultas generales, presupuestos o cualquier información.',
    cta_info_btn:  'Enviar correo',
  }
};

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[lang][key] !== undefined) el.textContent = t[lang][key];
  });
}

langBtn.addEventListener('click', () => {
  lang = lang === 'ca' ? 'es' : 'ca';
  langBtn.textContent = lang === 'ca' ? 'ES' : 'CA';
  applyLang();
});
