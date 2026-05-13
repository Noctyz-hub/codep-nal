/* ════════════════════════════════════════════════════════════
   CODE PÉNAL — script.js
   ────────────────────────────────────────────────────────────
   Pour ajouter / modifier / supprimer des articles :
   → Éditez directement le tableau ARTICLES ci-dessous.

   Structure d'un article :
   {
     num:    '100-1',                      // Numéro de l'article (obligatoire)
     cat:    'Infractions routières',      // Catégorie (obligatoire)
     titre:  'Conduite en état d\'ivresse',// Intitulé de l'infraction (obligatoire)
     desc:   'Précisions…',               // Description (optionnel)
     sanctions: [                          // Liste de sanctions (optionnel)
       { type: 'points',     valeur: '6',  unite: 'points'   },
       { type: 'prison',     valeur: '2',  unite: 'mois'     },
       { type: 'garde',      valeur: '24', unite: 'heures'   },
       { type: 'suspension', valeur: '3',  unite: 'mois'     },
       { type: 'permis',     valeur: '1',  unite: 'ans'      },
       { type: 'amende',     valeur: '500',unite: '€'        },
       { type: 'autre',      valeur: 'Texte libre', unite: '' },
     ]
   }

   Types de sanctions disponibles :
     points      → Retrait de points (unite: "points")
     prison      → Emprisonnement (unite: minutes / heures / jours / mois / ans)
     garde       → Garde à vue (unite: minutes / heures / jours)
     suspension  → Suspension de permis (unite: jours / semaines / mois / ans)
     permis      → Annulation de permis (unite: mois / ans)
     amende      → Amende (unite: "€")
     autre       → Sanction libre (valeur = texte descriptif)
════════════════════════════════════════════════════════════ */

const ARTICLES = [

  /* ──────────────────────────────────
     CATÉGORIE : Infractions routières
  ────────────────────────────────── */
  {
    num: '100-1',
    cat: 'Infractions routières',
    titre: 'Conduite sous l\'emprise de stupéfiants',
    desc: 'Toute personne surprise au volant sous influence avérée de produits stupéfiants.',
    sanctions: [
      { type: 'points', valeur: '3',  unite: 'points'  },
      { type: 'garde',  valeur: '5',  unite: 'minutes' },
      { type: 'b1', valeur: 'Inscription', unite: 'casier' },
    ],
  },
  {
    num: '100-2',
    cat: 'Infractions routières',
    titre: 'Grand excès de vitesse (+7 km/h)',
    desc: 'Dépassement de la vitesse maximale autorisée de plus de 7 km/h constaté par un agent ou radar.',
    sanctions: [
      { type: 'amende', valeur: '68', unite: '€' },
    ],
  },
  {
    num: '100-3',
    cat: 'Infractions routières',
    titre: 'Grand excès de vitesse (+20 km/h)',
    desc: 'Dépassement de la vitesse maximale autorisée de plus de 20 km/h constaté par un agent ou radar.',
    sanctions: [
      { type: 'amende', valeur: '135', unite: '€'     },
      { type: 'points', valeur: '2',   unite: 'points'},
    ],
  },
  {
    num: '100-4',
    cat: 'Infractions routières',
    titre: 'Grand excès de vitesse (+50 km/h)',
    desc: 'Dépassement de la vitesse maximale autorisée de plus de 50 km/h constaté par un agent ou radar.',
    sanctions: [
      { type: 'amende', valeur: '750', unite: '€'     },
      { type: 'points', valeur: '4',   unite: 'points'},
    ],
  },
  {
    num: '100-5',
    cat: 'Infractions routières',
    titre: 'Refus d\'obtempérer à une sommation',
    desc: 'Le fait de ne pas s\'arrêter lors d\'une injonction d\'un agent de police en exercice.',
    sanctions: [
      { type: 'points',     valeur: '4',  unite: 'points'  },
      { type: 'suspension', valeur: '15', unite: 'minutes' },
      { type: 'prison',     valeur: '10', unite: 'minutes' },
    ],
  },
  {
    num: '100-6',
    cat: 'Infractions routières',
    titre: 'Conduite en état d\'ivresse manifeste',
    desc: 'Conduite d\'un véhicule avec un taux d\'alcoolémie dépassant le seuil légal.',
    sanctions: [
      { type: 'points',     valeur: '2',   unite: 'points'  },
      { type: 'garde',      valeur: '5',   unite: 'minutes' },
      { type: 'amende',     valeur: '500', unite: '€'       },
      { type: 'suspension', valeur: '8',   unite: 'minutes' },
    ],
  },
  {
    num: '100-7',
    cat: 'Infractions routières',
    titre: 'Non-respect d\'un feu rouge',
    desc: 'Seulement si le conducteur grille un feu rouge.',
    sanctions: [
      { type: 'points', valeur: '2',   unite: 'points' },
      { type: 'amende', valeur: '135', unite: '€'      },
    ],
  },
  {
    num: '100-8',
    cat: 'Infractions routières',
    titre: 'Griller un stop',
    desc: 'Seulement si le conducteur grille un stop.',
    sanctions: [
      { type: 'points', valeur: '2',   unite: 'points' },
      { type: 'amende', valeur: '135', unite: '€'      },
    ],
  },
  {
    num: '100-9',
    cat: 'Infractions routières',
    titre: 'Stationnement gênant',
    desc: 'Seulement si la voiture gêne le passage.',
    sanctions: [
      { type: 'amende', valeur: '35', unite: '€' },
    ],
  },
  {
    num: '100-10',
    cat: 'Infractions routières',
    titre: 'Stationnement gênant dangereux',
    desc: 'Seulement si la voiture gêne le passage dangereusement.',
    sanctions: [
      { type: 'amende', valeur: '135', unite: '€' },
    ],
  },
  {
    num: '100-11',
    cat: 'Infractions routières',
    titre: 'Refus de priorité',
    desc: 'Le conducteur ne respecte pas la priorité et gêne ou met en danger les autres usagers.',
    sanctions: [
      { type: 'amende', valeur: '135', unite: '€'     },
      { type: 'points', valeur: '1',   unite: 'points'},
    ],
  },
  {
    num: '100-12',
    cat: 'Infractions routières',
    titre: 'Téléphone au volant',
    desc: 'Utilisation d\'un téléphone tenu en main pendant la conduite.',
    sanctions: [
      { type: 'amende', valeur: '135', unite: '€'     },
      { type: 'points', valeur: '2',   unite: 'points'},
    ],
  },
  {
    num: '100-13',
    cat: 'Infractions routières',
    titre: 'Franchissement de ligne continue',
    desc: 'Le conducteur franchit ou chevauche une ligne continue sans autorisation.',
    sanctions: [
      { type: 'amende', valeur: '135', unite: '€'     },
      { type: 'points', valeur: '1',   unite: 'points'},
    ],
  },
  {
    num: '100-14',
    cat: 'Infractions routières',
    titre: 'Plaque d\'immatriculation non conforme ou défaut de carte grise',
    desc: 'Plaque absente, illisible, non réglementaire ou défaut de carte grise.',
    sanctions: [
      { type: 'amende', valeur: '135', unite: '€' },
    ],
  },
  {
    num: '100-15',
    cat: 'Infractions routières',
    titre: 'Conduite avec permis suspendu',
    desc: 'Le conducteur utilise un véhicule malgré une suspension de permis.',
    sanctions: [
      { type: 'amende', valeur: '750', unite: '€'      },
      { type: 'garde',  valeur: '10',  unite: 'minutes'},
    ],
  },
  {
    num: '100-17',
    cat: 'Infractions routières',
    titre: 'Refus de contrôle',
    desc: 'Refus de présenter les documents du véhicule ou du conducteur.',
    sanctions: [
      { type: 'amende', valeur: '150', unite: '€'     },
      { type: 'points', valeur: '1',   unite: 'points'},
    ],
  },
  {
    num: '100-18',
    cat: 'Infractions routières',
    titre: 'Conduite agressive',
    desc: 'Comportement dangereux ou intimidant envers les autres usagers.',
    sanctions: [
      { type: 'amende', valeur: '300', unite: '€'     },
      { type: 'points', valeur: '2',   unite: 'points'},
    ],
  },

  /* ──────────────────────────────────
     CATÉGORIE : Atteintes aux personnes
  ────────────────────────────────── */
  {
    num: '200-1',
    cat: 'Atteintes aux personnes',
    titre: 'Coups et blessures volontaires',
    desc: 'Violences physiques intentionnelles ayant entraîné une incapacité de travail.',
    sanctions: [
      { type: 'prison', valeur: '6',  unite: 'mois'   },
      { type: 'garde',  valeur: '48', unite: 'heures' },
    ],
  },
  {
    num: '200-2',
    cat: 'Atteintes aux personnes',
    titre: 'Menaces et intimidations',
    desc: 'Propos ou comportements destinés à inspirer de la crainte à une ou plusieurs personnes.',
    sanctions: [
      { type: 'prison', valeur: '1',  unite: 'mois'   },
      { type: 'garde',  valeur: '24', unite: 'heures' },
    ],
  },
  {
    num: '200-3',
    cat: 'Atteintes aux personnes',
    titre: 'Séquestration illégale',
    desc: 'Le fait de retenir une personne contre sa volonté en dehors des procédures légales.',
    sanctions: [
      { type: 'prison', valeur: '12', unite: 'mois'   },
      { type: 'garde',  valeur: '72', unite: 'heures' },
    ],
  },

  /* ──────────────────────────────────
     CATÉGORIE : Crimes graves
  ────────────────────────────────── */
  {
    num: '300-1',
    cat: 'Crimes graves',
    titre: 'Homicide volontaire',
    desc: 'Le fait de donner intentionnellement la mort à autrui constitue un meurtre au premier degré.',
    sanctions: [
      { type: 'prison', valeur: '30', unite: 'ans' },
      { type: 'permis', valeur: '5',  unite: 'ans' },
    ],
  },
  {
    num: '300-2',
    cat: 'Crimes graves',
    titre: 'Tentative de meurtre',
    desc: 'Acte délibéré tendant à ôter la vie à autrui, sans résultat mortel.',
    sanctions: [
      { type: 'prison', valeur: '15', unite: 'ans'    },
      { type: 'garde',  valeur: '96', unite: 'heures' },
    ],
  },

  /* ──────────────────────────────────
     CATÉGORIE : Infractions contre les biens
  ────────────────────────────────── */
  {
    num: '400-1',
    cat: 'Infractions contre les biens',
    titre: 'Vol simple',
    desc: 'Soustraction frauduleuse de la chose d\'autrui sans violence ni effraction.',
    sanctions: [
      { type: 'prison', valeur: '3',  unite: 'mois'   },
      { type: 'garde',  valeur: '24', unite: 'heures' },
    ],
  },
  {
    num: '400-2',
    cat: 'Infractions contre les biens',
    titre: 'Vol avec violence ou arme',
    desc: 'Vol commis avec usage ou menace d\'une arme, ou par recours à la violence physique.',
    sanctions: [
      { type: 'prison', valeur: '12', unite: 'mois'   },
      { type: 'garde',  valeur: '72', unite: 'heures' },
    ],
  },
  {
    num: '400-3',
    cat: 'Infractions contre les biens',
    titre: 'Destruction de biens publics',
    desc: 'Dégradation volontaire de propriétés appartenant à l\'État ou aux institutions.',
    sanctions: [
      { type: 'prison', valeur: '2',    unite: 'mois' },
      { type: 'amende', valeur: '1000', unite: '€'    },
      { type: 'autre',  valeur: 'Réparation des dommages', unite: '' },
    ],
  },

  /* ──────────────────────────────────
     CATÉGORIE : Corruption & abus de pouvoir
  ────────────────────────────────── */
  {
    num: '500-1',
    cat: 'Corruption & abus de pouvoir',
    titre: 'Corruption active d\'agent public',
    desc: 'Offrir ou promettre un avantage indu à un agent de l\'État pour influencer ses actes.',
    sanctions: [
      { type: 'prison', valeur: '24', unite: 'mois' },
      { type: 'autre',  valeur: 'Révocation des droits civiques', unite: '' },
    ],
  },
  {
    num: '500-2',
    cat: 'Corruption & abus de pouvoir',
    titre: 'Abus d\'autorité en service',
    desc: 'Usage excessif ou illégitime de l\'autorité conférée par la fonction.',
    sanctions: [
      { type: 'prison',     valeur: '6', unite: 'mois' },
      { type: 'suspension', valeur: '3', unite: 'mois' },
    ],
  },

  /* ──────────────────────────────────
     CATÉGORIE : Stupéfiants
  ────────────────────────────────── */
  {
    num: '600-1',
    cat: 'Stupéfiants',
    titre: 'Trafic de stupéfiants',
    desc: 'Production, transport, vente ou distribution de substances illicites classées.',
    sanctions: [
      { type: 'prison', valeur: '36', unite: 'mois'   },
      { type: 'garde',  valeur: '96', unite: 'heures' },
      { type: 'autre',  valeur: 'Confiscation des biens', unite: '' },
    ],
  },
  {
    num: '600-2',
    cat: 'Stupéfiants',
    titre: 'Consommation de stupéfiants',
    desc: 'Usage personnel de substances psychoactives illicites constaté par agent.',
    sanctions: [
      { type: 'garde', valeur: '12', unite: 'heures' },
      { type: 'autre', valeur: 'Stage de sensibilisation obligatoire', unite: '' },
    ],
  },

  /* ──────────────────────────────────
     EXEMPLE : ajoutez vos propres articles ici
     en copiant le bloc ci-dessous et en le modifiant :

  {
    num: '700-1',
    cat: 'Ma nouvelle catégorie',
    titre: 'Titre de l\'infraction',
    desc: 'Description optionnelle.',
    sanctions: [
      { type: 'prison', valeur: '6', unite: 'mois' },
    ],
  },
  ────────────────────────────────── */

];

/* ════════════════════════════════════════════════════════════
   ⬇ NE PAS MODIFIER EN DESSOUS DE CETTE LIGNE ⬇
   (moteur de rendu et logique d'affichage)
════════════════════════════════════════════════════════════ */

const SANCTIONS_CFG = [
  { v: 'points',     label: 'Retrait de points',    cls: 'sc-points'     },
  { v: 'prison',     label: 'Prison',               cls: 'sc-prison'     },
  { v: 'garde',      label: 'Garde à vue',          cls: 'sc-garde'      },
  { v: 'suspension', label: 'Suspension de permis', cls: 'sc-suspension' },
  { v: 'permis',     label: 'Annulation permis',    cls: 'sc-permis'     },
  { v: 'amende',     label: 'Amende',               cls: 'sc-amende'     },

  /* ── CASIERS ── */
  { v: 'b1',         label: 'Casier B1',            cls: 'sc-b1'         },
  { v: 'b2',         label: 'Casier B2',            cls: 'sc-b2'         },
  { v: 'b3',         label: 'Casier B3',            cls: 'sc-b3'         },

  { v: 'autre',      label: '',                     cls: 'sc-autre'      },
];

let activeFilter = 'all';

const q   = id => document.getElementById(id);
const esc = s  => s == null ? '' : String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const has = (a, t) => (a.sanctions || []).some(s => s.type === t);

/* ── INIT ── */
function init() {
  updateStats();
  updateFilters();
  renderList();
  q('searchInput').addEventListener('input', renderList);
}

/* ── STATS ── */
function updateStats() {
  const n    = ARTICLES.length;
  const pris = ARTICLES.filter(a => has(a, 'prison')).length;
  const gard = ARTICLES.filter(a => has(a, 'garde')).length;
  const pts  = ARTICLES.filter(a => has(a, 'points')).length;
  const susp = ARTICLES.filter(a => has(a, 'suspension') || has(a, 'permis')).length;

  q('sTotal').textContent  = n;
  q('sPrison').textContent = pris;
  q('sGarde').textContent  = gard;
  q('sPoints').textContent = pts;
  q('sSusp').textContent   = susp;

  const pct = x => n ? Math.round(x / n * 100) + '%' : '0%';
  q('bPrison').style.width = pct(pris);
  q('bGarde').style.width  = pct(gard);
  q('bPoints').style.width = pct(pts);
  q('bSusp').style.width   = pct(susp);
}

/* ── FILTRES ── */
function updateFilters() {
  const cats = [...new Set(ARTICLES.map(a => a.cat).filter(Boolean))].sort();
  const ul   = q('catList');
  ul.innerHTML = '';
  ul.appendChild(mkCatBtn('Tous', 'all', ARTICLES.length, activeFilter === 'all'));
  cats.forEach(c => {
    const cnt = ARTICLES.filter(a => a.cat === c).length;
    ul.appendChild(mkCatBtn(c, c, cnt, activeFilter === c));
  });
}

function mkCatBtn(label, val, cnt, active) {
  const b = document.createElement('button');
  b.className = 'cat-btn' + (active ? ' active' : '');
  b.innerHTML = `<span>${esc(label)}</span><span class="cat-count">${cnt}</span>`;
  b.addEventListener('click', () => {
    activeFilter = val;
    updateFilters();
    renderList();
  });
  return b;
}

/* ── LISTE ── */
function renderList() {
  const q2      = q('searchInput').value.toLowerCase().trim();
  const list    = q('articlesList');
  const filtered = ARTICLES.filter(a => {
    if (activeFilter !== 'all' && a.cat !== activeFilter) return false;
    if (!q2) return true;
    return (a.num + a.titre + (a.cat || '') + (a.desc || '')).toLowerCase().includes(q2);
  });

  q('contentCount').textContent = `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`;

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📄</div>
      <div class="empty-title">${ARTICLES.length === 0 ? 'Aucun article' : 'Aucun résultat'}</div>
      <p class="empty-sub">${ARTICLES.length === 0 ? 'Ajoutez des articles dans script.js.' : 'Essayez un autre filtre ou une autre recherche.'}</p>
    </div>`;
    return;
  }

  list.innerHTML = filtered.map((a, i) => buildCard(a, i)).join('');
}

/* ── CARTE ── */
function buildCard(a, i) {
  const sancs = (a.sanctions || []).map(s => {
    const def = SANCTIONS_CFG.find(d => d.v === s.type);
    if (!def) return '';
    let text;
    if (s.type === 'autre') {
      text = esc(s.valeur || '—');
    } else {
      text = `${def.label} · <strong>${esc(s.valeur)} ${esc(s.unite)}</strong>`;
    }
    return `<span class="s-chip ${def.cls}"><span class="s-chip-dot"></span>${text}</span>`;
  }).join('');

  return `
  <div class="a-card" style="animation-delay:${Math.min(i * 0.04, 0.5)}s">
    <div class="a-card-inner">
      <div class="a-num-col">
        <div class="a-num-dot"></div>
        <div class="a-num-text">${esc(a.num)}</div>
      </div>
      <div class="a-body">
        <div class="a-header">
          <div class="a-meta">
            ${a.cat ? `<span class="a-cat-pill">${esc(a.cat)}</span>` : ''}
          </div>
        </div>
        <div class="a-title">${esc(a.titre)}</div>
        ${a.desc ? `<div class="a-desc">${esc(a.desc)}</div>` : ''}
        ${sancs ? `<div class="a-sanctions">${sancs}</div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ── KEYBOARD ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    q('searchInput').value = '';
    renderList();
  }
});

/* ── START ── */
init();
