(function initProgressTracker() {
  const style = document.createElement('style');
  style.textContent = `
    .progress-dock{position:fixed;left:14px;bottom:14px;z-index:9998;display:grid;gap:8px;max-width:min(92vw,340px)}
    .progress-toggle,.progress-panel button{border:1px solid rgba(255,221,87,.32);border-radius:999px;background:rgba(4,8,20,.86);color:#f4fbff;padding:10px 14px;font-weight:800;cursor:pointer}
    .progress-panel{display:none;gap:10px;padding:14px;border:1px solid rgba(255,221,87,.24);border-radius:18px;background:rgba(4,8,20,.92);color:#f4fbff;box-shadow:0 18px 50px rgba(0,0,0,.35)}
    .progress-panel.open{display:grid}
    .progress-switch{display:flex;gap:10px;align-items:center;color:inherit;font-weight:800}
    .progress-switch input{width:20px;height:20px}
    .progress-badges{display:flex;flex-wrap:wrap;gap:8px}
    .progress-badges span{padding:6px 10px;border:1px solid rgba(255,221,87,.28);border-radius:999px;background:rgba(255,221,87,.1);color:#ffdd57;font-size:.84rem;font-weight:800}
    .progress-actions{display:flex;flex-wrap:wrap;gap:8px}.progress-actions a{color:#3ff3ff}
    @media(max-width:620px){.progress-dock{left:10px;right:10px;bottom:66px}.progress-panel{max-height:42vh;overflow:auto}}
  `;
  document.head.appendChild(style);

  const storageKey = 'cosmicProgress';
  const enabledKey = 'cosmicProgressEnabled';
  const isEnabled = () => localStorage.getItem(enabledKey) === 'true';
  const read = () => JSON.parse(localStorage.getItem(storageKey) || '{"visits":{},"quizzes":{},"badges":{},"notes":{}}');
  const write = (data) => {
    if (isEnabled()) localStorage.setItem(storageKey, JSON.stringify(data));
  };

  window.cosmicProgress = {
    enabled: isEnabled,
    get: read,
    setEnabled(value) {
      localStorage.setItem(enabledKey, String(value));
      if (!value) localStorage.removeItem(storageKey);
      renderDock();
    },
    markVisit(title) {
      if (!isEnabled()) return;
      const data = read();
      const path = location.pathname.split('/').pop() || 'index.html';
      data.visits[path] = { title: title || document.title, at: new Date().toISOString() };
      awardBadges(data);
      write(data);
      renderDock();
    },
    markQuiz(title) {
      if (!isEnabled()) return;
      const data = read();
      const path = location.pathname.split('/').pop() || 'index.html';
      data.quizzes[path] = { title: title || document.title, at: new Date().toISOString() };
      awardBadges(data);
      write(data);
      renderDock();
    },
    saveNote(title, text) {
      if (!isEnabled()) return false;
      const data = read();
      const path = location.pathname.split('/').pop() || 'index.html';
      data.notes[path] = { title: title || document.title, text, at: new Date().toISOString() };
      write(data);
      renderDock();
      return true;
    },
    clear() {
      localStorage.removeItem(storageKey);
      renderDock();
    }
  };

  function awardBadges(data) {
    const visited = Object.keys(data.visits);
    const quizCount = Object.keys(data.quizzes).length;
    if (visited.some((path) => /lab(3|4|5|6|8|15)/.test(path))) data.badges.gravity = 'Explored Gravity';
    if (visited.some((path) => /lab(9|10|12)/.test(path))) data.badges.quantum = 'Tried Quantum & Matter';
    if (visited.some((path) => /lab(14|15|16|17)/.test(path))) data.badges.cosmos = 'Completed Cosmos Trail';
    if (quizCount >= 3) data.badges.quiz = 'Quiz Explorer';
    if (visited.length >= 8) data.badges.deep = 'Deep Space Learner';
  }

  function renderDock() {
    let dock = document.querySelector('.progress-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.className = 'progress-dock';
      document.body.appendChild(dock);
    }
    const data = read();
    const enabled = isEnabled();
    const visits = Object.keys(data.visits).length;
    const quizzes = Object.keys(data.quizzes).length;
    const badges = Object.values(data.badges);
    dock.innerHTML = `
      <button class="progress-toggle" type="button" aria-expanded="false">Progress</button>
      <div class="progress-panel">
        <label class="progress-switch"><input type="checkbox" ${enabled ? 'checked' : ''} /> Save progress on this device</label>
        <p>${enabled ? `${visits} pages visited · ${quizzes} quizzes passed` : 'Progress saving is off. Turn it on only if you want local tracking.'}</p>
        <div class="progress-badges">${badges.map((badge) => `<span>${badge}</span>`).join('') || '<span>No badges yet</span>'}</div>
        <div class="progress-actions">
          <a href="${location.pathname.includes('/labs/') ? '../progress.html' : 'progress.html'}">Open tracker</a>
          <button type="button" data-clear>Clear</button>
        </div>
      </div>
    `;
    const toggle = dock.querySelector('.progress-toggle');
    const panel = dock.querySelector('.progress-panel');
    toggle.addEventListener('click', () => {
      panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(panel.classList.contains('open')));
    });
    dock.querySelector('input').addEventListener('change', (event) => {
      window.cosmicProgress.setEnabled(event.target.checked);
    });
    dock.querySelector('[data-clear]').addEventListener('click', () => {
      window.cosmicProgress.clear();
    });
  }

  renderDock();
  window.cosmicProgress.markVisit(document.title.replace(' | Cosmic Physics Lab', ''));
})();
