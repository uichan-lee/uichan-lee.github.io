#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── Configuration ──────────────────────────────────────────────────────────

const VAULT_ROOT = path.join(
  os.homedir(),
  "Library/Mobile Documents/iCloud~md~obsidian/Documents/Main Vault"
);

const TOPICS = [
  // ── UC Berkeley Courses ──
  {
    name: 'ENVECON C118',
    sourceDir: path.join(VAULT_ROOT, 'UC Berkeley', 'Spring 2026', 'ENVECON C118', 'Notes'),
    targetDir: 'ENVECON C118',
    category: 'econometrics',
    label: 'Econometrics',
    year: 2026,
  },
  {
    name: 'STAT 33B',
    sourceDir: path.join(VAULT_ROOT, 'UC Berkeley', 'Spring 2026', 'STAT 33B', 'Notes'),
    targetDir: 'STAT 33B',
    category: 'r-programming',
    label: 'R Programming',
    year: 2026,
  },
  {
    name: 'CS 61B',
    sourceDir: path.join(VAULT_ROOT, 'UC Berkeley', 'Fall 2025', 'Courses', 'CS 61B', 'Notes'),
    targetDir: 'CS 61B',
    category: 'data-structures-algorithms',
    label: 'Data Structures/Algorithms',
    include: /^week\s+\d+\.md$/i,
    weekDates: {
      semesterStart: '2025-09-01',
    },
  },
  {
    name: 'DATA 100',
    sourceDir: path.join(VAULT_ROOT, 'UC Berkeley', 'Fall 2025', 'Courses', 'DATA 100', 'Notes'),
    targetDir: 'DATA 100',
    category: 'ml-ds',
    label: 'ML/Data Science',
    include: /^week\s+\d+\.md$/i,
    weekDates: {
      semesterStart: '2025-09-01',
    },
  },
  // ── Independent Topics ──
  {
    name: 'AWS',
    sourceDir: path.join(VAULT_ROOT, 'AWS'),
    targetDir: 'AWS',
    category: 'aws',
    label: 'AWS',
    numberedFiles: true,
  },
  {
    name: 'ML DS',
    sourceDir: path.join(VAULT_ROOT, 'ML DS'),
    targetDir: 'ML DS',
    category: 'ml-ds',
    label: 'ML/Data Science',
  },
];

const POSTS_DIR = path.join(__dirname, 'posts');
const WRITINGS_JS = path.join(__dirname, 'js', 'writings.js');
const SEARCH_INDEX_JS = path.join(__dirname, 'js', 'search-index.js');

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src)) {
    if (entry === '.DS_Store') continue;
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) {
      copyDirSync(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function parseDateFromFilename(filename, courseName, year) {
  if (!year) return null;
  const base = path.basename(filename, '.md');
  const suffix = base.replace(courseName, '').trim();
  const m = suffix.match(/^(\d{1,2})\.(\d{1,2})$/);
  if (m) {
    const month = m[1].padStart(2, '0');
    const day = m[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return null;
}

function parseWeekNumber(filename) {
  const base = path.basename(filename, '.md');
  const m = base.match(/^week\s+(\d+)$/i);
  return m ? parseInt(m[1], 10) : null;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function weekdayOffsetsForCount(count) {
  if (count <= 1) return [0];
  if (count === 2) return [1, 3];
  if (count === 3) return [0, 2, 4];
  return [0, 1, 2, 3, 4].slice(0, count);
}

function assignConfiguredDates(posts, config) {
  if (!config.weekDates) return;

  const semesterStart = new Date(config.weekDates.semesterStart + 'T00:00:00');
  const byWeek = new Map();

  posts.forEach(function (post) {
    const week = parseWeekNumber(path.basename(post.file));
    if (week == null) return;
    if (!byWeek.has(week)) byWeek.set(week, []);
    byWeek.get(week).push(post);
  });

  Array.from(byWeek.keys()).sort(function (a, b) { return a - b; }).forEach(function (week) {
    const weekPosts = byWeek.get(week).slice().sort(function (a, b) {
      return a.file.localeCompare(b.file);
    });
    const offsets = weekdayOffsetsForCount(weekPosts.length);
    const monday = addDays(semesterStart, (week - 1) * 7);
    weekPosts.forEach(function (post, index) {
      const dayOffset = offsets[Math.min(index, offsets.length - 1)];
      post.date = formatDate(addDays(monday, dayOffset));
    });
  });
}

function stripLatexFromTitle(text) {
  return text
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\$([^$]*)\$/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(content) {
  const lines = content.split('\n');
  const h1s = [];
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^#\s+(.+)/);
    if (m) {
      let text = stripLatexFromTitle(m[1].trim());
      if (text && !/^(lecture(\s+notes?)?|discussion)$/i.test(text)) h1s.push(text);
    }
  }
  if (h1s.length > 0) return h1s.join(' | ');
  inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = line.match(/^#{2,3}\s+(.+)/);
    if (m) {
      let title = stripLatexFromTitle(m[1].trim());
      if (title && title.toLowerCase() !== 'lecture') return title;
    }
  }
  return null;
}

function extractSummary(content) {
  const lines = content.split('\n');
  let pastFirstHeading = false;
  for (const line of lines) {
    if (/^#{1,6}\s/.test(line)) { pastFirstHeading = true; continue; }
    if (!pastFirstHeading) continue;
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^[>|\-\*\|`#!$=\[]/.test(trimmed)) continue;
    if (/^---/.test(trimmed)) continue;
    let text = trimmed
      .replace(/\$\$[\s\S]*?\$\$/g, '')
      .replace(/\$[^$]+\$/g, '')
      .replace(/!\[\[[^\]]*\]\]/g, '')
      .replace(/\[\[([^\]|]*?)(?:\|([^\]]*))?\]\]/g, (_, t, a) => a || t)
      .replace(/[*_~`]/g, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (text.length > 20) {
      return text.length > 150 ? text.slice(0, 147) + '...' : text;
    }
  }
  return '';
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Strip markdown to plain text for search index (title + body). */
function stripMarkdownToPlainText(content) {
  let text = content
    .replace(/^---[\s\S]*?^---\s*/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*?|__?/g, '')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/^\s*[-*]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]+\$/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > 30000 ? text.slice(0, 30000) : text;
}

function shouldIncludeFile(filename, config) {
  if (!filename.endsWith('.md')) return false;
  if (config.numberedFiles && !/^\d+[-_]/.test(filename)) return false;
  if (!config.include) return true;
  return config.include.test(filename);
}

/**
 * Parse the existing writings.js to preserve manual edits to title/summary.
 * Returns a Map<slug, { title, summary }>.
 */
function loadExistingWritings() {
  if (!fs.existsSync(WRITINGS_JS)) return new Map();
  try {
    const code = fs.readFileSync(WRITINGS_JS, 'utf-8');
    const match = code.match(/const writings\s*=\s*(\[[\s\S]*?\]);\s*$/m);
    if (!match) return new Map();
    const arr = JSON.parse(match[1]);
    const map = new Map();
    for (const entry of arr) {
      if (entry && entry.slug) {
        map.set(entry.slug, { title: entry.title, summary: entry.summary });
      }
    }
    return map;
  } catch (e) {
    console.warn(`  warning: could not parse existing writings.js (${e.message}); manual edits may be lost`);
    return new Map();
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

function sync() {
  const allPosts = [];
  const allSearchEntries = [];

  const overridesPath = path.join(__dirname, 'title-overrides.json');
  const titleOverrides = fs.existsSync(overridesPath)
    ? JSON.parse(fs.readFileSync(overridesPath, 'utf-8'))
    : {};

  const existingWritings = loadExistingWritings();
  let preservedCount = 0;

  for (const config of TOPICS) {
    const sourceDir = config.sourceDir;
    const coursePosts = [];
    if (!fs.existsSync(sourceDir)) {
      console.log(`  skip: ${config.name} source not found`);
      continue;
    }

    const destCourse = path.join(POSTS_DIR, config.targetDir);
    resetDir(destCourse);

    // Copy attachments
    const attSrc = config.attachmentsDir || path.join(sourceDir, 'attachments');
    const attDest = path.join(destCourse, 'attachments');
    if (fs.existsSync(attSrc)) {
      copyDirSync(attSrc, attDest);
      const count = fs.readdirSync(attDest).length;
      console.log(`  ${config.targetDir}/attachments: ${count} files`);
    }

    // Copy md files and collect metadata
    const mdFiles = fs.readdirSync(sourceDir).filter(function (f) {
      return shouldIncludeFile(f, config);
    });
    for (const mdFile of mdFiles) {
      const src = path.join(sourceDir, mdFile);
      const dest = path.join(destCourse, mdFile);
      fs.copyFileSync(src, dest);

      const content = fs.readFileSync(src, 'utf-8');
      const base = path.basename(mdFile, '.md');

      let date = parseDateFromFilename(mdFile, config.name, config.year);
      if (!date) {
        const stat = fs.statSync(src);
        const d = stat.mtime;
        date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }

      let title;
      if (config.numberedFiles) {
        const numMatch = base.match(/^(\d+)[-_](.+)$/);
        if (numMatch) {
          const num = numMatch[1];
          const rest = numMatch[2].replace(/[-_]/g, ' ');
          title = `${num}. ${extractTitle(content) || rest}`;
        } else {
          title = extractTitle(content) || base;
        }
      } else {
        title = extractTitle(content) || base;
      }
      const autoSummary = extractSummary(content);
      const filePath = `posts/${config.targetDir}/${mdFile}`;

      const slug = slugify(`${config.targetDir} ${base}`);
      const existing = existingWritings.get(slug);

      // Priority for title:
      //   1. title-overrides.json (most explicit)
      //   2. existing writings.js (preserves manual edits)
      //   3. auto-extracted from markdown
      // Priority for summary:
      //   1. existing writings.js (preserves manual edits)
      //   2. auto-extracted from markdown
      let finalTitle;
      if (titleOverrides[slug]) {
        finalTitle = titleOverrides[slug];
      } else if (existing && existing.title) {
        finalTitle = existing.title;
        if (existing.title !== title) preservedCount++;
      } else {
        finalTitle = title;
      }

      let finalSummary;
      if (existing && existing.summary !== undefined) {
        finalSummary = existing.summary;
        if (existing.summary !== autoSummary) preservedCount++;
      } else {
        finalSummary = autoSummary;
      }

      coursePosts.push({
        slug,
        title: finalTitle,
        date,
        summary: finalSummary,
        file: filePath,
        category: config.category,
      });
      allSearchEntries.push({
        slug,
        title: finalTitle,
        text: stripMarkdownToPlainText(content),
      });
    }
    assignConfiguredDates(coursePosts, config);
    allPosts.push.apply(allPosts, coursePosts);
    console.log(`  ${config.targetDir}: ${mdFiles.length} posts`);
  }

  allPosts.sort((a, b) => a.date.localeCompare(b.date));

  // Build writingCategories
  const categories = {};
  for (const config of TOPICS) {
    categories[config.category] = config.label;
  }

  // Write writings.js
  const catJson = JSON.stringify(categories, null, 2);
  const postsJson = JSON.stringify(allPosts, null, 2);

  const output = `const writingCategories = ${catJson};\n\nconst writings = ${postsJson};\n`;
  fs.writeFileSync(WRITINGS_JS, output, 'utf-8');
  console.log(`\n  writings.js: ${allPosts.length} posts written`);
  if (preservedCount > 0) {
    console.log(`    (preserved ${preservedCount} manual edit${preservedCount === 1 ? '' : 's'} from existing writings.js)`);
  }

  const searchIndex = {};
  allSearchEntries.forEach(function (e) {
    searchIndex[e.slug] = { title: e.title, text: e.text };
  });
  const searchIndexOutput = 'const searchIndex = ' + JSON.stringify(searchIndex) + ';\n';
  fs.writeFileSync(SEARCH_INDEX_JS, searchIndexOutput, 'utf-8');
  console.log('  search-index.js: ' + Object.keys(searchIndex).length + ' entries');
}

console.log('Syncing vault -> posts/...\n');
sync();
console.log('\nDone.');
