# Portfolio — project instructions

Static site published to GitHub Pages at `https://uichan-lee.github.io/`.
Vanilla HTML/CSS/JS. **No bundler, no framework, and zero runtime npm
dependencies** — `package.json` exists only to hold two scripts. Keep it that
way: adding a build step would mean Ricky can no longer edit a file and see the
result by reloading.

Ricky's global preferences in `~/.claude/CLAUDE.md` apply. This file covers only
what is specific to this repository.

---

## The two build entry points

The split matters, and getting it backwards will either wipe generated pages or
silently publish stale ones.

**`sync.js` — owns Ricky's Obsidian vault.** Reads
`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Main Vault`, copies the
selected notes into `posts/`, and regenerates `js/writings.js`. It only runs on
Ricky's machine; the vault path does not exist in CI or in any cloud
environment. `sync.js` calls `build()` when it finishes.

**`build.js` — owns everything derived from the post list.** Reads only files
committed to this repo (`js/writings.js` and `posts/**/*.md`) and writes:

| Output | What it is |
|---|---|
| `p/<slug>/index.html` | one real page per post — the served HTML frame |
| `js/search-index.json` | full-text index, fetched on demand by `main.js` |
| `sitemap.xml`, `feed.xml` | via `feeds.js` |

Because `build.js` never touches the vault, the published site can be rebuilt
from a fresh clone by anyone. Run it alone with `npm run build` after editing
anything it consumes.

```
npm run sync     # vault → posts/ + js/writings.js, then build()   (Ricky only)
npm run build    # js/writings.js + posts/ → p/, search index, feeds
npm run deploy   # sync, then commit and push everything
```

**Everything under `p/` is generated.** Never hand-edit a file there; the next
`build.js` run deletes the whole directory and rewrites it.

### The empty-list guard

`build()` returns early without touching anything when `js/writings.js` lists no
posts. This is deliberate: without it, one `sync.js` run with iCloud not yet
downloaded would produce an empty post list and delete all 65 post pages,
`sitemap.xml` and `feed.xml` in one go. Do not remove that check.

---

## Post fields are derived — do not hand-edit them

`js/writings.js` is regenerated on every sync. `loadExistingWritings()`
(`sync.js:262`) carries exactly two fields across a regeneration:

- `title` — and only when `title-overrides.json` does not already set one
- `summary`

**Every other field is recomputed and any manual edit to it is silently lost** —
`slug`, `date`, `category`, `file`, `readingTime`. If a post needs a different
title, put it in `title-overrides.json`, keyed by slug; that file is the most
explicit source and wins over both the extracted title and the preserved one.

`js/projects.js` and `js/experiences.js` are the opposite: hand-maintained, read
by nothing but the renderer, and safe to edit freely.

---

## Adding project screenshots (deferred by design)

Ricky chose typography and metrics over images for now. When screenshots exist,
this is where they go:

1. Put the file in `assets/projects/<slug>.png` (or `.jpg`). Target **1200×675**
   (16:9); anything wider than 1600px is wasted bytes for a card this size.
   Recompress before committing — see the OG-image note below.
2. Add an `image` field to the entry in `js/projects.js`:
   ```js
   image: { src: "assets/projects/market-briefing.png", alt: "..." },
   ```
   `alt` is required and should describe what the screenshot shows, not repeat
   the project title.
3. Render it in `renderProjects` (`js/main.js`). For a `featured` card the
   natural slot is the column that currently holds `.card-metric` — image on one
   side, copy on the other — with the metric moving inline beneath the
   description. For a standard card, above `.card-title`.
4. Emit `loading="lazy"` and `decoding="async"`, and set explicit `width`/
   `height` so the grid does not reflow as images arrive.

The `featured` and `metric` fields already in `js/projects.js` are documented at
the top of that file.

---

## Two hand-maintained copies of the same page

`index.html` and `ko/index.html` are duplicates, not a template and an
instantiation. **Every structural change must be made to both.** This has
already drifted twice — once in the nav labels and `<title>`, and once when an
editor saved a stale buffer over `ko/index.html`, reverting two content fixes
and reformatting the whole file.

Notes:

- `ko/index.html` is formatted with 4-space indentation and wrapped attributes
  (an editor did this, not a configured formatter — the repo has no Prettier or
  EditorConfig). `index.html` is 2-space and unwrapped. Do not normalise either
  one as a side effect of another change; the diff noise buries the real edit.
- **Line endings differ per file and are load-bearing for diff readability:**
  `index.html`, `css/style.css`, `js/main.js` and `sync.js` are **CRLF**;
  `ko/index.html`, `build.js`, `feeds.js` and `404.html` are **LF**. Editing
  tools generally preserve this. Check with `grep -qU $'\r' <file>` before
  committing if a diff looks suspiciously large.
- The Korean page is deliberately **not** a full translation. Only generic UI
  microcopy is localised, via the `STRINGS` table in `js/main.js`. Names,
  titles, project and experience descriptions, and post bodies stay in their
  original language on both pages.
- Post pages under `p/` are English-chrome only. There is no Korean set — the
  bodies would be identical, so a second 65 pages would double the maintenance
  surface for no content difference.

---

## Front-end conventions

- `js/main.js` is one large IIFE in an ES5 register (`var`, function
  expressions, `Promise` but no `async`/`await`). Match it. Do not modernise it
  in passing.
- The file serves both page types. `window.__POST__`, set by `build.js`, is the
  discriminator: present on a post page, absent on `/` and `/ko/`. Guard new
  code on `POST` or on the element it needs.
- Post rendering order in the pipeline is not arbitrary. `addHeadingAnchors`
  must run **after** `buildTOC`, which reads `h.textContent` to build its
  labels — swap them and a `#` appears at the end of every TOC entry.
- Third-party libraries (`marked`, KaTeX, highlight.js) load from a CDN on
  demand, only when a post body renders. **All three are version-pinned.**
  `marked` was previously unpinned, which meant readers got whatever jsDelivr's
  edge cache held — 15.0.12 while npm `latest` was 18.0.9. Upgrading is fine;
  doing it as a deliberate, tested change is the point.
- Slugs contain Hangul. Every generated href needs `encodeURIComponent`.

---

## Images

`assets/og-image.png` (790 KB) is the **editable master**;
`assets/og-image.jpg` (121 KB) is what the site actually references. Regenerate
the derivative after editing the master:

```bash
sips -s format jpeg -s formatOptions 90 assets/og-image.png --out assets/og-image.jpg
```

No `pngquant` or `oxipng` is installed on Ricky's machine, which is why the
published card is JPEG rather than an optimised PNG. If one gets installed, an
8-bit palette PNG would be smaller still and worth switching back to.

---

## Known debt, recorded rather than fixed

**`css/style.css` needs a token pass.** Deliberately deferred — it touches every
component and would risk visual regressions across the whole site for no
behavioural gain. What an audit found:

- Five near-identical chrome-control blocks (`.filter-btn`, `.writing-back-btn`,
  `.theme-toggle`, `.nav-toggle`, `.lang-switch`), each repeated across three
  theme variants.
- `.card` and `.writing-card` are effectively the same component. So are
  `.link-btn` and `.cta-btn`.
- 28 ad-hoc spacing magnitudes and 24 ad-hoc font sizes with no scale.
- ~40 untokenized `box-shadow` values.
- 5 of the 15 design tokens are unused while their literal values appear inline
  up to 20 times each.

**Post bodies are rendered client-side.** `build.js` emits the page frame — real
`<head>`, `<h1>`, metadata, prev/next — and `main.js` fetches the markdown and
renders it. Moving to full build-time rendering would need `marked` as a real
dependency **and** a Node port of `preprocessObsidian` (~110 lines of footnote
extraction, math stashing, callouts, `![[embeds]]` and wikilinks). Two renderers
would drift. Revisit only if search-engine indexing of body text proves
insufficient.

**Pre-existing quirks that come from vault content, not from this code:**
`![[elections.csv]]` renders as a broken `<img>` because a CSV was embedded with
image syntax; `^f2e4d9`-style block-reference IDs leak into the page as visible
text; and notes that use `# Sep 1` as section markers give a post several
`<h1>`s.
