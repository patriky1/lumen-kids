// Lumen Kids — landing page enhancements.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header border once the page scrolls.
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal-on-scroll (also triggers the chart and phone chat animations).
  const targets = document.querySelectorAll('.reveal, .growth-chart, .phone');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
  }

  // Subject carousel: one active card, prev/next, dots, click-to-focus.
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const cards = [...carousel.querySelectorAll('.subject')];
    const dots = carousel.querySelector('.dots');
    let active = 0;
    cards.forEach((card, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show ${card.querySelector('h3').textContent}`);
      dot.addEventListener('click', () => go(i));
      dots.append(dot);
      card.addEventListener('click', () => go(i));
    });
    function go(i) {
      active = (i + cards.length) % cards.length;
      cards.forEach((c, k) => {
        c.classList.toggle('is-active', k === active);
        c.setAttribute('aria-pressed', String(k === active));
      });
      [...dots.children].forEach((d, k) => d.setAttribute('aria-current', String(k === active)));
      // On narrow screens the track scrolls horizontally; keep the active card centred.
      const track = carousel.querySelector('.subject-track');
      if (track.scrollWidth > track.clientWidth) {
        const c = cards[active];
        track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.clientWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    carousel.querySelector('[data-prev]').addEventListener('click', () => go(active - 1));
    carousel.querySelector('[data-next]').addEventListener('click', () => go(active + 1));
    go(0);
  }

  // FAQ: keep a single item open at a time.
  const items = document.querySelectorAll('.faq details');
  items.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
  }));

  // Optional video/preview modal.
  const modal = document.getElementById('videoModal');
  document.querySelector('[data-video]')?.addEventListener('click', () => modal?.showModal?.());
  modal?.addEventListener('click', e => { if (e.target === modal) modal.close(); });
})();
