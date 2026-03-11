(function () {
  // --- Dark mode toggle ---
  var HLJS_LIGHT = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css';
  var HLJS_DARK  = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css';

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
    }
  }

  function onScroll() {
    const headerHeight = document.querySelector('.header').offsetHeight;
    let current = 'home';
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= headerHeight + 50) {
        current = section.id;
      }
    });
    setActiveNav(current);
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

  function preprocessObsidian(md) {
    md = md.replace(/^---[\s\S]*?---\n?/, '');

    var codeStore = [];

    md = md.replace(/(```[\s\S]*?```)/g, function (m) {
      codeStore.push(m);
      return '\n%%CODE' + (codeStore.length - 1) + '%%\n';
    });
    md = md.replace(/`([^`\n]+?)`/g, function (m) {
      codeStore.push(m);
      return '%%CODE' + (codeStore.length - 1) + '%%';
    });

    md = md.replace(/\$\$([\s\S]+?)\$\$/g, function (m, tex) {
      return '\n\n<div class="math-display" data-math="' + encodeURIComponent(tex.trim()) + '"></div>\n\n';
    });
    md = md.replace(/\$([^\$\n]+?)\$/g, function (m, tex) {
      return '<span class="math-inline" data-math="' + encodeURIComponent(tex) + '"></span>';
    });

    md = md.replace(/==(.*?)==/g, '<mark>$1</mark>');

    md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (m, target, alias) {
      return alias || target;
    });

    md = md.replace(/%%CODE(\d+)%%/g, function (m, i) {
      return codeStore[parseInt(i, 10)];
    });

    return md;
  }

  function transformCallouts(container) {
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

      var callout = document.createElement('div');
      callout.className = 'callout callout-' + type;

      var titleDiv = document.createElement('div');
      titleDiv.className = 'callout-title';
      titleDiv.textContent = title;
      callout.appendChild(titleDiv);

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

      if (hasContent) callout.appendChild(contentDiv);
      bq.parentNode.replaceChild(callout, bq);
    });
  }

  function renderMath(container) {
    if (typeof katex === 'undefined') return;

    container.querySelectorAll('.math-display').forEach(function (el) {
      try {
        katex.render(decodeURIComponent(el.getAttribute('data-math')), el, {
          displayMode: true, throwOnError: false
        });
      } catch (e) { /* fallback: raw tex stays visible */ }
    });

    container.querySelectorAll('.math-inline').forEach(function (el) {
      try {
        katex.render(decodeURIComponent(el.getAttribute('data-math')), el, {
          displayMode: false, throwOnError: false
        });
      } catch (e) { /* fallback: raw tex stays visible */ }
    });
  }

  // --- Writings rendering ---

  if (typeof writings !== 'undefined') {
    var writingsList = document.getElementById('writings-list');
    var writingDetail = document.getElementById('writing-detail');
    var writingContent = document.getElementById('writing-content');
    var writingBackBtn = document.getElementById('writing-back');

    function showWritingsList() {
      writingsList.style.display = '';
      writingDetail.style.display = 'none';
    }

    function showWritingDetail() {
      writingsList.style.display = 'none';
      writingDetail.style.display = '';
    }

    function formatDate(dateStr) {
      var d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function loadPost(writing) {
      showWritingDetail();
      writingContent.innerHTML = '<p class="writing-loading">Loading…</p>';
      fetch(encodeURI(writing.file))
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to load post');
          return res.text();
        })
        .then(function (md) {
          var processed = preprocessObsidian(md);
          var html = marked.parse(processed);
          writingContent.innerHTML =
            '<time class="writing-date">' + escapeHtml(formatDate(writing.date)) + '</time>' +
            '<div class="writing-body">' + html + '</div>';

          var body = writingContent.querySelector('.writing-body');
          transformCallouts(body);
          renderMath(body);
          if (typeof hljs !== 'undefined') {
            body.querySelectorAll('pre code').forEach(function (el) {
              hljs.highlightElement(el);
            });
          }
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

      var filtersHtml = '<div class="writings-filters">' +
        '<button class="filter-btn active" data-category="all">All (' + sortedWritings.length + ')</button>';
      Object.keys(catCounts).forEach(function (cat) {
        filtersHtml += '<button class="filter-btn" data-category="' + escapeAttr(cat) + '">' +
          escapeHtml(catLabels[cat] || cat) + ' (' + catCounts[cat] + ')</button>';
      });
      filtersHtml += '</div>';
      writingsList.insertAdjacentHTML('beforebegin', filtersHtml);

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

      var filtersEl = writingsList.parentElement.querySelector('.writings-filters');
      if (filtersEl) {
        filtersEl.addEventListener('click', function (e) {
          var btn = e.target.closest('.filter-btn');
          if (!btn) return;
          var cat = btn.getAttribute('data-category');
          filtersEl.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.toggle('active', b === btn);
          });
          writingsList.querySelectorAll('.writing-card').forEach(function (card) {
            card.style.display = (cat === 'all' || card.getAttribute('data-category') === cat) ? '' : 'none';
          });
        });
      }

      function openCardAt(index) {
        if (sortedWritings[index]) loadPost(sortedWritings[index]);
      }

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
    }

    if (writingBackBtn) {
      writingBackBtn.addEventListener('click', function () {
        showWritingsList();
        var writingsSection = document.getElementById('writings');
        if (writingsSection) {
          writingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
