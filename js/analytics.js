(function () {
  var WORKER = 'https://goatcounter-proxy.rickylee7185.workers.dev';

  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtDate(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function fetchHits(start, end) {
    return fetch(WORKER + '?start=' + start + '&end=' + end)
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) { return data ? data.count : null; })
      .catch(function () { return null; });
  }

  function fmt(n) {
    return n == null ? '–' : n.toLocaleString();
  }

  function loadStats() {
    var today = new Date();
    var todayStr = fmtDate(today);
    var monthStart = fmtDate(new Date(today.getFullYear(), today.getMonth(), 1));

    Promise.all([
      fetchHits(todayStr, todayStr),
      fetchHits(monthStart, todayStr),
      fetchHits('2020-01-01', todayStr),
    ]).then(function (results) {
      var el = document.getElementById('visitor-stats');
      if (!el) return;
      el.textContent = 'Today: ' + fmt(results[0]) + ' · This month: ' + fmt(results[1]) + ' · Total: ' + fmt(results[2]);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStats);
  } else {
    loadStats();
  }
})();
