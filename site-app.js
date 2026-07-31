(function initSite() {
  const pageKey = document.body.dataset.page || "home";
  const page = siteData.pages[pageKey];

  if (!page) {
    return;
  }

  const verifiedLine = document.getElementById("verifiedLine");
  const pageTitle = document.getElementById("pageTitle");
  const pageIntro = document.getElementById("pageIntro");
  const statusNote = document.getElementById("statusNote");
  const mainHeading = document.getElementById("mainHeading");
  const cards = document.getElementById("cards");
  const sourceHeading = document.getElementById("sourceHeading");
  const sourceGrid = document.getElementById("sourceGrid");
  const sideColumn = document.getElementById("sideColumn");
  const contentWrap = document.getElementById("contentWrap");
  const homeLinks = document.getElementById("homeLinks");

  renderNav(pageKey);

  verifiedLine.textContent = `Science focus updated: ${formatDate(siteData.verifiedOn)}`;
  pageTitle.textContent = page.title;
  pageIntro.textContent = page.intro;
  statusNote.textContent = page.note;
  mainHeading.textContent = page.mainHeading || "";

  if (page.links && page.links.length > 0) {
    homeLinks.hidden = false;
    homeLinks.innerHTML = page.links.map(renderPageLink).join("");
  }

  if (page.explorer) {
    renderExplorer(page.items);
  }

  if (page.items && page.items.length > 0) {
    renderCards(page.items);
  }

  if (page.groups && page.groups.length > 0) {
    cards.innerHTML = page.groups.map(renderGroupCard).join("");
    sideColumn.hidden = true;
    contentWrap.classList.add("single-column");
  } else if (page.sources && page.sources.length > 0) {
    sourceHeading.textContent = page.sourceHeading || "Science sources";
    sourceGrid.innerHTML = page.sources.map(renderSourceCard).join("");
  } else {
    sideColumn.hidden = true;
    contentWrap.classList.add("single-column");
  }

  function renderNav(currentKey) {
    const nav = document.getElementById("mainNav");
    nav.innerHTML = renderGroupedNav(currentKey);
  }

  function renderGroupedNav(currentKey) {
    if (!siteData.navGroups) {
      return siteData.nav
        .map((item) => `<a class="${item.key === currentKey ? "active" : ""}" href="${item.href}">${item.label}</a>`)
        .join("");
    }
    return siteData.navGroups
      .map((group) => {
        const active = group.items.some((item) => item.key === currentKey) ? "active" : "";
        return `
          <details class="nav-group ${active}">
            <summary>${group.label}</summary>
            <div class="nav-menu">
              ${group.items.map((item) => `<a class="${item.key === currentKey ? "active" : ""}" href="${item.href}">${item.label}</a>`).join("")}
            </div>
          </details>
        `;
      })
      .join("");
  }

  function renderExplorer(items) {
    const topics = ["All", ...new Set(items.map((item) => item.topic))];
    const explorer = document.createElement("section");
    explorer.className = "dynamic-panel";
    explorer.innerHTML = `
      <div>
        <p class="panel-kicker">Dynamic explorer</p>
        <h2>Pick a curiosity trail</h2>
      </div>
      <div class="filter-row">
        ${topics.map((topic) => `<button class="filter-btn" data-topic="${topic}">${topic}</button>`).join("")}
      </div>
      <div class="spark-readout" id="sparkReadout"></div>
    `;
    homeLinks.insertAdjacentElement("afterend", explorer);

    const buttons = explorer.querySelectorAll(".filter-btn");
    const readout = explorer.querySelector("#sparkReadout");
    buttons[0].classList.add("active");
    readout.textContent = randomPrompt(items);

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const topic = button.dataset.topic;
        const filteredItems = topic === "All" ? items : items.filter((item) => item.topic === topic);
        renderCards(filteredItems);
        readout.textContent = randomPrompt(filteredItems);
      });
    });
  }

  function renderCards(items) {
    cards.innerHTML = items.map(renderItemCard).join("");
  }

  function renderPageLink(item) {
    return `
      <a class="page-link-card" href="${item.href}">
        <span class="link-orbit"></span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </a>
    `;
  }

  function renderItemCard(item) {
    return `
      <article class="item-card">
        <div class="item-top">
          <span class="badge badge-${item.status}">${formatStatus(item.status)}</span>
          <span class="item-date">${item.action}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="item-host">${item.host}</p>
        <p>${item.summary}</p>
        <ul class="meta-list">
          <li><strong>Focus:</strong> ${item.dates}</li>
          <li><strong>Best for:</strong> ${item.eligibility}</li>
          <li><strong>Curiosity hook:</strong> ${item.note}</li>
        </ul>
        <div class="card-links">${renderLinks(item.links)}</div>
      </article>
    `;
  }

  function renderSourceCard(item) {
    return `
      <article class="source-card">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <div class="card-links">${renderLinks(item.links)}</div>
      </article>
    `;
  }

  function renderGroupCard(group) {
    return `
      <section class="group-card">
        <h3>${group.title}</h3>
        <p>${group.text}</p>
        <div class="group-sources">
          ${group.sources.map(renderSourceCard).join("")}
        </div>
      </section>
    `;
  }

  function renderLinks(links) {
    return links
      .map((link) => `<a href="${link.url}" ${externalTarget(link.url)}>${link.label}</a>`)
      .join("");
  }

  function externalTarget(url) {
    return url.startsWith("http") ? 'target="_blank" rel="noreferrer"' : "";
  }

  function randomPrompt(items) {
    const prompts = items.map((item) => item.title);
    return `Next question to chase: ${prompts[Math.floor(Math.random() * prompts.length)]}`;
  }

  function formatDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function formatStatus(status) {
    const labels = {
      sim: "Simulation"
    };
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  }
})();
