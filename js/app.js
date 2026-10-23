/**
 * The Lawyer Lady — Central Application & Navigation Router
 */

const App = {
  currentView: "home",

  init() {
    this.bindNavigation();
    this.initFeaturedLawyersOnHome();
    this.initKnowledgePreviewsOnHome();
    this.initCustomCursor();

    // Initialize sub-controllers
    if (window.UserFlow) window.UserFlow.init();
    if (window.LawyerFlow) window.LawyerFlow.init();
    if (window.KnowledgeHub) window.KnowledgeHub.init();

    // Check hash on load
    this.handleRouteHash();
    window.addEventListener("hashchange", () => this.handleRouteHash());
  },

  initCustomCursor() {
    const follower = document.getElementById("cursorFollower");
    const dot = document.getElementById("cursorDot");
    if (!follower || !dot) return;

    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      follower.style.transform = `translate(${x}px, ${y}px)`;
    });

    const interactiveSel = "a, button, .domain-card, .process-card, .article-card, .lawyer-profile-card, .radio-card, .slot-chip, input, select, textarea";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveSel)) {
        follower.classList.add("cursor-hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveSel)) {
        follower.classList.remove("cursor-hover");
      }
    });
  },

  handleRouteHash() {
    const hash = window.location.hash.replace("#", "") || "home";
    this.navigateTo(hash, false);
  },

  navigateTo(viewId, updateHash = true) {
    const validViews = ["home", "user_flow", "lawyer_flow", "knowledge_hub"];
    if (!validViews.includes(viewId)) viewId = "home";

    this.currentView = viewId;

    // Toggle view elements in DOM
    document.querySelectorAll(".page-view").forEach(el => {
      el.style.display = el.id === `view_${viewId}` ? "block" : "none";
    });

    // Update nav links active class
    document.querySelectorAll(".nav-link").forEach(link => {
      const target = link.getAttribute("data-target");
      link.classList.toggle("active", target === viewId);
    });

    // Close mobile nav if open
    const nav = document.getElementById("mainNav");
    if (nav) nav.classList.remove("mobile-active");

    if (updateHash) {
      window.location.hash = viewId;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  bindNavigation() {
    // Nav links click
    document.querySelectorAll(".nav-link, .route-trigger").forEach(el => {
      el.addEventListener("click", (e) => {
        const target = el.getAttribute("data-target");
        if (target) {
          e.preventDefault();
          this.navigateTo(target);
        }
      });
    });

    // Mobile nav hamburger
    const toggle = document.getElementById("mobileNavToggle");
    const nav = document.getElementById("mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("mobile-active");
      });
    }

    // Modal close listeners on backdrop and close buttons
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });

    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-overlay");
        if (modal) modal.classList.remove("active");
      });
    });
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  },

  // Toast Notification System
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "fa-circle-info";
    if (type === "success") icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-exclamation";

    toast.innerHTML = `
      <i class="fa-solid ${icon}" style="font-size:1.1rem;"></i>
      <span style="flex-grow:1; line-height:1.4;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  // Reset Demo to pristine initial state
  resetDemo() {
    if (confirm("Reset the demo prototype to its initial state? All inputs and mock transactions will be cleared.")) {
      if (window.UserFlow) {
        window.UserFlow.state = {
          currentStep: 1,
          domain: "family",
          state: "Madhya Pradesh",
          city: "Indore",
          consultationMode: "connect_now",
          priorityTier: "standard",
          answers: {
            q1: "Option 1: Seeking mutual consent divorce and amicable settlement.",
            q2: "Option 1: Yes, child custody and monthly child-support are critical issues.",
            q3: "Option 1: No formal step taken yet; seeking initial advisory and strategy."
          },
          problemDescription: "Need initial guidance on filing for mutual consent divorce with my spouse in Indore. We have been living separately for 14 months and have agreed on joint child custody terms.",
          paymentStatus: "pending",
          selectedLawyerId: null,
          selectedSlot: null,
          connectNowStatus: "searching",
          scheduleStatus: "pending"
        };
        window.UserFlow.init();
        window.UserFlow.goToStep(1);
      }

      if (window.LawyerFlow) {
        window.LawyerFlow.state.currentStep = 1;
        window.LawyerFlow.state.membershipStatus = "pending";
        window.LawyerFlow.state.verificationStatus = "Pending Verification";
        window.LawyerFlow.state.isOnline = true;
        window.LawyerFlow.goToStep(1);
      }

      this.navigateTo("home");
      this.showToast("Demo reset to default prototype state.", "success");
    }
  },

  // Render 4 Featured Lawyers on Homepage
  initFeaturedLawyersOnHome() {
    const container = document.getElementById("featuredLawyersGrid");
    if (!container) return;

    // Pick 4 diverse lawyers
    const featured = [
      APP_DATA.lawyers[0], // Meera Deshmukh (Indore)
      APP_DATA.lawyers[6], // Priyadarshini Mehta (Mumbai)
      APP_DATA.lawyers[10], // Vikramaditya Rathore (Jaipur)
      APP_DATA.lawyers[14]  // Shourya Vashisht (Delhi)
    ];

    container.innerHTML = featured.map(law => `
      <div class="lawyer-card">
        <div class="lawyer-card-header">
          <div class="lawyer-portrait-wrap">
            <img src="${law.photo}" alt="${law.name}" class="lawyer-portrait" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(law.name)}&background=0b1a30&color=dfc27d'">
            <div class="lawyer-online-indicator"></div>
          </div>
          <div class="lawyer-header-meta">
            <span class="lawyer-demo-badge">Verified Bar • ${law.barCouncilNo}</span>
            <h4>${law.name}</h4>
            <div class="lawyer-location-line">
              <i class="fa-solid fa-location-dot"></i>
              <span>${law.city}, ${law.state}</span>
              <span>•</span>
              <span style="color:var(--gold-600); font-weight:600;">★ ${law.rating}</span>
            </div>
          </div>
        </div>

        <div class="lawyer-card-body">
          <div class="lawyer-stats-row">
            <div class="lawyer-stat">
              <i class="fa-solid fa-briefcase" style="color:var(--navy-600);"></i>
              <span><strong>${law.experienceYears} Years</strong></span>
            </div>
            <div class="lawyer-stat">
              <i class="fa-solid fa-gavel" style="color:var(--navy-600);"></i>
              <span>${law.court.split("&")[0].trim()}</span>
            </div>
          </div>

          <div class="lawyer-domains-chips">
            ${law.domainsDisplay.slice(0, 2).map(d => `<span class="domain-chip-sm">${d}</span>`).join("")}
          </div>

          <p class="lawyer-about-snippet">${law.about}</p>
        </div>

        <div class="lawyer-card-footer">
          <button class="btn btn-outline btn-sm" onclick="App.showLawyerModal('${law.id}')">
            <i class="fa-solid fa-id-badge"></i> View Profile
          </button>
          <button class="btn btn-gold btn-sm" onclick="App.quickStartWithLawyer('${law.id}', '${law.domains[0]}', '${law.city}', '${law.state}')">
            <span>Request Connection</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `).join("");
  },

  // Render 3 Knowledge Previews on Homepage
  initKnowledgePreviewsOnHome() {
    const container = document.getElementById("homeKnowledgeGrid");
    if (!container) return;

    const previews = APP_DATA.articles.slice(0, 3);
    container.innerHTML = previews.map(art => `
      <div class="article-card" onclick="KnowledgeHub.openArticleModal('${art.id}')">
        <div>
          <div class="article-category">${art.category}</div>
          <h3 class="article-title">${art.title}</h3>
          <p class="article-excerpt">${art.excerpt}</p>
        </div>

        <div class="article-meta-row">
          <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
          <span style="font-weight:600; color:var(--gold-600);">
            Read Guide <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    `).join("");
  },

  // Helper to start consultation pre-seeded from a featured lawyer
  quickStartWithLawyer(lawyerId, domainId, city, state) {
    this.navigateTo("user_flow");
    if (window.UserFlow) {
      window.UserFlow.setDomain(domainId);
      window.UserFlow.state.state = state;
      window.UserFlow.populateCityDropdown(state);
      window.UserFlow.state.city = city;
      const citySelect = document.getElementById("userCitySelect");
      if (citySelect) citySelect.value = city;
      window.UserFlow.state.selectedLawyerId = lawyerId;
      window.UserFlow.updateSummarySidebar();
      window.UserFlow.goToStep(1);
    }
  },

  // Show rich lawyer profile modal
  showLawyerModal(lawyerId) {
    const law = APP_DATA.lawyers.find(l => l.id === lawyerId);
    if (!law) return;

    const modal = document.getElementById("lawyerDetailsModal");
    const body = document.getElementById("lawyerModalBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display:flex; gap:1.5rem; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap;">
        <img src="${law.photo}" alt="${law.name}" style="width:96px; height:96px; border-radius:var(--radius-lg); object-fit:cover; border:2.5px solid var(--gold-400); box-shadow:0 8px 24px rgba(0,0,0,0.5);">
        <div style="flex-grow:1;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <span class="demo-pill" style="margin-bottom:0.35rem;">Enrolment: ${law.barCouncilNo}</span>
              <h3 style="font-size:1.6rem; color:#ffffff; font-family:var(--font-serif);">${law.name}</h3>
              <p style="font-size:0.875rem; color:var(--text-muted);">
                <i class="fa-solid fa-location-dot" style="color:var(--gold-400);"></i> ${law.city}, ${law.state} • ${law.officeLocation}
              </p>
            </div>
            <div style="text-align:right;">
              <span style="font-size:1.25rem; font-weight:700; color:var(--gold-400);">★ ${law.rating}</span>
              <span style="font-size:0.8rem; color:var(--text-muted); display:block;">(${law.reviewCount} client reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-3" style="background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); padding:1.25rem; border-radius:var(--radius-lg); margin-bottom:1.5rem;">
        <div>
          <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.05em;">Experience</span>
          <p style="font-weight:700; color:#ffffff; font-size:1.05rem;">${law.experienceYears} Years Standing</p>
        </div>
        <div>
          <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.05em;">Languages</span>
          <p style="font-weight:700; color:#ffffff; font-size:1.05rem;">${law.languages.join(", ")}</p>
        </div>
        <div>
          <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.05em;">Estimated Fee Guide</span>
          <p style="font-weight:700; color:var(--gold-400); font-size:1.05rem;">${law.consultationFee} (Direct)</p>
        </div>
      </div>

      <div style="margin-bottom:1.25rem;">
        <h4 style="font-size:1.05rem; color:#ffffff; margin-bottom:0.5rem; font-family:var(--font-serif);">Court Admissions & Standing</h4>
        <p style="font-size:0.9rem; color:var(--text-secondary); background:rgba(8, 12, 24, 0.6); border:1px solid var(--border-subtle); padding:0.85rem 1rem; border-radius:var(--radius-md);">
          <i class="fa-solid fa-building-columns" style="color:var(--gold-400); margin-right:0.4rem;"></i>
          ${law.court}
        </p>
      </div>

      <div style="margin-bottom:1.25rem;">
        <h4 style="font-size:1.05rem; color:#ffffff; margin-bottom:0.5rem; font-family:var(--font-serif);">Practice Areas & Specializations</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${law.domainsDisplay.map(d => `<span class="domain-chip-sm" style="font-size:0.8rem; padding:0.3rem 0.75rem; background:rgba(212, 175, 55, 0.1); border:1px solid rgba(212, 175, 55, 0.3); color:var(--gold-300);">${d}</span>`).join("")}
        </div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.05rem; color:#ffffff; margin-bottom:0.5rem; font-family:var(--font-serif);">Professional Background</h4>
        <p style="font-size:0.9rem; line-height:1.6; color:var(--text-secondary);">${law.about}</p>
        <p style="font-size:0.825rem; color:var(--text-muted); margin-top:0.4rem;"><strong>Education:</strong> ${law.education}</p>
      </div>

      <div style="background:rgba(212, 175, 55, 0.08); border:1px solid rgba(212, 175, 55, 0.25); border-radius:var(--radius-md); padding:0.95rem 1.25rem; font-size:0.825rem; color:var(--text-secondary); line-height:1.5;">
        <i class="fa-solid fa-shield-halved" style="color:var(--gold-400); margin-right:0.35rem;"></i>
        <strong style="color:#ffffff;">Client Privacy Guarantee:</strong> Private phone numbers and personal emails are never published openly. Consultations are routed securely through The Lawyer Lady connection protocol.
      </div>

      <div style="margin-top:1.75rem; display:flex; justify-content:flex-end; gap:0.75rem;">
        <button class="btn btn-outline" onclick="App.closeModal('lawyerDetailsModal')">Close</button>
        <button class="btn btn-gold" onclick="App.quickStartWithLawyer('${law.id}', '${law.domains[0]}', '${law.city}', '${law.state}'); App.closeModal('lawyerDetailsModal');">
          <i class="fa-solid fa-bolt"></i> Consult with Advocate
        </button>
      </div>
    `;

    modal.classList.add("active");
  },

  // Simulated Voice/Video Call Modal (Connect Now)
  showSimulatedCallModal(lawyerId) {
    const law = APP_DATA.lawyers.find(l => l.id === lawyerId) || APP_DATA.lawyers[0];
    const modal = document.getElementById("simulatedCallModal");
    const body = document.getElementById("simulatedCallBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="text-align:center; padding:1.25rem 0;">
        <div style="width:96px; height:96px; margin:0 auto 1.25rem; position:relative;">
          <img src="${law.photo}" alt="${law.name}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border:3px solid #10b981; box-shadow:0 0 25px rgba(16, 185, 129, 0.4);">
          <span class="pulse-dot" style="position:absolute; bottom:4px; right:4px; width:16px; height:16px; border:2px solid var(--bg-darkest);"></span>
        </div>

        <span class="demo-pill" style="background:rgba(16, 185, 129, 0.15); border-color:rgba(16, 185, 129, 0.4); color:#34d399; margin-bottom:0.65rem;">
          Secure Simulated Session Active
        </span>
        <h3 style="font-size:1.6rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.25rem;">
          In Consultation with ${law.name}
        </h3>
        <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem;">
          High Court of MP (Indore Bench) • Chamber Audio Link (Demo)
        </p>

        <!-- Simulated Call Duration Meter -->
        <div style="background:rgba(8, 12, 24, 0.85); border:1px solid var(--border-medium); border-radius:var(--radius-xl); padding:1.5rem; max-width:420px; margin:0 auto 1.5rem; box-shadow:0 12px 32px rgba(0,0,0,0.6);">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--gold-300); font-weight:700; letter-spacing:0.1em; margin-bottom:0.35rem;">
            Call Timer
          </div>
          <div style="font-family:var(--font-mono); font-size:2.2rem; font-weight:700; color:#ffffff;" id="demoCallTimer">
            03:42
          </div>
          <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.35rem;">
            Audio Quality: HD Encrypted • Zero Data Recording
          </div>
        </div>

        <!-- Simulated Controls -->
        <div style="display:flex; justify-content:center; gap:1.25rem; margin-bottom:1.5rem;">
          <button class="btn btn-outline" style="border-radius:50%; width:52px; height:52px; padding:0; display:flex; align-items:center; justify-content:center;" title="Mute Microphone" onclick="App.showToast('Microphone toggled (Simulated)', 'info')">
            <i class="fa-solid fa-microphone-slash"></i>
          </button>
          <button class="btn btn-outline" style="border-radius:50%; width:52px; height:52px; padding:0; display:flex; align-items:center; justify-content:center;" title="Share Document" onclick="App.showToast('Secure document vault opened (Simulated)', 'info')">
            <i class="fa-solid fa-file-arrow-up"></i>
          </button>
          <button class="btn btn-danger" style="border-radius:50%; width:52px; height:52px; padding:0; display:flex; align-items:center; justify-content:center; background:#f43f5e; border-color:#f43f5e;" title="End Consultation" onclick="App.closeModal('simulatedCallModal'); App.showToast('Simulated consultation ended.', 'info');">
            <i class="fa-solid fa-phone-slash"></i>
          </button>
        </div>

        <p style="font-size:0.78rem; color:var(--text-muted);">
          <em>Demonstration Note: This is an interactive call session mockup for client walkthroughs.</em>
        </p>
      </div>
    `;

    modal.classList.add("active");
  },

  // Simulated Appointment Pass Modal
  showSimulatedPassModal(lawyerId) {
    const law = APP_DATA.lawyers.find(l => l.id === lawyerId) || APP_DATA.lawyers[0];
    const modal = document.getElementById("simulatedPassModal");
    const body = document.getElementById("simulatedPassBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="border:1.5px dashed var(--gold-400); border-radius:var(--radius-xl); padding:2.25rem; background:radial-gradient(ellipse at top, rgba(23, 33, 56, 0.8) 0%, rgba(8, 12, 24, 0.95) 100%); box-shadow:0 20px 50px rgba(0,0,0,0.7), 0 0 25px rgba(212,175,55,0.15);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-medium); padding-bottom:1.25rem; margin-bottom:1.5rem;">
          <div>
            <div style="font-family:var(--font-display); font-size:1.25rem; font-weight:700; color:var(--gold-300); letter-spacing:0.08em;">THE LAWYER LADY</div>
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--gold-400); font-weight:700; letter-spacing:0.06em;">Verified Consultation Pass</span>
          </div>
          <span class="demo-pill" style="font-family:var(--font-mono);">PASS #TLL-${Math.floor(100000 + Math.random() * 900000)}</span>
        </div>

        <div class="grid-2" style="margin-bottom:1.5rem;">
          <div>
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Consulting Advocate:</span>
            <p style="font-weight:700; font-size:1.15rem; color:#ffffff; font-family:var(--font-serif);">${law.name}</p>
            <span style="font-size:0.8rem; color:var(--text-muted);">${law.court}</span>
          </div>
          <div>
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Scheduled Slot:</span>
            <p style="font-weight:700; font-size:1.15rem; color:#34d399; font-family:var(--font-mono);">Tomorrow, 04:30 PM</p>
            <span style="font-size:0.8rem; color:var(--text-muted);">Chamber Consultation</span>
          </div>
        </div>

        <div style="background:rgba(15, 23, 42, 0.7); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem 1.25rem; margin-bottom:1.75rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--gold-300); font-weight:700; letter-spacing:0.06em; margin-bottom:0.35rem;">
            Chamber Venue Address:
          </div>
          <div style="font-size:0.95rem; font-weight:600; color:#ffffff;">
            ${law.officeLocation}, ${law.city}, ${law.state}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-top:1px solid var(--border-subtle); padding-top:1.25rem;">
          <div style="font-size:0.78rem; color:var(--text-muted);">
            Please arrive 10 minutes prior with relevant case documents.
          </div>
          <button class="btn btn-gold btn-sm" onclick="App.showToast('Demo PDF Pass downloaded!', 'success'); App.closeModal('simulatedPassModal');">
            <i class="fa-solid fa-download"></i> Save Demo Pass
          </button>
        </div>
      </div>
    `;

    modal.classList.add("active");
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
