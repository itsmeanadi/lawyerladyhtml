/**
 * The Lawyer Lady — Legal Knowledge Hub Controller
 * Manages article categorization, searching, and in-depth reading views.
 */

const KnowledgeHub = {
  activeCategory: "all",
  searchQuery: "",

  init() {
    this.renderCategoryPills();
    this.renderArticlesGrid();
    this.bindSearchEvent();
  },

  bindSearchEvent() {
    const input = document.getElementById("knowledgeSearchInput");
    if (input) {
      input.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderArticlesGrid();
      });
    }
  },

  renderCategoryPills() {
    const container = document.getElementById("knowledgeCategoriesWrap");
    if (!container) return;

    const categories = [
      { id: "all", label: "All Insights" },
      { id: "family", label: "Family Law" },
      { id: "property", label: "Property Law" },
      { id: "criminal", label: "Criminal Law" },
      { id: "consumer", label: "Consumer Protection" },
      { id: "cybercrime", label: "Cybercrime" },
      { id: "business", label: "Business & Contracts" },
      { id: "employment", label: "Employment Law" }
    ];

    container.innerHTML = categories.map(cat => `
      <button class="cat-pill ${this.activeCategory === cat.id ? 'active' : ''}" onclick="KnowledgeHub.setCategory('${cat.id}')">
        ${cat.label}
      </button>
    `).join("");
  },

  setCategory(catId) {
    this.activeCategory = catId;
    this.renderCategoryPills();
    this.renderArticlesGrid();
  },

  renderArticlesGrid() {
    const container = document.getElementById("knowledgeArticlesGrid");
    if (!container) return;

    const filtered = APP_DATA.articles.filter(art => {
      const matchCat = this.activeCategory === 'all' || art.categoryKey === this.activeCategory;
      const matchSearch = !this.searchQuery || 
        art.title.toLowerCase().includes(this.searchQuery) ||
        art.excerpt.toLowerCase().includes(this.searchQuery) ||
        art.category.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3.5rem 1.5rem; background:rgba(15, 23, 42, 0.6); border-radius:var(--radius-xl); border:1px dashed var(--border-medium);">
          <i class="fa-solid fa-book-open" style="font-size:2.5rem; color:var(--gold-400); margin-bottom:1rem;"></i>
          <h4 style="color:#ffffff; font-size:1.35rem; font-family:var(--font-serif);">No Guides Found</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.35rem;">Try modifying your search query or select a different legal practice category above.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(art => `
      <div class="article-card" onclick="KnowledgeHub.openArticleModal('${art.id}')">
        <div>
          <div class="article-category">${art.category}</div>
          <h3 class="article-title">${art.title}</h3>
          <p class="article-excerpt">${art.excerpt}</p>
        </div>

        <div class="article-meta-row">
          <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
          <span style="font-weight:600; color:var(--gold-400); display:flex; align-items:center; gap:0.35rem;">
            Read Guide <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    `).join("");
  },

  openArticleModal(artId) {
    const art = APP_DATA.articles.find(a => a.id === artId);
    if (!art) return;

    const modal = document.getElementById("articleReaderModal");
    const title = document.getElementById("articleModalTitle");
    const body = document.getElementById("articleModalBody");
    if (!modal || !title || !body) return;

    title.textContent = art.title;
    body.innerHTML = `
      <div style="margin-bottom:1.5rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <span class="domain-badge">${art.category}</span>
          <span style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono);">
            <i class="fa-regular fa-calendar"></i> Published: ${art.publishedDate}
          </span>
        </div>
        <span style="font-size:0.825rem; color:var(--gold-300); font-weight:600;">
          <i class="fa-solid fa-user-check" style="color:var(--gold-400);"></i> Reviewed by: ${art.verifiedBy}
        </span>
      </div>

      <div style="font-size:1.1rem; line-height:1.7; color:#ffffff; font-weight:500; margin-bottom:1.75rem; background:rgba(212, 175, 55, 0.08); padding:1.5rem; border-radius:var(--radius-md); border-left:4px solid var(--gold-400); font-family:var(--font-serif);">
        ${art.intro}
      </div>

      <div style="margin-bottom:1.75rem;">
        <h4 style="font-size:1.25rem; color:#ffffff; margin-bottom:0.75rem; font-family:var(--font-serif);">Legal Overview & Framework</h4>
        <p style="font-size:0.95rem; line-height:1.7; color:var(--text-secondary); margin-bottom:1rem;">
          ${art.generalInfo}
        </p>
      </div>

      <div style="margin-bottom:1.75rem;">
        <h4 style="font-size:1.25rem; color:#ffffff; margin-bottom:0.75rem; font-family:var(--font-serif);">Key Procedural Steps in India</h4>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${art.proceduralSteps.map(step => `
            <div style="background:rgba(15, 23, 42, 0.7); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem 1.25rem; font-size:0.925rem; line-height:1.55; color:#f1f5f9;">
              ${step}
            </div>
          `).join("")}
        </div>
      </div>

      <div style="margin-bottom:2rem; background:rgba(8, 12, 24, 0.7); border:1px solid var(--border-medium); border-radius:var(--radius-lg); padding:1.75rem;">
        <h4 style="font-size:1.2rem; color:#ffffff; margin-bottom:0.85rem; font-family:var(--font-serif);">
          <i class="fa-solid fa-comments" style="color:var(--gold-400); margin-right:0.4rem;"></i>
          5 Essential Questions to Ask Your Advocate
        </h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.65rem;">
          ${art.questionsToAsk.map(q => `
            <li style="display:flex; align-items:flex-start; gap:0.65rem; font-size:0.9rem; color:#cbd5e1;">
              <i class="fa-solid fa-circle-question" style="color:var(--gold-400); margin-top:3px;"></i>
              <span>${q}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- Consultation CTA Banner -->
      <div style="background:linear-gradient(135deg, rgba(20, 30, 55, 0.9) 0%, rgba(10, 16, 32, 0.95) 100%); border:1px solid var(--border-gold); color:#fff; border-radius:var(--radius-xl); padding:2rem; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        <h4 style="color:#ffffff; font-size:1.35rem; margin-bottom:0.5rem; font-family:var(--font-serif);">${art.ctaText}</h4>
        <p style="color:#cbd5e1; font-size:0.9rem; max-width:540px; margin:0 auto 1.5rem;">
          Initiate a structured consultation brief. Request an immediate connection or schedule a chamber appointment.
        </p>
        <button class="btn btn-gold btn-lg" onclick="KnowledgeHub.startConsultationFromArticle('${art.ctaDomain}')">
          <span>Find ${art.category} Advocates</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <!-- Legal Disclaimer -->
      <div style="margin-top:1.5rem; text-align:center; font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
        <em>Disclaimer: This article is strictly for educational and legal literacy purposes under Section 29 of the Advocates Act. It does not constitute formal legal advice or an advocate-client relationship.</em>
      </div>
    `;

    modal.classList.add("active");
  },

  startConsultationFromArticle(domainId) {
    App.closeModal("articleReaderModal");
    App.navigateTo("user_flow");
    if (window.UserFlow) {
      window.UserFlow.setDomain(domainId);
      window.UserFlow.goToStep(1);
    }
    App.showToast(`Selected ${domainId.toUpperCase()} domain for consultation.`, "info");
  }
};

window.KnowledgeHub = KnowledgeHub;
