(function () {
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

  // Render writings from writings.js
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
      fetch(writing.file)
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to load post');
          return res.text();
        })
        .then(function (md) {
          var html = marked.parse(md);
          writingContent.innerHTML =
            '<time class="writing-date">' + escapeHtml(formatDate(writing.date)) + '</time>' +
            '<div class="writing-body">' + html + '</div>';
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
      writingsList.innerHTML = writings
        .map(function (w, i) {
          return (
            '<article class="writing-card" data-index="' + i + '">' +
            '<time class="writing-card-date">' + escapeHtml(formatDate(w.date)) + '</time>' +
            '<h3 class="writing-card-title">' + escapeHtml(w.title) + '</h3>' +
            '<p class="writing-card-summary">' + escapeHtml(w.summary) + '</p>' +
            '<span class="writing-card-read">Read more &rarr;</span>' +
            '</article>'
          );
        })
        .join('');

      writingsList.addEventListener('click', function (e) {
        var card = e.target.closest('.writing-card');
        if (!card) return;
        var index = parseInt(card.getAttribute('data-index'), 10);
        if (writings[index]) loadPost(writings[index]);
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
