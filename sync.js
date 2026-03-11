#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── Configuration ──────────────────────────────────────────────────────────

const VAULT = path.join(
  os.homedir(),
  "Documents/Documents - Uichan's MacBook Air/Main Vault/UC Berkeley/Spring 2026"
);

const YEAR = 2026;

const COURSES = {
  'ENVECON C118': { category: 'econometrics', label: 'Econometrics' },
  'STAT 33B':     { category: 'r-programming', label: 'R Programming' },
};

const POSTS_DIR = path.join(__dirname, 'posts');
const WRITINGS_JS = path.join(__dirname, 'js', 'writings.js');

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
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

function parseDateFromFilename(filename, courseName) {
  const base = path.basename(filename, '.md');
  const suffix = base.replace(courseName, '').trim();
  const m = suffix.match(/^(\d{1,2})\.(\d{1,2})$/);
  if (m) {
    const month = m[1].padStart(2, '0');
    const day = m[2].padStart(2, '0');
    return `${YEAR}-${month}-${day}`;
  }
  return null;
}

function extractTitle(content) {
  const lines = content.split('\n');
  const h1s = [];
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)/);
    if (m) {
      const text = m[1].trim();
      if (text.toLowerCase() !== 'lecture') h1s.push(text);
    }
  }
  if (h1s.length > 0) return h1s.join(' | ');
  for (const line of lines) {
    const m = line.match(/^#{2,3}\s+(.+)/);
    if (m) {
      const title = m[1].trim();
      if (title.toLowerCase() !== 'lecture') return title;
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

// ─── Main ───────────────────────────────────────────────────────────────────

function sync() {
  const allPosts = [];

  for (const [course, config] of Object.entries(COURSES)) {
    const notesDir = path.join(VAULT, course, 'Notes');
    if (!fs.existsSync(notesDir)) {
      console.log(`  skip: ${course}/Notes/ not found`);
      continue;
    }

    const destCourse = path.join(POSTS_DIR, course);
    ensureDir(destCourse);

    // Copy attachments
    const attSrc = path.join(notesDir, 'attachments');
    const attDest = path.join(destCourse, 'attachments');
    if (fs.existsSync(attSrc)) {
      copyDirSync(attSrc, attDest);
      const count = fs.readdirSync(attDest).length;
      console.log(`  ${course}/attachments: ${count} files`);
    }

    // Copy md files and collect metadata
    const mdFiles = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
    for (const mdFile of mdFiles) {
      const src = path.join(notesDir, mdFile);
      const dest = path.join(destCourse, mdFile);
      fs.copyFileSync(src, dest);

      const content = fs.readFileSync(src, 'utf-8');
      const base = path.basename(mdFile, '.md');

      let date = parseDateFromFilename(mdFile, course);
      if (!date) {
        const stat = fs.statSync(src);
        const d = stat.mtime;
        date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }

      const title = extractTitle(content) || base;
      const summary = extractSummary(content);
      const filePath = `posts/${course}/${mdFile}`;

      allPosts.push({
        slug: slugify(base),
        title,
        date,
        summary,
        file: filePath,
        category: config.category,
      });
    }
    console.log(`  ${course}: ${mdFiles.length} posts`);
  }

  allPosts.sort((a, b) => a.date.localeCompare(b.date));

  // Build writingCategories
  const categories = {};
  for (const [, config] of Object.entries(COURSES)) {
    categories[config.category] = config.label;
  }

  // Write writings.js
  const catJson = JSON.stringify(categories, null, 2);
  const postsJson = JSON.stringify(allPosts, null, 2);

  const output = `const writingCategories = ${catJson};\n\nconst writings = ${postsJson};\n`;
  fs.writeFileSync(WRITINGS_JS, output, 'utf-8');
  console.log(`\n  writings.js: ${allPosts.length} posts written`);
}

console.log('Syncing vault -> posts/...\n');
sync();
console.log('\nDone.');
