// docs/assets/tabs.js
const TABS = [
    { href: "../pages/sheet_01.html", label: "混沌の魔法書" },
    { href: "../pages/sheet_02.html", label: "光沢の混沌の魔法書" },
    { href: "../pages/sheet_03.html", label: "増幅版" },
    // ... 12個
  ];
  
  function renderTabs(activeHref) {
    const host = document.getElementById("tabs");
    if (!host) return;
  
    host.innerHTML = TABS.map(t => {
      const active = activeHref.endsWith(t.href.replace("../", ""));
      return `
        <a class="tab ${active ? "is-active" : ""}" href="${t.href}">
          ${escapeHtml(t.label)}
        </a>
      `;
    }).join("");
  }
  
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
  
  // 各ページで <body data-active="pages/sheet_01.html"> みたいに持たせる
  document.addEventListener("DOMContentLoaded", () => {
    const active = document.body.dataset.active || "";
    renderTabs(active);
  });
  