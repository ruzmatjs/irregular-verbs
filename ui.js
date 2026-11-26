/* Navigatsiya — hamma sahifa uchun bitta joyda.
   Yangi boʻlim yoki koʻnikma qoʻshish uchun shu roʻyxatga bitta qator yozish kifoya:
   boʻlimda ikki yoki undan ortiq koʻnikma boʻlsa, sarlavha ostida koʻnikmalar qatori chiqadi.
   Sahifa oʻzini <header class="top" data-section="a2" data-skill="words"> orqali tanitadi. */
var ICON = {
  verbs: '<path d="M4 17c0-9 8-9 8 0m0 0c0-6 8-6 8 0"/>',
  book: '<path d="M5 4h14v16H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>',
  books: '<path d="M4 4h5v16H4zM9 7h5v13H9zM14 8.5l4-1 3 11.500-4 1z"/>',
  mine: '<path d="M6 3h12v18l-6-4.5L6 21zM9.5 8.5h5"/>',
  chart: '<path d="M4 20h16M7 20v-7M12 20V6M17 20v-10"/>',
  listening: '<path d="M4 18v-5a8 8 0 0 1 16 0v5M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z"/>',
  speaking: '<path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3"/>'
};
var SECTIONS = [
  { id: "verbs", label: "Irregular verbs", short: "Feʻllar", icon: "verbs", href: "index.html" },
  { id: "a1", label: "A1", icon: "book", href: "words.html", skills: [
    { id: "words", label: "Soʻzlar", icon: "book", href: "words.html" }
  ] },
  { id: "a2", label: "A2", icon: "books", href: "a2.html", skills: [
    { id: "words", label: "Soʻzlar", icon: "book", href: "a2.html" },
    { id: "listening", label: "Listening", icon: "listening", href: "a2-listening.html" },
    { id: "speaking", label: "Speaking", icon: "speaking", href: "a2-speaking.html" }
  ] },
  { id: "my", label: "Lugʻatim", icon: "mine", href: "my.html" },
  { id: "stats", label: "Statistika", icon: "chart", href: "stats.html" }
];
(function () {
  var top = document.querySelector("header.top");
  var sec = top.getAttribute("data-section"), skill = top.getAttribute("data-skill");
  function svg(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICON[n] + "</svg>"; }
  function cur(on) { return on ? ' aria-current="page"' : ""; }
  document.getElementById("secNav").innerHTML = SECTIONS.map(function (s) {
    return '<a href="' + s.href + '"' + cur(s.id === sec) + ">" + s.label + "</a>";
  }).join("");
  var here = SECTIONS.filter(function (s) { return s.id === sec; })[0];
  var box = document.getElementById("skillNav");
  if (box && here && here.skills && here.skills.length > 1) {
    box.innerHTML = here.skills.map(function (k) {
      return '<a href="' + k.href + '"' + cur(k.id === skill) + ">" + svg(k.icon) + k.label + "</a>";
    }).join("");
    box.hidden = false;
  }
  var bn = document.createElement("nav");
  bn.className = "botnav";
  bn.setAttribute("aria-label", "Boʻlimlar");
  bn.innerHTML = SECTIONS.map(function (s) {
    return '<a href="' + s.href + '"' + cur(s.id === sec) + ">" + svg(s.icon) + (s.short || s.label) + "</a>";
  }).join("");
  document.body.appendChild(bn);
})();

/* ---------- mashq sozlamalari (feʻllar, A1, A2) ---------- */
/* tanlangan qiymat: radio yoki select */
function radio(name) {
  var r = document.querySelector("select[name=" + name + "],input[name=" + name + "]:checked");
  return r ? r.value : null;
}
function setRadio(name, val) {
  var r = document.querySelector("input[name=" + name + "][value=\"" + val + "\"]");
  if (r) { r.checked = true; return; }
  var o = document.querySelector("select[name=" + name + "] option[value=\"" + val + "\"]");
  if (o) o.selected = true;
}
function optLabel(o) {
  if (!o.hasAttribute("data-t")) o.setAttribute("data-t", o.textContent);
  return o.getAttribute("data-t");
}
/* select variantlari yonida nechta soʻz borligi */
function countOptions(name, count) {
  Array.prototype.forEach.call(document.querySelectorAll("select[name=" + name + "] option"), function (o) {
    o.textContent = optLabel(o) + " (" + count(o.value) + ")";
  });
}
/* yoqilgan filtrlar: bosilsa, oʻchadi. defs — [[nomi, odatdagi qiymati], ...] */
function paintFilters(box, defs) {
  box.textContent = "";
  defs.forEach(function (d) {
    if (radio(d[0]) === d[1]) return;
    var sel = document.querySelector("select[name=" + d[0] + "]"), b = document.createElement("button");
    b.type = "button";
    b.className = "fchip";
    b.setAttribute("data-f", d[0]);
    b.setAttribute("data-off", d[1]);
    b.textContent = optLabel(sel.options[sel.selectedIndex]) + " ✕";
    b.setAttribute("aria-label", optLabel(sel.options[sel.selectedIndex]) + " — filtrni oʻchirish");
    box.appendChild(b);
  });
  box.hidden = !box.firstChild;
  if (box.firstChild) {
    var t = document.createElement("span");
    t.className = "hint";
    t.textContent = "Filtr yoqilgan:";
    box.insertBefore(t, box.firstChild);
  }
}
function dropFilter(e) {
  var b = e.target.closest("[data-f]");
  if (b) setRadio(b.getAttribute("data-f"), b.getAttribute("data-off"));
  return !!b;
}
