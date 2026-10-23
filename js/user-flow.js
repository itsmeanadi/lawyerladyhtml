/**
 * The Lawyer Lady — User Consultation Flow Controller
 * Manages the 7-step interactive consultation wizard for users seeking legal help.
 */

const UserFlow = {
  // State
  state: {
    currentStep: 1,
    domain: "family",
    state: "Madhya Pradesh",
    city: "Indore",
    consultationMode: "connect_now", // "connect_now" | "schedule"
    priorityTier: "standard", // "standard" (₹299) | "priority" (₹499)
    answers: {
      q1: "Option 1: Seeking mutual consent divorce and amicable settlement.",
      q2: "Option 1: Yes, child custody and monthly child-support are critical issues.",
      q3: "Option 1: No formal step taken yet; seeking initial advisory and strategy."
    },
    problemDescription: "Need initial guidance on filing for mutual consent divorce with my spouse in Indore. We have been living separately for 14 months and have agreed on joint child custody terms.",
    paymentStatus: "pending", // "pending" | "success" | "failed"
    selectedLawyerId: null,
    selectedSlot: null,
    connectNowStatus: "searching", // "searching" | "accepted" | "no_lawyers"
    scheduleStatus: "pending" // "pending" | "confirmed" | "rejected"
  },

  init() {
    this.renderDomainCards();
    this.initLocationDropdowns();
    this.renderConsultationModes();
    this.renderDynamicQuestions();
    this.updateSummarySidebar();
    this.bindEvents();
  },

  bindEvents() {
    // Problem description input listener
    const problemText = document.getElementById("userProblemText");
    if (problemText) {
      problemText.addEventListener("input", (e) => {
        this.state.problemDescription = e.target.value;
        const count = document.getElementById("problemCharCount");
        if (count) count.textContent = `${e.target.value.length} / 500 characters`;
        this.updateSummarySidebar();
      });
    }

    // State select change
    const stateSelect = document.getElementById("userStateSelect");
    if (stateSelect) {
      stateSelect.addEventListener("change", (e) => {
        this.state.state = e.target.value;
        this.populateCityDropdown(e.target.value);
        this.updateSummarySidebar();
      });
    }

    // City select change
    const citySelect = document.getElementById("userCitySelect");
    if (citySelect) {
      citySelect.addEventListener("change", (e) => {
        this.state.city = e.target.value;
        this.updateSummarySidebar();
      });
    }
  },

  // 1. Render Domain Cards in Step 1
  renderDomainCards() {
    const container = document.getElementById("domainCardsContainer");
    if (!container) return;

    container.innerHTML = APP_DATA.domains.map(domain => `
      <div class="domain-card ${this.state.domain === domain.id ? 'selected' : ''}" data-domain="${domain.id}">
        <div class="domain-card-top">
          <span class="domain-badge">${domain.badge}</span>
          <div class="domain-icon-wrapper">
            <i class="fa-solid ${domain.icon}"></i>
          </div>
          <h4>${domain.title}</h4>
          <p>${domain.description}</p>
        </div>
        <div class="domain-card-action">
          <span>${this.state.domain === domain.id ? 'Selected' : 'Select Domain'}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".domain-card").forEach(card => {
      card.addEventListener("click", () => {
        const domId = card.getAttribute("data-domain");
        this.setDomain(domId);
      });
    });
  },

  setDomain(domainId) {
    this.state.domain = domainId;
    document.querySelectorAll("#domainCardsContainer .domain-card").forEach(c => {
      c.classList.toggle("selected", c.getAttribute("data-domain") === domainId);
      const actionText = c.querySelector(".domain-card-action span");
      if (actionText) actionText.textContent = c.getAttribute("data-domain") === domainId ? 'Selected' : 'Select Domain';
    });

    // Re-render domain questions to match
    this.renderDynamicQuestions();
    this.updateSummarySidebar();
  },

  // 2. Location Dropdowns in Step 2
  initLocationDropdowns() {
    const stateSelect = document.getElementById("userStateSelect");
    if (!stateSelect) return;

    stateSelect.innerHTML = Object.keys(APP_DATA.locations).map(st => `
      <option value="${st}" ${st === this.state.state ? 'selected' : ''}>${st}</option>
    `).join("");

    this.populateCityDropdown(this.state.state);
  },

  populateCityDropdown(selectedState) {
    const citySelect = document.getElementById("userCitySelect");
    if (!citySelect) return;

    const cities = APP_DATA.locations[selectedState] || [];
    citySelect.innerHTML = cities.map((ct, idx) => `
      <option value="${ct}" ${idx === 0 ? 'selected' : ''}>${ct}</option>
    `).join("");

    this.state.city = cities[0] || "";
  },

  // 3. Consultation Mode in Step 3
  renderConsultationModes() {
    const container = document.getElementById("consultationModeCards");
    if (!container) return;

    const modes = [
      {
        id: "connect_now",
        badge: "Instant Broadcast",
        title: "Option 1 — Connect Now (Fastest Response)",
        desc: "Your connection request is broadcasted instantly to verified advocates currently online and available in your city. The first available advocate who accepts reviews your brief immediately."
      },
      {
        id: "schedule",
        badge: "Scheduled Consultation",
        title: "Option 2 — Schedule for Later",
        desc: "Select a future date and preferred time slot that suits your convenience. Review profiles of eligible local lawyers, pick your preferred advocate, and receive a confirmed appointment pass."
      },
      {
        id: "help_decide",
        badge: "Comparison",
        title: "Option 3 — Help Me Decide",
        desc: "Compare both options: Connect Now is optimal for urgent summons, bail, or same-day notice replies. Schedule for Later is ideal for deep document due diligence, contract review, or property consultations."
      }
    ];

    container.innerHTML = modes.map(m => `
      <div class="radio-card ${this.state.consultationMode === m.id ? 'selected' : ''}" data-mode="${m.id}">
        <div class="radio-indicator"></div>
        <div class="radio-card-content">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
            <div class="radio-card-title">${m.title}</div>
            <span class="domain-badge" style="margin-bottom:0;">${m.badge}</span>
          </div>
          <div class="radio-card-desc">${m.desc}</div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".radio-card").forEach(card => {
      card.addEventListener("click", () => {
        const modeId = card.getAttribute("data-mode");
        if (modeId === "help_decide") {
          this.openHelpMeDecideModal();
          return;
        }
        this.state.consultationMode = modeId;
        container.querySelectorAll(".radio-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this.updateSummarySidebar();
      });
    });
  },

  openHelpMeDecideModal() {
    const modal = document.getElementById("helpDecideModal");
    if (modal) modal.classList.add("active");
  },

  // 4. Dynamic Questionnaire in Step 4
  renderDynamicQuestions() {
    const container = document.getElementById("dynamicQuestionsWrapper");
    if (!container) return;

    const questions = APP_DATA.domainQuestions[this.state.domain] || APP_DATA.domainQuestions.default;
    
    // reset or ensure answers exist
    container.innerHTML = questions.map((q, qIndex) => {
      const qKey = `q${qIndex + 1}`;
      const currentSelected = this.state.answers[qKey] || q.options[0].text;
      this.state.answers[qKey] = currentSelected;

      return `
        <div class="form-group question-block" data-qkey="${qKey}">
          <label class="form-label" style="font-size:1rem; margin-bottom:0.75rem;">
            ${q.label} <span class="required">*</span>
          </label>
          <div class="radio-cards-grid">
            ${q.options.map(opt => `
              <div class="radio-card ${currentSelected === opt.text ? 'selected' : ''}" data-text="${encodeURIComponent(opt.text)}">
                <div class="radio-indicator"></div>
                <div class="radio-card-content">
                  <div class="radio-card-title">${opt.text}</div>
                  <div class="radio-card-desc">${opt.desc}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    // bind clicks on option cards
    container.querySelectorAll(".question-block").forEach(block => {
      const qKey = block.getAttribute("data-qkey");
      block.querySelectorAll(".radio-card").forEach(card => {
        card.addEventListener("click", () => {
          const selectedText = decodeURIComponent(card.getAttribute("data-text"));
          this.state.answers[qKey] = selectedText;
          block.querySelectorAll(".radio-card").forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          this.updateSummarySidebar();
        });
      });
    });
  },

  // 5. Step 5: Review Step View
  renderStep5Review() {
    const domainObj = APP_DATA.domains.find(d => d.id === this.state.domain) || APP_DATA.domains[0];
    const modeLabel = this.state.consultationMode === 'connect_now' ? 'Connect Now (Instant Broadcast)' : 'Schedule for Later (Slot Booking)';
    const feeAmount = this.state.priorityTier === 'priority' ? '₹499' : '₹299';

    const container = document.getElementById("step5ReviewContainer");
    if (!container) return;

    container.innerHTML = `
      <div style="background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); border-radius:var(--radius-xl); padding:2rem; margin-bottom:1.75rem; box-shadow:var(--shadow-lg);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem;">
          <h4 style="font-size:1.35rem; color:#ffffff; font-family:var(--font-serif);">Consultation Brief Summary</h4>
          <span class="domain-badge">${domainObj.title}</span>
        </div>

        <div class="grid-2" style="margin-bottom:1.25rem;">
          <div style="background:rgba(8, 12, 24, 0.6); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Legal Jurisdiction</span>
            <p style="font-weight:600; color:#ffffff; font-size:1rem; margin-top:0.2rem;">${this.state.city}, ${this.state.state}</p>
          </div>
          <div style="background:rgba(8, 12, 24, 0.6); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Connection Mode</span>
            <p style="font-weight:600; color:#ffffff; font-size:1rem; margin-top:0.2rem;">${modeLabel}</p>
          </div>
        </div>

        <div style="margin-bottom:1.25rem;">
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Questionnaire Answers</span>
          <ul style="list-style:none; margin-top:0.5rem; display:flex; flex-direction:column; gap:0.5rem; font-size:0.9rem;">
            <li style="background:rgba(8, 12, 24, 0.6); padding:0.65rem 1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); color:#cbd5e1;">
              <strong style="color:var(--gold-300);">Q1:</strong> ${this.state.answers.q1 || 'Not specified'}
            </li>
            <li style="background:rgba(8, 12, 24, 0.6); padding:0.65rem 1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); color:#cbd5e1;">
              <strong style="color:var(--gold-300);">Q2:</strong> ${this.state.answers.q2 || 'Not specified'}
            </li>
            <li style="background:rgba(8, 12, 24, 0.6); padding:0.65rem 1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); color:#cbd5e1;">
              <strong style="color:var(--gold-300);">Q3:</strong> ${this.state.answers.q3 || 'Not specified'}
            </li>
          </ul>
        </div>

        <div style="margin-bottom:1rem;">
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Client Problem Summary</span>
          <div style="background:rgba(8, 12, 24, 0.6); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem 1.25rem; font-size:0.925rem; color:#f1f5f9; margin-top:0.4rem; line-height:1.6;">
            ${this.state.problemDescription || 'No description provided.'}
          </div>
        </div>
      </div>

      <!-- Pricing Tier Selector -->
      <div style="margin-bottom:1.75rem;">
        <label class="form-label">Select Connection Speed</label>
        <div class="grid-2">
          <div class="radio-card ${this.state.priorityTier === 'standard' ? 'selected' : ''}" id="tierStandard" onclick="UserFlow.setPriorityTier('standard')">
            <div class="radio-indicator"></div>
            <div class="radio-card-content">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-size:1.05rem; color:#ffffff;">Standard Connection</strong>
                <strong style="color:var(--gold-300); font-size:1.2rem; font-family:var(--font-serif);">₹299</strong>
              </div>
              <p style="font-size:0.825rem; color:var(--text-secondary); margin-top:0.35rem;">Regular broadcast to verified advocates in ${this.state.city}.</p>
            </div>
          </div>

          <div class="radio-card ${this.state.priorityTier === 'priority' ? 'selected' : ''}" id="tierPriority" onclick="UserFlow.setPriorityTier('priority')">
            <div class="radio-indicator"></div>
            <div class="radio-card-content">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-size:1.05rem; color:#ffffff;">Priority Expedited</strong>
                <strong style="color:var(--gold-400); font-size:1.2rem; font-family:var(--font-serif);">₹499</strong>
              </div>
              <p style="font-size:0.825rem; color:var(--text-secondary); margin-top:0.35rem;">High-priority routing to senior advocates with 10+ yrs experience.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Connection Fee Transparency Notice -->
      <div style="background:rgba(212, 175, 55, 0.08); border:1px solid rgba(212, 175, 55, 0.25); border-radius:var(--radius-md); padding:1.15rem 1.35rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.55;">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem; font-weight:700; color:var(--gold-300);">
          <i class="fa-solid fa-circle-info"></i>
          <span>Transparency & Bar Council Compliance Notice</span>
        </div>
        The connection fee (${feeAmount}) is strictly paid to <strong>The Lawyer Lady platform</strong> for digital matching, identity verification, and communication orchestration. <em>This is not a lawyer's consultation fee or legal fees split.</em> Any formal professional fee for prolonged courtroom litigation or legal drafting is mutually agreed directly between you and your chosen advocate.
      </div>
    `;
  },

  setPriorityTier(tier) {
    this.state.priorityTier = tier;
    this.renderStep5Review();
    this.updateSummarySidebar();
  },

  // 6. Step 6: Simulated Payment Checkout Screen
  renderStep6Payment() {
    const feeAmount = this.state.priorityTier === 'priority' ? '₹499' : '₹299';
    const container = document.getElementById("step6PaymentContainer");
    if (!container) return;

    // Check payment status state
    if (this.state.paymentStatus === 'success') {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 2rem; background:rgba(16, 185, 129, 0.1); border:1.5px solid rgba(16, 185, 129, 0.35); border-radius:var(--radius-xl); margin-bottom:1.5rem; box-shadow:0 15px 40px rgba(0,0,0,0.6);">
          <div style="width:72px; height:72px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(16, 185, 129, 0.4);">
            <i class="fa-solid fa-check"></i>
          </div>
          <span class="demo-pill" style="background:rgba(16, 185, 129, 0.2); border-color:#10b981; color:#34d399; margin-bottom:0.75rem;">Simulated Transaction Successful</span>
          <h3 style="color:#ffffff; font-size:1.8rem; font-family:var(--font-serif); margin-bottom:0.5rem;">Payment Confirmed</h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.5rem; line-height:1.6;">
            Demo transaction of <strong>${feeAmount}</strong> completed successfully. No real money was charged to any bank or card.
          </p>
          <div style="background:rgba(8, 12, 24, 0.85); border-radius:var(--radius-lg); max-width:460px; margin:0 auto 1.75rem; padding:1.25rem; text-align:left; font-size:0.875rem; border:1px solid rgba(16, 185, 129, 0.3);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span style="color:var(--text-muted);">Transaction ID (Demo):</span>
              <strong style="color:#ffffff; font-family:var(--font-mono);">TXN_DEMO_${Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span style="color:var(--text-muted);">Amount Paid:</span>
              <strong style="color:var(--gold-300); font-family:var(--font-serif);">${feeAmount}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:var(--text-muted);">Next Action:</span>
              <span style="color:#34d399; font-weight:600;"><i class="fa-solid fa-unlock"></i> Lawyer Matching Unlocked</span>
            </div>
          </div>
          <button class="btn btn-gold btn-lg" onclick="UserFlow.goToStep(7)">
            <span>View Matching Advocates in ${this.state.city}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <!-- Working Demo Reset Switcher for testing failure -->
        <div style="text-align:center; margin-top:1.5rem; padding-top:1.25rem; border-top:1px dashed var(--border-medium);">
          <span style="font-size:0.825rem; color:var(--text-muted); margin-right:0.75rem;">Want to test the alternative outcome?</span>
          <button class="btn btn-outline btn-sm" onclick="UserFlow.simulatePaymentNotDone()">
            <i class="fa-solid fa-rotate-left"></i> Test "Payment Not Done" Failure State
          </button>
        </div>
      `;
      return;
    }

    if (this.state.paymentStatus === 'failed') {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 2rem; background:rgba(244, 63, 94, 0.1); border:1.5px solid rgba(244, 63, 94, 0.35); border-radius:var(--radius-xl); margin-bottom:1.5rem; box-shadow:0 15px 40px rgba(0,0,0,0.6);">
          <div style="width:72px; height:72px; border-radius:50%; background:#f43f5e; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(244, 63, 94, 0.4);">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <span class="demo-pill" style="background:rgba(244, 63, 94, 0.2); border-color:#f43f5e; color:#fca5a5; margin-bottom:0.75rem;">Simulated Transaction Incomplete</span>
          <h3 style="color:#ffffff; font-size:1.8rem; font-family:var(--font-serif); margin-bottom:0.5rem;">Payment Incomplete or Declined</h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.5rem; line-height:1.6;">
            The simulated payment was marked as <strong>Payment Not Done</strong>. Your request remains unpaid. Lawyer matching results cannot be unlocked until connection fee payment is recorded.
          </p>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-gold btn-lg" onclick="UserFlow.simulatePaymentDone()">
              <i class="fa-solid fa-rotate-right"></i> Retry & Mark as "Payment Done"
            </button>
            <button class="btn btn-outline" onclick="UserFlow.goToStep(5)">
              <i class="fa-solid fa-arrow-left"></i> Return to Request Summary
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Default checkout view with mandatory prominent buttons
    container.innerHTML = `
      <div style="background:linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 24, 0.98) 100%); border:1.5px solid var(--border-gold); border-radius:var(--radius-xl); padding:2.25rem; margin-bottom:1.75rem; box-shadow:0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.12);">
        <h4 style="font-size:1.35rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:1.25rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.85rem;">
          Simulated Checkout Summary
        </h4>

        <div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.95rem;">
            <span style="color:#cbd5e1;">Platform Legal Matching & Verification Fee:</span>
            <strong style="color:#ffffff;">${feeAmount}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.9rem; color:var(--text-muted);">
            <span>Selected Domain:</span>
            <span style="color:#cbd5e1;">${APP_DATA.domains.find(d => d.id === this.state.domain)?.title}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.9rem; color:var(--text-muted);">
            <span>Target Jurisdiction:</span>
            <span style="color:#cbd5e1;">${this.state.city}, ${this.state.state}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.9rem; color:var(--text-muted);">
            <span>Simulation Tax / GST (18% Demo):</span>
            <span style="color:#cbd5e1;">Included</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:1.25rem; font-weight:700; color:#ffffff; border-top:1.5px solid var(--border-medium); padding-top:1rem; font-family:var(--font-serif);">
            <span>Total Payable (Demo):</span>
            <span style="color:var(--gold-300);">${feeAmount}</span>
          </div>
        </div>

        <div style="background:rgba(8, 12, 24, 0.7); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem 1.25rem; font-size:0.825rem; color:var(--text-secondary); line-height:1.55;">
          <i class="fa-solid fa-lock" style="color:var(--gold-400); margin-right:0.35rem;"></i>
          <strong style="color:var(--gold-300);">Client Presentation Prototype:</strong> This checkout demonstrates simulated billing actions. You can test both successful unlock and failed retry flows using the mandatory demonstration controls below.
        </div>
      </div>

      <!-- MANDATORY PAYMENT ACTION BUTTONS -->
      <div class="payment-actions-wrapper">
        <div class="payment-actions-label">
          <i class="fa-solid fa-gamepad" style="color:var(--gold-400); margin-right:0.35rem;"></i>
          Mandatory Prototype Payment Simulation Controls
        </div>
        <p class="payment-actions-desc">
          Click <strong>Payment Done</strong> to unlock lawyer matching and simulate successful connection, or click <strong>Payment Not Done</strong> to demonstrate payment failure handling.
        </p>
        <div class="payment-actions-grid">
          <button type="button" class="btn btn-payment-done" id="btnPaymentDone" onclick="UserFlow.simulatePaymentDone()">
            <span style="display:flex; align-items:center; gap:0.5rem;">
              <i class="fa-solid fa-circle-check"></i>
              <span>Payment Done</span>
            </span>
            <span class="sub-label">Simulate Successful Checkout</span>
          </button>

          <button type="button" class="btn btn-payment-not-done" id="btnPaymentNotDone" onclick="UserFlow.simulatePaymentNotDone()">
            <span style="display:flex; align-items:center; gap:0.5rem;">
              <i class="fa-solid fa-circle-xmark"></i>
              <span>Payment Not Done</span>
            </span>
            <span class="sub-label">Simulate Incomplete Payment</span>
          </button>
        </div>
      </div>
    `;
  },

  simulatePaymentDone() {
    this.state.paymentStatus = 'success';
    App.showToast("Simulated payment of ₹299 recorded successfully!", "success");
    this.renderStep6Payment();
    this.updateSummarySidebar();
  },

  simulatePaymentNotDone() {
    this.state.paymentStatus = 'failed';
    App.showToast("Simulated payment failed / cancelled. Request remains locked.", "error");
    this.renderStep6Payment();
    this.updateSummarySidebar();
  },

  // 7. Step 7: Matching Results Filtered by Domain and Location
  renderStep7Matching() {
    const container = document.getElementById("step7MatchingContainer");
    if (!container) return;

    if (this.state.paymentStatus !== 'success') {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem 1.5rem;">
          <i class="fa-solid fa-lock" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:1rem;"></i>
          <h3>Lawyer Results Locked</h3>
          <p style="color:var(--text-secondary); max-width:480px; margin:0.5rem auto 1.5rem;">
            Please complete the simulated connection fee payment in Step 6 to unlock matching advocates.
          </p>
          <button class="btn btn-primary" onclick="UserFlow.goToStep(6)">
            Go to Payment Checkout
          </button>
        </div>
      `;
      return;
    }

    // Filter strictly by domain and location (state AND city)
    const matchingLawyers = APP_DATA.lawyers.filter(law => {
      const matchCity = law.city.toLowerCase() === this.state.city.toLowerCase();
      const matchState = law.state.toLowerCase() === this.state.state.toLowerCase();
      const matchDomain = law.domains.includes(this.state.domain) || law.domains.includes("other") || law.domains.includes("civil");
      return matchCity && matchState && matchDomain;
    });

    // Check if consultation mode is Connect Now vs Schedule
    if (this.state.consultationMode === 'connect_now') {
      this.renderConnectNowView(container, matchingLawyers);
    } else {
      this.renderScheduleView(container, matchingLawyers);
    }
  },

  // Connect Now Broadcast View
  renderConnectNowView(container, matchingLawyers) {
    const firstLawyer = matchingLawyers[0] || APP_DATA.lawyers.find(l => l.city === this.state.city) || APP_DATA.lawyers[0];

    container.innerHTML = `
      <div class="matching-simulation-box">
        <div id="connectNowContent">
          <!-- Dynamic Broadcast Sub-States -->
        </div>

        <!-- Simulation Toolbar for Demonstration -->
        <div class="simulation-controls-toolbar">
          <div class="simulation-controls-label">
            <i class="fa-solid fa-sliders" style="margin-right:0.35rem;"></i>
            Demonstration Controls:
          </div>
          <div class="simulation-controls-group">
            <button class="btn btn-sm btn-gold" onclick="UserFlow.setConnectNowState('accepted')">
              <i class="fa-solid fa-check"></i> Simulate Lawyer Accepts
            </button>
            <button class="btn btn-sm btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.3);" onclick="UserFlow.setConnectNowState('no_lawyers')">
              <i class="fa-solid fa-phone-slash"></i> Simulate No Availability
            </button>
            <button class="btn btn-sm btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.3);" onclick="UserFlow.setConnectNowState('searching')">
              <i class="fa-solid fa-rotate"></i> Reset Broadcast
            </button>
          </div>
        </div>
      </div>

      <!-- Eligible Local Lawyers Directory -->
      <div style="margin-top:2.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <div>
            <h3 style="font-size:1.35rem; color:var(--navy-900);">
              Verified Advocates in ${this.state.city}, ${this.state.state}
            </h3>
            <p style="font-size:0.875rem; color:var(--text-secondary);">
              Filtered strictly by domain (${APP_DATA.domains.find(d=>d.id===this.state.domain)?.title}) and verified local court credentials.
            </p>
          </div>
          <span class="demo-pill">${matchingLawyers.length} Profiles Available</span>
        </div>

        <div class="grid-2">
          ${matchingLawyers.length > 0 ? matchingLawyers.map(law => this.createLawyerCardHTML(law)).join("") : `
            <div style="grid-column:1/-1; background:#fff; padding:2rem; border-radius:var(--radius-lg); text-align:center; border:1px dashed var(--border-medium);">
              <p>No advocates currently practicing exclusively in this niche in ${this.state.city}. Displaying senior state counsel.</p>
            </div>
          `}
        </div>
      </div>
    `;

    this.updateConnectNowSubstate(firstLawyer);
  },

  updateConnectNowSubstate(lawyer) {
    const subContainer = document.getElementById("connectNowContent");
    if (!subContainer) return;

    if (this.state.connectNowStatus === 'searching') {
      subContainer.innerHTML = `
        <div class="radar-animation-wrap">
          <div class="radar-ring"></div>
          <div class="radar-ring"></div>
          <div class="radar-ring"></div>
          <div class="radar-center-icon">
            <i class="fa-solid fa-tower-broadcast"></i>
          </div>
        </div>
        <span class="demo-pill" style="margin-bottom:0.75rem; font-family:var(--font-mono);">Instant Broadcast Active</span>
        <h3 style="font-size:1.6rem; margin-bottom:0.5rem; color:#ffffff; font-family:var(--font-serif);">
          Broadcasting to Online Advocates in ${this.state.city}...
        </h3>
        <p style="color:var(--text-secondary); max-width:520px; margin:0 auto 1.5rem; font-size:0.925rem; line-height:1.6;">
          Your consultation brief is being routed to verified advocates online right now. First valid acceptance wins.
        </p>
        <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); padding:0.5rem 1.25rem; border-radius:var(--radius-full); font-size:0.825rem; font-weight:600;">
          <div class="pulse-dot" style="background:#10b981;"></div>
          <span style="color:#cbd5e1;">Pinging verified bar members in ${this.state.city} (Expected response: ~45s)</span>
        </div>
      `;
    } else if (this.state.connectNowStatus === 'accepted') {
      subContainer.innerHTML = `
        <div style="text-align:center; padding:1.25rem 0;">
          <div style="width:72px; height:72px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(16, 185, 129, 0.4);">
            <i class="fa-solid fa-headset"></i>
          </div>
          <span class="demo-pill" style="background:rgba(16, 185, 129, 0.2); border-color:#10b981; color:#34d399; margin-bottom:0.75rem;">
            Connection Established
          </span>
          <h3 style="font-size:1.75rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.35rem;">
            ${lawyer.name} has Accepted Your Request!
          </h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.75rem; line-height:1.6;">
            Advocate is in their chambers in ${lawyer.city} and reviewing your problem notes. A secure simulated conference line is ready.
          </p>

          <div style="background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); border-radius:var(--radius-xl); padding:1.5rem; max-width:560px; margin:0 auto 1.75rem; display:flex; align-items:center; gap:1.25rem; text-align:left; box-shadow:var(--shadow-md);">
            <img src="${lawyer.photo}" alt="${lawyer.name}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; border:2.5px solid var(--gold-400); box-shadow:0 4px 16px rgba(0,0,0,0.5);">
            <div>
              <h4 style="font-size:1.2rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.2rem;">${lawyer.name}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.35rem;">
                ${lawyer.court} • ${lawyer.experienceYears} Years Exp
              </p>
              <span class="demo-pill" style="font-size:0.7rem; font-family:var(--font-mono);">Verified Bar Council: ${lawyer.barCouncilNo}</span>
            </div>
          </div>

          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-gold btn-lg" onclick="App.showSimulatedCallModal('${lawyer.id}')">
              <i class="fa-solid fa-phone-volume"></i> Launch Secure Voice Call (Simulated)
            </button>
            <button class="btn btn-outline" onclick="App.showLawyerModal('${lawyer.id}')">
              <i class="fa-solid fa-id-card"></i> View Full Advocate Profile
            </button>
          </div>
        </div>
      `;
    } else if (this.state.connectNowStatus === 'no_lawyers') {
      subContainer.innerHTML = `
        <div style="text-align:center; padding:1.25rem 0;">
          <div style="width:72px; height:72px; border-radius:50%; background:rgba(244, 63, 94, 0.15); color:#f43f5e; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; border:1.5px solid rgba(244, 63, 94, 0.35); box-shadow:0 0 20px rgba(244, 63, 94, 0.25);">
            <i class="fa-solid fa-clock-rotate-left"></i>
          </div>
          <span class="demo-pill" style="background:rgba(244, 63, 94, 0.15); border-color:rgba(244, 63, 94, 0.4); color:#fca5a5; margin-bottom:0.75rem;">
            No Advocates Available Immediately
          </span>
          <h3 style="font-size:1.6rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.5rem;">
            All Local Advocates Currently in Court Hearings
          </h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.75rem; line-height:1.6;">
            Advocates in ${this.state.city} are presently attending courtroom proceedings. You can either retry the live broadcast or switch to scheduling a confirmed consultation slot for later today or tomorrow.
          </p>

          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-gold" onclick="UserFlow.switchToScheduleMode()">
              <i class="fa-solid fa-calendar-check"></i> Schedule an Appointment Instead
            </button>
            <button class="btn btn-outline" onclick="UserFlow.setConnectNowState('searching')">
              <i class="fa-solid fa-rotate"></i> Try Broadcasting Again
            </button>
          </div>
        </div>
      `;
    }
  },

  setConnectNowState(status) {
    this.state.connectNowStatus = status;
    const matchingLawyers = APP_DATA.lawyers.filter(law => {
      const matchCity = law.city.toLowerCase() === this.state.city.toLowerCase();
      const matchState = law.state.toLowerCase() === this.state.state.toLowerCase();
      return matchCity && matchState;
    });
    const lawyer = matchingLawyers[0] || APP_DATA.lawyers[0];
    this.updateConnectNowSubstate(lawyer);
  },

  switchToScheduleMode() {
    this.state.consultationMode = 'schedule';
    this.renderStep7Matching();
    this.updateSummarySidebar();
    App.showToast("Switched to Schedule for Later mode.", "info");
  },

  // Schedule for Later View
  renderScheduleView(container, matchingLawyers) {
    const selectedLawyer = APP_DATA.lawyers.find(l => l.id === this.state.selectedLawyerId) || matchingLawyers[0] || APP_DATA.lawyers[0];

    container.innerHTML = `
      <div class="matching-simulation-box" style="text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="font-size:1.35rem; color:var(--navy-900);">Schedule Appointment in ${this.state.city}</h3>
            <p style="font-size:0.875rem; color:var(--text-secondary);">Select a verified advocate and reserve a guaranteed consultation window.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="UserFlow.switchToConnectNowMode()">
            <i class="fa-solid fa-bolt"></i> Switch to Connect Now
          </button>
        </div>

        <div id="scheduleStageContainer">
          <!-- Sub-stages: slot picking or pending/confirmed/rejected -->
        </div>

        <!-- Simulation Toolbar for Demonstration -->
        <div class="simulation-controls-toolbar" style="margin-top:2rem;">
          <div class="simulation-controls-label">
            <i class="fa-solid fa-sliders" style="margin-right:0.35rem;"></i>
            Demonstration Controls:
          </div>
          <div class="simulation-controls-group">
            <button class="btn btn-sm btn-gold" onclick="UserFlow.setScheduleStatus('confirmed')">
              <i class="fa-solid fa-calendar-check"></i> Simulate Lawyer Confirms
            </button>
            <button class="btn btn-sm btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.3);" onclick="UserFlow.setScheduleStatus('rejected')">
              <i class="fa-solid fa-calendar-xmark"></i> Simulate Lawyer Rejects
            </button>
            <button class="btn btn-sm btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.3);" onclick="UserFlow.setScheduleStatus('pending')">
              <i class="fa-solid fa-rotate"></i> Reset Pending State
            </button>
          </div>
        </div>
      </div>

      <!-- Eligible Local Lawyers Directory -->
      <div style="margin-top:2.5rem;">
        <h3 style="font-size:1.35rem; color:var(--navy-900); margin-bottom:0.5rem;">
          Available Advocates in ${this.state.city}
        </h3>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:1.5rem;">
          Select any advocate below to review available chamber slots.
        </p>
        <div class="grid-2">
          ${matchingLawyers.map(law => this.createLawyerCardHTML(law, true)).join("")}
        </div>
      </div>
    `;

    this.updateScheduleSubstate(selectedLawyer);
  },

  updateScheduleSubstate(lawyer) {
    const stageContainer = document.getElementById("scheduleStageContainer");
    if (!stageContainer) return;

    if (this.state.scheduleStatus === 'pending') {
      stageContainer.innerHTML = `
        <div style="background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); border-radius:var(--radius-xl); padding:1.75rem; margin-bottom:1.5rem; box-shadow:var(--shadow-md);">
          <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem;">
            <img src="${lawyer.photo}" alt="${lawyer.name}" style="width:68px; height:68px; border-radius:50%; object-fit:cover; border:2px solid var(--gold-400); box-shadow:0 4px 12px rgba(0,0,0,0.5);">
            <div>
              <h4 style="font-size:1.25rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.2rem;">${lawyer.name}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted);">${lawyer.court} • ${lawyer.officeLocation}</p>
            </div>
          </div>

          <label class="form-label">1. Select Appointment Date</label>
          <div style="display:flex; gap:0.75rem; margin-bottom:1.5rem; flex-wrap:wrap;">
            <div class="slot-chip selected" data-date="Today">Today, 23 Oct</div>
            <div class="slot-chip" data-date="Tomorrow">Tomorrow, 24 Oct</div>
            <div class="slot-chip" data-date="Day After">Monday, 26 Oct</div>
          </div>

          <label class="form-label">2. Select Consultation Slot</label>
          <div class="slot-chips-wrap" id="timeSlotsWrap">
            <div class="slot-chip ${this.state.selectedSlot === '11:30 AM' ? 'selected' : ''}" onclick="UserFlow.selectSlot('11:30 AM')">11:30 AM (Chamber)</div>
            <div class="slot-chip ${this.state.selectedSlot === '02:00 PM' ? 'selected' : ''}" onclick="UserFlow.selectSlot('02:00 PM')">02:00 PM (Virtual)</div>
            <div class="slot-chip ${this.state.selectedSlot === '04:30 PM' ? 'selected' : ''}" onclick="UserFlow.selectSlot('04:30 PM')">04:30 PM (Chamber)</div>
            <div class="slot-chip ${this.state.selectedSlot === '06:00 PM' ? 'selected' : ''}" onclick="UserFlow.selectSlot('06:00 PM')">06:00 PM (Virtual)</div>
          </div>

          <div style="margin-top:1.75rem;">
            <button class="btn btn-gold btn-lg" onclick="UserFlow.submitAppointmentRequest('${lawyer.id}')">
              <i class="fa-solid fa-paper-plane"></i> Send Booking Request for Confirmation
            </button>
          </div>
        </div>
      `;
    } else if (this.state.scheduleStatus === 'confirmed') {
      stageContainer.innerHTML = `
        <div style="background:rgba(16, 185, 129, 0.1); border:1.5px solid rgba(16, 185, 129, 0.35); border-radius:var(--radius-xl); padding:2.25rem 2rem; text-align:center; box-shadow:0 15px 40px rgba(0,0,0,0.6);">
          <div style="width:72px; height:72px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(16, 185, 129, 0.4);">
            <i class="fa-solid fa-calendar-check"></i>
          </div>
          <span class="demo-pill" style="background:rgba(16, 185, 129, 0.2); border-color:#10b981; color:#34d399; margin-bottom:0.75rem;">
            Appointment Confirmed (Simulated)
          </span>
          <h3 style="color:#ffffff; font-size:1.75rem; font-family:var(--font-serif); margin-bottom:0.5rem;">
            Appointment Confirmed with ${lawyer.name}!
          </h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.75rem; line-height:1.6;">
            The advocate accepted your appointment slot for <strong>${this.state.selectedSlot || '04:30 PM, Tomorrow'}</strong> at their chamber in ${lawyer.officeLocation}.
          </p>

          <div style="background:rgba(8, 12, 24, 0.85); border-radius:var(--radius-lg); max-width:500px; margin:0 auto 1.75rem; padding:1.25rem 1.5rem; text-align:left; border:1px solid rgba(16, 185, 129, 0.3);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
              <span style="color:var(--text-muted);">Advocate:</span>
              <strong style="color:#ffffff; font-family:var(--font-serif);">${lawyer.name}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
              <span style="color:var(--text-muted);">Confirmed Slot:</span>
              <strong style="color:#34d399; font-family:var(--font-mono);">${this.state.selectedSlot || '04:30 PM'} (Tomorrow)</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
              <span style="color:var(--text-muted);">Chamber Address:</span>
              <span style="font-weight:600; color:#ffffff;">${lawyer.officeLocation}</span>
            </div>
          </div>

          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-gold btn-lg" onclick="App.showSimulatedPassModal('${lawyer.id}')">
              <i class="fa-solid fa-download"></i> View Appointment Pass (Demo)
            </button>
            <button class="btn btn-outline" onclick="App.showLawyerModal('${lawyer.id}')">
              <i class="fa-solid fa-user"></i> View Profile
            </button>
          </div>
        </div>
      `;
    } else if (this.state.scheduleStatus === 'rejected') {
      stageContainer.innerHTML = `
        <div style="background:rgba(244, 63, 94, 0.1); border:1.5px solid rgba(244, 63, 94, 0.35); border-radius:var(--radius-xl); padding:2.25rem 2rem; text-align:center; box-shadow:0 15px 40px rgba(0,0,0,0.6);">
          <div style="width:72px; height:72px; border-radius:50%; background:#f43f5e; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(244, 63, 94, 0.4);">
            <i class="fa-solid fa-calendar-xmark"></i>
          </div>
          <span class="demo-pill" style="background:rgba(244, 63, 94, 0.15); border-color:rgba(244, 63, 94, 0.4); color:#fca5a5; margin-bottom:0.75rem;">
            Slot Conflict / Declined
          </span>
          <h3 style="color:#ffffff; font-size:1.75rem; font-family:var(--font-serif); margin-bottom:0.5rem;">
            Advocate Has an Urgent High Court Hearing
          </h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.75rem; line-height:1.6;">
            Advocate ${lawyer.name} was listed for an emergency bench hearing and is unable to confirm the requested slot. You can select another slot or choose another advocate.
          </p>

          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-gold" onclick="UserFlow.setScheduleStatus('pending')">
              <i class="fa-solid fa-calendar-days"></i> Choose Another Slot with this Advocate
            </button>
            <button class="btn btn-outline" onclick="UserFlow.selectLawyerForSchedule('${matchingLawyers[1]?.id || matchingLawyers[0]?.id}')">
              <i class="fa-solid fa-user-plus"></i> Select Another Advocate in ${this.state.city}
            </button>
          </div>
        </div>
      `;
    }
  },

  selectSlot(slotTime) {
    this.state.selectedSlot = slotTime;
    document.querySelectorAll("#timeSlotsWrap .slot-chip").forEach(c => {
      c.classList.toggle("selected", c.textContent.includes(slotTime));
    });
    App.showToast(`Selected slot: ${slotTime}`, "info");
  },

  submitAppointmentRequest(lawyerId) {
    this.state.selectedLawyerId = lawyerId;
    if (!this.state.selectedSlot) {
      this.state.selectedSlot = "04:30 PM";
    }
    App.showToast("Simulated appointment request sent to advocate!", "success");
    // Show confirmed after a slight demo delay or control
    this.setScheduleStatus('confirmed');
  },

  setScheduleStatus(status) {
    this.state.scheduleStatus = status;
    const matchingLawyers = APP_DATA.lawyers.filter(law => {
      return law.city.toLowerCase() === this.state.city.toLowerCase();
    });
    const lawyer = APP_DATA.lawyers.find(l => l.id === this.state.selectedLawyerId) || matchingLawyers[0] || APP_DATA.lawyers[0];
    this.updateScheduleSubstate(lawyer);
  },

  selectLawyerForSchedule(lawyerId) {
    this.state.selectedLawyerId = lawyerId;
    this.state.scheduleStatus = 'pending';
    const lawyer = APP_DATA.lawyers.find(l => l.id === lawyerId) || APP_DATA.lawyers[0];
    this.updateScheduleSubstate(lawyer);
    App.showToast(`Selected ${lawyer.name} for appointment booking`, "info");
  },

  switchToConnectNowMode() {
    this.state.consultationMode = 'connect_now';
    this.renderStep7Matching();
    this.updateSummarySidebar();
    App.showToast("Switched to Connect Now mode.", "info");
  },

  // Helper to generate Lawyer Card HTML
  createLawyerCardHTML(law, isScheduleView = false) {
    const isTarget = law.id === this.state.selectedLawyerId;
    return `
      <div class="lawyer-card ${isTarget ? 'selected' : ''}" style="${isTarget ? 'border:2px solid var(--gold-500);' : ''}">
        <div class="lawyer-card-header">
          <div class="lawyer-portrait-wrap">
            <img src="${law.photo}" alt="${law.name}" class="lawyer-portrait" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(law.name)}&background=0b1a30&color=dfc27d'">
            <div class="lawyer-online-indicator ${law.isOnline ? '' : 'offline'}"></div>
          </div>
          <div class="lawyer-header-meta">
            <span class="lawyer-demo-badge">Demo Profile • ${law.barCouncilNo}</span>
            <h4>${law.name}</h4>
            <div class="lawyer-location-line">
              <i class="fa-solid fa-location-dot"></i>
              <span>${law.city}, ${law.state}</span>
              <span>•</span>
              <span style="color:var(--gold-600); font-weight:600;">★ ${law.rating} (${law.reviewCount})</span>
            </div>
          </div>
        </div>

        <div class="lawyer-card-body">
          <div class="lawyer-stats-row">
            <div class="lawyer-stat">
              <i class="fa-solid fa-briefcase" style="color:var(--navy-600);"></i>
              <span><strong>${law.experienceYears} Years</strong> Exp</span>
            </div>
            <div class="lawyer-stat">
              <i class="fa-solid fa-language" style="color:var(--navy-600);"></i>
              <span>${law.languages.join(", ")}</span>
            </div>
          </div>

          <div class="lawyer-domains-chips">
            ${law.domainsDisplay.map(d => `<span class="domain-chip-sm">${d}</span>`).join("")}
          </div>

          <p class="lawyer-about-snippet">${law.about}</p>
        </div>

        <div class="lawyer-card-footer">
          <button class="btn btn-outline btn-sm" onclick="App.showLawyerModal('${law.id}')">
            <i class="fa-solid fa-circle-info"></i> Profile
          </button>
          ${isScheduleView ? `
            <button class="btn btn-gold btn-sm" onclick="UserFlow.selectLawyerForSchedule('${law.id}')">
              <i class="fa-solid fa-calendar-check"></i> Book Slot
            </button>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="App.showSimulatedCallModal('${law.id}')">
              <i class="fa-solid fa-phone"></i> Connect Now
            </button>
          `}
        </div>
      </div>
    `;
  },

  // 8. Wizard Navigation & Step Validation
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 7) return;

    // Validate step before moving forward
    if (stepNumber > this.state.currentStep) {
      if (!this.validateCurrentStep()) return;
    }

    this.state.currentStep = stepNumber;

    // Update wizard steps DOM
    document.querySelectorAll("#userWizardPanes .wizard-step-pane").forEach((pane, idx) => {
      pane.classList.toggle("active-step", idx + 1 === stepNumber);
    });

    // Update stepper progress indicators
    document.querySelectorAll("#userStepper .stepper-step").forEach((stepEl, idx) => {
      const stepIdx = idx + 1;
      stepEl.classList.remove("active", "completed");
      if (stepIdx === stepNumber) {
        stepEl.classList.add("active");
      } else if (stepIdx < stepNumber) {
        stepEl.classList.add("completed");
      }
    });

    // Handle step-specific renders
    if (stepNumber === 5) this.renderStep5Review();
    if (stepNumber === 6) this.renderStep6Payment();
    if (stepNumber === 7) this.renderStep7Matching();

    this.updateSummarySidebar();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  },

  nextStep() {
    this.goToStep(this.state.currentStep + 1);
  },

  prevStep() {
    this.goToStep(this.state.currentStep - 1);
  },

  validateCurrentStep() {
    if (this.state.currentStep === 1) {
      if (!this.state.domain) {
        App.showToast("Please select a legal domain to continue.", "error");
        return false;
      }
    } else if (this.state.currentStep === 2) {
      if (!this.state.state || !this.state.city) {
        App.showToast("Please select your state and city.", "error");
        return false;
      }
    } else if (this.state.currentStep === 4) {
      if (!this.state.problemDescription || this.state.problemDescription.trim().length < 15) {
        App.showToast("Please briefly write your problem (at least 15 characters).", "error");
        return false;
      }
    }
    return true;
  },

  // 9. Persistent Summary Sidebar Update
  updateSummarySidebar() {
    const domainObj = APP_DATA.domains.find(d => d.id === this.state.domain) || APP_DATA.domains[0];
    const modeLabel = this.state.consultationMode === 'connect_now' ? 'Connect Now' : 'Schedule for Later';
    const feeAmount = this.state.priorityTier === 'priority' ? '₹499' : '₹299';

    const domDomain = document.getElementById("summaryDomain");
    if (domDomain) domDomain.textContent = domainObj.title;

    const domLoc = document.getElementById("summaryLocation");
    if (domLoc) domLoc.textContent = `${this.state.city}, ${this.state.state}`;

    const domMode = document.getElementById("summaryMode");
    if (domMode) domMode.textContent = modeLabel;

    const domFee = document.getElementById("summaryFee");
    if (domFee) domFee.textContent = feeAmount;

    const domStatus = document.getElementById("summaryPaymentStatus");
    if (domStatus) {
      if (this.state.paymentStatus === 'success') {
        domStatus.innerHTML = `<span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Paid (Demo)</span>`;
      } else if (this.state.paymentStatus === 'failed') {
        domStatus.innerHTML = `<span style="color:#ef4444; font-weight:700;"><i class="fa-solid fa-circle-xmark"></i> Unpaid</span>`;
      } else {
        domStatus.innerHTML = `<span style="color:var(--text-muted);"><i class="fa-solid fa-hourglass"></i> Pending</span>`;
      }
    }
  }
};

window.UserFlow = UserFlow;
