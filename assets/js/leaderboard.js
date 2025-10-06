(async function () {
  const status = document.getElementById('lb-status');
  const tbody = document.querySelector('#leaderboard tbody');

  function fmtTime(run) {
    return run.time_display || `${run.time_seconds}s`;
  }

  function rowHTML(run, idx) {
    const v = run.video_url ? `<a href="${run.video_url}" target="_blank">Watch</a>` : '';
    return `
      <tr>
        <td>${idx}</td>
        <td>${run.game}</td>
        <td>${run.category}</td>
        <td>${run.runner}</td>
        <td><strong>${fmtTime(run)}</strong></td>
        <td>${run.platform}</td>
        <td>${run.date}</td>
        <td>${v}</td>
        <td class="muted">Verified by ${run.verified_by} on ${run.verified_at}</td>
      </tr>
    `;
  }

  try {
    status.textContent = 'Loading leaderboard…';
    const res = await fetch('/data/leaderboard.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    tbody.innerHTML = '';
    data.forEach((run, i) => {
      tbody.insertAdjacentHTML('beforeend', rowHTML(run, i + 1));
    });

    status.textContent = `Showing ${data.length} run(s).`;
  } catch (err) {
    console.error(err);
    status.textContent = 'Unable to load leaderboard right now.';
  }
})();
