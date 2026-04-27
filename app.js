/* ═══════════════════════════════════════════
   CODE PÉNAL — app.js
   ═══════════════════════════════════════════ */

/* ════════════════════════════════════════
   CONFIG SANCTIONS
════════════════════════════════════════ */
const SANCTIONS_CONFIG = [
  { v: 'points',      emoji: '⬇',  label: 'Retrait de points',    cls: 'stag-points',     units: ['points'] },
  { v: 'prison',      emoji: '⛓',  label: 'Prison',               cls: 'stag-prison',     units: ['minutes', 'heures', 'jours', 'mois', 'ans'] },
  { v: 'garde',       emoji: '🔒', label: 'Garde à vue',           cls: 'stag-garde',      units: ['minutes', 'heures', 'jours'] },
  { v: 'suspension',  emoji: '🚫', label: 'Suspension de permis',  cls: 'stag-suspension', units: ['jours', 'semaines', 'mois', 'ans'] },
  { v: 'permis',      emoji: '🗑',  label: 'Annulation de permis', cls: 'stag-permis',     units: ['mois', 'ans'] },
  { v: 'autre',       emoji: '📌', label: 'Autre sanction',        cls: 'stag-autre',      units: [] },
];

/* ════════════════════════════════════════
   ÉTAT
════════════════════════════════════════ */
const STORE_KEY = 'codepenal_v5';
let articles = [];
let editId = null;
let delId = null;
let activeFilter = 'all';
let unlocked = false;
let pendingAction = null;

const PWD = '100686';

/* ════════════════════════════════════════
   UTILS
════════════════════════════════════════ */
const q = id => document.getElementById(id);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const esc = s => {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};
const has = (a, t) => (a.sanctions || []).some(s => s.type === t);

/* ════════════════════════════════════════
   PERSISTANCE
════════════════════════════════════════ */
function loadArticles() {
  try { articles = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); }
  catch { articles = []; }
  if (!articles.length) articles = getDefaults();
  saveArticles();
}

function saveArticles() {
  localStorage.setItem(STORE_KEY, JSON.stringify(articles));
  render();
}

/* ════════════════════════════════════════
   RENDU PRINCIPAL
════════════════════════════════════════ */
function render() {
  updateStats();
  updateFilters();
  renderList();
}

/* ─── Stats ─── */
function updateStats() {
  q('sTotal').textContent   = articles.length;
  q('sPoints').textContent  = articles.filter(a => has(a, 'points')).length;
  q('sPrison').textContent  = articles.filter(a => has(a, 'prison')).length;
  q('sGarde').textContent   = articles.filter(a => has(a, 'garde')).length;
  q('sSusp').textContent    = articles.filter(a => has(a, 'suspension') || has(a, 'permis')).length;
}

/* ─── Filtres ─── */
function updateFilters() {
  const cats = [...new Set(articles.map(a => a.cat).filter(Boolean))].sort();
  const container = q('catList');
  const allCount = articles.length;

  // Reconstruit les boutons de filtre
  container.innerHTML = '';
  container.appendChild(makeCatBtn('Tous', 'all', allCount, activeFilter === 'all'));

  cats.forEach(cat => {
    const count = articles.filter(a => a.cat === cat).length;
    container.appendChild(makeCatBtn(cat, cat, count, activeFilter === cat));
  });

  // Mise à jour du datalist
  q('catDatalist').innerHTML = cats.map(c => `<option value="${esc(c)}">`).join('');
}

function makeCatBtn(label, value, count, active) {
  const btn = document.createElement('button');
  btn.className = 'cat-btn' + (active ? ' active' : '');
  btn.dataset.cat = value;
  btn.innerHTML = `
    <span>${esc(label)}</span>
    <span class="cat-count">${count}</span>
  `;
  btn.addEventListener('click', () => setFilter(value));
  return btn;
}

function setFilter(cat) {
  activeFilter = cat;
  updateFilters();
  renderList();
}

/* ─── Liste ─── */
function renderList() {
  const searchTerm = q('searchInput').value.toLowerCase().trim();
  const list = q('articlesList');
  const counter = q('contentCount');

  const filtered = articles.filter(a => {
    if (activeFilter !== 'all' && a.cat !== activeFilter) return false;
    if (!searchTerm) return true;
    return (a.num + a.titre + (a.cat || '') + (a.desc || '')).toLowerCase().includes(searchTerm);
  });

  counter.textContent = `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`;

  if (!filtered.length) {
    const isGlobal = articles.length === 0;
    list.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">⚖️</span>
        <div class="empty-title">${isGlobal ? 'Aucun article pour le moment' : 'Aucun résultat'}</div>
        <p class="empty-sub">${isGlobal ? 'Cliquez sur « Nouvel Article » pour commencer.' : 'Essayez une autre recherche ou un autre filtre.'}</p>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered.map((a, i) => buildCard(a, i)).join('');
}

function buildCard(a, i) {
  const sanctionsHTML = (a.sanctions || []).map(renderSTag).join('');
  return `
    <div class="article-card" style="animation-delay:${Math.min(i * 0.045, 0.6)}s">
      <div class="card-header">
        <div class="card-meta">
          <span class="card-num">§ Art. ${esc(a.num)}</span>
          ${a.cat ? `<span class="card-cat">${esc(a.cat)}</span>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn-card btn-card-edit" onclick="requirePwd({type:'edit',id:'${a.id}'})">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M8 2l2 2-6 6H2v-2l6-6z"/>
            </svg>
            Modifier
          </button>
          <button class="btn-card btn-card-del" onclick="requirePwd({type:'delete',id:'${a.id}'})">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M2 3h8M5 3V2h2v1M4 3v7h4V3"/>
            </svg>
            Supprimer
          </button>
        </div>
      </div>
      <div class="card-title">${esc(a.titre)}</div>
      ${a.desc ? `<div class="card-desc">${esc(a.desc)}</div>` : ''}
      ${sanctionsHTML ? `<div class="sanctions-row">${sanctionsHTML}</div>` : ''}
    </div>
  `;
}

function renderSTag(s) {
  const def = SANCTIONS_CONFIG.find(d => d.v === s.type);
  if (!def) return '';
  let text;
  if (s.type === 'autre') {
    text = esc(s.valeur || '—');
  } else {
    const val = parseInt(s.valeur) || 0;
    const unite = s.unite || (def.units[0] || '');
    text = `${esc(def.label)} : <strong>${val} ${esc(unite)}</strong>`;
  }
  return `<span class="stag ${def.cls}">
    <span class="stag-emoji">${def.emoji}</span>
    ${text}
  </span>`;
}

/* ════════════════════════════════════════
   MOT DE PASSE
════════════════════════════════════════ */
function requirePwd(action) {
  if (unlocked) { executeAction(action); return; }
  pendingAction = action;
  q('pwdInput').value = '';
  q('pwdErr').textContent = '';
  q('pwdInput').type = 'password';
  q('pwdToggle').textContent = '👁';
  showOverlay('pwdOverlay');
  setTimeout(() => q('pwdInput').focus(), 80);
}

function checkPwd() {
  if (q('pwdInput').value === PWD) {
    unlocked = true;
    hideOverlay('pwdOverlay');
    updateLockBadge();
    if (pendingAction) {
      const a = pendingAction;
      pendingAction = null;
      executeAction(a);
    }
  } else {
    const inp = q('pwdInput');
    inp.classList.add('error');
    q('pwdErr').textContent = 'Mot de passe incorrect — accès refusé.';
    inp.value = '';
    setTimeout(() => inp.classList.remove('error'), 500);
  }
}

function executeAction(action) {
  if (action.type === 'add')    openModal();
  if (action.type === 'edit')   openModal(action.id);
  if (action.type === 'delete') askDelete(action.id);
}

function closePwd() {
  hideOverlay('pwdOverlay');
  pendingAction = null;
}

function togglePwdVis() {
  const inp = q('pwdInput'), tog = q('pwdToggle');
  if (inp.type === 'password') { inp.type = 'text'; tog.textContent = '🙈'; }
  else { inp.type = 'password'; tog.textContent = '👁'; }
}

function updateLockBadge() {
  const badge = q('lockBadge'), label = q('lockLabel');
  if (unlocked) {
    badge.classList.add('unlocked');
    label.textContent = 'Mode administrateur actif';
  } else {
    badge.classList.remove('unlocked');
    label.textContent = 'Accès protégé';
  }
}

/* ════════════════════════════════════════
   MODAL AJOUT / ÉDITION
════════════════════════════════════════ */
function openModal(id = null) {
  editId = id;
  q('sBuilder').innerHTML = '';

  if (id) {
    const a = articles.find(x => x.id === id);
    q('modalEyebrow').textContent = 'Modification';
    q('modalTitle').textContent = "Modifier l'article";
    q('fNum').value   = a.num;
    q('fCat').value   = a.cat || '';
    q('fTitre').value = a.titre;
    q('fDesc').value  = a.desc || '';
    (a.sanctions || []).forEach(s => addSRow(s));
  } else {
    q('modalEyebrow').textContent = 'Création';
    q('modalTitle').textContent = 'Nouvel Article';
    ['fNum', 'fCat', 'fTitre', 'fDesc'].forEach(id => q(id).value = '');
  }
  showOverlay('editOverlay');
}

function closeModal() {
  hideOverlay('editOverlay');
  editId = null;
}

/* ─── Ligne de sanction ─── */
function addSRow(s = null) {
  const builder = q('sBuilder');
  const row = document.createElement('div');
  const typeVal = s ? s.type : 'points';
  row.className = 's-row' + (typeVal === 'autre' ? ' mode-autre' : '');

  // Sélecteur de type
  const sel = document.createElement('select');
  sel.className = 's-select';
  SANCTIONS_CONFIG.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.v;
    opt.textContent = `${d.emoji} ${d.label}`;
    if (d.v === typeVal) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => rebuildSRow(row, sel.value));
  row.appendChild(sel);

  appendValFields(row, typeVal, s ? s.valeur : '', s ? s.unite : '');

  const rmBtn = document.createElement('button');
  rmBtn.type = 'button';
  rmBtn.className = 's-remove';
  rmBtn.title = 'Supprimer';
  rmBtn.innerHTML = '✕';
  rmBtn.addEventListener('click', () => row.remove());
  row.appendChild(rmBtn);

  builder.appendChild(row);
}

function appendValFields(row, type, valeur = '', unite = '') {
  const def = SANCTIONS_CONFIG.find(d => d.v === type);
  const rmBtn = row.querySelector('.s-remove');
  const isAutre = type === 'autre';

  if (isAutre) {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 's-val';
    inp.placeholder = 'Détail de la sanction…';
    inp.value = valeur || '';
    if (rmBtn) row.insertBefore(inp, rmBtn);
    else row.appendChild(inp);
  } else {
    const inp = document.createElement('input');
    inp.type = 'number';
    inp.className = 's-val';
    inp.min = '1';
    inp.placeholder = '—';
    inp.value = valeur || '';
    if (rmBtn) row.insertBefore(inp, rmBtn);
    else row.appendChild(inp);

    const selU = document.createElement('select');
    selU.className = 's-unite';
    (def ? def.units : []).forEach(u => {
      const opt = document.createElement('option');
      opt.value = u;
      opt.textContent = u;
      if (u === unite) opt.selected = true;
      selU.appendChild(opt);
    });
    if (rmBtn) row.insertBefore(selU, rmBtn);
    else row.appendChild(selU);
  }
}

function rebuildSRow(row, newType) {
  row.querySelectorAll('.s-val, .s-unite').forEach(el => el.remove());
  row.className = 's-row' + (newType === 'autre' ? ' mode-autre' : '');
  appendValFields(row, newType, '', '');
}

/* ─── Sauvegarder ─── */
function saveArticle() {
  const num   = q('fNum').value.trim();
  const titre = q('fTitre').value.trim();

  if (!num) { flashField('fNum', 'Numéro requis !'); return; }
  if (!titre) { flashField('fTitre', 'Intitulé requis !'); return; }

  const sanctions = [];
  q('sBuilder').querySelectorAll('.s-row').forEach(row => {
    const type   = row.querySelector('.s-select').value;
    const valEl  = row.querySelector('.s-val');
    const uniteEl= row.querySelector('.s-unite');
    const valeur = valEl ? valEl.value.trim() : '';
    const unite  = uniteEl ? uniteEl.value : '';
    if (valeur) sanctions.push({ type, valeur, unite });
  });

  const data = {
    num,
    cat: q('fCat').value.trim(),
    titre,
    desc: q('fDesc').value.trim(),
    sanctions,
  };

  if (editId) {
    const idx = articles.findIndex(a => a.id === editId);
    articles[idx] = { ...articles[idx], ...data };
  } else {
    articles.push({ id: uid(), ...data });
  }

  saveArticles();
  closeModal();
}

function flashField(id, placeholder) {
  const el = q(id);
  el.classList.add('field-flash');
  const prev = el.placeholder;
  el.placeholder = placeholder;
  el.focus();
  setTimeout(() => {
    el.classList.remove('field-flash');
    el.placeholder = prev;
  }, 1800);
}

/* ════════════════════════════════════════
   SUPPRESSION
════════════════════════════════════════ */
function askDelete(id) {
  delId = id;
  showOverlay('confirmOverlay');
}

function cancelDelete() {
  delId = null;
  hideOverlay('confirmOverlay');
}

function confirmDelete() {
  articles = articles.filter(a => a.id !== delId);
  delId = null;
  hideOverlay('confirmOverlay');
  saveArticles();
}

/* ════════════════════════════════════════
   IMPORT / EXPORT
════════════════════════════════════════ */
function exportData() {
  const blob = new Blob([JSON.stringify(articles, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'code_penal.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Format invalide');
      if (confirm(`Importer ${data.length} article(s) ? Les données actuelles seront remplacées.`)) {
        articles = data;
        saveArticles();
      }
    } catch { alert('Fichier JSON invalide ou corrompu.'); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

/* ════════════════════════════════════════
   HELPERS OVERLAY
════════════════════════════════════════ */
function showOverlay(id) { q(id).style.display = 'flex'; }
function hideOverlay(id) { q(id).style.display = 'none'; }

/* ════════════════════════════════════════
   DONNÉES PAR DÉFAUT
════════════════════════════════════════ */
function getDefaults() {
  return [
    {
      id: uid(), num: '121-1', cat: 'Infractions routières',
      titre: 'Conduite sous l\'emprise de stupéfiants',
      desc: 'Toute personne surprise au volant sous influence avérée de produits stupéfiants.',
      sanctions: [
        { type: 'points', valeur: '6', unite: 'points' },
        { type: 'garde', valeur: '24', unite: 'heures' },
        { type: 'suspension', valeur: '3', unite: 'mois' },
      ],
    },
    {
      id: uid(), num: '121-2', cat: 'Infractions routières',
      titre: 'Grand excès de vitesse (+50 km/h)',
      desc: 'Dépassement de la vitesse autorisée de plus de 50 km/h constaté par radar ou agent.',
      sanctions: [
        { type: 'points', valeur: '6', unite: 'points' },
        { type: 'suspension', valeur: '6', unite: 'mois' },
      ],
    },
    {
      id: uid(), num: '131-4', cat: 'Atteintes aux personnes',
      titre: 'Coups et blessures volontaires',
      desc: 'Violences volontaires ayant entraîné une incapacité totale de travail supérieure à 8 jours.',
      sanctions: [
        { type: 'prison', valeur: '6', unite: 'mois' },
        { type: 'garde', valeur: '48', unite: 'heures' },
      ],
    },
    {
      id: uid(), num: '222-1', cat: 'Crimes graves',
      titre: 'Homicide volontaire',
      desc: 'Le fait de donner intentionnellement la mort à autrui constitue un meurtre.',
      sanctions: [
        { type: 'prison', valeur: '30', unite: 'ans' },
        { type: 'permis', valeur: '5', unite: 'ans' },
      ],
    },
    {
      id: uid(), num: '311-1', cat: 'Infractions contre les biens',
      titre: 'Vol simple',
      desc: 'Soustraction frauduleuse d\'une chose appartenant à autrui.',
      sanctions: [
        { type: 'prison', valeur: '3', unite: 'mois' },
        { type: 'garde', valeur: '24', unite: 'heures' },
      ],
    },
    {
      id: uid(), num: '311-3', cat: 'Infractions contre les biens',
      titre: 'Vol avec violence',
      desc: 'Soustraction frauduleuse commise avec usage ou menace d\'une arme ou de violence.',
      sanctions: [
        { type: 'prison', valeur: '12', unite: 'mois' },
        { type: 'garde', valeur: '72', unite: 'heures' },
      ],
    },
  ];
}

/* ════════════════════════════════════════
   INITIALISATION
════════════════════════════════════════ */
function init() {
  loadArticles();

  // Recherche
  q('searchInput').addEventListener('input', renderList);

  // Clavier
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      cancelDelete();
      closePwd();
    }
    if (e.key === 'Enter' && q('pwdOverlay').style.display === 'flex') {
      checkPwd();
    }
  });

  // Fermeture overlay en cliquant l'arrière-plan
  q('editOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  q('pwdOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closePwd();
  });
}

document.addEventListener('DOMContentLoaded', init);
