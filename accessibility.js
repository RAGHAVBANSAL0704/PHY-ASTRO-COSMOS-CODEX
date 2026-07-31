(function initAccessibilityControls() {
  const root = document.documentElement;
  const settings = JSON.parse(localStorage.getItem('cosmicAccessibility') || '{}');
  const style = document.createElement('style');
  style.textContent = `
    .accessibility-dock{position:fixed;right:14px;bottom:14px;z-index:9999;display:grid;gap:8px;max-width:min(92vw,310px)}
    .accessibility-toggle{border:1px solid rgba(63,243,255,.32);border-radius:999px;background:rgba(4,8,20,.86);color:#f4fbff;padding:10px 14px;font-weight:800;backdrop-filter:blur(14px);cursor:pointer}
    .accessibility-panel{display:none;border:1px solid rgba(63,243,255,.24);border-radius:18px;background:rgba(4,8,20,.92);color:#f4fbff;padding:12px;box-shadow:0 18px 50px rgba(0,0,0,.35)}
    .accessibility-panel.open{display:grid;gap:8px}
    .accessibility-panel button{border:1px solid rgba(63,243,255,.24);border-radius:12px;background:rgba(255,255,255,.07);color:inherit;padding:10px;cursor:pointer;text-align:left}
    html.high-contrast body{background:#000!important;color:#fff!important}
    html.high-contrast a{color:#7df9ff!important}
    html.high-contrast .card,html.high-contrast .item-card,html.high-contrast .source-card,html.high-contrast .study-card,html.high-contrast .formula-card{background:#050505!important;border-color:#7df9ff!important}
    html.study-light body{background:#f4f8ff!important;color:#102033!important}
    html.study-light body::before{opacity:.12}
    html.study-light .site-header,html.study-light .card,html.study-light .item-card,html.study-light .source-card,html.study-light .study-card,html.study-light .formula-card,html.study-light .page-link-card{background:rgba(255,255,255,.88)!important;color:#102033!important;border-color:rgba(39,92,140,.24)!important}
    html.study-light a{color:#0a65a8!important}
    html.study-light .muted,html.study-light p{color:#38536e}
    html.large-text{font-size:112%}
    html.reduced-motion *,html.reduced-motion *::before,html.reduced-motion *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
    @media(max-width:620px){.accessibility-dock{left:10px;right:10px;bottom:10px}.accessibility-panel{max-height:42vh;overflow:auto}}
  `;
  document.head.appendChild(style);

  const dock = document.createElement('div');
  dock.className = 'accessibility-dock';
  dock.innerHTML = `
    <button class="accessibility-toggle" type="button" aria-expanded="false">Accessibility</button>
    <div class="accessibility-panel" aria-label="Accessibility settings">
      <button type="button" data-setting="reducedMotion">Toggle reduced motion</button>
      <button type="button" data-setting="highContrast">Toggle high contrast</button>
      <button type="button" data-setting="studyLight">Toggle light study mode</button>
      <button type="button" data-setting="largeText">Toggle larger text</button>
      <button type="button" data-reset>Reset accessibility</button>
    </div>
  `;
  document.body.appendChild(dock);

  const toggle = dock.querySelector('.accessibility-toggle');
  const panel = dock.querySelector('.accessibility-panel');
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(panel.classList.contains('open')));
  });

  dock.querySelectorAll('[data-setting]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.setting;
      settings[key] = !settings[key];
      save();
      apply();
    });
  });

  dock.querySelector('[data-reset]').addEventListener('click', () => {
    Object.keys(settings).forEach((key) => delete settings[key]);
    save();
    apply();
  });

  function save() {
    localStorage.setItem('cosmicAccessibility', JSON.stringify(settings));
  }

  function apply() {
    root.classList.toggle('reduced-motion', Boolean(settings.reducedMotion));
    root.classList.toggle('high-contrast', Boolean(settings.highContrast));
    root.classList.toggle('study-light', Boolean(settings.studyLight));
    root.classList.toggle('large-text', Boolean(settings.largeText));
  }

  apply();
})();
