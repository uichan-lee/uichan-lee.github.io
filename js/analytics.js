(function () {
  var WORKER = 'https://goatcounter-proxy.rickylee7185.workers.dev';

  function fmt(n) {
    return n == null ? '–' : n.toLocaleString();
  }

  function loadStats() {
    var isKo = document.documentElement.lang === 'ko';
    fetch(WORKER)
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data) return;
        var el = document.getElementById('visitor-stats');
        if (!el) return;
        el.textContent = isKo
          ? '오늘: ' + fmt(data.todayCount) + ' · 이번 달: ' + fmt(data.monthCount) + ' · 전체: ' + fmt(data.totalCount)
          : 'Today: ' + fmt(data.todayCount) + ' · This month: ' + fmt(data.monthCount) + ' · Total: ' + fmt(data.totalCount);
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStats);
  } else {
    loadStats();
  }
})();
