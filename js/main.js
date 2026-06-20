(function () {
  // --- Dark mode toggle ---
  var HLJS_LIGHT = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css';
  var HLJS_DARK  = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css';

  // --- On-demand loading of post-rendering libraries (marked / KaTeX / highlight.js) ---
  // These are only needed when a post is opened, so we keep them off the initial page load.
  var postLibsPromise = null;

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  function loadStyleOnce(href, id) {
    return new Promise(function (resolve) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      if (id) l.id = id;
      l.onload = resolve;
      l.onerror = resolve; // a missing stylesheet shouldn't block rendering
      document.head.appendChild(l);
    });
  }

  function ensurePostLibs() {
    if (postLibsPromise) return postLibsPromise;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    postLibsPromise = Promise.all([
      loadScriptOnce('https://cdn.jsdelivr.net/npm/marked/marked.min.js'),
      loadStyleOnce('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'),
      loadScriptOnce('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js'),
      loadStyleOnce(isDark ? HLJS_DARK : HLJS_LIGHT, 'hljs-theme'),
      loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js')
    ]);
    return postLibsPromise;
  }

  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    var link = document.getElementById('hljs-theme');
    if (link) link.href = dark ? HLJS_DARK : HLJS_LIGHT;
  }

  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(!isDark);
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function setActiveNav(sectionId) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
    });
  }

  function onNavClick(e) {
    const link = e.currentTarget;
    const sectionId = link.getAttribute('data-section');
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(sectionId);
      hideTOC();
    }
    closeMenu();
  }

  // --- Mobile hamburger menu ---
  var navToggle = document.getElementById('nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  function closeMenu() {
    if (!navToggle || !primaryNav) return;
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    if (!navToggle || !primaryNav) return;
    primaryNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (primaryNav.classList.contains('open')) closeMenu();
      else openMenu();
    });
    document.addEventListener('click', function (e) {
      if (!primaryNav.classList.contains('open')) return;
      if (primaryNav.contains(e.target) || navToggle.contains(e.target)) return;
      closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function onScroll() {
    var headerEl = document.querySelector('.header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
    let current = 'home';
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= headerHeight + 50) {
        current = section.id;
      }
    });
    setActiveNav(current);

    var detail = document.getElementById('writing-detail');
    var detailVisible = detail && detail.style.display !== 'none';
    if (current === 'writings' && detailVisible && tocEl && tocEl.innerHTML) {
      showTOC();
    } else {
      hideTOC();
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', onNavClick);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Render projects from projects.js
  if (typeof projects !== 'undefined') {
    const grid = document.getElementById('projects-grid');
    if (grid) {
      grid.innerHTML = projects
        .map(function (p) {
          var tagsHtml = (p.tags || [])
            .map(function (t) {
              return '<span class="tag">' + escapeHtml(t) + '</span>';
            })
            .join('');
          var hasDemo = p.link && p.link !== '#';
          var demoLabel = (p.linkLabel && p.linkLabel.trim()) ? p.linkLabel.trim() : 'View Demo';
          var linksHtml =
            (hasDemo
              ? '<a href="' + escapeAttr(p.link) + '" class="card-link" target="_blank" rel="noopener noreferrer">' + escapeHtml(demoLabel) + '</a>'
              : '') +
            '<a href="' + escapeAttr(p.codeLink || '#') + '" class="card-link" target="_blank" rel="noopener noreferrer">View Code</a>';
          return (
            '<article class="card">' +
            '<h3 class="card-title">' + escapeHtml(p.title) + '</h3>' +
            '<p class="card-desc">' + escapeHtml(p.description) + '</p>' +
            '<div class="card-tags">' + tagsHtml + '</div>' +
            '<div class="card-links">' + linksHtml + '</div>' +
            '</article>'
          );
        })
        .join('');
    }
  }

  // --- Obsidian-compatible markdown helpers ---

  function headingToSlug(text) {
    return String(text)
      .trim()
      .normalize('NFKC')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}\-_]/gu, '');
  }

  function preprocessObsidian(md, baseDir) {
    baseDir = baseDir || '';
    md = md.replace(/^---[\s\S]*?---\n?/, '');

    var codeStore = [];
    var mathStore = [];

    var lines = md.split('\n');
    var out = [];
    var inFence = '';
    var fenceBuf = [];
    var fencePrefix = '';

    for (var li = 0; li < lines.length; li++) {
      var line = lines[li];
      var pm = line.match(/^((?:>\s?)*)/);
      var prefix = pm ? pm[1] : '';
      var content = line.slice(prefix.length);

      if (!inFence && /^```/.test(content)) {
        inFence = 'code';
        fencePrefix = prefix;
        fenceBuf = [content];
      } else if (inFence === 'code' && /^```\s*$/.test(content)) {
        fenceBuf.push(content);
        inFence = '';
        codeStore.push({ text: fenceBuf.join('\n'), prefix: fencePrefix });
        out.push(fencePrefix + '%%CODE' + (codeStore.length - 1) + '%%');
        fenceBuf = [];
      } else if (!inFence && /^\$\$\s*$/.test(content)) {
        inFence = 'math';
        fencePrefix = prefix;
        fenceBuf = [];
      } else if (inFence === 'math' && /^\$\$\s*$/.test(content)) {
        inFence = '';
        mathStore.push({ tex: fenceBuf.join('\n').trim(), display: true });
        out.push(fencePrefix + '%%MATH' + (mathStore.length - 1) + '%%');
      } else if (inFence) {
        fenceBuf.push(content);
      } else {
        out.push(line);
      }
    }
    if (inFence === 'code') {
      for (var fi = 0; fi < fenceBuf.length; fi++) out.push(fencePrefix + fenceBuf[fi]);
    } else if (inFence === 'math') {
      out.push(fencePrefix + '$$');
      for (var mi = 0; mi < fenceBuf.length; mi++) out.push(fencePrefix + fenceBuf[mi]);
      out.push(fencePrefix + '$$');
    }

    md = out.join('\n');

    md = md.replace(/`([^`\n]+?)`/g, function (m) {
      codeStore.push({ text: m, prefix: '' });
      return '%%CODE' + (codeStore.length - 1) + '%%';
    });

    md = md.replace(/\$\$([\s\S]+?)\$\$/g, function (m, tex) {
      tex = tex.replace(/^>\s?/gm, '').trim();
      mathStore.push({ tex: tex, display: true });
      return '\n\n%%MATH' + (mathStore.length - 1) + '%%\n\n';
    });
    md = md.replace(/\$([^\$\n]+?)\$/g, function (m, tex) {
      mathStore.push({ tex: tex, display: false });
      return '%%MATH' + (mathStore.length - 1) + '%%';
    });

    md = md.replace(/==(.*?)==/g, '%%MARK_START%%$1%%MARK_END%%');

    md = md.replace(/!\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]/g, function (m, file, dims) {
      var src = baseDir + 'attachments/' + file.trim();
      var srcAttr = src.replace(/ /g, '%20');
      if (!dims) return '![' + file + '](<' + src + '>)';
      var wh = dims.match(/^(\d+)x(\d+)$/);
      if (wh) return '<img src="' + srcAttr + '" width="' + wh[1] + '" height="' + wh[2] + '" alt="' + file + '" />';
      return '<img src="' + srcAttr + '" width="' + dims + '" alt="' + file + '" />';
    });

    md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (m, alt, url) {
      if (url.indexOf(' ') === -1 || url.charAt(0) === '<') return m;
      return '![' + alt + '](<' + url + '>)';
    });

    md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (m, target, alias) {
      target = target.trim();
      if (target.charAt(0) === '#') {
        var headingText = target.slice(1).trim();
        if (headingText.charAt(0) === '^') return alias || target;
        var label = alias || headingText;
        var slug = headingToSlug(headingText);
        return '[' + label + '](#' + slug + ')';
      }
      return alias || target;
    });

    md = md.replace(/%%CODE(\d+)%%/g, function (m, idx) {
      var stored = codeStore[parseInt(idx, 10)];
      if (!stored) return m;
      if (!stored.prefix) return stored.text;
      var cl = stored.text.split('\n');
      return cl[0] + (cl.length > 1 ? '\n' + cl.slice(1).map(function (l) { return stored.prefix + l; }).join('\n') : '');
    });

    var footnoteResult = extractFootnotes(md);
    return { md: footnoteResult.md, mathStore: mathStore, footnotes: footnoteResult.footnotes };
  }

  function footnoteSlug(id) {
    return String(id).replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function extractFootnotes(md) {
    var definitions = {};
    var order = [];
    var lines = md.split('\n');
    var out = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];
      var prefixMatch = line.match(/^((?:>\s?)*)/);
      var prefix = prefixMatch ? prefixMatch[1] : '';
      var content = line.slice(prefix.length);
      var defMatch = content.match(/^\[\^([^\]]+)\]:\s?(.*)$/);

      if (defMatch) {
        var id = defMatch[1];
        var body = [defMatch[2]];
        i++;
        while (i < lines.length) {
          var next = lines[i];
          var nextPrefixMatch = next.match(/^((?:>\s?)*)/);
          var nextPrefix = nextPrefixMatch ? nextPrefixMatch[1] : '';
          var nextContent = next.slice(nextPrefix.length);
          if (/^\[\^[^\]]+\]:/.test(nextContent)) break;
          if (/^(?:\t| {4})/.test(nextContent)) {
            body.push(nextContent.replace(/^(?:\t| {4})/, ''));
            i++;
          } else {
            break;
          }
        }
        if (!definitions[id]) order.push(id);
        definitions[id] = body.join('\n').trim();
        continue;
      }

      out.push(line);
      i++;
    }

    if (order.length === 0) return { md: md, footnotes: null };

    order.forEach(function (id) {
      var escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.map(function (line) {
        return line.replace(new RegExp('\\[\\^' + escapedId + '\\]', 'g'), '%%FNREF:' + id + '%%');
      });
    });

    return { md: out.join('\n'), footnotes: { definitions: definitions, order: order } };
  }

  function restoreFootnotes(html, footnotes) {
    if (!footnotes) return html;

    footnotes.order.forEach(function (id, idx) {
      var num = idx + 1;
      var fnId = 'fn-' + footnoteSlug(id);
      var refId = 'fnref-' + footnoteSlug(id);
      var refHtml = '<sup class="footnote-ref"><a href="#' + fnId + '" id="' + refId + '">' + num + '</a></sup>';
      html = html.split('%%FNREF:' + id + '%%').join(refHtml);
    });

    var items = footnotes.order.map(function (id, idx) {
      var num = idx + 1;
      var fnId = 'fn-' + footnoteSlug(id);
      var refId = 'fnref-' + footnoteSlug(id);
      var body = marked.parse(footnotes.definitions[id] || '');
      return '<li id="' + fnId + '">' + body +
        ' <a href="#' + refId + '" class="footnote-backref" aria-label="Back to reference ' + num + '">↩</a>' +
        '</li>';
    }).join('');

    html += '<section class="footnotes" aria-label="Footnotes"><hr class="footnotes-sep">' +
      '<ol class="footnotes-list">' + items + '</ol></section>';
    return html;
  }

  var footnotePreviewEl = null;
  var footnotePreviewHideTimer = null;
  var footnotePreviewScrollBound = false;

  function hideFootnotePreview() {
    if (footnotePreviewHideTimer) {
      clearTimeout(footnotePreviewHideTimer);
      footnotePreviewHideTimer = null;
    }
    if (!footnotePreviewEl) return;
    footnotePreviewEl.hidden = true;
    footnotePreviewEl.innerHTML = '';
    footnotePreviewEl.removeAttribute('data-anchor-id');
  }

  function ensureFootnotePreviewElement() {
    if (footnotePreviewEl) return footnotePreviewEl;
    footnotePreviewEl = document.createElement('div');
    footnotePreviewEl.id = 'footnote-preview';
    footnotePreviewEl.className = 'footnote-preview';
    footnotePreviewEl.setAttribute('role', 'tooltip');
    footnotePreviewEl.hidden = true;
    document.body.appendChild(footnotePreviewEl);

    footnotePreviewEl.addEventListener('mouseenter', function () {
      if (footnotePreviewHideTimer) {
        clearTimeout(footnotePreviewHideTimer);
        footnotePreviewHideTimer = null;
      }
    });
    footnotePreviewEl.addEventListener('mouseleave', function () {
      footnotePreviewHideTimer = setTimeout(hideFootnotePreview, 120);
    });

    if (!footnotePreviewScrollBound) {
      footnotePreviewScrollBound = true;
      window.addEventListener('scroll', hideFootnotePreview, { passive: true, capture: true });
      window.addEventListener('resize', hideFootnotePreview, { passive: true });
    }
    return footnotePreviewEl;
  }

  function positionFootnotePreview(anchor, popover) {
    var rect = anchor.getBoundingClientRect();
    var popRect = popover.getBoundingClientRect();
    var gap = 8;
    var margin = 12;
    var top = rect.bottom + gap;
    var left = rect.left + rect.width / 2 - popRect.width / 2;

    left = Math.max(margin, Math.min(left, window.innerWidth - popRect.width - margin));

    if (top + popRect.height > window.innerHeight - margin) {
      top = rect.top - popRect.height - gap;
    }
    if (top < margin) {
      top = margin;
    }

    popover.style.top = top + 'px';
    popover.style.left = left + 'px';
  }

  function showFootnotePreview(anchor, body) {
    if (!anchor || !body) return;
    var href = anchor.getAttribute('href') || '';
    if (href.charAt(0) !== '#') return;
    var fnId = href.slice(1);
    var fnEl = body.querySelector('#' + CSS.escape(fnId));
    if (!fnEl) return;

    var popover = ensureFootnotePreviewElement();
    var num = anchor.textContent.trim();
    var content = fnEl.cloneNode(true);
    var backref = content.querySelector('.footnote-backref');
    if (backref) backref.remove();

    popover.innerHTML =
      '<div class="footnote-preview-label">' + escapeHtml(num) + '</div>' +
      '<div class="footnote-preview-body">' + content.innerHTML + '</div>';

    popover.hidden = false;
    popover.style.visibility = 'hidden';
    positionFootnotePreview(anchor, popover);
    popover.style.visibility = '';
    popover.setAttribute('data-anchor-id', fnId);
  }

  function setupFootnotePreviews(body) {
    if (!body) return;
    var refs = body.querySelectorAll('.footnote-ref a[href^="#fn-"]');
    if (!refs.length) return;

    var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    refs.forEach(function (anchor) {
      anchor.setAttribute('aria-describedby', 'footnote-preview');

      if (supportsHover) {
        anchor.addEventListener('mouseenter', function () {
          if (footnotePreviewHideTimer) {
            clearTimeout(footnotePreviewHideTimer);
            footnotePreviewHideTimer = null;
          }
          showFootnotePreview(anchor, body);
        });
        anchor.addEventListener('mouseleave', function (e) {
          var related = e.relatedTarget;
          if (related && footnotePreviewEl && footnotePreviewEl.contains(related)) return;
          footnotePreviewHideTimer = setTimeout(hideFootnotePreview, 120);
        });
      }

      anchor.addEventListener('focus', function () {
        if (footnotePreviewHideTimer) {
          clearTimeout(footnotePreviewHideTimer);
          footnotePreviewHideTimer = null;
        }
        showFootnotePreview(anchor, body);
      });
      anchor.addEventListener('blur', function () {
        footnotePreviewHideTimer = setTimeout(hideFootnotePreview, 120);
      });
    });
  }

  function restoreMathAndMarks(html, mathStore) {
    if (!mathStore) return html;
    html = html.replace(/%%MATH(\d+)%%/g, function (m, idx) {
      var item = mathStore[parseInt(idx, 10)];
      if (!item) return m;
      if (item.display) {
        return '<div class="math-display" data-math="' + encodeURIComponent(item.tex) + '"></div>';
      }
      return '<span class="math-inline" data-math="' + encodeURIComponent(item.tex) + '"></span>';
    });
    html = html.replace(/%%MARK_START%%/g, '<mark>');
    html = html.replace(/%%MARK_END%%/g, '</mark>');
    return html;
  }

  function assignHeadingIds(container) {
    if (!container) return;
    var used = {};
    container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function (h) {
      if (h.closest('.footnotes')) return;
      var base = headingToSlug(h.textContent);
      if (!base) return;
      var slug = base;
      if (used[base]) {
        slug = base + '-' + used[base];
        used[base]++;
      } else {
        used[base] = 1;
      }
      h.id = slug;
    });
  }

  function scrollToElement(el) {
    if (!el) return;
    var headerH = 80;
    var top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function setupInternalLinks(body) {
    if (!body) return;
    body.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.classList.add('internal-link');
      a.addEventListener('click', function (e) {
        var raw = a.getAttribute('href').slice(1);
        if (!raw) return;
        var id = decodeURIComponent(raw);
        var target = document.getElementById(id);
        if (!target && body.querySelector) {
          target = body.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
        }
        if (target) {
          e.preventDefault();
          scrollToElement(target);
          if (history.replaceState) {
            history.replaceState(null, '', '#' + encodeURIComponent(id));
          }
        }
      });
    });
  }

  function transformCallouts(container) {
    if (!container) return;
    container.querySelectorAll('blockquote').forEach(function (bq) {
      var firstP = bq.querySelector('p');
      if (!firstP) return;

      var html = firstP.innerHTML;
      var match = html.match(/^\s*\[!([\w-]+)\]([+-]?)\s*/);
      if (!match) return;

      var type = match[1].toLowerCase();
      var afterMatch = html.slice(match[0].length);
      var breakIdx = afterMatch.search(/\n|<br\s*\/?>/i);
      var title, remaining;

      if (breakIdx >= 0) {
        title = afterMatch.substring(0, breakIdx).trim();
        remaining = afterMatch.substring(breakIdx).replace(/^(\n|<br\s*\/?>)/i, '').trim();
      } else {
        title = afterMatch.trim();
        remaining = '';
      }

      if (!title) title = type.charAt(0).toUpperCase() + type.slice(1);

      var contentDiv = document.createElement('div');
      contentDiv.className = 'callout-content';
      var hasContent = false;

      if (remaining) {
        var p = document.createElement('p');
        p.innerHTML = remaining;
        contentDiv.appendChild(p);
        hasContent = true;
      }

      while (bq.children.length > 0) {
        var child = bq.children[0];
        if (child === firstP) { bq.removeChild(child); continue; }
        contentDiv.appendChild(child);
        hasContent = true;
      }

      var callout = document.createElement('div');
      callout.className = 'callout callout-' + type;

      var startCollapsed = match[2] === '-';
      if (hasContent && startCollapsed) callout.classList.add('callout-collapsed');

      var titleEl = document.createElement(hasContent ? 'button' : 'div');
      titleEl.className = 'callout-title';
      if (hasContent) {
        titleEl.type = 'button';
        titleEl.setAttribute('aria-expanded', startCollapsed ? 'false' : 'true');
        titleEl.innerHTML =
          '<svg class="callout-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
          '<span class="callout-title-text">' + title + '</span>';
        titleEl.addEventListener('click', function () {
          var collapsed = callout.classList.toggle('callout-collapsed');
          titleEl.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        });
      } else {
        titleEl.innerHTML = title;
      }
      callout.appendChild(titleEl);

      if (hasContent) callout.appendChild(contentDiv);
      bq.parentNode.replaceChild(callout, bq);
    });
  }

  function renderMath(container) {
    if (typeof katex === 'undefined' || !container) return;

    container.querySelectorAll('.math-display').forEach(function (el) {
      var raw = el.getAttribute('data-math');
      if (raw == null) return;
      try {
        katex.render(decodeURIComponent(raw), el, {
          displayMode: true, throwOnError: false
        });
      } catch (e) { /* fallback: raw tex stays visible */ }
    });

    container.querySelectorAll('.math-inline').forEach(function (el) {
      var raw = el.getAttribute('data-math');
      if (raw == null) return;
      try {
        katex.render(decodeURIComponent(raw), el, {
          displayMode: false, throwOnError: false
        });
      } catch (e) { /* fallback: raw tex stays visible */ }
    });
  }

  // --- Table of Contents ---

  var tocEl = document.getElementById('writing-toc');
  var tocInlineEl = document.getElementById('writing-toc-inline');
  var tocScrollHandler = null;
  var tocInlineChevronSvg = '<svg class="toc-inline-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  function showTOC() { if (tocEl) tocEl.classList.add('visible'); }
  function hideTOC() { if (tocEl) tocEl.classList.remove('visible'); }

  var tocBackBtnHtml = '<button id="writing-back-toc" class="writing-back-btn writing-back-btn-toc" type="button">&larr; Back to list</button>';
  var tocChevronSvg = '<svg class="toc-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  function buildTOCTree(headings) {
    var root = { level: 0, children: [] };
    var stack = [root];

    headings.forEach(function (h) {
      var level = parseInt(h.tagName[1], 10);
      var node = { heading: h, level: level, children: [] };

      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    });

    return root.children;
  }

  function renderTOCNodes(nodes) {
    if (!nodes.length) return '';
    var html = '<ul class="toc-list">';
    nodes.forEach(function (node) {
      var hasChildren = node.children.length > 0;
      html += '<li class="toc-item toc-level-' + node.level + (hasChildren ? ' toc-has-children' : '') + '">';
      html += '<div class="toc-row">';
      if (hasChildren) {
        html += '<button type="button" class="toc-toggle" aria-expanded="true" aria-label="Toggle section">' +
          tocChevronSvg + '</button>';
      } else {
        html += '<span class="toc-toggle-spacer" aria-hidden="true"></span>';
      }
      html += '<a class="toc-link" href="#' + escapeAttr(node.heading.id) + '">' +
        escapeHtml(node.heading.textContent) + '</a>';
      html += '</div>';
      if (hasChildren) {
        html += '<div class="toc-children-wrap">' + renderTOCNodes(node.children) + '</div>';
      }
      html += '</li>';
    });
    html += '</ul>';
    return html;
  }

  function buildTOC(body) {
    if (!tocEl || !body) return;
    var allHeadings = body.querySelectorAll('h1, h2, h3, h4');
    var headings = Array.prototype.filter.call(allHeadings, function (h) {
      return !h.closest('.callout');
    });
    if (headings.length < 2) {
      tocEl.innerHTML = tocBackBtnHtml;
      if (tocInlineEl) tocInlineEl.innerHTML = '';
      showTOC();
      return;
    }

    headings.forEach(function (h, i) {
      if (!h.id) h.id = 'heading-' + i;
    });

    var tree = buildTOCTree(headings);
    var html = '<div class="toc-title">Contents</div>' + renderTOCNodes(tree) + tocBackBtnHtml;
    tocEl.innerHTML = html;

    tocEl.querySelectorAll('.toc-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = btn.closest('.toc-item');
        if (!item) return;
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        item.classList.toggle('toc-collapsed', expanded);
      });
    });

    var links = tocEl.querySelectorAll('.toc-link');
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(a.getAttribute('href').slice(1));
        if (target) scrollToElement(target);
      });
    });

    // Inline TOC for mobile (≤1200px)
    var inlineLinks = [];
    if (tocInlineEl) {
      var inlineHtml = '<button type="button" class="toc-inline-toggle" aria-expanded="false">' +
        '<span class="toc-inline-title">Contents</span>' + tocInlineChevronSvg + '</button>' +
        '<div class="toc-inline-body" hidden>' + renderTOCNodes(tree) + '</div>';
      tocInlineEl.innerHTML = inlineHtml;

      var inlineToggleBtn = tocInlineEl.querySelector('.toc-inline-toggle');
      var inlineBody = tocInlineEl.querySelector('.toc-inline-body');
      inlineToggleBtn.addEventListener('click', function () {
        var expanded = inlineToggleBtn.getAttribute('aria-expanded') === 'true';
        inlineToggleBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        inlineBody.hidden = expanded;
      });

      tocInlineEl.querySelectorAll('.toc-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var item = btn.closest('.toc-item');
          if (!item) return;
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          item.classList.toggle('toc-collapsed', expanded);
        });
      });

      inlineLinks = Array.prototype.slice.call(tocInlineEl.querySelectorAll('.toc-link'));
      inlineLinks.forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var target = document.getElementById(a.getAttribute('href').slice(1));
          if (target) scrollToElement(target);
          inlineToggleBtn.setAttribute('aria-expanded', 'false');
          inlineBody.hidden = true;
        });
      });
    }

    if (tocScrollHandler) window.removeEventListener('scroll', tocScrollHandler);
    tocScrollHandler = function () {
      var headerH = 80;
      var activeIdx = 0;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= headerH + 20) activeIdx = i;
      }
      links.forEach(function (a, j) {
        a.classList.toggle('active', j === activeIdx);
      });
      inlineLinks.forEach(function (a, j) {
        a.classList.toggle('active', j === activeIdx);
      });

      var activeLink = links[activeIdx];
      if (activeLink) {
        var ancestor = activeLink.closest('.toc-item');
        while (ancestor) {
          if (ancestor.classList.contains('toc-collapsed')) {
            ancestor.classList.remove('toc-collapsed');
            var ancestorToggle = ancestor.querySelector(':scope > .toc-row > .toc-toggle');
            if (ancestorToggle) ancestorToggle.setAttribute('aria-expanded', 'true');
          }
          ancestor = ancestor.parentElement ? ancestor.parentElement.closest('.toc-item') : null;
        }
      }
    };
    window.addEventListener('scroll', tocScrollHandler, { passive: true });
    tocScrollHandler();
    showTOC();
  }

  function clearTOC() {
    hideTOC();
    if (tocEl) tocEl.innerHTML = '';
    if (tocInlineEl) tocInlineEl.innerHTML = '';
    if (tocScrollHandler) {
      window.removeEventListener('scroll', tocScrollHandler);
      tocScrollHandler = null;
    }
  }

  // --- Writings rendering ---

  if (typeof writings !== 'undefined') {
    var writingsList = document.getElementById('writings-list');
    var writingDetail = document.getElementById('writing-detail');
    var writingContent = document.getElementById('writing-content');
    var writingBackBtn = document.getElementById('writing-back');
    var writingBackBottomBtn = document.getElementById('writing-back-bottom');
    var currentRouteSlug = null;

    function showWritingsList() {
      if (writingsList) writingsList.style.display = '';
      if (writingDetail) writingDetail.style.display = 'none';
      if (showMoreWrap) showMoreWrap.style.display = '';
      hideFootnotePreview();
      clearTOC();
      applyFilters();
    }

    function showWritingDetail() {
      if (writingsList) writingsList.style.display = 'none';
      if (writingDetail) writingDetail.style.display = '';
      if (showMoreWrap) showMoreWrap.style.display = 'none';
    }

    function formatDate(dateStr) {
      if (dateStr == null || String(dateStr).trim() === '') return '';
      var d = new Date(dateStr + 'T00:00:00');
      if (Number.isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function loadPost(writing) {
      if (!writing || !writing.file) {
        if (writingContent) writingContent.innerHTML = '<p class="writing-error">Invalid post.</p>';
        return;
      }
      showWritingDetail();
      hideFootnotePreview();
      writingContent.innerHTML = '<p class="writing-loading">Loading…</p>';
      Promise.all([
        ensurePostLibs(),
        fetch(encodeURI(writing.file)).then(function (res) {
          if (!res.ok) throw new Error('Failed to load post');
          return res.text();
        })
      ])
        .then(function (arr) {
          var md = arr[1];
          var baseDir = writing.file.substring(0, writing.file.lastIndexOf('/') + 1);
          var result = preprocessObsidian(md, baseDir);
          var html = marked.parse(result.md);
          html = restoreFootnotes(html, result.footnotes);
          html = restoreMathAndMarks(html, result.mathStore);
          writingContent.innerHTML =
            '<time class="writing-date">' + escapeHtml(formatDate(writing.date || '')) + '</time>' +
            '<div class="writing-body">' + html + '</div>';

          var body = writingContent.querySelector('.writing-body');
          if (!body) return;
          assignHeadingIds(body);
          transformCallouts(body);
          renderMath(body);
          if (typeof hljs !== 'undefined') {
            body.querySelectorAll('pre code').forEach(function (el) {
              hljs.highlightElement(el);
            });
          }
          buildTOC(body);
          setupInternalLinks(body);
          setupFootnotePreviews(body);
        })
        .catch(function () {
          writingContent.innerHTML = '<p class="writing-error">Could not load this post.</p>';
        });
      var writingsSection = document.getElementById('writings');
      if (writingsSection) {
        writingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (writingsList) {
      var catLabels = (typeof writingCategories !== 'undefined') ? writingCategories : {};

      var sortedWritings = writings.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      var catCounts = {};
      sortedWritings.forEach(function (w) {
        if (w.category) catCounts[w.category] = (catCounts[w.category] || 0) + 1;
      });

      var searchIndexData = (typeof searchIndex !== 'undefined') ? searchIndex : {};
      var filtersHtml = '<div class="writings-search-wrap">' +
        '<input type="search" id="writings-search" class="writings-search-input" placeholder="Search posts (title + content)…" aria-label="Search posts">' +
        '</div>' +
        '<div class="writings-filters">' +
        '<button class="filter-btn active" data-category="all">All (' + sortedWritings.length + ')</button>';
      Object.keys(catCounts).forEach(function (cat) {
        filtersHtml += '<button class="filter-btn" data-category="' + escapeAttr(cat) + '">' +
          escapeHtml(catLabels[cat] || cat) + ' (' + catCounts[cat] + ')</button>';
      });
      filtersHtml += '</div>';
      filtersHtml += '<p id="writings-no-results" class="writings-no-results" style="display:none">No posts match your search.</p>';
      writingsList.insertAdjacentHTML('beforebegin', filtersHtml);

      var POSTS_VISIBLE_INITIAL = 5;
      var expanded = false;

      writingsList.innerHTML = sortedWritings
        .map(function (w, i) {
          var catTag = catLabels[w.category] || w.category || '';
          return (
            '<article class="writing-card" data-index="' + i + '" data-category="' + escapeAttr(w.category || '') + '" tabindex="0" role="button">' +
            '<div class="writing-card-meta">' +
              '<time class="writing-card-date">' + escapeHtml(formatDate(w.date)) + '</time>' +
              (catTag ? '<span class="writing-card-tag">' + escapeHtml(catTag) + '</span>' : '') +
            '</div>' +
            '<h3 class="writing-card-title">' + escapeHtml(w.title) + '</h3>' +
            '<p class="writing-card-summary">' + escapeHtml(w.summary) + '</p>' +
            '<span class="writing-card-read">Read more &rarr;</span>' +
            '</article>'
          );
        })
        .join('');

      writingsList.insertAdjacentHTML('afterend',
        '<div id="writings-show-more-wrap" class="writings-show-more-wrap" style="display:none">' +
        '<button type="button" id="writings-show-more-btn" class="writings-show-more-btn">Show more</button>' +
        '</div>');

      var searchInput = writingsList.parentElement.querySelector('#writings-search');
      var noResultsEl = writingsList.parentElement.querySelector('#writings-no-results');
      var showMoreWrap = writingsList.parentElement.querySelector('#writings-show-more-wrap');
      var showMoreBtn = writingsList.parentElement.querySelector('#writings-show-more-btn');

      function getSearchQuery() {
        return searchInput ? searchInput.value.trim().toLowerCase() : '';
      }

      function matchesSearch(w) {
        var q = getSearchQuery();
        if (!q) return true;
        var indexEntry = searchIndexData[w.slug];
        var text = (w.title + ' ' + (indexEntry ? indexEntry.text : (w.summary || ''))).toLowerCase();
        return text.indexOf(q) !== -1;
      }

      function applyFilters() {
        var filtersEl = writingsList.parentElement.querySelector('.writings-filters');
        var activeBtn = filtersEl ? filtersEl.querySelector('.filter-btn.active') : null;
        var cat = (activeBtn && activeBtn.getAttribute('data-category')) || 'all';
        var matchingCards = [];
        writingsList.querySelectorAll('.writing-card').forEach(function (card) {
          var idx = parseInt(card.getAttribute('data-index'), 10);
          var w = sortedWritings[idx];
          var match = w && matchesSearch(w) && (cat === 'all' || (w.category || '') === cat);
          if (match) matchingCards.push(card);
        });
        var limit = expanded ? matchingCards.length : POSTS_VISIBLE_INITIAL;
        var visibleCards = matchingCards.slice(0, limit);
        writingsList.querySelectorAll('.writing-card').forEach(function (card) {
          card.style.display = visibleCards.indexOf(card) !== -1 ? '' : 'none';
        });
        if (noResultsEl) noResultsEl.style.display = matchingCards.length === 0 ? '' : 'none';
        if (showMoreWrap && showMoreBtn) {
          if (matchingCards.length > POSTS_VISIBLE_INITIAL) {
            showMoreWrap.style.display = '';
            showMoreBtn.textContent = expanded
              ? 'Show less'
              : 'Show more (' + (matchingCards.length - POSTS_VISIBLE_INITIAL) + ')';
          } else {
            showMoreWrap.style.display = 'none';
          }
        }
      }

      var filtersEl = writingsList.parentElement.querySelector('.writings-filters');
      if (filtersEl) {
        filtersEl.addEventListener('click', function (e) {
          var btn = e.target.closest('.filter-btn');
          if (!btn) return;
          filtersEl.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          applyFilters();
        });
      }
      if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
        searchInput.addEventListener('search', applyFilters);
      }
      if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
          expanded = !expanded;
          applyFilters();
        });
      }

      applyFilters();

      function openCardAt(index) {
        var w = sortedWritings[index];
        if (!w) return;
        if (history.pushState) {
          history.pushState(null, '', '#p/' + w.slug);
          handleRoute();
        } else {
          loadPost(w);
        }
      }

      // Hash-based routing so individual posts are shareable and the
      // browser back/forward buttons move in and out of a post.
      function handleRoute() {
        var m = location.hash.match(/^#p\/(.+)$/);
        if (m) {
          var slug = decodeURIComponent(m[1]);
          if (slug === currentRouteSlug && writingDetail && writingDetail.style.display !== 'none') return;
          for (var i = 0; i < sortedWritings.length; i++) {
            if (sortedWritings[i].slug === slug) {
              currentRouteSlug = slug;
              loadPost(sortedWritings[i]);
              return;
            }
          }
        }
        currentRouteSlug = null;
        if (writingDetail && writingDetail.style.display !== 'none') showWritingsList();
      }

      window.addEventListener('hashchange', handleRoute);
      window.addEventListener('popstate', handleRoute);

      writingsList.addEventListener('click', function (e) {
        var card = e.target.closest('.writing-card');
        if (!card) return;
        openCardAt(parseInt(card.getAttribute('data-index'), 10));
      });

      writingsList.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var card = e.target.closest('.writing-card');
        if (!card) return;
        e.preventDefault();
        openCardAt(parseInt(card.getAttribute('data-index'), 10));
      });

      // Honor a deep link (e.g. arriving at /#p/some-slug directly).
      if (/^#p\//.test(location.hash)) handleRoute();
    }

    function goBackToWritingsList() {
        currentRouteSlug = null;
        showWritingsList();
        if (history.replaceState && location.hash.indexOf('#p/') === 0) {
          history.replaceState(null, '', '#writings');
        }
        var writingsSection = document.getElementById('writings');
        if (writingsSection) {
          writingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (writingBackBtn) {
      writingBackBtn.addEventListener('click', goBackToWritingsList);
    }

    if (writingBackBottomBtn) {
      writingBackBottomBtn.addEventListener('click', goBackToWritingsList);
    }

    if (writingDetail) {
      writingDetail.addEventListener('click', function (e) {
        var backBtn = e.target.closest('#writing-back, #writing-back-bottom, #writing-back-toc');
        if (!backBtn) return;
        goBackToWritingsList();
      });
    }
  }

  // Render experiences timeline from experiences.js
  if (typeof experiences !== 'undefined') {
    const timeline = document.getElementById('experiences-timeline');
    if (timeline) {
      timeline.innerHTML = experiences
        .map(function (exp) {
          var bulletsHtml = (exp.bullets || [])
            .map(function (b) {
              return '<li>' + escapeHtml(b) + '</li>';
            })
            .join('');
          var typeLabel = exp.type === 'work' ? 'Experience' : 'Education';
          return (
            '<article class="timeline-item timeline-item--' + escapeAttr(exp.type) + '">' +
            '<div class="timeline-marker"></div>' +
            '<div class="timeline-content">' +
            '<span class="timeline-type">' + escapeHtml(typeLabel) + '</span>' +
            '<h3 class="timeline-title">' + escapeHtml(exp.title) + '</h3>' +
            '<p class="timeline-org">' + escapeHtml(exp.org) + '</p>' +
            '<p class="timeline-meta">' + escapeHtml(exp.period) + ' · ' + escapeHtml(exp.location) + '</p>' +
            '<ul class="timeline-bullets">' + bulletsHtml + '</ul>' +
            '</div>' +
            '</article>'
          );
        })
        .join('');
    }
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})();
