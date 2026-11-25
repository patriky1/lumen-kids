// Lumen Kids Creative Studio — printable generators and page controllers.
// Every sheet is generated in the browser as an SVG page (850×1100 = US Letter at 100 dpi).
(() => {
  const D = window.STUDIO_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const tool = document.body.dataset.tool;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const titleCase = s => s.replace(/\b\w/g, c => c.toUpperCase());
  const rand = n => Math.floor(Math.random() * n);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = 850, H = 1100;
  const FOOT = `<text x="425" y="1062" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#8a8a7c">Lumen Kids · Creative Studio</text>`;
  const page = (body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/>${title ? `<text x="425" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="38" fill="#234832">${esc(title)}</text>` : ''}${body}${FOOT}</svg>`;

  // ---------- shared UI helpers ----------
  function initChips(box, list, onPick, n = 4) {
    if (!box) return;
    const render = () => {
      box.innerHTML = '';
      shuffle(list).slice(0, n).forEach(([label, prompt]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'chip';
        b.innerHTML = `${esc(label)}<svg><use href="#i-arrow"/></svg>`;
        b.addEventListener('click', () => onPick(prompt || label));
        box.append(b);
      });
      const more = document.createElement('button');
      more.type = 'button'; more.className = 'chip';
      more.setAttribute('aria-label', 'Show more ideas');
      more.innerHTML = `<svg><use href="#i-shuffle"/></svg>More ideas`;
      more.addEventListener('click', render);
      box.append(more);
    };
    render();
  }
  function initCounter(ta) {
    const c = ta?.parentElement.querySelector('.counter');
    if (!c) return;
    const upd = () => { c.textContent = `${ta.value.length}/${ta.maxLength}`; };
    ta.addEventListener('input', upd); upd();
  }
  function fillSelect(sel, labels, selected) {
    labels.forEach((l, i) => sel.add(new Option(l, i, i === selected, i === selected)));
  }
  const choice = name => $(`input[name="${name}"]:checked`)?.value;

  const stage = $('.sheet');
  const actions = $('.sheet-actions');
  const caption = $('.preview-caption');
  const warn = $('.hint.warn');
  let current = null; // { render(key) -> svg string, name, hasKey }
  let keyOn = false;

  function show(result, text) {
    current = result; keyOn = false;
    $$('.key-thumb, .key-label').forEach(e => e.remove());
    stage.innerHTML = result.render(false);
    caption.textContent = text;
    actions.hidden = false;
    const k = $('[data-key]', actions);
    if (k) { k.hidden = !result.hasKey; k.setAttribute('aria-pressed', 'false'); k.lastChild.textContent = 'Show answer key'; }
    stage.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }
  function setWarn(msg) { if (warn) { warn.textContent = msg || ''; warn.hidden = !msg; } }

  // Progress overlay shown while a sheet is being made.
  const PHASES = {
    'color-by-number': [['Generating initial sketch', 5, 54], ['Selecting colors', 55, 84], ['Refining palette', 85, 93], ['Finalizing worksheet', 94, 99]],
    default: [['Choosing words', 5, 40], ['Building the puzzle', 41, 80], ['Finalizing worksheet', 81, 99]],
  };
  function runProgress() {
    const phases = PHASES[tool] || PHASES.default;
    const box = document.createElement('div');
    box.className = 'progress';
    box.innerHTML = `<p class="lbl"></p><div class="bar"><i></i></div><p class="pct"></p>`;
    stage.append(box);
    const lbl = $('.lbl', box), bar = $('.bar i', box), pct = $('.pct', box);
    const per = reduceMotion ? 80 : 700;
    return new Promise(res => {
      let i = 0;
      const step = () => {
        if (i >= phases.length) { box.remove(); res(); return; }
        const [label, a, b] = phases[i++];
        lbl.textContent = label; bar.style.width = a + '%'; pct.textContent = a + '%';
        setTimeout(() => { bar.style.width = b + '%'; pct.textContent = b + '%'; }, per / 2);
        setTimeout(step, per);
      };
      step();
    });
  }

  // Print / download.
  function printSvg(svg) {
    const w = window.open('', '_blank');
    if (!w) { alert('Allow pop-ups to print.'); return; }
    w.document.write(`<!doctype html><title>Print</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika&display=swap"><style>@page{size:letter;margin:.3in}html,body{margin:0}svg,img{width:100%;height:auto;display:block}</style>${svg}`);
    w.document.close();
    w.addEventListener('load', () => { w.focus(); w.print(); });
    setTimeout(() => { try { w.focus(); w.print(); } catch {} }, 600);
  }
  function download(content, filename, type = 'image/svg+xml') {
    const blob = new Blob([type === 'image/svg+xml' ? '<?xml version="1.0" encoding="UTF-8"?>\n' + content : content], { type });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: filename });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  if (actions) {
    actions.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || !current) return;
      if (b.hasAttribute('data-print')) printSvg(current.render(keyOn));
      if (b.hasAttribute('data-download')) download(current.render(keyOn), `${current.name}${keyOn ? '-answer-key' : ''}.svg`);
      if (b.hasAttribute('data-key')) {
        keyOn = !keyOn; stage.innerHTML = current.render(keyOn);
        b.setAttribute('aria-pressed', String(keyOn)); b.lastChild.textContent = keyOn ? 'Hide answer key' : 'Show answer key';
      }
    });
  }

  // Wrap text to lines of roughly `max` characters.
  function wrap(text, max) {
    const out = []; let line = '';
    for (const w of text.split(/\s+/)) {
      if ((line + ' ' + w).trim().length > max) { if (line) out.push(line); line = w; } else line = (line + ' ' + w).trim();
    }
    if (line) out.push(line);
    return out;
  }

  // Topic → words. Known topics use the local bank; otherwise a comma/line separated list is accepted.
  function wordsFor(topic, needClues) {
    const bank = D.findBank(topic);
    if (bank) return { title: titleCase(bank.name), entries: bank.words.map(([w, c]) => ({ word: w, clue: c })) };
    const parts = topic.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
    const entries = parts.map(p => {
      const [w, ...rest] = p.split(':');
      return { word: w.replace(/[^A-Za-z]/g, '').toUpperCase(), clue: rest.join(':').trim() || (needClues ? `(clue for ${w.trim()})` : '') };
    }).filter(e => e.word.length >= 2);
    if (entries.length >= 3) return { title: 'My Words', entries };
    return null;
  }
  const NO_LIST_MSG = 'We don’t have a word list for that topic yet. Pick one of the ideas, or type your own words separated by commas.';

  // =====================================================================
  // WORD SEARCH
  // =====================================================================
  const WS_LEVELS = [[5, 4, 6], [6, 5, 7], [8, 6, 8], [10, 7, 10], [12, 8, 11], [12, 8, 12], [14, 9, 12], [14, 10, 13], [15, 10, 13], [15, 10, 14]];
  const wsLevel = g => WS_LEVELS[Math.min(g, WS_LEVELS.length - 1)];
  const WS_DIRS = {
    easy: [[0, 1], [1, 0]],
    medium: [[0, 1], [1, 0], [1, 1], [-1, 1]],
    hard: [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]],
  };
  const WS_HINT = { easy: 'Words read across → and down ↓.', medium: 'Words read across, down, and diagonally ↘ ↗.', hard: 'Words can hide in any direction, even backwards.' };

  function buildWordSearch(entries, size, dirs) {
    let best = null;
    for (let attempt = 0; attempt < 30; attempt++) {
      const grid = Array.from({ length: size }, () => Array(size).fill(''));
      const placed = [];
      for (const { word } of [...entries].sort((a, b) => b.word.length - a.word.length)) {
        for (let t = 0; t < 400; t++) {
          const [dr, dc] = dirs[rand(dirs.length)];
          const r = rand(size), c = rand(size);
          const er = r + dr * (word.length - 1), ec = c + dc * (word.length - 1);
          if (er < 0 || er >= size || ec < 0 || ec >= size) continue;
          let ok = true;
          for (let i = 0; i < word.length && ok; i++) { const ch = grid[r + dr * i][c + dc * i]; if (ch && ch !== word[i]) ok = false; }
          if (!ok) continue;
          for (let i = 0; i < word.length; i++) grid[r + dr * i][c + dc * i] = word[i];
          placed.push({ word, r, c, dr, dc });
          break;
        }
      }
      if (!best || placed.length > best.placed.length) best = { grid, placed };
      if (placed.length === entries.length) break;
    }
    const A = 'ABCDEFGHIJKLMNOPRSTUVWY';
    best.grid = best.grid.map(row => row.map(ch => ch || A[rand(A.length)]));
    return best;
  }

  function renderWordSearch(ws, title, key) {
    const n = ws.grid.length, cell = Math.min(60, Math.floor(660 / n)), gw = cell * n, x0 = (W - gw) / 2, y0 = 150;
    const colors = ['#f6b2aa', '#a9d3f0', '#bfe3b4', '#f8dc8f', '#d9c2f0', '#f7c59f', '#b9e6dc', '#f2b8d2'];
    let s = '';
    if (key) ws.placed.forEach((p, i) => {
      const x1 = x0 + p.c * cell + cell / 2, y1 = y0 + p.r * cell + cell / 2;
      const x2 = x1 + p.dc * (p.word.length - 1) * cell, y2 = y1 + p.dr * (p.word.length - 1) * cell;
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colors[i % colors.length]}" stroke-width="${cell * .72}" stroke-linecap="round" opacity=".85"/>`;
    });
    ws.grid.forEach((row, r) => row.forEach((ch, c) => {
      s += `<text x="${x0 + c * cell + cell / 2}" y="${y0 + r * cell + cell / 2 + cell * .17}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="${cell * .48}" fill="#222">${ch}</text>`;
    }));
    const words = ws.placed.map(p => p.word).sort();
    const cols = 4, ly = y0 + gw + 50;
    s += `<text x="425" y="${ly}" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#555">Find and circle each word</text>`;
    words.forEach((w, i) => {
      const cx = 105 + (i % cols) * 170, cy = ly + 48 + Math.floor(i / cols) * 42;
      s += `<rect x="${cx}" y="${cy - 17}" width="17" height="17" rx="3" fill="none" stroke="#888" stroke-width="1.5"/><text x="${cx + 28}" y="${cy - 2}" font-family="Helvetica,Arial,sans-serif" font-size="21" fill="#333">${w}</text>`;
    });
    if (key) s += `<text x="425" y="128" text-anchor="middle" font-family="Georgia,serif" font-size="15" letter-spacing="3" fill="#4d752d">ANSWER KEY</text>`;
    return page(s, title);
  }

  function initWordSearch() {
    const ta = $('#topic'), sel = $('#grade'), btn = $('#create'), info = $('#level-hint'), dirHint = $('#dir-hint');
    fillSelect(sel, D.puzzleGrades, 3);
    const updInfo = () => { const [n, len] = wsLevel(+sel.value); info.textContent = `About ${n} words, each up to ${len} letters long.`; };
    const updDir = () => { dirHint.textContent = WS_HINT[choice('tricky')]; };
    sel.addEventListener('change', updInfo); $$('input[name="tricky"]').forEach(r => r.addEventListener('change', updDir)); updInfo(); updDir();
    const valid = () => { btn.disabled = ta.value.trim().length < 3; };
    ta.addEventListener('input', () => { valid(); setWarn(''); }); valid(); initCounter(ta);
    initChips($('#ideas'), D.ideas['word-search'], v => { ta.value = v; ta.dispatchEvent(new Event('input')); });
    btn.addEventListener('click', async () => {
      const src = wordsFor(ta.value, false);
      if (!src) { setWarn(NO_LIST_MSG); return; }
      const [n, maxLen, size] = wsLevel(+sel.value);
      let entries = src.entries.filter(e => e.word.length <= Math.max(maxLen, size));
      entries = shuffle(entries).slice(0, n);
      btn.disabled = true; await runProgress(); btn.disabled = false;
      const ws = buildWordSearch(entries, Math.max(size, ...entries.map(e => e.word.length)), WS_DIRS[choice('tricky')]);
      show({ name: `word-search-${src.title.toLowerCase().replace(/\W+/g, '-')}`, hasKey: true, render: k => renderWordSearch(ws, src.title, k) },
        `${src.title}, hiding in plain sight. Happy searching!`);
    });
  }

  // =====================================================================
  // CROSSWORD
  // =====================================================================
  function buildCrossword(entries, maxWords) {
    let best = null;
    for (let attempt = 0; attempt < 60; attempt++) {
      const list = shuffle(entries).sort((a, b) => b.word.length - a.word.length + (Math.random() - .5) * 2);
      const cells = new Map(); // "r,c" -> { ch, dirs:Set }
      const placed = [];
      const get = (r, c) => cells.get(r + ',' + c);
      const fits = (w, r, c, dir) => {
        const [dr, dc] = dir === 'across' ? [0, 1] : [1, 0];
        if (get(r - dr, c - dc) || get(r + dr * w.length, c + dc * w.length)) return -1;
        let inter = 0;
        for (let i = 0; i < w.length; i++) {
          const rr = r + dr * i, cc = c + dc * i, cell = get(rr, cc);
          if (cell) { if (cell.ch !== w[i] || cell.dirs.has(dir)) return -1; inter++; }
          else if (get(rr + dc, cc + dr) || get(rr - dc, cc - dr)) return -1;
        }
        return inter;
      };
      const put = (e, r, c, dir) => {
        const [dr, dc] = dir === 'across' ? [0, 1] : [1, 0];
        for (let i = 0; i < e.word.length; i++) {
          const k = (r + dr * i) + ',' + (c + dc * i);
          const cell = cells.get(k) || { ch: e.word[i], dirs: new Set() };
          cell.dirs.add(dir); cells.set(k, cell);
        }
        placed.push({ ...e, r, c, dir });
      };
      for (const e of list) {
        if (placed.length >= maxWords) break;
        if (!placed.length) { put(e, 0, 0, 'across'); continue; }
        const opts = [];
        for (const [k, cell] of cells) {
          const [r, c] = k.split(',').map(Number);
          for (let i = 0; i < e.word.length; i++) {
            if (e.word[i] !== cell.ch) continue;
            for (const dir of ['across', 'down']) {
              const sr = dir === 'down' ? r - i : r, sc = dir === 'across' ? c - i : c;
              const score = fits(e.word, sr, sc, dir);
              if (score > 0) opts.push([score + Math.random() * .5, sr, sc, dir]);
            }
          }
        }
        if (opts.length) { opts.sort((a, b) => b[0] - a[0]); const [, r, c, dir] = opts[0]; put(e, r, c, dir); }
      }
      const rs = [...cells.keys()].map(k => +k.split(',')[0]), cs = [...cells.keys()].map(k => +k.split(',')[1]);
      const area = (Math.max(...rs) - Math.min(...rs) + 1) * (Math.max(...cs) - Math.min(...cs) + 1);
      const score = placed.length * 1000 - area;
      if (!best || score > best.score) best = { score, placed, cells, minR: Math.min(...rs), minC: Math.min(...cs), rows: Math.max(...rs) - Math.min(...rs) + 1, cols: Math.max(...cs) - Math.min(...cs) + 1 };
    }
    // number the starts in reading order
    const starts = new Map();
    best.placed.forEach(p => { p.r -= best.minR; p.c -= best.minC; });
    [...best.placed].sort((a, b) => a.r - b.r || a.c - b.c).forEach(p => {
      const k = p.r + ',' + p.c;
      if (!starts.has(k)) starts.set(k, starts.size + 1);
      p.num = starts.get(k);
    });
    best.grid = new Map([...best.cells].map(([k, v]) => { const [r, c] = k.split(',').map(Number); return [(r - best.minR) + ',' + (c - best.minC), v.ch]; }));
    best.starts = starts;
    return best;
  }

  function renderCrossword(cw, title, key) {
    const cell = Math.min(60, Math.floor(720 / cw.cols), Math.floor(520 / cw.rows));
    const x0 = (W - cell * cw.cols) / 2, y0 = 140;
    let s = '';
    for (const [k, ch] of cw.grid) {
      const [r, c] = k.split(',').map(Number), x = x0 + c * cell, y = y0 + r * cell;
      s += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="#fff" stroke="#333" stroke-width="1.5"/>`;
      if (cw.starts.has(k)) s += `<text x="${x + 3}" y="${y + cell * .3}" font-family="Helvetica,Arial,sans-serif" font-size="${Math.max(9, cell * .26)}" fill="#333">${cw.starts.get(k)}</text>`;
      if (key) s += `<text x="${x + cell / 2}" y="${y + cell * .72}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="${cell * .5}" fill="#4d752d">${ch}</text>`;
    }
    const clueY = y0 + cell * cw.rows + 50;
    const col = (label, items, x) => {
      let out = `<text x="${x}" y="${clueY}" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="#234832">${label}</text>`, y = clueY + 36;
      items.forEach(p => {
        wrap(`${p.num}. ${p.clue}`, 32).forEach((ln, i) => { out += `<text x="${x + (i ? 22 : 0)}" y="${y}" font-family="Georgia,serif" font-size="19" fill="#333">${esc(ln)}</text>`; y += 25; });
        y += 6;
      });
      return out;
    };
    const byNum = (a, b) => a.num - b.num;
    s += col('Across', cw.placed.filter(p => p.dir === 'across').sort(byNum), 90);
    s += col('Down', cw.placed.filter(p => p.dir === 'down').sort(byNum), 460);
    if (key) s += `<text x="425" y="122" text-anchor="middle" font-family="Georgia,serif" font-size="15" letter-spacing="3" fill="#4d752d">ANSWER KEY</text>`;
    return page(s, title);
  }

  function initCrossword() {
    const ta = $('#topic'), sel = $('#grade'), btn = $('#create'), info = $('#level-hint');
    fillSelect(sel, D.puzzleGrades, 3);
    const counts = g => [[4, 4], [5, 5], [6, 6], [8, 8], [8, 8], [10, 9], [10, 10]][Math.min(g, 6)];
    const upd = () => { const [n, l] = counts(+sel.value); info.textContent = `Up to ${n} words, each up to ${l} letters long, with clues written for this level.`; };
    sel.addEventListener('change', upd); upd();
    const valid = () => { btn.disabled = ta.value.trim().length < 3; };
    ta.addEventListener('input', () => { valid(); setWarn(''); }); valid(); initCounter(ta);
    initChips($('#ideas'), D.ideas.crossword, v => { ta.value = v; ta.dispatchEvent(new Event('input')); });
    btn.addEventListener('click', async () => {
      const src = wordsFor(ta.value, true);
      if (!src) { setWarn(NO_LIST_MSG + ' For clues, use “word: clue”.'); return; }
      const [n, l] = counts(+sel.value);
      const entries = src.entries.filter(e => e.word.length <= Math.max(l, 5));
      btn.disabled = true; await runProgress(); btn.disabled = false;
      const cw = buildCrossword(entries.length >= 3 ? entries : src.entries, n);
      show({ name: `crossword-${src.title.toLowerCase().replace(/\W+/g, '-')}`, hasKey: true, render: k => renderCrossword(cw, src.title, k) },
        `${src.title}, one clue at a time.`);
    });
  }

  // =====================================================================
  // NAME TRACING
  // =====================================================================
  function renderTracing(name, big) {
    const rowH = big ? 158 : 108, rows = big ? 6 : 9, guide = rowH * .62, top0 = 120;
    const chars = [...name];
    const fs = Math.min(guide / .72, 720 / (chars.length * .62));
    const adv = fs * .62, x0 = 70;
    let s = '';
    for (let r = 0; r < rows; r++) {
      const top = top0 + r * rowH, base = top + guide, mid = top + guide / 2;
      s += `<line x1="60" x2="790" y1="${top}" y2="${top}" stroke="#9aa3ad" stroke-width="1.2"/>`;
      s += `<line x1="60" x2="790" y1="${mid}" y2="${mid}" stroke="#c4c9cf" stroke-width="1.2" stroke-dasharray="8 7"/>`;
      s += `<line x1="60" x2="790" y1="${base}" y2="${base}" stroke="#55606b" stroke-width="1.6"/>`;
      chars.forEach((ch, i) => {
        const x = x0 + i * adv;
        if (ch === ' ') return;
        if (i < r) s += `<line x1="${x + adv * .12}" x2="${x + adv * .82}" y1="${base - 3}" y2="${base - 3}" stroke="#2d3a32" stroke-width="3" stroke-linecap="round"/>`;
        else s += `<text x="${x}" y="${base}" font-family="Andika, 'Comic Sans MS', sans-serif" font-size="${fs}" fill="#f4f4f4" stroke="#6d7680" stroke-width="${big ? 2.2 : 1.8}" stroke-dasharray="1.5 6" stroke-linecap="round">${esc(ch)}</text>`;
      });
    }
    return page(s, '');
  }

  function initNameTracing() {
    const input = $('#child-name'), btn = $('#create'), info = $('#size-hint');
    const SIZE_HINT = { big: '1-inch letters for little hands. Prints on 1 page.', regular: 'Smaller letters and more rows for kindergarten and first grade. Prints on 1 page.' };
    const clean = () => input.value.replace(/[^\p{L}\p{M}' \-]/gu, '').replace(/\s+/g, ' ').slice(0, 16);
    const draw = () => {
      const name = clean().trim() || 'Ava', big = choice('size') === 'big';
      info.textContent = SIZE_HINT[choice('size')];
      current = { name: `name-tracing-${name.toLowerCase().replace(/\W+/g, '-')}`, hasKey: false, render: () => renderTracing(name, big) };
      stage.innerHTML = current.render();
      caption.textContent = input.value.trim() ? `${name}’s sheet, ready to trace.` : 'Type a name to see their sheet.';
      btn.disabled = !input.value.trim();
    };
    input.addEventListener('input', draw);
    $$('input[name="size"]').forEach(r => r.addEventListener('change', draw));
    btn.addEventListener('click', () => { actions.hidden = false; stage.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); });
    draw();
  }

  // =====================================================================
  // COLOR BY NUMBER
  // =====================================================================
  function pickPicture(prompt) {
    const words = prompt.toLowerCase();
    const scored = Object.entries(D.pictures).map(([id, p]) => [p.keys.filter(k => words.includes(k)).length, id]).sort((a, b) => b[0] - a[0]);
    return scored[0][0] ? scored[0][1] : Object.keys(D.pictures)[rand(Object.keys(D.pictures).length)];
  }
  function buildColorByNumber(picId, tier, mode) {
    const pic = D.pictures[picId];
    const resolve = ch => { let c = ch; while (pic.colors[c][2] > tier) c = pic.colors[c][3]; return c; };
    const legend = [];
    const cells = pic.rows.map(row => [...row].map(ch => {
      const c = resolve(ch);
      let n = legend.indexOf(c) + 1;
      if (!n) { legend.push(c); n = legend.length; }
      let label = String(n);
      if (mode === 'addition') { const a = rand(n + 1); label = `${a}+${n - a}`; }
      if (mode === 'subtraction') { const b = rand(10 - n); label = `${n + b}−${b}`; }
      return { c, n, label };
    }));
    return { pic, legend, cells };
  }
  function renderColorByNumber(cbn, key) {
    const n = cbn.cells.length, cell = 54, gw = cell * n, x0 = (W - gw) / 2, y0 = 135;
    let s = '';
    cbn.cells.forEach((row, r) => row.forEach((k, c) => {
      const x = x0 + c * cell, y = y0 + r * cell, fill = key ? cbn.pic.colors[k.c][1] : '#fff';
      s += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${fill}" stroke="#9a9a9a" stroke-width="1"/>`;
      if (!key) s += `<text x="${x + cell / 2}" y="${y + cell / 2 + 6}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="${k.label.length > 2 ? 14 : 18}" fill="#555">${k.label}</text>`;
    }));
    const ly = y0 + gw + 60, per = 3;
    cbn.legend.forEach((ch, i) => {
      const [name, hex] = cbn.pic.colors[ch];
      const x = 130 + (i % per) * 215, y = ly + Math.floor(i / per) * 54;
      s += `<circle cx="${x}" cy="${y}" r="18" fill="${hex}" stroke="#777" stroke-width="1.5"/><text x="${x + 30}" y="${y + 8}" font-family="Helvetica,Arial,sans-serif" font-size="23" fill="#333"><tspan font-weight="bold">${i + 1}</tspan>  ${name}</text>`;
    });
    if (key) s += `<text x="425" y="118" text-anchor="middle" font-family="Georgia,serif" font-size="15" letter-spacing="3" fill="#4d752d">COLORED PREVIEW</text>`;
    return page(s, `Color by Number: ${cbn.pic.name}`);
  }
  function initColorByNumber() {
    const ta = $('#topic'), btn = $('#create'), modeHint = $('#mode-hint'), cxHint = $('#complexity-hint');
    const MODE = { numbers: 'Match each number to its color.', addition: 'Solve a little addition, then find the color.', subtraction: 'Subtract numbers up to 9 to find each color.' };
    const CX = { simple: 'Just 3 colors, perfect for little hands.', standard: 'Up to 5 colors, with a light and dark shade of a color at most.', detailed: 'Up to 6 colors, with extra shades and details.' };
    const upd = () => { modeHint.textContent = MODE[choice('mode')]; cxHint.textContent = CX[choice('complexity')]; };
    $$('input[name="mode"],input[name="complexity"]').forEach(r => r.addEventListener('change', upd)); upd();
    const valid = () => { btn.disabled = ta.value.trim().length < 3; };
    ta.addEventListener('input', valid); valid(); initCounter(ta);
    initChips($('#ideas'), D.ideas['color-by-number'], v => { ta.value = v; ta.dispatchEvent(new Event('input')); }, 3);
    btn.addEventListener('click', async () => {
      const tier = { simple: 1, standard: 2, detailed: 3 }[choice('complexity')];
      const id = pickPicture(ta.value);
      btn.disabled = true; await runProgress(); btn.disabled = false;
      const cbn = buildColorByNumber(id, tier, choice('mode'));
      show({ name: `color-by-number-${id}`, hasKey: true, render: k => renderColorByNumber(cbn, k) },
        `${cbn.pic.name}, made to print and color.`);
      const k = $('[data-key]', actions); if (k) k.lastChild.textContent = 'Show colored preview';
    });
  }

  // =====================================================================
  // READING PASSAGE
  // =====================================================================
  function findPassage(topic) {
    const t = topic.toLowerCase();
    const id = Object.keys(D.passages).find(k => t.includes(k) || k.includes(t.trim()) || t.includes(k.split(' ')[0].replace(/s$/, '')));
    return id ? { id, ...D.passages[id] } : null;
  }
  function renderPassage(p, grade, gradeLabel) {
    const fs = grade <= 1 ? 26 : grade <= 3 ? 22 : 19, lh = fs * 1.55, max = Math.floor(690 / (fs * 0.5));
    let y = 222, s = '';
    s += `<text x="80" y="140" font-family="Georgia,serif" font-size="15" fill="#777">Name: ______________________</text><text x="770" y="140" text-anchor="end" font-family="Georgia,serif" font-size="15" fill="#777">${esc(gradeLabel)}</text>`;
    s += `<g transform="translate(395 158)" fill="#6f8f4e"><path d="M30 0c-8 6-12 14-12 22M30 0C22 2 14 2 6 0" stroke="#6f8f4e" fill="none" stroke-width="1.5"/><ellipse cx="14" cy="8" rx="6" ry="3"/><ellipse cx="34" cy="10" rx="6" ry="3" transform="rotate(30 34 10)"/></g>`;
    p.body.forEach(par => {
      wrap(par, max).forEach((ln, i) => { s += `<text x="${80 + (i ? 0 : 30)}" y="${y}" font-family="Georgia,serif" font-size="${fs}" fill="#222">${esc(ln)}</text>`; y += lh; });
      y += lh * .45;
    });
    y += 10;
    s += `<text x="80" y="${y}" font-family="Georgia,serif" font-size="20" font-weight="bold" fill="#234832">Think about it</text>`; y += 34;
    p.questions.forEach((q, i) => {
      if (y > 1000) return;
      s += `<text x="80" y="${y}" font-family="Georgia,serif" font-size="${Math.min(fs, 19)}" fill="#333">${i + 1}. ${esc(q)}</text>`; y += 32;
      s += `<line x1="100" x2="770" y1="${y}" y2="${y}" stroke="#bbb"/>`; y += 36;
    });
    return page(s, p.title);
  }
  function initReadingPassage() {
    const ta = $('#topic'), sel = $('#grade'), btn = $('#create');
    fillSelect(sel, D.readingGrades, 2);
    const valid = () => { btn.disabled = ta.value.trim().length < 3; };
    ta.addEventListener('input', () => { valid(); setWarn(''); }); valid(); initCounter(ta);
    initChips($('#ideas'), D.ideas['reading-passage'], v => { ta.value = v; ta.dispatchEvent(new Event('input')); });
    btn.addEventListener('click', async () => {
      const p = findPassage(ta.value);
      if (!p) { setWarn('Passages are ready for these topics so far: ' + Object.keys(D.passages).map(titleCase).join(', ') + '.'); return; }
      btn.disabled = true; await runProgress(); btn.disabled = false;
      const g = +sel.value;
      show({ name: `reading-passage-${p.title.toLowerCase().replace(/\W+/g, '-')}`, hasKey: false, render: () => renderPassage(p, g, D.readingGrades[g].split(' · ')[0]) },
        `A reading passage about ${p.id}, ready to print.`);
    });
  }

  // =====================================================================
  // HUB, SAMPLES + READY-TO-PRINT GALLERY
  // =====================================================================
  function initIdeaDialog() {
    const dlg = $('#idea-dialog'); if (!dlg) return;
    $$('[data-share-idea]').forEach(b => b.addEventListener('click', () => { dlg.querySelector('form').hidden = false; $('.thanks', dlg).hidden = true; dlg.showModal(); }));
    dlg.querySelector('form').addEventListener('submit', e => {
      e.preventDefault(); // static site: nothing is sent; the thank-you panel links to GitHub issues instead
      e.target.hidden = true; $('.thanks', dlg).hidden = false; e.target.reset();
    });
    $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }

  // Sample sheets drawn by the real generators (used for previews and thumbnails).
  const SAMPLES = {
    'word-search': () => {
      const src = wordsFor('ocean animals', false);
      const ws = buildWordSearch(src.entries.filter(e => e.word.length <= 7).slice(0, 10), 10, WS_DIRS.easy);
      return k => renderWordSearch(ws, src.title, k);
    },
    crossword: () => {
      const src = wordsFor('ocean animals', true);
      const cw = buildCrossword(src.entries.filter(e => e.word.length <= 8), 8);
      return k => renderCrossword(cw, src.title, k);
    },
    'reading-passage': () => () => renderPassage({ id: 'ocean animals', ...D.passages['ocean animals'] }, 2, 'Grade 2'),
    'name-tracing': () => () => renderTracing('Ava', true),
  };
  function fillSamples() {
    const cache = {};
    $$('[data-sample]').forEach(el => {
      const [name, variant] = el.dataset.sample.split(':');
      let make = SAMPLES[name];
      if (!make && name.startsWith('pic-')) make = () => { const c = buildColorByNumber(name.slice(4), 2, 'numbers'); return k => renderColorByNumber(c, k); };
      if (!make) return;
      const r = cache[name] || (cache[name] = make());
      el.innerHTML = r(variant === 'key');
    });
  }

  function initGallery() {
    const grid = $('#tiles'), count = $('#count'), dlg = $('#daily-dialog');
    const MODES = [['numbers', 'Numbers'], ['addition', 'Addition'], ['subtraction', 'Subtraction']];
    const items = [];
    Object.keys(D.pictures).forEach(id => MODES.forEach(([mode, label]) => {
      const c = buildColorByNumber(id, 2, mode);
      items.push({ id, mode, label, title: `${c.pic.name}`, render: k => renderColorByNumber(c, k) });
    }));
    grid.innerHTML = items.map((it, i) => `
      <li><button class="tile" type="button" data-i="${i}" data-cat="${it.label}">
        <span class="mini">${it.render(false)}</span>
        <h3>${esc(it.title)}</h3><time>${it.label}</time></button></li>`).join('');
    const apply = cat => {
      let n = 0;
      $$('.tile', grid).forEach(t => { const on = cat === 'All' || t.dataset.cat === cat; t.parentElement.hidden = !on; n += on; });
      count.textContent = `${n} printable${n === 1 ? '' : 's'}`;
      $$('.filter').forEach(f => f.setAttribute('aria-pressed', String(f.textContent === cat)));
    };
    $$('.filter').forEach(f => f.addEventListener('click', () => apply(f.textContent)));
    apply('All');
    grid.addEventListener('click', e => {
      const t = e.target.closest('.tile'); if (!t) return;
      const it = items[+t.dataset.i];
      $('h2', dlg).textContent = it.title; $('p', dlg).textContent = `Color by number · ${it.label}`;
      $('.dialog-sheet', dlg).innerHTML = it.render(false);
      $('[data-dl]', dlg).onclick = () => download(it.render(false), `color-by-number-${it.id}-${it.mode}.svg`);
      $('[data-pr]', dlg).onclick = () => printSvg(it.render(false));
      dlg.showModal();
    });
    $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }

  ({ 'word-search': initWordSearch, crossword: initCrossword, 'name-tracing': initNameTracing,
     'color-by-number': initColorByNumber, 'reading-passage': initReadingPassage, daily: initGallery }[tool] || (() => {}))();
  fillSamples();
  initIdeaDialog();
})();
