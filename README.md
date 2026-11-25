# Lumen Kids

Calm learning for curious kids. This repository hosts the Lumen Kids website, including the free **Creative Studio**, which makes printable activities right in the browser:

- **Color by Number**: pixel pictures with plain numbers, addition or subtraction
- **Word Search**: grade-based sizes, three difficulty levels, answer key
- **Crossword**: automatic layout, numbered clues, answer key
- **Reading Passage**: short nonfiction pages with discussion questions
- **Name Tracing**: rows that fade from tracing to writing alone
- **Printables Gallery**: ready-made color-by-number pages

Everything is static HTML, CSS and JavaScript: no build step, no accounts, no analytics.

## Run locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Structure

| Path | What it is |
|---|---|
| `index.html`, `styles.css`, `app.js` | Home page |
| `creative-studio/` | Studio pages, generators (`tools.js`) and word lists, passages and pictures (`data.js`) |
| `library.html`, `blog/`, `support.html`, `privacy.html`, `terms.html` | Content pages |
| `assets/js/layout.js` | Shared header, footer and icons for inner pages |
| `assets/css/pages.css` | Styles for content pages |

## Feedback

Ideas and bug reports are welcome in [Issues](https://github.com/patriky1/lumen-kids/issues).
