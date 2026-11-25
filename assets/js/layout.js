// Lumen Kids — shared chrome for inner pages: icon sprite, header, "app in development" card, footer,
// plus small behaviours (header border, reveal-on-scroll, single-open FAQ).
// <body data-root="../"> tells it how deep the page is ('' for root pages).
(() => {
  const root = document.body.dataset.root ?? '';
  const REPO = 'https://github.com/patriky1/lumen-kids';
  const studio = p => `${root}creative-studio/${p}`;
  const sprite = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="logo" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18.5" fill="#1f3d2b" stroke="#d4b26a" stroke-width="1.5"/><path d="M20 7c.9 7 5.9 12 13 13-7.1.9-12.1 6-13 13-.9-7-5.9-12.1-13-13 7.1-1 12.1-6 13-13z" fill="#f2c94c" stroke="none"/><circle cx="29.5" cy="10.5" r="1.7" fill="#f2c94c" stroke="none"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-back" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></symbol>
    <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></symbol>
    <symbol id="i-star4" viewBox="0 0 24 24"><path d="M12 3c.6 4.8 4.2 8.4 9 9-4.8.6-8.4 4.2-9 9-.6-4.8-4.2-8.4-9-9 4.8-.6 8.4-4.2 9-9z"/></symbol>
    <symbol id="i-wand" viewBox="0 0 24 24"><path d="M4 20L15 9M14 4v3M19 9h-3M17.5 5.5l-2 2M6 6l1 1M10 3v1"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></symbol>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6.5V20"/></symbol>
    <symbol id="i-pen" viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"/></symbol>
    <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.6-1 1.2-1.9-.5-1 .2-2.1 1.3-2.1H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/></symbol>
    <symbol id="i-printer" viewBox="0 0 24 24"><path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="7" rx="1"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></symbol>
    <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 3.3 6.5L4 20l1.2-3.6A8 8 0 0 1 4 12z"/></symbol>
    <symbol id="i-sliders" viewBox="0 0 24 24"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></symbol>
    <symbol id="i-shuffle" viewBox="0 0 24 24"><path d="M16 4h4v4M4 20L20 4M20 16v4h-4M15 15l5 5M4 4l5 5"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></symbol>
    <symbol id="i-key" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/></symbol>
    <symbol id="i-bookmark" viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></symbol>
    <symbol id="i-tablet" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/></symbol>
    <symbol id="i-github" viewBox="0 0 24 24"><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></symbol>
  </svg>`;

  const header = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="brand" href="${root}index.html" aria-label="Lumen Kids home"><svg class="logo" aria-hidden="true"><use href="#logo"/></svg><span>Lumen Kids</span></a>
      <nav class="nav" aria-label="Primary">
        <a class="nav-link hide-sm" href="${root}library.html">Library</a>
        <a class="nav-link hide-sm" href="${root}blog/index.html">Blog</a>
        <a class="btn btn-primary btn-sm" href="${studio('index.html')}">Free Creative Studio</a>
      </nav>
    </div>
  </header>`;

  const appCta = `
  <section class="app-cta reveal" aria-label="The Lumen Kids app">
    <svg class="tablet-art" viewBox="0 0 230 170" aria-hidden="true">
      <rect x="8" y="8" width="214" height="150" rx="16" fill="#0b0f0c" stroke="#2b3830"/>
      <rect x="20" y="20" width="190" height="126" rx="8" fill="#16241b" stroke="none"/>
      <circle cx="170" cy="48" r="16" fill="#f2c94c" stroke="none" opacity=".9"/>
      <path d="M20 120c40-26 80-26 120-6s50 12 70 0v32H20z" fill="#2f6b3a" stroke="none"/>
      <g fill="#e9e2cc" stroke="none" font-family="Georgia,serif" font-size="18"><text x="44" y="70">A</text><text x="74" y="86">2</text><text x="104" y="64">♪</text></g>
    </svg>
    <div class="app-cta-copy">
      <p class="kicker">In development</p>
      <h2 class="h3">The Lumen Kids app is on its way.</h2>
      <ul>
        <li><svg><use href="#i-chat"/></svg>A friendly guide that listens and talks</li>
        <li><svg><use href="#i-sliders"/></svg>Lessons that adapt to your child</li>
        <li><svg><use href="#i-printer"/></svg>Every printable saved in one place</li>
      </ul>
    </div>
    <a class="btn btn-primary" href="${REPO}" target="_blank" rel="noopener"><svg class="ic"><use href="#i-github"/></svg>Follow the project</a>
  </section>
  <p class="made-for">Made with care for curious kids<svg><use href="#i-star4"/></svg></p>`;

  const footer = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <p class="footer-title">Lumen Kids</p>
        <p class="footer-tag">Gentle screen time<br>for curious families.</p>
        <a class="btn btn-primary btn-pill" href="${studio('index.html')}">Try the free Studio →</a>
      </div>
      <nav class="footer-col" aria-label="Printables">
        <h3>Free printables</h3>
        <a href="${studio('color-by-number.html')}">Color by Number</a><a href="${studio('reading-passage.html')}">Reading Passages</a>
        <a href="${studio('word-search.html')}">Word Searches</a><a href="${studio('crossword.html')}">Crosswords</a>
        <a href="${studio('name-tracing.html')}">Name Tracing</a><a href="${studio('gallery.html')}">Printables Gallery</a>
      </nav>
      <nav class="footer-col" aria-label="Company">
        <h3>Lumen Kids</h3>
        <a href="${root}index.html">Home</a><a href="${root}library.html">Library</a><a href="${root}blog/index.html">Blog</a><a href="${root}support.html">Support</a>
      </nav>
    </div>
    <div class="footer-bar">
      <div class="container bar-inner">
        <div class="socials"><a href="${REPO}" target="_blank" rel="noopener" aria-label="Lumen Kids on GitHub"><svg viewBox="0 0 24 24"><use href="#i-github"/></svg></a></div>
        <p class="copy">© 2026 Lumen Kids</p>
        <nav class="legal" aria-label="Legal"><a href="${root}terms.html">Terms</a><a href="${root}privacy.html">Privacy</a></nav>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', sprite + header);
  document.querySelectorAll('[data-slot="app-cta"]').forEach(el => { el.outerHTML = appCta; });
  document.body.insertAdjacentHTML('beforeend', footer);

  const head = document.querySelector('.site-header');
  const onScroll = () => head.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) els.forEach(e => e.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  document.querySelectorAll('.faq').forEach(group => {
    const items = group.querySelectorAll('details');
    items.forEach(d => d.addEventListener('toggle', () => { if (d.open) items.forEach(o => { if (o !== d) o.open = false; }); }));
  });
})();
