/* Listening va Speaking sahifalari uchun umumiy qism.
   Sahifa quyidagilarni eʼlon qiladi: LESSONS (darslar), KEY (saqlash kaliti), openLesson(dars).
   Dars: { id, u: unit raqami, title, desc, sample: true (ixtiyoriy — «Namuna» belgisi), ... }
   Saqlanadi: store.p[dars.id] = { best, n, ok, bad } — eng yaxshi natija, savollar soni, jami javoblar */
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
var UNIT_TITLE = {};
UNITS.forEach(function (u) { UNIT_TITLE[u[0]] = u; });

/* ---------- saqlash ---------- */
var store = { p: {} };
try { var o0 = JSON.parse(localStorage.getItem(KEY) || "null"); if (o0 && o0.p) store = o0; } catch (e) {}
if (!store.cfg) store.cfg = {};
function peek(L) { return store.p[L.id] || { best: 0, n: 0, ok: 0, bad: 0 }; }
/* Tayyor hisob va kunlik tarix — stats.html shulardan oʻqiydi */
function save() {
  var done = 0, ok = 0, bad = 0;
  LESSONS.forEach(function (L) { var r = peek(L); if (r.n) done++; ok += r.ok; bad += r.bad; });
  store.sum = { n: LESSONS.length, done: done, ok: ok, bad: bad };
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
}
function logAnswers(ok, bad) {
  var d = new Date(), k = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  if (!store.d) store.d = {};
  var e = store.d[k] || (store.d[k] = [0, 0, 0]);
  e[0] += ok; e[1] += bad;
}
/* dars tugadi: n savoldan ok tasi toʻgʻri */
function saveResult(L, ok, n) {
  var r = store.p[L.id] || (store.p[L.id] = { best: 0, n: 0, ok: 0, bad: 0 });
  r.best = Math.max(r.best, ok); r.n = n; r.ok += ok; r.bad += n - ok;
  logAnswers(ok, n - ok);
  save(); updateBrand();
}
function updateBrand() {
  var done = LESSONS.filter(function (L) { return peek(L).n; }).length;
  $("brandStat").textContent = done + " / " + LESSONS.length + " dars";
}

/* ---------- ovoz: soʻzlar sahifasida tanlangan ovoz ishlatiladi ---------- */
var TTS = typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
var WCFG = {};
try { WCFG = (JSON.parse(localStorage.getItem("a2words.v1") || "{}") || {}).cfg || {}; } catch (e) {}
var enVoices = [];
function loadVoices() {
  try {
    enVoices = (speechSynthesis.getVoices() || []).filter(function (v) { return /^en([-_]|$)/i.test(v.lang || ""); });
    enVoices.sort(function (a, b) { return vs(b) - vs(a); });
  } catch (e) {}
  function vs(v) {
    return (WCFG.voice && (v.voiceURI === WCFG.voice || v.name === WCFG.voice) ? 500 : 0) +
      (/natural|neural|premium|enhanced|google/i.test(v.name) ? 80 : 0) + (/^en[-_]US/i.test(v.lang) ? 10 : /^en[-_]GB/i.test(v.lang) ? 6 : 0);
  }
}
if (TTS) { loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {} }
var sayTok = 0;
function stopSay() { sayTok++; if (TTS) try { speechSynthesis.cancel(); } catch (e) {} }
/* who — soʻzlovchi raqami: dialogda har bir kishiga boshqa ovoz */
function say(text, rate, who, done) {
  if (!TTS) return;
  stopSay();
  var tok = sayTok, u = new SpeechSynthesisUtterance(text);
  var v = enVoices.length ? enVoices[(who || 0) % Math.min(enVoices.length, 3)] : null;
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
  u.rate = rate || 0.9;
  u.onend = function () { if (tok === sayTok && done) done(); };
  speechSynthesis.speak(u);
}
window.addEventListener("pagehide", stopSay);

/* ---------- darslar roʻyxati ---------- */
function show(name) {
  ["list", "lesson"].forEach(function (v) { $("v-" + v).hidden = v !== name; });
  window.scrollTo(0, 0);
}
function unitName(n) { return UNIT_TITLE[n] ? UNIT_TITLE[n][2] : ""; }
function renderLessons() {
  var box = $("lessonList");
  box.innerHTML = LESSONS.length ? '<div class="lessons">' + LESSONS.map(function (L, i) {
    if (window.lessonVisible && !lessonVisible(L)) return "";
    var r = peek(L);
    return '<button class="lesson" type="button" data-i="' + i + '"><span class="un">Unit ' + L.u + (L.sample ? ' <span class="chip">Namuna</span>' : "") +
      "</span><b>" + esc(L.title) + '</b><span class="d">' + esc(L.desc || unitName(L.u)) + '</span><span class="foot">' +
      (r.n ? '<span class="trk"><i style="width:' + (r.best / r.n * 100) + '%"></i></span><span>' + r.best + " / " + r.n + "</span>"
        : "<span>" + lessonSize(L) + "</span>") + "</span></button>";
  }).join("") + "</div>" : '<p class="empty">Hali dars qoʻshilmagan.</p>';
  var rest = UNITS.filter(function (u) { return !LESSONS.some(function (L) { return L.u === u[0] && !L.sample; }); });
  $("soonBox").hidden = !rest.length;
  $("soonList").innerHTML = rest.map(function (u) {
    return "<li><b>Unit " + u[0] + "</b><span>" + esc(u[2]) + '</span><a href="a2.html#unit-' + u[0] + '">Soʻzlari →</a></li>';
  }).join("");
}
function backToList() { stopSay(); renderLessons(); show("list"); }
function startLessons() {
  $("lessonList").addEventListener("click", function (e) {
    var b = e.target.closest(".lesson");
    if (b) { openLesson(LESSONS[+b.getAttribute("data-i")]); show("lesson"); }
  });
  $("backBtn").addEventListener("click", backToList);
  renderLessons(); updateBrand(); save();
}
function paintHead(L) {
  $("lTitle").textContent = L.title;
  $("lDesc").textContent = "Unit " + L.u + " · " + unitName(L.u);
}
