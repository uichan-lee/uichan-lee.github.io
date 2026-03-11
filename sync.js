#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── Configuration ──────────────────────────────────────────────────────────

const UC_BERKELEY_ROOT = path.join(
  os.homedir(),
  "Documents/Documents - Uichan's MacBook Air/Main Vault/UC Berkeley"
);

const COURSES = [
  {
    name: 'ENVECON C118',
    sourceDir: path.join(UC_BERKELEY_ROOT, 'Spring 2026', 'ENVECON C118', 'Notes'),
    targetDir: 'ENVECON C118',
    category: 'econometrics',
    label: 'Econometrics',
    year: 2026,
  },
  {
    name: 'STAT 33B',
    sourceDir: path.join(UC_BERKELEY_ROOT, 'Spring 2026', 'STAT 33B', 'Notes'),
    targetDir: 'STAT 33B',
    category: 'r-programming',
    label: 'R Programming',
    year: 2026,
  },
  {
    name: 'CS 61B',
    sourceDir: path.join(UC_BERKELEY_ROOT, 'Fall 2025', 'Courses', 'CS 61B', 'Notes'),
    targetDir: 'CS 61B',
    category: 'data-structures-algorithms',
    label: 'Data Structures/Algorithms',
    include: /^week\s+\d+\.md$/i,
  },
  {
    name: 'DATA 100',
    sourceDir: path.join(UC_BERKELEY_ROOT, 'Fall 2025', 'Courses', 'DATA 100', 'Notes'),
    targetDir: 'DATA 100',
    category: 'data-science',
    label: 'Data Science',
    include: /^week\s+\d+\.md$/i,
  },
];

const POSTS_DIR = path.join(__dirname, 'posts');
const WRITINGS_JS = path.join(__dirname, 'js', 'writings.js');

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
      if (text && text.toLowerCase() !== 'lecture') h1s.push(text);
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

function shouldIncludeFile(filename, config) {
  if (!filename.endsWith('.md')) return false;
  if (!config.include) return true;
  return config.include.test(filename);
}

// ─── Main ───────────────────────────────────────────────────────────────────

function sync() {
  const allPosts = [];

  for (const config of COURSES) {
    const sourceDir = config.sourceDir;
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

      const title = extractTitle(content) || base;
      const summary = extractSummary(content);
      const filePath = `posts/${config.targetDir}/${mdFile}`;

      allPosts.push({
        slug: slugify(`${config.targetDir} ${base}`),
        title,
        date,
        summary,
        file: filePath,
        category: config.category,
      });
    }
    console.log(`  ${config.targetDir}: ${mdFiles.length} posts`);
  }

  allPosts.sort((a, b) => a.date.localeCompare(b.date));

  // Build writingCategories
  const categories = {};
  for (const config of COURSES) {
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
