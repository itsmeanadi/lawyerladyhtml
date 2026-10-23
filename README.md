# The Lawyer Lady — Legal Consultation & Advocate Network
> **Awwwards-Winning Luxury Dark Editorial Prototype**  
> Inspired by the combined concepts of Vakilo and PathLegal, customized for Indian legal jurisdictions.

---

## ⚖️ Overview

**The Lawyer Lady** is an interactive, client-ready web prototype designed for presenting an ethical, transparent advocate connection platform in India. Built with clean vanilla **HTML5, CSS3, and JavaScript**, it runs instantly in any modern browser without requiring backends, databases, external API keys, or payment gateways.

### ✨ Awwwards Luxury Aesthetic
- **Visual Design**: Obsidian midnight glass surfaces (`#050811`, `#0d1424`), luminous champagne gold accents (`#d4af37`), ambient glowing light orbs, and architectural hairline borders.
- **Editorial Typography**: Cormorant Garamond display headings, Cinzel brand titles, Plus Jakarta Sans body, and Space Grotesk metrics.
- **Micro-Interactions**: Custom trailing luxury cursor follower, continuous running marquee ticker tape, and radar search broadcast animations.

---

## 🚀 Key Prototype Flows

### 1. User Consultation Flow (7 Steps)
1. **Domain Selection**: 8 specialized practice areas (Family & Matrimonial, Property & RERA, Criminal Law, Business & Contracts, Consumer Disputes, Cybercrime, Labour & Employment, General Practice).
2. **Jurisdiction Filter**: Cascading State & City dropdowns covering 18+ Indian cities & High Court benches (Indore, Bhopal, Mumbai, Pune, Jaipur, Delhi, Bengaluru, etc.).
3. **Connection Mode**:
   - **Mode 1: Connect Now** (Live broadcast to online advocates in jurisdiction).
   - **Mode 2: Schedule for Later** (Slot reservation for chamber or video consultation).
4. **Intelligent Dynamic Questionnaire**: 3 tailored questions per legal domain plus free-text problem description.
5. **Review Brief & Tier**: Detailed brief summary with selection between Standard (₹299) and Priority Expedited (₹499) speeds.
6. **Simulated Checkout**: Apple Pay / Black Card style simulated billing interface with **mandatory demonstration controls**:
   - `Payment Done` ➔ unlocks advocate matching results.
   - `Payment Not Done` ➔ demonstrates payment failure and retry flow.
7. **Matching Results**:
   - *Connect Now*: Radar broadcast animation with simulated acceptance, instant chamber voice call mockup with live timer, and no-availability fallback.
   - *Schedule*: Calendar slot picker, confirmed appointment pass generator, and court conflict re-routing.

### 2. Lawyer Onboarding Flow (5 Steps)
1. **Account Credentials**: Full name, Bar Council enrolment number, phone, email, and primary practice jurisdiction.
2. **Profile & Niches**: Years of standing, court admissions, consultation fee guide, bio, and multi-select practice niches.
3. **Public Profile Review**: Complete preview card of the advocate's public listing before activation.
4. **Annual Membership Payment**: Standard Annual Membership (₹2,999/yr) checkout with **mandatory demonstration controls**:
   - `Payment Done` ➔ activates listing and unlocks dashboard.
   - `Payment Not Done` ➔ demonstrates unactivated draft handling.
5. **Advocate Dashboard**: Live online/in-court availability toggle, incoming consultation request manager (Accept/Decline), metrics overview, and confirmed appointment calendar.

### 3. Legal Knowledge Hub
- 7 comprehensive Indian legal guides with reading time, verified advocate badges, procedural steps, and 5 essential questions to ask your lawyer.
- Category filtering and live search.
- Dark frosted glass article modal reader with 1-click CTA to start a consultation brief in that domain.

### 4. Presenter Demo Bar
- Persistent top bar with 1-click jumps to any step in either flow.
- 1-click `Reset Demo` button to clear local storage and reset all states.

---

## 💻 Running Locally

Simply open `index.html` directly in any web browser, or serve it using Python:

```bash
# Start a local static server
python -m http.server 8080

# Open in browser
http://localhost:8080
```

---

## 🏛️ Regulatory Compliance
Designed in alignment with the **Advocates Act, 1961** and Bar Council of India advertising guidelines:
- Strictly platform connection & technology matching fees.
- Zero commissions or percentage splits on lawyer professional litigation fees.
- Independent advocate advisory with full client confidentiality.
