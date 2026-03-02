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
