# Uichan Lee — Portfolio

Personal portfolio and notes site: <https://uichan-lee.github.io/>

Static HTML/CSS/JS with no bundler, no framework, and no runtime dependencies.
Published from the `main` branch of `uichan-lee/uichan-lee.github.io` by GitHub
Pages, so a push to `main` is the deploy.

## Layout

```
index.html          landing page (English)
ko/index.html       landing page (Korean UI microcopy)
404.html            served by GitHub Pages on an unknown path
p/<slug>/           one generated page per post
posts/              markdown copied out of the Obsidian vault
js/writings.js      the post list — generated
js/search-index.json  full-text index, fetched on demand — generated
sitemap.xml, feed.xml  generated
sync.js             Obsidian vault → posts/ + js/writings.js
build.js            js/writings.js + posts/ → p/, search index, feeds
```

## Commands

```bash
npm run sync      # pull notes from the Obsidian vault, then rebuild
npm run build     # rebuild generated output from committed files only
npm run deploy    # sync, then commit and push
```

`npm run sync` reads Uichan Lee's local Obsidian vault and only works on that
machine. `npm run build` reads nothing but this repository, so it works from a
fresh clone.

To preview locally:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Serving over `http://` rather than opening
the files directly matters — the post pages fetch their markdown, and `file://`
blocks that. Note this server sends no cache headers, so hard-reload
(`cmd+shift+r`) after editing a JS or CSS file.

## Contributing to this repo

See `CLAUDE.md` for the build contract, which fields survive a sync, and the
conventions the two hand-maintained HTML pages have to keep in step.
