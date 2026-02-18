const PASSWORD = "100686";
const STORE = "codepenal_simple";

let articles = [];
let editId = null;

/* ===== Password ===== */
function checkPassword() {
  const p = prompt("Mot de passe :");
  if (p !== PASSWORD) {
    alert("Mot de passe incorrect");
    return false;
  }
  return true;
}

/* ===== Load / Save ===== */
function load() {
  articles = JSON.parse(localStorage.getItem(STORE) || "[]");
  render();
}
function save() {
  localStorage.setItem(STORE, JSON.stringify(articles));
  render();
}

/* ===== Render ===== */
function render() {
  const list = document.getElementById("articlesList");
  const q = document.getElementById("searchInput").value.toLowerCase();

  list.innerHTML = articles
    .filter(a => (a.num + a.titre + a.desc).toLowerCase().includes(q))
    .map(a => `
      <div class="article">
        <strong>${a.num}</strong> — ${a.titre}
        <p>${a.desc}</p>

        <button onclick="secureEdit('${a.id}')">Modifier</button>
        <button onclick="secureDelete('${a.id}')">Supprimer</button>
      </div>
    `)
    .join("");
}

/* ===== Modal ===== */
function openModal(id = null) {
  editId = id;
  document.getElementById("modal").classList.remove("hidden");

  if (id) {
    const a = articles.find(x => x.id === id);
    fNum.value = a.num;
    fTitre.value = a.titre;
    fDesc.value = a.desc;
  } else {
    fNum.value = "";
    fTitre.value = "";
    fDesc.value = "";
  }
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* ===== Secure actions ===== */
function secureAdd() {
  if (checkPassword()) openModal();
}

function secureEdit(id) {
  if (checkPassword()) openModal(id);
}

function secureDelete(id) {
  if (!checkPassword()) return;

  if (confirm("Supprimer cet article ?")) {
    articles = articles.filter(a => a.id !== id);
    save();
  }
}

/* ===== Save article ===== */
function saveArticle() {
  const data = {
    id: editId || Date.now().toString(),
    num: fNum.value,
    titre: fTitre.value,
    desc: fDesc.value
  };

  if (editId) {
    const i = articles.findIndex(a => a.id === editId);
    articles[i] = data;
  } else {
    articles.push(data);
  }

  closeModal();
  save();
}

/* ===== Events ===== */
searchInput.addEventListener("input", render);

load();
