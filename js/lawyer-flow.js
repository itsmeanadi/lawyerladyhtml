/**
 * The Lawyer Lady — Lawyer Onboarding & Dashboard Controller
 * Revised Sequence:
 * Step 1: Account Information (Name, email, mobile, city/state)
 * Step 2: Professional Profile & Niches (Bio, experience, bar council number, legal niches)
 * Step 3: Profile Review & Verification Preview (Public-facing profile preview & confirmation)
 * Step 4: Annual Membership Payment (₹2,999/yr demo with mandatory Payment Done / Not Done controls)
 * Step 5: Advocate Dashboard Preview (Availability toggle, incoming requests, schedule)
 */

const LawyerFlow = {
  // State
  state: {
    currentStep: 1,
    // Realistic defaults for instant presentation
    account: {
      fullName: "Adv. Aniruddh Vaidya",
      email: "aniruddh.vaidya.legal@gmail.com",
      phone: "+91 98260 41529",
      state: "Madhya Pradesh",
      city: "Indore"
    },
    profile: {
      bio: "Practicing advocate with over 12 years of trial and appellate experience before the High Court of Madhya Pradesh (Indore Bench) and District Courts. Focused on civil injunctions, property partition, commercial dispute mediation, and constitutional writs. Committed to ethical advocacy.",
      experienceYears: 12,
      languages: ["Hindi", "English"],
      barCouncilNo: "MP/2418/2014 (Demo)",
      niches: ["property", "family", "business"],
      termsAccepted: true
    },
    membershipStatus: "pending", // "pending" | "paid" | "failed"
    isOnline: true,
    verificationStatus: "Pending Verification",
    // Sample dynamic appointment requests for the dashboard
    appointmentRequests: [
      {
        id: "req_01",
        clientName: "Sunil Verma",
        domain: "Property & Civil Disputes",
        problemSnippet: "Ancestral land partition dispute with uncle; need urgent review of registered partition deed in Indore.",
        preferredSlot: "Tomorrow, 04:30 PM",
        status: "pending" // "pending" | "accepted" | "declined"
      },
      {
        id: "req_02",
        clientName: "Pooja Kulkarni",
        domain: "Family & Relationships",
        problemSnippet: "Drafting mutual consent divorce petition and child custody terms; separation of 15 months completed.",
        preferredSlot: "Monday, 11:30 AM",
        status: "pending"
      }
    ],
    upcomingAppointments: [
      {
        id: "app_01",
        clientName: "Rameshwar Patidar",
        domain: "Property Title Verification",
        time: "Today, 05:00 PM (Chamber)",
        mode: "In-Person Consultation"
      }
    ]
  },

  init() {
    this.initFormDefaults();
    this.initLocationDropdowns();
    this.renderNichesSelection();
    this.bindEvents();
  },

  bindEvents() {
    // State dropdown change
    const stSelect = document.getElementById("lawyerStateSelect");
    if (stSelect) {
      stSelect.addEventListener("change", (e) => {
        this.state.account.state = e.target.value;
        this.populateCityDropdown(e.target.value);
      });
    }

    const ctSelect = document.getElementById("lawyerCitySelect");
    if (ctSelect) {
      ctSelect.addEventListener("change", (e) => {
        this.state.account.city = e.target.value;
      });
    }
  },

  initFormDefaults() {
    const fn = document.getElementById("lawyerFullName");
    if (fn) fn.value = this.state.account.fullName;

    const em = document.getElementById("lawyerEmail");
    if (em) em.value = this.state.account.email;

    const ph = document.getElementById("lawyerPhone");
    if (ph) ph.value = this.state.account.phone;

    const bio = document.getElementById("lawyerBio");
    if (bio) bio.value = this.state.profile.bio;

    const exp = document.getElementById("lawyerExperience");
    if (exp) exp.value = this.state.profile.experienceYears;

    const bar = document.getElementById("lawyerBarCouncil");
    if (bar) bar.value = this.state.profile.barCouncilNo;
  },

  initLocationDropdowns() {
    const stSelect = document.getElementById("lawyerStateSelect");
    if (!stSelect) return;

    stSelect.innerHTML = Object.keys(APP_DATA.locations).map(st => `
      <option value="${st}" ${st === this.state.account.state ? 'selected' : ''}>${st}</option>
    `).join("");

    this.populateCityDropdown(this.state.account.state);
  },

  populateCityDropdown(state) {
    const ctSelect = document.getElementById("lawyerCitySelect");
    if (!ctSelect) return;

    const cities = APP_DATA.locations[state] || [];
    ctSelect.innerHTML = cities.map(ct => `
      <option value="${ct}" ${ct === this.state.account.city ? 'selected' : ''}>${ct}</option>
    `).join("");

    this.state.account.city = cities[0] || "";
  },

  // Step 2: Render Niche Selection Chips
  renderNichesSelection() {
    const container = document.getElementById("lawyerNichesContainer");
    if (!container) return;

    const nicheOptions = [
      { id: "family", label: "Family Law" },
      { id: "property", label: "Property & Real Estate Law" },
      { id: "criminal", label: "Criminal Defense" },
      { id: "business", label: "Business & Corporate Law" },
      { id: "consumer", label: "Consumer Protection" },
      { id: "cybercrime", label: "Cybercrime & IT Law" },
      { id: "employment", label: "Employment & Labour Law" },
      { id: "ip", label: "Intellectual Property (IPR)" },
      { id: "civil", label: "Civil Writs & Revenue Law" }
    ];

    container.innerHTML = nicheOptions.map(n => {
      const isSelected = this.state.profile.niches.includes(n.id);
      return `
        <div class="slot-chip ${isSelected ? 'selected' : ''}" data-niche="${n.id}" onclick="LawyerFlow.toggleNiche('${n.id}')">
          <i class="fa-solid ${isSelected ? 'fa-check' : 'fa-plus'}" style="margin-right:0.35rem; font-size:0.75rem;"></i>
          ${n.label}
        </div>
      `;
    }).join("");
  },

  toggleNiche(nicheId) {
    const idx = this.state.profile.niches.indexOf(nicheId);
    if (idx > -1) {
      if (this.state.profile.niches.length === 1) {
        App.showToast("Please select at least one legal niche.", "error");
        return;
      }
      this.state.profile.niches.splice(idx, 1);
    } else {
      this.state.profile.niches.push(nicheId);
    }
    this.renderNichesSelection();
  },

  // Step 3: Render Profile Review & Public Preview (BEFORE PAYMENT)
  renderStep3Review() {
    const container = document.getElementById("lawyerReviewContainer");
    if (!container) return;

    const nichesList = this.state.profile.niches.map(nId => {
      const d = APP_DATA.domains.find(item => item.id === nId);
      return d ? d.title : nId;
    });

    container.innerHTML = `
      <div style="background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); border-radius:var(--radius-xl); padding:2rem; margin-bottom:1.5rem; box-shadow:var(--shadow-lg);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem;">
          <h4 style="font-size:1.35rem; color:#ffffff; font-family:var(--font-serif);">Public Profile Preview</h4>
          <span class="demo-pill" style="font-size:0.75rem; font-family:var(--font-mono);">Ready for Activation</span>
        </div>

        <div style="display:flex; gap:1.5rem; align-items:flex-start; margin-bottom:1.75rem; flex-wrap:wrap;">
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=350" alt="Avatar" style="width:88px; height:88px; border-radius:50%; object-fit:cover; border:2.5px solid var(--gold-400); box-shadow:0 8px 24px rgba(0,0,0,0.5);">
          <div>
            <span class="demo-pill" style="margin-bottom:0.4rem; font-size:0.72rem; font-family:var(--font-mono);">Enrolment: ${this.state.profile.barCouncilNo}</span>
            <h3 style="font-size:1.6rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.25rem;">${this.state.account.fullName}</h3>
            <p style="font-size:0.875rem; color:var(--text-muted);">
              <i class="fa-solid fa-location-dot" style="color:var(--gold-400);"></i> ${this.state.account.city}, ${this.state.account.state} • ${this.state.profile.experienceYears} Years Standing
            </p>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom:1.5rem;">
          <div style="background:rgba(8, 12, 24, 0.6); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Professional Email</span>
            <p style="font-weight:600; font-size:0.95rem; color:#ffffff; margin-top:0.2rem;">${this.state.account.email}</p>
          </div>
          <div style="background:rgba(8, 12, 24, 0.6); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Direct Phone</span>
            <p style="font-weight:600; font-size:0.95rem; color:#ffffff; margin-top:0.2rem;">${this.state.account.phone}</p>
          </div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Practice Niches</span>
          <div style="margin-top:0.5rem; display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${nichesList.map(n => `<span class="domain-chip-sm" style="background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3); color:var(--gold-300);">${n}</span>`).join("")}
          </div>
        </div>

        <div style="margin-bottom:1.25rem;">
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:0.06em;">Professional Summary</span>
          <p style="font-size:0.9rem; color:#cbd5e1; background:rgba(8, 12, 24, 0.6); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle); margin-top:0.5rem; line-height:1.6;">
            ${this.state.profile.bio}
          </p>
        </div>
      </div>

      <!-- Confirmation Checkbox -->
      <div style="margin-bottom:1.75rem;">
        <label style="display:flex; align-items:flex-start; gap:0.75rem; cursor:pointer;">
          <input type="checkbox" id="confirmDemoTerms" checked style="width:18px; height:18px; margin-top:3px; accent-color:var(--gold-400);">
          <span style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">
            I confirm that the above professional information and Bar Council registration credentials are accurate. Proceed to Annual Membership payment to activate this profile and unlock client matching.
          </span>
        </label>
      </div>

      <div style="display:flex; gap:1rem; justify-content:space-between; flex-wrap:wrap;">
        <button class="btn btn-outline" onclick="LawyerFlow.goToStep(2)">
          <i class="fa-solid fa-arrow-left"></i> Back & Edit Profile
        </button>
        <button class="btn btn-gold btn-lg" onclick="LawyerFlow.proceedToPayment()">
          <span>Proceed to Annual Membership Payment</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;
  },

  proceedToPayment() {
    const chk = document.getElementById("confirmDemoTerms");
    if (chk && !chk.checked) {
      App.showToast("Please confirm the profile verification checkbox.", "error");
      return;
    }
    this.goToStep(4);
  },

  // Step 4: Render Annual Membership Payment with Mandatory Buttons
  renderStep4Membership() {
    const container = document.getElementById("lawyerMembershipContainer");
    if (!container) return;

    if (this.state.membershipStatus === 'paid') {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 2rem; background:rgba(16, 185, 129, 0.1); border:1.5px solid rgba(16, 185, 129, 0.35); border-radius:var(--radius-xl); margin-bottom:1.5rem; box-shadow:0 15px 40px rgba(0,0,0,0.6);">
          <div style="width:72px; height:72px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(16, 185, 129, 0.4);">
            <i class="fa-solid fa-check"></i>
          </div>
          <span class="demo-pill" style="background:rgba(16, 185, 129, 0.2); border-color:#10b981; color:#34d399; margin-bottom:0.75rem;">Simulated Membership Active</span>
          <h3 style="color:#ffffff; font-size:1.8rem; font-family:var(--font-serif); margin-bottom:0.5rem;">Annual Membership Fee Paid</h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.5rem; line-height:1.6;">
            Simulated payment of <strong>₹2,999/year</strong> recorded successfully. Your advocate profile for <strong>${this.state.account.fullName}</strong> is now active in ${this.state.account.city}!
          </p>

          <div style="background:rgba(8, 12, 24, 0.85); border-radius:var(--radius-lg); max-width:460px; margin:0 auto 1.75rem; padding:1.25rem; text-align:left; font-size:0.875rem; border:1px solid rgba(16, 185, 129, 0.3);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span style="color:var(--text-muted);">Transaction ID (Demo):</span>
              <strong style="color:#ffffff; font-family:var(--font-mono);">TLL_MEMB_${Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span style="color:var(--text-muted);">Membership Plan:</span>
              <strong style="color:#ffffff;">Standard Annual (₹2,999/yr)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:var(--text-muted);">Profile Status:</span>
              <span style="color:#34d399; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Active & Listed</span>
            </div>
          </div>

          <button class="btn btn-gold btn-lg" onclick="LawyerFlow.goToStep(5)">
            <span>Open Advocate Dashboard</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <!-- Testing reset switch -->
        <div style="text-align:center; padding-top:1.25rem; border-top:1px dashed var(--border-medium);">
          <span style="font-size:0.825rem; color:var(--text-muted); margin-right:0.75rem;">Want to test failed payment handling?</span>
          <button class="btn btn-outline btn-sm" onclick="LawyerFlow.simulateMembershipNotDone()">
            <i class="fa-solid fa-rotate-left"></i> Test "Payment Not Done"
          </button>
        </div>
      `;
      return;
    }

    if (this.state.membershipStatus === 'failed') {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 2rem; background:rgba(244, 63, 94, 0.1); border:1.5px solid rgba(244, 63, 94, 0.35); border-radius:var(--radius-xl); margin-bottom:1.5rem; box-shadow:0 15px 40px rgba(0,0,0,0.6);">
          <div style="width:72px; height:72px; border-radius:50%; background:#f43f5e; color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem; box-shadow:0 0 25px rgba(244, 63, 94, 0.4);">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <span class="demo-pill" style="background:rgba(244, 63, 94, 0.2); border-color:#f43f5e; color:#fca5a5; margin-bottom:0.75rem;">Membership Incomplete</span>
          <h3 style="color:#ffffff; font-size:1.8rem; font-family:var(--font-serif); margin-bottom:0.5rem;">Payment Not Completed</h3>
          <p style="color:#cbd5e1; font-size:0.95rem; max-width:540px; margin:0 auto 1.5rem; line-height:1.6;">
            The simulated annual membership transaction was not completed. Your profile for <strong>${this.state.account.fullName}</strong> remains unactivated in draft status.
          </p>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-gold btn-lg" onclick="LawyerFlow.simulateMembershipDone()">
              <i class="fa-solid fa-rotate-right"></i> Retry & Mark as "Payment Done"
            </button>
            <button class="btn btn-outline" onclick="LawyerFlow.goToStep(3)">
              <i class="fa-solid fa-arrow-left"></i> Back to Profile Review
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Default Membership View — Sleek Obsidian Gold Card
    container.innerHTML = `
      <div style="background:linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 24, 0.98) 100%); border:1.5px solid var(--border-gold); border-radius:var(--radius-xl); padding:2.5rem; margin-bottom:2rem; position:relative; box-shadow:0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(212,175,55,0.15);">
        <div style="display:inline-block; position:absolute; top:-12px; right:24px; background:var(--gold-400); color:#050811; padding:0.3rem 1rem; border-radius:var(--radius-full); font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; font-family:var(--font-mono);">
          Annual Plan (Demo)
        </div>

        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="font-size:1.75rem; color:#ffffff; font-family:var(--font-serif); margin-bottom:0.35rem;">Standard Advocate Annual Membership</h3>
            <p style="font-size:0.9rem; color:var(--text-secondary);">Activate profile credentials for ${this.state.account.fullName} in ${this.state.account.city}</p>
          </div>
          <div style="text-align:right;">
            <div style="font-size:2.25rem; font-weight:800; color:var(--gold-300); font-family:var(--font-serif);">₹2,999 <span style="font-size:0.9rem; font-weight:500; color:var(--text-muted); font-family:var(--font-sans);">/ year</span></div>
            <span style="font-size:0.75rem; color:var(--gold-400); font-family:var(--font-mono);">(Demo Simulation)</span>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-subtle); padding-top:1.5rem; margin-bottom:1.75rem;">
          <h4 style="font-size:0.95rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--gold-300); margin-bottom:1.15rem; font-family:var(--font-mono);">
            Included Membership Privileges:
          </h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:0.85rem; font-size:0.95rem; color:#cbd5e1;">
            <li style="display:flex; align-items:center; gap:0.75rem;">
              <i class="fa-solid fa-circle-check" style="color:var(--gold-400);"></i>
              <span><strong>Verified Public Profile:</strong> Activate Bar Council standing, court admissions, and verified experience.</span>
            </li>
            <li style="display:flex; align-items:center; gap:0.75rem;">
              <i class="fa-solid fa-circle-check" style="color:var(--gold-400);"></i>
              <span><strong>Approved Legal-Niche Listing:</strong> Appear in specialized domain search results in ${this.state.account.city}, ${this.state.account.state}.</span>
            </li>
            <li style="display:flex; align-items:center; gap:0.75rem;">
              <i class="fa-solid fa-circle-check" style="color:var(--gold-400);"></i>
              <span><strong>Eligibility for Instant Connection Broadcasts:</strong> Receive real-time client consultation requests.</span>
            </li>
            <li style="display:flex; align-items:center; gap:0.75rem;">
              <i class="fa-solid fa-circle-check" style="color:var(--gold-400);"></i>
              <span><strong>Appointment-Request Notifications:</strong> Manage schedule with chamber and virtual consultation booking slots.</span>
            </li>
            <li style="display:flex; align-items:center; gap:0.75rem;">
              <i class="fa-solid fa-circle-check" style="color:var(--gold-400);"></i>
              <span><strong>Profile & Live Availability Toggle:</strong> Switch active/court status directly from your advocate dashboard.</span>
            </li>
          </ul>
        </div>

        <!-- Strict Bar Council & Income Disclaimer -->
        <div style="background:rgba(8, 12, 24, 0.7); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.15rem; font-size:0.825rem; line-height:1.6; color:var(--text-secondary);">
          <strong style="color:var(--gold-300);">Important Legal Disclaimer:</strong> Annual membership fees are charged solely for platform software access, profile hosting, and digital directory presence. <em>Membership does not guarantee clients, leads, bookings, litigation cases, or specific income.</em> The Lawyer Lady does not charge commissions on client legal fees.
        </div>
      </div>

      <!-- MANDATORY MEMBERSHIP PAYMENT BUTTONS -->
      <div class="payment-actions-wrapper">
        <div class="payment-actions-label">
          <i class="fa-solid fa-gamepad" style="color:var(--gold-400); margin-right:0.35rem;"></i>
          Mandatory Prototype Membership Payment Controls
        </div>
        <p class="payment-actions-desc">
          Click <strong>Payment Done</strong> to activate your created profile, or <strong>Payment Not Done</strong> to test incomplete onboarding handling.
        </p>
        <div class="payment-actions-grid">
          <button type="button" class="btn btn-payment-done" onclick="LawyerFlow.simulateMembershipDone()">
            <span style="display:flex; align-items:center; gap:0.5rem;">
              <i class="fa-solid fa-circle-check"></i>
              <span>Payment Done</span>
            </span>
            <span class="sub-label">Simulate Annual ₹2,999 Payment</span>
          </button>

          <button type="button" class="btn btn-payment-not-done" onclick="LawyerFlow.simulateMembershipNotDone()">
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

  simulateMembershipDone() {
    this.state.membershipStatus = 'paid';
    App.showToast("Advocate membership payment of ₹2,999 recorded (Demo)!", "success");
    this.renderStep4Membership();
  },

  simulateMembershipNotDone() {
    this.state.membershipStatus = 'failed';
    App.showToast("Membership payment marked incomplete. Profile remains inactive.", "error");
    this.renderStep4Membership();
  },

  // Step 5: Lawyer Dashboard Preview (Non-Admin Advocate Control Panel)
  renderStep5Dashboard() {
    const container = document.getElementById("lawyerDashboardContainer");
    if (!container) return;

    container.innerHTML = `
      <div class="lawyer-dashboard-grid">
        <!-- Sidebar Summary -->
        <div class="lawyer-profile-sidebar">
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=350" alt="Avatar" class="dashboard-avatar-big" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(this.state.account.fullName)}&background=0b1a30&color=dfc27d'">
          <h3 style="font-size:1.25rem; margin-bottom:0.25rem;">${this.state.account.fullName}</h3>
          <p style="font-size:0.825rem; color:var(--text-muted); margin-bottom:0.65rem;">
            ${this.state.account.city}, ${this.state.account.state}
          </p>
          <span class="demo-pill" style="margin-bottom:1rem; font-size:0.7rem;">
            ${this.state.profile.barCouncilNo}
          </span>

          <div style="border-top:1px solid var(--border-subtle); padding-top:1rem; margin-top:0.5rem; text-align:left;">
            <div style="margin-bottom:0.75rem;">
              <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Verification Status:</span>
              <div style="display:flex; align-items:center; gap:0.4rem; color:var(--gold-600); font-weight:700; font-size:0.85rem; margin-top:0.15rem;">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <span id="dashVerificationText">${this.state.verificationStatus}</span>
              </div>
            </div>

            <div style="margin-bottom:0.75rem;">
              <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Annual Membership:</span>
              <div style="color:#059669; font-weight:700; font-size:0.85rem; margin-top:0.15rem;">
                <i class="fa-solid fa-check-circle"></i> Active (Standard ₹2,999)
              </div>
            </div>

            <div style="margin-bottom:0.75rem;">
              <span style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Profile Completion:</span>
              <div style="width:100%; height:8px; background:var(--border-medium); border-radius:4px; margin-top:0.35rem; overflow:hidden;">
                <div style="width:90%; height:100%; background:var(--gold-500); border-radius:4px;"></div>
              </div>
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">90% Complete</span>
            </div>
          </div>

          <!-- Working Live Availability Toggle -->
          <div class="availability-toggle-box">
            <div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--navy-900);">Advocate Status</div>
              <div id="availabilityLabel" style="font-size:0.75rem; color:${this.state.isOnline ? '#059669' : '#64748b'}; font-weight:600;">
                ${this.state.isOnline ? 'Online for Connect Now' : 'In Court / Offline'}
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" id="lawyerAvailSwitch" ${this.state.isOnline ? 'checked' : ''} onchange="LawyerFlow.toggleAvailability(this.checked)">
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- Main Dashboard Column -->
        <div class="dashboard-main-col">
          <!-- Pending Connection / Appointment Requests -->
          <div class="dashboard-card">
            <div class="dashboard-card-header">
              <div>
                <h4 style="font-size:1.15rem; color:var(--navy-900); margin-bottom:0.15rem;">
                  Incoming Consultation Requests (${this.state.appointmentRequests.filter(r => r.status === 'pending').length})
                </h4>
                <p style="font-size:0.8rem; color:var(--text-muted);">
                  Client connection requests matched to your practice niches in ${this.state.account.city}.
                </p>
              </div>
              <span class="demo-pill">Simulated Leads</span>
            </div>

            <div id="incomingRequestsContainer">
              ${this.renderRequestsListHTML()}
            </div>
          </div>

          <!-- Confirmed Upcoming Schedule -->
          <div class="dashboard-card">
            <div class="dashboard-card-header">
              <div>
                <h4 style="font-size:1.15rem; color:var(--navy-900); margin-bottom:0.15rem;">
                  Upcoming Confirmed Appointments
                </h4>
                <p style="font-size:0.8rem; color:var(--text-muted);">
                  Scheduled client consultations for this week.
                </p>
              </div>
            </div>

            <div id="upcomingScheduleContainer">
              ${this.renderUpcomingScheduleHTML()}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderRequestsListHTML() {
    const pending = this.state.appointmentRequests;
    if (pending.length === 0) {
      return `<p style="font-size:0.875rem; color:var(--text-muted); padding:1rem 0;">No pending requests at this time.</p>`;
    }

    return pending.map(req => `
      <div style="background:rgba(15, 23, 42, 0.75); border:1px solid var(--border-medium); border-radius:var(--radius-lg); padding:1.35rem; margin-bottom:1rem; transition:all 0.2s ease;" id="reqCard_${req.id}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.65rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <strong style="font-size:1.05rem; color:#ffffff; font-family:var(--font-serif);">${req.clientName}</strong>
            <span class="domain-chip-sm" style="margin-left:0.5rem; background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3); color:var(--gold-300);">${req.domain}</span>
          </div>
          <span style="font-size:0.8rem; font-weight:600; color:var(--gold-300); background:rgba(8, 12, 24, 0.75); padding:0.25rem 0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); font-family:var(--font-mono);">
            <i class="fa-solid fa-clock"></i> ${req.preferredSlot}
          </span>
        </div>

        <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.55; margin-bottom:1rem;">
          "${req.problemSnippet}"
        </p>

        <div style="display:flex; justify-content:flex-end; gap:0.65rem;" id="reqActions_${req.id}">
          ${req.status === 'accepted' ? `
            <span style="color:#34d399; font-weight:700; font-size:0.85rem;"><i class="fa-solid fa-check"></i> Accepted & Added to Schedule</span>
          ` : req.status === 'declined' ? `
            <span style="color:#f43f5e; font-weight:700; font-size:0.85rem;"><i class="fa-solid fa-xmark"></i> Declined</span>
          ` : `
            <button class="btn btn-outline btn-sm" onclick="LawyerFlow.declineRequest('${req.id}')">
              <i class="fa-solid fa-xmark"></i> Decline
            </button>
            <button class="btn btn-gold btn-sm" onclick="LawyerFlow.acceptRequest('${req.id}')">
              <i class="fa-solid fa-check"></i> Accept Consultation
            </button>
          `}
        </div>
      </div>
    `).join("");
  },

  renderUpcomingScheduleHTML() {
    return this.state.upcomingAppointments.map(app => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:1rem 1.25rem; border-radius:var(--radius-md); background:rgba(8, 12, 24, 0.75); border:1px solid var(--border-subtle); margin-bottom:0.75rem;">
        <div>
          <div style="font-weight:700; color:#ffffff; font-size:0.95rem; font-family:var(--font-serif);">${app.clientName}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${app.domain} • ${app.mode}</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--gold-400); font-family:var(--font-mono);">${app.time}</span>
        </div>
      </div>
    `).join("");
  },

  acceptRequest(reqId) {
    const req = this.state.appointmentRequests.find(r => r.id === reqId);
    if (req) {
      req.status = 'accepted';
      this.state.upcomingAppointments.push({
        id: `app_${Date.now()}`,
        clientName: req.clientName,
        domain: req.domain,
        time: req.preferredSlot,
        mode: "Chamber Consultation"
      });
      App.showToast(`Accepted consultation request from ${req.clientName}`, "success");
      this.renderStep5Dashboard();
    }
  },

  declineRequest(reqId) {
    const req = this.state.appointmentRequests.find(r => r.id === reqId);
    if (req) {
      req.status = 'declined';
      App.showToast(`Declined request from ${req.clientName}`, "info");
      this.renderStep5Dashboard();
    }
  },

  toggleAvailability(isOnline) {
    this.state.isOnline = isOnline;
    const label = document.getElementById("availabilityLabel");
    if (label) {
      label.textContent = isOnline ? 'Online for Connect Now' : 'In Court / Offline';
      label.style.color = isOnline ? '#059669' : '#64748b';
    }
    App.showToast(`Availability status updated to: ${isOnline ? 'Online' : 'Offline'}`, "info");
  },

  // Stepper Navigation
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 5) return;

    if (stepNumber > this.state.currentStep) {
      if (!this.validateStep()) return;
    }

    this.state.currentStep = stepNumber;

    document.querySelectorAll("#lawyerWizardPanes .wizard-step-pane").forEach((pane, idx) => {
      pane.classList.toggle("active-step", idx + 1 === stepNumber);
    });

    document.querySelectorAll("#lawyerStepper .stepper-step").forEach((stepEl, idx) => {
      const stepIdx = idx + 1;
      stepEl.classList.remove("active", "completed");
      if (stepIdx === stepNumber) {
        stepEl.classList.add("active");
      } else if (stepIdx < stepNumber) {
        stepEl.classList.add("completed");
      }
    });

    if (stepNumber === 3) this.renderStep3Review();
    if (stepNumber === 4) this.renderStep4Membership();
    if (stepNumber === 5) this.renderStep5Dashboard();

    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  },

  validateStep() {
    if (this.state.currentStep === 1) {
      const fn = document.getElementById("lawyerFullName");
      const em = document.getElementById("lawyerEmail");
      const ph = document.getElementById("lawyerPhone");
      if (!fn || !em || !ph || !fn.value.trim() || !em.value.trim() || !ph.value.trim()) {
        App.showToast("Please fill in all mandatory account fields.", "error");
        return false;
      }
      this.state.account.fullName = fn.value.trim();
      this.state.account.email = em.value.trim();
      this.state.account.phone = ph.value.trim();
    } else if (this.state.currentStep === 2) {
      const bio = document.getElementById("lawyerBio");
      const exp = document.getElementById("lawyerExperience");
      const bar = document.getElementById("lawyerBarCouncil");

      if (!bio || !bar || !bio.value.trim() || !bar.value.trim()) {
        App.showToast("Please provide your professional introduction and demo Bar Council number.", "error");
        return false;
      }
      this.state.profile.bio = bio.value.trim();
      this.state.profile.experienceYears = parseInt(exp.value) || 10;
      this.state.profile.barCouncilNo = bar.value.trim();
    } else if (this.state.currentStep === 3) {
      const chk = document.getElementById("confirmDemoTerms");
      if (chk && !chk.checked) {
        App.showToast("Please confirm the verification checkbox to proceed.", "error");
        return false;
      }
    } else if (this.state.currentStep === 4) {
      if (this.state.membershipStatus !== 'paid') {
        App.showToast("Please complete the simulated membership payment to unlock your dashboard.", "error");
        return false;
      }
    }
    return true;
  }
};

window.LawyerFlow = LawyerFlow;
