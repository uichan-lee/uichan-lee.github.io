// Generates sitemap.xml and feed.xml (RSS 2.0) from the post list.
// Used by sync.js on every deploy, and runnable standalone.

const fs = require('fs');
const path = require('path');

function xmlEscape(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Slugs may contain Hangul, so every emitted URL has to be percent-encoded. */
function postUrl(siteUrl, slug) {
  return siteUrl + '/p/' + encodeURIComponent(slug) + '/';
}

function buildSitemap(siteUrl, posts) {
  const dates = posts.map(function (p) { return p.date; }).filter(Boolean).sort();
  const lastmod = dates.length ? dates[dates.length - 1] : new Date().toISOString().slice(0, 10);
  // The two landing pages share the same content in two locales, so they get
  // reciprocal hreflang alternates. Post pages exist once (English chrome, see
  // build.js) and carry their own publication date as lastmod.
  const altLinks =
    '    <xhtml:link rel="alternate" hreflang="en" href="' + siteUrl + '/" />\n' +
    '    <xhtml:link rel="alternate" hreflang="ko" href="' + siteUrl + '/ko/" />\n';

  const postEntries = posts.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  }).map(function (p) {
    return '  <url>\n' +
      '    <loc>' + xmlEscape(postUrl(siteUrl, p.slug)) + '</loc>\n' +
      '    <lastmod>' + xmlEscape(p.date || lastmod) + '</lastmod>\n' +
      '    <changefreq>monthly</changefreq>\n' +
      '    <priority>0.7</priority>\n' +
      '  </url>\n';
  }).join('');

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    '  <url>\n' +
    '    <loc>' + siteUrl + '/</loc>\n' +
    '    <lastmod>' + lastmod + '</lastmod>\n' +
    '    <changefreq>weekly</changefreq>\n' +
    '    <priority>1.0</priority>\n' +
    altLinks +
    '  </url>\n' +
    '  <url>\n' +
    '    <loc>' + siteUrl + '/ko/</loc>\n' +
    '    <lastmod>' + lastmod + '</lastmod>\n' +
    '    <changefreq>weekly</changefreq>\n' +
    '    <priority>0.9</priority>\n' +
    altLinks +
    '  </url>\n' +
    postEntries +
    '</urlset>\n';
}

function buildRss(siteUrl, posts, categories) {
  const sorted = posts.slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });
  const build = new Date().toUTCString();
  const items = sorted.map(function (p) {
    const link = postUrl(siteUrl, p.slug);
    const pub = p.date ? new Date(p.date + 'T00:00:00Z').toUTCString() : build;
    const cat = (categories && categories[p.category]) || p.category || '';
    return '    <item>\n' +
      '      <title>' + xmlEscape(p.title) + '</title>\n' +
      '      <link>' + xmlEscape(link) + '</link>\n' +
      '      <guid isPermaLink="false">' + xmlEscape(p.slug) + '</guid>\n' +
      '      <pubDate>' + pub + '</pubDate>\n' +
      (cat ? '      <category>' + xmlEscape(cat) + '</category>\n' : '') +
      (p.summary ? '      <description>' + xmlEscape(p.summary) + '</description>\n' : '') +
      '    </item>';
  }).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    '  <channel>\n' +
    '    <title>Uichan Lee — Posts</title>\n' +
    '    <link>' + siteUrl + '/</link>\n' +
    '    <atom:link href="' + siteUrl + '/feed.xml" rel="self" type="application/rss+xml" />\n' +
    '    <description>Notes on data science, econometrics, machine learning, and programming by Uichan Lee.</description>\n' +
    '    <language>en</language>\n' +
    '    <lastBuildDate>' + build + '</lastBuildDate>\n' +
    items + '\n' +
    '  </channel>\n' +
    '</rss>\n';
}

function writeFeeds(outDir, siteUrl, posts, categories) {
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemap(siteUrl, posts), 'utf-8');
  fs.writeFileSync(path.join(outDir, 'feed.xml'), buildRss(siteUrl, posts, categories), 'utf-8');
}

module.exports = { buildSitemap, buildRss, writeFeeds, xmlEscape, postUrl };
