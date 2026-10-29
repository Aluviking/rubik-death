/* Rubik Death — interacciones */
(() => {
  document.documentElement.classList.remove("no-js");

  const seeded = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const f1 = (n) => n.toFixed(1);

  /* ---------- Latas (marcador de posición) ----------
     Dibuja una lata SVG dentro de cada [data-can]. */
  const CANS = {
    citrica:  { label: ["#f2a03a", "#b8470f"], band: "#5e1f06", ink: "#1a0d05", ink2: "#4a1d07", accent: "#5a0a0a", name: "LAGER", sub: "CÍTRICA TROPICAL", foot: "ABV 5%" },
    scottish: { label: ["#7a1717", "#260707"], band: "#140303", ink: "#f0e7d7", ink2: "#c7a477", accent: "#e0a458", name: "SCOTTISH ALE", sub: "CARAMELO · TOSTADO", foot: "ABV 6%" },
  };
  CANS.scottish2 = CANS.scottish;

  const canSVG = (id, c, seed) => {
    const r = seeded(seed);
    let drops = "";
    for (let i = 0; i < 46; i++) {
      const x = 36 + r() * 148, y = 70 + r() * 300, s = 0.7 + r() * r() * 3.2;
      drops += `<g transform="translate(${f1(x)} ${f1(y)})"><ellipse rx="${s.toFixed(2)}" ry="${(s * 1.2).toFixed(2)}" fill="#000" opacity=".25" transform="translate(.4 .9)"/><ellipse rx="${s.toFixed(2)}" ry="${(s * 1.2).toFixed(2)}" fill="url(#${id}-drop)"/><circle cx="${(-s * 0.35).toFixed(2)}" cy="${(-s * 0.45).toFixed(2)}" r="${(s * 0.26).toFixed(2)}" fill="#fff" opacity=".85"/></g>`;
    }
    return `
    <svg viewBox="0 0 220 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-m" x1="0" x2="1">
          <stop offset="0" stop-color="#1d1e20"/><stop offset=".08" stop-color="#6f7378"/><stop offset=".2" stop-color="#e9ebed"/>
          <stop offset=".27" stop-color="#ffffff"/><stop offset=".36" stop-color="#9ca0a5"/><stop offset=".58" stop-color="#3a3d41"/>
          <stop offset=".8" stop-color="#b3b7bb"/><stop offset=".92" stop-color="#55595e"/><stop offset="1" stop-color="#151617"/>
        </linearGradient>
        <linearGradient id="${id}-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.label[0]}"/><stop offset="1" stop-color="${c.label[1]}"/></linearGradient>
        <linearGradient id="${id}-sh" x1="0" x2="1">
          <stop offset="0" stop-color="#000" stop-opacity=".85"/><stop offset=".1" stop-color="#000" stop-opacity=".3"/>
          <stop offset=".22" stop-color="#fff" stop-opacity=".12"/><stop offset=".4" stop-color="#000" stop-opacity="0"/>
          <stop offset=".7" stop-color="#000" stop-opacity=".25"/><stop offset=".86" stop-color="#fff" stop-opacity=".06"/>
          <stop offset="1" stop-color="#000" stop-opacity=".9"/>
        </linearGradient>
        <linearGradient id="${id}-spec" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <radialGradient id="${id}-drop" cx=".38" cy=".32" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".55" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient>
        <radialGradient id="${id}-lid" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#9ea2a7"/><stop offset=".75" stop-color="#5b5f64"/><stop offset="1" stop-color="#2c2e31"/></radialGradient>
        <filter id="${id}-blur"><feGaussianBlur stdDeviation="3"/></filter>
        <clipPath id="${id}-c"><rect x="30" y="58" width="160" height="322"/></clipPath>
        <path id="${id}-ring" d="M110 182 m-50 0 a50 50 0 1 1 100 0 a50 50 0 1 1 -100 0"/>
      </defs>
      <path d="M30 64 C30 48 40 40 54 33 L54 25 L166 25 L166 33 C180 40 190 48 190 64 Z" fill="url(#${id}-m)"/>
      <g clip-path="url(#${id}-c)">
        <rect x="30" y="58" width="160" height="322" fill="url(#${id}-l)"/>
        <rect x="30" y="58" width="160" height="30" fill="${c.band}"/>
        <text x="110" y="78" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="600" font-size="8.5" letter-spacing="4" fill="${c.ink2}">GFO BEER CO.</text>
        <path d="M44 96 H176 M44 99.5 H176" stroke="${c.ink2}" stroke-width=".6"/>
        <circle cx="110" cy="182" r="57" fill="none" stroke="${c.ink2}" stroke-width="1"/>
        <circle cx="110" cy="182" r="43" fill="none" stroke="${c.ink2}" stroke-width=".6"/>
        <text font-family="Poppins, sans-serif" font-weight="600" font-size="7" fill="${c.ink2}" letter-spacing="1.6"><textPath href="#${id}-ring" textLength="306" lengthAdjust="spacing">CERVEZA ARTESANAL ✶ BOGOTÁ ✶ COLOMBIA ✶</textPath></text>
        <text x="110" y="201" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="44" fill="${c.ink}">911</text>
        <path d="M86 209 H134" stroke="${c.accent}" stroke-width="1.6"/>
        <text x="110" y="268" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="15" letter-spacing="1" fill="${c.ink}">${c.name}</text>
        <text x="110" y="287" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="600" font-size="7.5" letter-spacing="1.5" fill="${c.accent}">${c.sub}</text>
        <path d="M44 304 H176 M44 307.5 H176" stroke="${c.ink2}" stroke-width=".6"/>
        <text x="110" y="330" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="600" font-size="8.5" letter-spacing="3" fill="${c.ink2}">${c.foot}</text>
        <rect x="30" y="350" width="160" height="30" fill="${c.band}"/>
        <rect x="30" y="58" width="160" height="322" fill="url(#${id}-sh)"/>
        <rect x="64" y="58" width="22" height="322" fill="url(#${id}-spec)" filter="url(#${id}-blur)" opacity=".7"/>
        ${drops}
      </g>
      <path d="M30 376 C30 389 40 396 56 399 L164 399 C180 396 190 389 190 376 Z" fill="url(#${id}-m)"/>
      <ellipse cx="110" cy="25" rx="56" ry="7.5" fill="url(#${id}-m)"/>
      <ellipse cx="110" cy="25.6" rx="50" ry="6" fill="url(#${id}-lid)"/>
      <path d="M92 20.5 h36 a4.5 4.5 0 0 1 0 9 h-36 a4.5 4.5 0 0 1 0-9z" fill="url(#${id}-m)" stroke="#2a2c2f" stroke-width=".6"/>
      <ellipse cx="98" cy="25" rx="4.5" ry="2.4" fill="#2a2c2f"/>
    </svg>`;
  };
  document.querySelectorAll("[data-can]").forEach((el, i) => {
    const c = CANS[el.dataset.can];
    if (c && !el.querySelector("img")) el.innerHTML = canSVG(`can${i}`, c, 40 + i * 13);
  });

  /* ---------- WhatsApp ----------
     Número de Rubik Death en formato internacional, sin "+" ni espacios (ej: "573001234567").
     Mientras esté vacío, WhatsApp abre el mensaje y deja elegir el contacto. */
  const WA_NUMBER = "";
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Menú móvil ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const setMenu = (open) => { burger.setAttribute("aria-expanded", open); menu.classList.toggle("is-open", open); };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

  /* ---------- Navbar: sección activa ---------- */
  const header = document.getElementById("header");
  const navLinks = [...document.querySelectorAll(".navbar__link[href^='#']")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["cervezas", "galeria", "linea", "eventos", "donde"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });

  /* ---------- Navbar con fondo al hacer scroll ----------
     La lata 3D vive en assets/can911.js y recorre los [data-can-stop]. */
  /* La lata se abre sola al llegar a la mitad de la página y se cierra al volver arriba. */
  let canOpen = false, ticking = false;
  const onScroll = () => {
    ticking = false;
    header.classList.toggle("is-scrolled", scrollY > 30);
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    const want = canOpen ? p > 0.35 : p >= 0.5;
    if (want !== canOpen && window.Can911) {
      canOpen = want;
      want ? Can911.open() : Can911.close();
    }
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Revelado ---------- */
  const targets = document.querySelectorAll(".about__text, .tile, .lineup__head, .lcard, .events__main, .events__list, .find__in");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  targets.forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    if (el.matches(".tile, .lcard")) el.style.transitionDelay = `${(i % 7) * 70}ms`;
    io.observe(el);
  });

  /* ---------- Verificación de edad ---------- */
  const gate = document.getElementById("agegate");
  let verified = false;
  try { verified = localStorage.getItem("rb-age") === "ok"; } catch (_) {}
  if (!verified) { gate.hidden = false; document.body.classList.add("locked"); }
  gate.addEventListener("click", (e) => {
    const b = e.target.closest("[data-age]");
    if (!b) return;
    if (b.dataset.age === "yes") {
      try { localStorage.setItem("rb-age", "ok"); } catch (_) {}
      gate.hidden = true;
      document.body.classList.remove("locked");
    } else {
      gate.querySelector(".agegate__no").hidden = false;
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
