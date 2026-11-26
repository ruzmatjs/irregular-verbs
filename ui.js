/* Navigatsiya — hamma sahifa uchun bitta joyda.
   Kurslar — SECTIONS: boʻlimda ikki yoki undan ortiq koʻnikma boʻlsa, sarlavha ostida koʻnikmalar qatori chiqadi.
   Yangi kurs qoʻshilsa, bosh sahifadagi (index.html) COURSES roʻyxatiga ham bitta qator yoziladi.
   Sahifa oʻzini <header class="top" data-section="a2" data-skill="words"> orqali tanitadi
   (bosh sahifa — "home", lugʻat — "my", statistika — "stats"). */
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
  { id: "verbs", label: "Irregular verbs", short: "Feʻllar", icon: "verbs", href: "verbs.html" },
  { id: "a1", label: "A1", icon: "book", href: "words.html", skills: [
    { id: "words", label: "Soʻzlar", icon: "book", href: "words.html" }
  ] },
  { id: "a2", label: "A2", icon: "books", href: "a2.html", skills: [
    { id: "words", label: "Soʻzlar", icon: "book", href: "a2.html" },
    { id: "listening", label: "Listening", icon: "listening", href: "a2-listening.html" },
    { id: "speaking", label: "Speaking", icon: "speaking", href: "a2-speaking.html" }
  ] }
];
/* Asosiy menyu — hamma sahifada bir xil 5 ta joy (kompyuterda tepada, telefonda pastda).
   Kurslar (feʻllar, A1, A2) bosh sahifadan ochiladi; logo bosilsa — bosh sahifaga qaytadi */
var NAV = [
  { id: "home", label: "Bosh sahifa", short: "Bosh", icon: "home", href: "index.html" },
  { id: "dict", label: "Lugʻat", icon: "search", href: "my.html#qidiruv" },
  { id: "review", label: "Takrorlash", icon: "review", href: "my.html#bugun" },
  { id: "games", label: "Oʻyinlar", icon: "game", href: "games.html" },
  { id: "stats", label: "Statistika", icon: "chart", href: "stats.html" }
];
ICON.game = '<path d="M7 8h10a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1-6.3 2.1L14 15h-4l-.7.6A3.5 3.5 0 0 1 3 13.5V12a4 4 0 0 1 4-4zM8 10.5v3M6.5 12h3"/><circle cx="15.5" cy="11" r=".6"/><circle cx="17.2" cy="13" r=".6"/>';
ICON.home = '<path d="M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5"/>';
ICON.search = '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>';
ICON.review = '<path d="M19.5 12a7.5 7.5 0 0 1-13.4 4.6M4.5 12a7.5 7.5 0 0 1 13.4-4.6M18.4 3.5v4.3h-4.3M5.6 20.5v-4.3h4.3"/>';
function svgIcon(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICON[n] + "</svg>"; }
(function () {
  var top = document.querySelector("header.top");
  var sec = top.getAttribute("data-section"), skill = top.getAttribute("data-skill");
  function cur(on) { return on ? ' aria-current="page"' : ""; }
  var navId = sec === "home" || sec === "stats" || sec === "games" ? sec : sec === "my" ? (location.hash === "#bugun" ? "review" : "dict") : "home";
  function navHtml(bottom) {
    return NAV.map(function (n) {
      return '<a href="' + n.href + '" data-nav="' + n.id + '"' + cur(n.id === navId) + ">" + svgIcon(n.icon) + "<span>" + (bottom && n.short || n.label) + "</span></a>";
    }).join("");
  }
  var bn = document.createElement("nav");
  bn.className = "botnav";
  bn.setAttribute("aria-label", "Asosiy menyu");
  bn.innerHTML = navHtml(true);
  document.body.appendChild(bn);
  var sn = document.getElementById("secNav");
  if (sn) { sn.innerHTML = navHtml(); sn.setAttribute("aria-label", "Asosiy menyu"); }
  /* bitta sahifa ichida tab almashsa (my.html), menyudagi belgini oʻzgartirish uchun */
  window.setNav = function (id) {
    navId = id;
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (a) {
      if (a.getAttribute("data-nav") === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  };

  /* logo va sarlavha — bosh sahifaga havola */
  var brand = top.querySelector(".brand"), mk = brand && brand.querySelector(".mark"), h1 = brand && brand.querySelector("h1");
  if (mk && h1 && sec !== "home") {
    var a = document.createElement("a");
    a.className = "brandlink";
    a.href = "index.html";
    a.title = "Bosh sahifaga";
    brand.insertBefore(a, mk);
    a.innerHTML = '<span class="back" aria-hidden="true">‹</span>';
    a.appendChild(mk);
    a.appendChild(h1);
  }

  var here = SECTIONS.filter(function (s) { return s.id === sec; })[0];
  var box = document.getElementById("skillNav");
  if (box && here && here.skills && here.skills.length > 1) {
    box.innerHTML = here.skills.map(function (k) {
      return '<a href="' + k.href + '"' + cur(k.id === skill) + ">" + svgIcon(k.icon) + k.label + "</a>";
    }).join("");
    box.hidden = false;
  }
  /* oxirgi ochilgan kurs — bosh sahifadagi «Davom ettirish» uchun */
  if (here) {
    var sk = here.skills && here.skills.filter(function (k) { return k.id === skill; })[0];
    var title = here.id === "verbs" ? "Irregular verbs" : here.label + " · " + (sk ? sk.label : "Soʻzlar");
    try { localStorage.setItem("app.last", JSON.stringify({ sec: sec, skill: skill || "", href: (sk || here).href, title: title, t: Date.now() })); } catch (e) {}
  }

  /* tez kirish: sahifa.html#mashq — oxirgi sozlamalar bilan mashq darhol boshlanadi, #xatolar — xatolar tabi */
  window.addEventListener("load", function () {
    var h = location.hash, b = null;
    if (h === "#mashq") b = document.getElementById("startBtn");
    if (h === "#xatolar") b = document.querySelector('nav.tabs [data-view="mistakes"]');
    if (!b) return;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    b.click();
  });

  /* mashq yaxshi natija bilan tugasa (80% va undan yuqori) — konfetti */
  document.addEventListener("DOMContentLoaded", function () {
    var r = document.getElementById("v-result");
    if (!r || !window.MutationObserver) return;
    var was = r.hidden;
    new MutationObserver(function () {
      if (was && !r.hidden) {
        var m = ((document.getElementById("rscore") || {}).textContent || "").match(/(\d+)\s*\/\s*(\d+)/);
        if (m && +m[2] >= 5 && +m[1] / +m[2] >= 0.8) confetti();
      }
      was = r.hidden;
    }).observe(r, { attributes: true, attributeFilter: ["hidden", "style"] });
  });
})();

function confetti() {
  try { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; } catch (e) {}
  var c = document.createElement("canvas"), x = c.getContext && c.getContext("2d");
  if (!x) return;
  c.className = "confetti";
  c.setAttribute("aria-hidden", "true");
  document.body.appendChild(c);
  var W = c.width = innerWidth, H = c.height = innerHeight;
  var cs = getComputedStyle(document.documentElement);
  var cols = ["--accent", "--gold", "--ok", "--bad"].map(function (v) { return cs.getPropertyValue(v).trim() || "#d9a85a"; });
  var ps = [];
  for (var i = 0; i < 140; i++) {
    ps.push({ x: W / 2 + (Math.random() - 0.5) * W * 0.4, y: H * 0.4, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 13 - 5,
      r: Math.random() * 6 + 5, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.35, c: cols[i % cols.length] });
  }
  var t0 = null;
  function frame(t) {
    if (t0 === null) t0 = t;
    x.clearRect(0, 0, W, H);
    ps.forEach(function (p) {
      p.vy += 0.38; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.a += p.va;
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore();
    });
    if (t - t0 < 2400) requestAnimationFrame(frame); else c.remove();
  }
  requestAnimationFrame(frame);
}

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
