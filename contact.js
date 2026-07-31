(function initContactPage() {
  const nav = document.getElementById('mainNav');
  if (!nav || typeof siteData === 'undefined') return;
  nav.innerHTML = (siteData.navGroups || [{ label: 'Menu', items: siteData.nav }])
    .map((group) => `
      <details class="nav-group ${group.items.some((item) => item.key === 'contact') ? 'active' : ''}">
        <summary>${group.label}</summary>
        <div class="nav-menu">
          ${group.items.map((item) => `<a class="${item.key === 'contact' ? 'active' : ''}" href="${item.href}">${item.label}</a>`).join('')}
        </div>
      </details>
    `)
    .join('');
})();
