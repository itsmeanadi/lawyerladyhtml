/**
 * The Lawyer Lady - Platform Mock Data
 * Realistic Indian legal ecosystem sample data for client demonstration.
 */

const APP_DATA = {
  // Indian States & Cities
  locations: {
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Delhi": ["New Delhi"]
  },

  // Legal Domains with descriptive metadata & icons
  domains: [
    {
      id: "family",
      title: "Family & Relationships",
      icon: "fa-heart-circle-bolt",
      badge: "High Demand",
      description: "Divorce, child custody, alimony & maintenance, restitution of conjugal rights, domestic disputes."
    },
    {
      id: "property",
      title: "Property & Civil Disputes",
      icon: "fa-building-shield",
      badge: "Civil Practice",
      description: "Title verification, boundary disputes, builder possession delay (RERA), partition deeds, tenant eviction."
    },
    {
      id: "criminal",
      title: "Criminal Law",
      icon: "fa-gavel",
      badge: "Urgent Relief",
      description: "Anticipatory & regular bail, FIR quashing, criminal complaints, Section 138 NI Act cheque bounce defense."
    },
    {
      id: "business",
      title: "Business & Contracts",
      icon: "fa-briefcase",
      badge: "Corporate",
      description: "Commercial contract drafting, vendor recovery disputes, partnership & shareholder agreements, startup compliance."
    },
    {
      id: "consumer",
      title: "Consumer Issues",
      icon: "fa-shield-halved",
      badge: "Consumer Forum",
      description: "Defective goods, medical or service negligence, insurance claim repudiation, unfair trade practices."
    },
    {
      id: "cybercrime",
      title: "Cybercrime",
      icon: "fa-network-wired",
      badge: "Tech & Cyber",
      description: "Online financial fraud, identity theft, unauthorized data breaches, digital harassment, IT Act offenses."
    },
    {
      id: "employment",
      title: "Employment & Labour",
      icon: "fa-users-gear",
      badge: "Workplace",
      description: "Wrongful termination, unpaid severance or gratuity, non-compete enforceability, POSH workplace harassment."
    },
    {
      id: "other",
      title: "Other Legal Issues",
      icon: "fa-scale-balanced",
      badge: "General Practice",
      description: "Writ petitions, intellectual property (trademark/copyright), legal notices, taxation, revenue appeals."
    }
  ],

  // Domain-specific questionnaire templates (Step 4)
  domainQuestions: {
    family: [
      {
        id: "q1",
        label: "Question 1: What best describes your family or matrimonial situation?",
        options: [
          { text: "Option 1: Seeking mutual consent divorce and amicable settlement.", desc: "Both parties agree to separate terms and wish for an expedited mutual petition." },
          { text: "Option 2: Contested matrimonial dispute involving maintenance, custody, or allegations.", desc: "Disagreements over alimony, child visitation, or marital property division." },
          { text: "Option 3: Domestic distress requiring counseling or urgent legal protection.", desc: "Looking for mediation, protection orders, or legal guidance on safety & rights." }
        ]
      },
      {
        id: "q2",
        label: "Question 2: Are minor children or financial maintenance claims involved?",
        options: [
          { text: "Option 1: Yes, child custody and monthly child-support are critical issues.", desc: "Needs child welfare, visitation schedule, and education funding agreements." },
          { text: "Option 2: Financial alimony or joint property partition is the primary dispute.", desc: "Needs asset valuation, interim maintenance filing, or financial settlement." },
          { text: "Option 3: No minor children or significant property claims involved.", desc: "Straightforward dissolution or declaratory relief required." }
        ]
      },
      {
        id: "q3",
        label: "Question 3: Have legal notices or formal court filings already occurred?",
        options: [
          { text: "Option 1: No formal step taken yet; seeking initial advisory and strategy.", desc: "First-time consultation to understand legal rights and options before taking action." },
          { text: "Option 2: A legal notice has been received or served by either party.", desc: "Needs a strong, legally sound reply notice or counter-strategy." },
          { text: "Option 3: Case is already pending in Family Court / District Court.", desc: "Looking for competent court representation or a second legal opinion." }
        ]
      }
    ],

    property: [
      {
        id: "q1",
        label: "Question 1: What is the primary nature of your property concern?",
        options: [
          { text: "Option 1: Title deed dispute, illegal encroachment, or boundary issue.", desc: "Conflicting registry papers, unauthorized possession, or land demarcation dispute." },
          { text: "Option 2: Builder delay, possession default, or RERA compensation claim.", desc: "Delayed apartment delivery, project stalling, or builder agreement breach." },
          { text: "Option 3: Ancestral property partition or legal heir inheritance claim.", desc: "Partition suit among family members or mutation of revenue records." }
        ]
      },
      {
        id: "q2",
        label: "Question 2: What documentation do you currently have available?",
        options: [
          { text: "Option 1: Full registry, sale deed, mutation records, and tax receipts.", desc: "Clear chain of title documents ready for advocate scrutiny." },
          { text: "Option 2: Partial allotment letter, builder-buyer agreement, or payment slips.", desc: "Contractual proofs available; needs legal review of clauses." },
          { text: "Option 3: Unregistered agreement or informal family understanding.", desc: "Needs legal regularization or advisory on evidentiary strength." }
        ]
      },
      {
        id: "q3",
        label: "Question 3: How urgent is legal action in this matter?",
        options: [
          { text: "Option 1: Urgent — need an immediate temporary injunction or stay order.", desc: "Threat of third-party sale, demolition, or unlawful eviction." },
          { text: "Option 2: Moderate — want to issue a formal legal notice within a week.", desc: "Demanding performance, refund, or settlement before initiating a civil suit." },
          { text: "Option 3: Advisory — due diligence before making a substantial purchase.", desc: "Title search report to avoid future litigation risks." }
        ]
      }
    ],

    criminal: [
      {
        id: "q1",
        label: "Question 1: What is the current procedural status of the matter?",
        options: [
          { text: "Option 1: Apprehension of arrest / urgent Anticipatory Bail required.", desc: "Police complaint filed or inquiry initiated; seeking immediate protection from arrest." },
          { text: "Option 2: Regular bail or custody defense needed for a detained individual.", desc: "Accused in custody; filing bail petition before Magistrate or Sessions Court." },
          { text: "Option 3: Cheque bounce complaint (Sec 138 NI Act) or summons received.", desc: "Received statutory legal notice or court summons for financial dishonour." }
        ]
      },
      {
        id: "q2",
        label: "Question 2: Has an FIR or formal police complaint been registered?",
        options: [
          { text: "Option 1: Yes, registered under specific sections; have a copy of FIR.", desc: "Case registered; need defense strategy, bail, or High Court quashing petition." },
          { text: "Option 2: Preliminary inquiry / police notice (Notice under BNSS/CrPC) received.", desc: "Summoned to police station for questioning; need legal presence or guidance." },
          { text: "Option 3: I am the complainant wishing to register a criminal complaint / FIR.", desc: "Police refused FIR or cyber financial theft requires criminal intervention." }
        ]
      },
      {
        id: "q3",
        label: "Question 3: Have you already consulted or engaged an advocate?",
        options: [
          { text: "Option 1: No advocate engaged yet; need prompt criminal counsel.", desc: "Require a local court advocate to handle immediate proceedings." },
          { text: "Option 2: Yes, looking for an experienced senior opinion or second counsel.", desc: "Seeking a review of ongoing defense strategy and evidence." },
          { text: "Option 3: Looking to replace existing counsel or file urgent appeal/revision.", desc: "Prior bail was rejected; need higher court application immediately." }
        ]
      }
    ],

    business: [
      {
        id: "q1",
        label: "Question 1: What is the core commercial or contractual issue?",
        options: [
          { text: "Option 1: Vendor non-payment, breach of commercial contract, or recovery.", desc: "Outstanding dues, delivered goods unpaid, or breach of service agreements." },
          { text: "Option 2: Drafting, reviewing, or negotiating a critical business agreement.", desc: "Master services agreement, employment contracts, NDA, or software licenses." },
          { text: "Option 3: Co-founder disagreement, shareholder pact, or corporate compliance.", desc: "Cap table dispute, investor rights, or regulatory governance advisory." }
        ]
      },
      {
        id: "q2",
        label: "Question 2: What is the approximate dispute value or company scale?",
        options: [
          { text: "Option 1: Substantial commercial claim (Above ₹10 Lakhs) requiring arbitration/suit.", desc: "Needs formal demand under Insolvency Code or Commercial Court filing." },
          { text: "Option 2: Small to medium business dispute or standard operational contract.", desc: "Looking for legal notice or structured mediation to recover funds." },
          { text: "Option 3: Early-stage startup advisory with budget-conscious scope.", desc: "Foundational legal structuring and risk-mitigation terms." }
        ]
      },
      {
        id: "q3",
        label: "Question 3: Have written contracts or invoices been signed by both parties?",
        options: [
          { text: "Option 1: Yes, fully executed agreements with dispute resolution clauses.", desc: "Arbitration clause, governing jurisdiction, and signed POs available." },
          { text: "Option 2: Communications exist primarily over emails, WhatsApp, and invoices.", desc: "Needs evaluation of digital evidence and implied contract terms." },
          { text: "Option 3: Oral agreement; seeking advice on how to legally substantiate claims.", desc: "Guidance on gathering documentary admissions before issuing notice." }
        ]
      }
    ],

    // Default fallback questionnaire for other domains
    default: [
      {
        id: "q1",
        label: "Question 1: What best describes the primary nature of your legal matter?",
        options: [
          { text: "Option 1: An active dispute with imminent risk of financial or legal liability.", desc: "Notice received, deadline approaching, or financial loss underway." },
          { text: "Option 2: Seeking preventative guidance, legal drafting, or compliance review.", desc: "Ensuring proper documentation and adherence to statutory norms." },
          { text: "Option 3: Second opinion on an ongoing legal matter in court or tribunal.", desc: "Reviewing strategy or verifying advocate recommendations." }
        ]
      },
      {
        id: "q2",
        label: "Question 2: How urgent is your requirement for lawyer consultation?",
        options: [
          { text: "Option 1: Critical (Next 24 to 48 hours) — statutory limitation or court date.", desc: "Immediate legal intervention or same-day response necessary." },
          { text: "Option 2: Moderate (Within 3-5 days) — planning next procedural steps.", desc: "Adequate time to review documents and draft structured notices." },
          { text: "Option 3: Flexible (Within next 2 weeks) — strategic advisory.", desc: "Exploratory consultation to understand long-term legal roadmaps." }
        ]
      },
      {
        id: "q3",
        label: "Question 3: Have you previously consulted or engaged legal counsel for this?",
        options: [
          { text: "Option 1: No, this is my first formal legal consultation on this topic.", desc: "Looking for a clear, jargon-free explanation of rights and realistic options." },
          { text: "Option 2: Yes, but unsatisfied with clarity or responsiveness of past counsel.", desc: "Looking for proactive, communicative advocate with niche domain expertise." },
          { text: "Option 3: Have existing representation, but need specialized advisory support.", desc: "Supplementary expert advice without changing existing on-record counsel." }
        ]
      }
    ]
  },

  // 18 Fictional Indian Lawyers with rich profiles & local court experience
  lawyers: [
    {
      id: "law_01",
      name: "Adv. Meera Deshmukh",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "MD",
      state: "Madhya Pradesh",
      city: "Indore",
      barCouncilNo: "MP/1842/2011 (Demo)",
      experienceYears: 14,
      domains: ["family", "property", "civil"],
      domainsDisplay: ["Family Law", "Property Disputes", "Civil Writs"],
      languages: ["Hindi", "English"],
      court: "High Court of MP (Indore Bench) & District Courts",
      availability: "Available Now",
      isOnline: true,
      rating: 4.9,
      reviewCount: 142,
      consultationFee: "₹1,200",
      about: "Adv. Meera Deshmukh is a senior family and property advocate practicing at the High Court of Madhya Pradesh Indore Bench. With 14 years of dedicated litigation experience, she specializes in mutual consent divorce settlements, child custody negotiations, and ancestral property partition suits. Known for high integrity and client empathy.",
      education: "LL.B. (Hons) - Devi Ahilya Vishwavidyalaya, LL.M. in Family Jurisprudence",
      officeLocation: "A.B. Road, Near High Court Square, Indore",
      verifiedBadge: true
    },
    {
      id: "law_02",
      name: "Adv. Rajeshwar Sen",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "RS",
      state: "Madhya Pradesh",
      city: "Indore",
      barCouncilNo: "MP/0924/2009 (Demo)",
      experienceYears: 16,
      domains: ["criminal", "cybercrime", "business"],
      domainsDisplay: ["Criminal Defense", "Cyber Fraud", "Commercial Crimes"],
      languages: ["Hindi", "English"],
      court: "District & Sessions Court, Indore & High Court",
      availability: "Available Today",
      isOnline: true,
      rating: 4.8,
      reviewCount: 98,
      consultationFee: "₹1,500",
      about: "Senior criminal defense counsel specializing in Anticipatory Bail, complex financial frauds, IT Act offenses, and Section 138 NI Act litigation. Highly proficient in police liaison protocols, evidence vetting, and prompt trial advocacy.",
      education: "B.A. LL.B. - National Law Institute University (NLIU) Bhopal",
      officeLocation: "South Tukoganj, Indore",
      verifiedBadge: true
    },
    {
      id: "law_03",
      name: "Adv. Ananya Sharma",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "AS",
      state: "Madhya Pradesh",
      city: "Bhopal",
      barCouncilNo: "MP/3321/2015 (Demo)",
      experienceYears: 10,
      domains: ["property", "consumer", "business"],
      domainsDisplay: ["RERA / Property", "Consumer Disputes", "Corporate Contracts"],
      languages: ["Hindi", "English"],
      court: "M.P. RERA Tribunal & Bhopal District Court",
      availability: "Available Now",
      isOnline: true,
      rating: 4.9,
      reviewCount: 86,
      consultationFee: "₹1,000",
      about: "Pioneer in RERA litigations across Bhopal and Indore. She has represented over 300 home-buyers in possession delay and compensation cases against delinquent real estate builders. Expert in title search certifications.",
      education: "LL.B. - Barkatullah University, PGD in Corporate Law",
      officeLocation: "MP Nagar Zone II, Bhopal",
      verifiedBadge: true
    },
    {
      id: "law_04",
      name: "Adv. Kabir Malhotra",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "KM",
      state: "Madhya Pradesh",
      city: "Bhopal",
      barCouncilNo: "MP/2241/2013 (Demo)",
      experienceYears: 12,
      domains: ["family", "criminal", "other"],
      domainsDisplay: ["Matrimonial Law", "Criminal Defense", "Civil Writs"],
      languages: ["Hindi", "English"],
      court: "High Court of MP (Principal Seat Jabalpur) & Bhopal Courts",
      availability: "In Court until 3:30 PM",
      isOnline: false,
      rating: 4.7,
      reviewCount: 64,
      consultationFee: "₹1,200",
      about: "Seasoned matrimonial and criminal litigation practitioner. Specializes in handling complex divorce, child visitation, and 498A defense matters with an emphasis on mediation and constructive settlements.",
      education: "LL.B. - Delhi University (Campus Law Centre)",
      officeLocation: "Arera Colony, Bhopal",
      verifiedBadge: true
    },
    {
      id: "law_05",
      name: "Adv. Arvind Kulkarni",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "AK",
      state: "Madhya Pradesh",
      city: "Jabalpur",
      barCouncilNo: "MP/0819/2006 (Demo)",
      experienceYears: 19,
      domains: ["property", "employment", "other"],
      domainsDisplay: ["Service Matters", "Land Revenue", "Constitutional Writs"],
      languages: ["Hindi", "English"],
      court: "High Court of MP (Principal Seat at Jabalpur)",
      availability: "Available Now",
      isOnline: true,
      rating: 5.0,
      reviewCount: 168,
      consultationFee: "₹1,800",
      about: "Distinguished High Court counsel focusing on service tribunal appeals, employee pension litigations, revenue title disputes, and civil revision petitions. Respected for incisive courtroom arguments.",
      education: "LL.M. (Constitutional Law) - Rani Durgavati Vishwavidyalaya",
      officeLocation: "Civil Lines, Near High Court, Jabalpur",
      verifiedBadge: true
    },
    {
      id: "law_06",
      name: "Adv. Sunita Joshi",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "SJ",
      state: "Madhya Pradesh",
      city: "Ujjain",
      barCouncilNo: "MP/1429/2016 (Demo)",
      experienceYears: 9,
      domains: ["family", "consumer", "property"],
      domainsDisplay: ["Family Law", "Consumer Forum", "Local Property"],
      languages: ["Hindi", "English", "Malvi"],
      court: "District & Sessions Court, Ujjain",
      availability: "Available Today",
      isOnline: true,
      rating: 4.8,
      reviewCount: 52,
      consultationFee: "₹800",
      about: "Local legal stalwart in Ujjain specializing in consumer dispute redressal against utility providers and insurance firms, as well as family inheritance issues and agricultural land registry guidance.",
      education: "LL.B. - Vikram University, Ujjain",
      officeLocation: "Freeganj, Ujjain",
      verifiedBadge: true
    },
    {
      id: "law_07",
      name: "Adv. Priyadarshini Mehta",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "PM",
      state: "Maharashtra",
      city: "Mumbai",
      barCouncilNo: "MAH/4211/2008 (Demo)",
      experienceYears: 17,
      domains: ["business", "cybercrime", "employment"],
      domainsDisplay: ["Corporate Law", "Fintech & Cyber", "Commercial Contracts"],
      languages: ["English", "Hindi", "Marathi", "Gujarati"],
      court: "Bombay High Court & NCLT Mumbai Bench",
      availability: "Available Now",
      isOnline: true,
      rating: 4.9,
      reviewCount: 215,
      consultationFee: "₹2,500",
      about: "Corporate counsel and advisor to leading startups, NBFCs, and tech enterprises. Handled landmark company petitions at NCLT Mumbai, cross-border commercial drafting, shareholder buyouts, and cybersecurity advisory.",
      education: "B.A. LL.B. (Hons) - Government Law College (GLC) Mumbai, LL.M. (London)",
      officeLocation: "Nariman Point & BKC, Mumbai",
      verifiedBadge: true
    },
    {
      id: "law_08",
      name: "Adv. Farhan Merchant",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "FM",
      state: "Maharashtra",
      city: "Mumbai",
      barCouncilNo: "MAH/1950/2012 (Demo)",
      experienceYears: 13,
      domains: ["property", "family", "civil"],
      domainsDisplay: ["Redevelopment Law", "RERA Mumbai", "Matrimonial Law"],
      languages: ["English", "Hindi", "Marathi"],
      court: "Bombay High Court & City Civil Court, Fort",
      availability: "Available Now",
      isOnline: true,
      rating: 4.8,
      reviewCount: 134,
      consultationFee: "₹2,000",
      about: "Expert in Mumbai society redevelopment agreements, slum rehabilitation disputes, SRA rules, and MahaRERA buyer remedies. Regularly counsels family offices on succession and mutual divorce pacts.",
      education: "LL.B. - University of Mumbai",
      officeLocation: "Fort, Near Bombay High Court, Mumbai",
      verifiedBadge: true
    },
    {
      id: "law_09",
      name: "Adv. Rohit Kadam",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "RK",
      state: "Maharashtra",
      city: "Pune",
      barCouncilNo: "MAH/3104/2014 (Demo)",
      experienceYears: 11,
      domains: ["cybercrime", "business", "employment"],
      domainsDisplay: ["IT & Cybercrime", "Tech Employment", "IP Contracts"],
      languages: ["English", "Marathi", "Hindi"],
      court: "District & Sessions Court, Shivajinagar & Pune Cyber Cell",
      availability: "Available Today",
      isOnline: true,
      rating: 4.9,
      reviewCount: 112,
      consultationFee: "₹1,400",
      about: "Pune-based technology attorney dealing with IT contract disputes, non-compete employee litigation in Hinjawadi IT corridor, POSH inquiries, and cyber monetary fraud recovery under Section 66D IT Act.",
      education: "B.B.A. LL.B. - Symbiosis Law School Pune",
      officeLocation: "Shivajinagar, Pune",
      verifiedBadge: true
    },
    {
      id: "law_10",
      name: "Adv. Radhika Gokhale",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "RG",
      state: "Maharashtra",
      city: "Nagpur",
      barCouncilNo: "MAH/2081/2010 (Demo)",
      experienceYears: 15,
      domains: ["family", "property", "criminal"],
      domainsDisplay: ["Family Law", "Property Title", "Criminal Defense"],
      languages: ["Marathi", "Hindi", "English"],
      court: "Bombay High Court (Nagpur Bench)",
      availability: "Available Now",
      isOnline: true,
      rating: 4.8,
      reviewCount: 94,
      consultationFee: "₹1,200",
      about: "Advocate Radhika has a strong track record at the Nagpur Bench of the Bombay High Court. Her practice covers domestic relation disputes, partition rights for daughters under Hindu Succession Act, and anticipatory bail petitions.",
      education: "LL.B. - Dr. Babasaheb Ambedkar College of Law, Nagpur",
      officeLocation: "Civil Lines, Nagpur",
      verifiedBadge: true
    },
    {
      id: "law_11",
      name: "Adv. Vikramaditya Rathore",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "VR",
      state: "Rajasthan",
      city: "Jaipur",
      barCouncilNo: "RAJ/1042/2007 (Demo)",
      experienceYears: 18,
      domains: ["property", "criminal", "civil"],
      domainsDisplay: ["Heritage & Land Titles", "Criminal Defense", "Civil Writs"],
      languages: ["Hindi", "English", "Rajasthani"],
      court: "Rajasthan High Court (Jaipur Bench)",
      availability: "Available Now",
      isOnline: true,
      rating: 4.9,
      reviewCount: 187,
      consultationFee: "₹1,600",
      about: "Senior High Court advocate with 18 years in Jaipur. Deep expertise in agricultural land revenue code, urban development (JDA) disputes, commercial tenancy, and serious criminal trial defense.",
      education: "LL.B. - University of Rajasthan, Jaipur",
      officeLocation: "C-Scheme, Near High Court, Jaipur",
      verifiedBadge: true
    },
    {
      id: "law_12",
      name: "Adv. Tanvi Shekhawat",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "TS",
      state: "Rajasthan",
      city: "Jaipur",
      barCouncilNo: "RAJ/2941/2016 (Demo)",
      experienceYears: 9,
      domains: ["family", "consumer", "cybercrime"],
      domainsDisplay: ["Family & Custody", "Consumer Redressal", "Online Fraud"],
      languages: ["Hindi", "English"],
      court: "District & Family Court, Jaipur",
      availability: "Available Today",
      isOnline: true,
      rating: 4.7,
      reviewCount: 73,
      consultationFee: "₹1,000",
      about: "Dynamic and client-oriented matrimonial lawyer in Jaipur. Committed to compassionate counsel in delicate child custody, domestic violence act protection, and online banking dispute recovery.",
      education: "B.A. LL.B. - National Law University (NLU) Jodhpur",
      officeLocation: "Malviya Nagar, Jaipur",
      verifiedBadge: true
    },
    {
      id: "law_13",
      name: "Adv. Narendra Bhati",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "NB",
      state: "Rajasthan",
      city: "Jodhpur",
      barCouncilNo: "RAJ/0622/2005 (Demo)",
      experienceYears: 20,
      domains: ["criminal", "property", "other"],
      domainsDisplay: ["High Court Bail", "Revenue Disputes", "Criminal Trial"],
      languages: ["Hindi", "English", "Marwari"],
      court: "Rajasthan High Court (Principal Seat at Jodhpur)",
      availability: "Available Now",
      isOnline: true,
      rating: 5.0,
      reviewCount: 230,
      consultationFee: "₹2,000",
      about: "Distinguished criminal and constitutional counsel at the Principal Seat of Rajasthan High Court in Jodhpur. Over two decades defending complex murder, NDPS, economic offense, and quashing petitions.",
      education: "LL.M. (Criminal Jurisprudence) - JNVU Jodhpur",
      officeLocation: "Paota, Near High Court, Jodhpur",
      verifiedBadge: true
    },
    {
      id: "law_14",
      name: "Adv. Divya Chundawat",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "DC",
      state: "Rajasthan",
      city: "Udaipur",
      barCouncilNo: "RAJ/1899/2014 (Demo)",
      experienceYears: 11,
      domains: ["family", "business", "property"],
      domainsDisplay: ["Family Law", "Tourism & Commercial Contracts", "Property"],
      languages: ["Hindi", "English"],
      court: "District & Sessions Court, Udaipur",
      availability: "Available Today",
      isOnline: true,
      rating: 4.8,
      reviewCount: 65,
      consultationFee: "₹900",
      about: "Advocate Divya practices in Udaipur handling hotelier & vendor contracts, tourism lease agreements, local succession partitions, and family mediation matters with high success rates.",
      education: "LL.B. - Mohanlal Sukhadia University (MLSU)",
      officeLocation: "Panchwati, Udaipur",
      verifiedBadge: true
    },
    {
      id: "law_15",
      name: "Adv. Shourya Vashisht",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "SV",
      state: "Delhi",
      city: "New Delhi",
      barCouncilNo: "D/1458/2008 (Demo)",
      experienceYears: 17,
      domains: ["business", "cybercrime", "consumer"],
      domainsDisplay: ["Corporate Litigation", "Cyber Law", "Supreme Court / NCDRC"],
      languages: ["English", "Hindi"],
      court: "Supreme Court of India, Delhi High Court & NCDRC",
      availability: "Available Now",
      isOnline: true,
      rating: 4.9,
      reviewCount: 310,
      consultationFee: "₹2,500",
      about: "Advocate-on-Record support & Delhi High Court litigator. Practices at national tribunals including NCDRC, NCLAT, and TDSAT. Expert in high-stakes commercial disputes, cyber liability, and startup advisories.",
      education: "B.A. LL.B. (Hons) - National Law School of India University (NLSIU) Bengaluru",
      officeLocation: "Barakhamba Road, Connaught Place, New Delhi",
      verifiedBadge: true
    },
    {
      id: "law_16",
      name: "Adv. Natasha Kapoor",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1534751516642-a171ed26a45d?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "NK",
      state: "Delhi",
      city: "New Delhi",
      barCouncilNo: "D/2890/2012 (Demo)",
      experienceYears: 13,
      domains: ["family", "employment", "other"],
      domainsDisplay: ["Family Law", "Employment & POSH", "Civil Writs"],
      languages: ["English", "Hindi", "Punjabi"],
      court: "Delhi High Court & Saket / Patiala House District Courts",
      availability: "Available Today",
      isOnline: true,
      rating: 4.9,
      reviewCount: 194,
      consultationFee: "₹2,000",
      about: "Specialist in Delhi matrimonial litigation, mutual divorce fast-tracking, high-net-worth settlement agreements, POSH internal complaints committee advisory, and executive employment termination disputes.",
      education: "LL.B. - Faculty of Law, University of Delhi",
      officeLocation: "Defence Colony & High Court Chambers, New Delhi",
      verifiedBadge: true
    },
    {
      id: "law_17",
      name: "Adv. Harshvardhan Chawla",
      gender: "male",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "HC",
      state: "Delhi",
      city: "New Delhi",
      barCouncilNo: "D/0743/2010 (Demo)",
      experienceYears: 15,
      domains: ["criminal", "cybercrime", "property"],
      domainsDisplay: ["Criminal Defense", "Economic Offences (EOW)", "Real Estate"],
      languages: ["Hindi", "English"],
      court: "Delhi High Court, Rouse Avenue Court & Tis Hazari",
      availability: "Available Now",
      isOnline: true,
      rating: 4.8,
      reviewCount: 175,
      consultationFee: "₹2,200",
      about: "Reputed criminal defense advocate focusing on Economic Offences Wing (EOW) matters, Enforcement Directorate (ED) summons, anticipatory bails, and large builder-buyer arbitration disputes across Delhi NCR.",
      education: "LL.B. - ILS Law College Pune",
      officeLocation: "Jangpura Extension, New Delhi",
      verifiedBadge: true
    },
    {
      id: "law_18",
      name: "Adv. Pallavi Saxena",
      gender: "female",
      photo: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=350",
      avatarInitials: "PS",
      state: "Madhya Pradesh",
      city: "Indore",
      barCouncilNo: "MP/3012/2017 (Demo)",
      experienceYears: 8,
      domains: ["consumer", "cybercrime", "employment"],
      domainsDisplay: ["Consumer Protection", "Cyber Frauds", "Labour Claims"],
      languages: ["Hindi", "English"],
      court: "District Consumer Commission & Labour Court, Indore",
      availability: "Available Now",
      isOnline: true,
      rating: 4.7,
      reviewCount: 59,
      consultationFee: "₹900",
      about: "Energetic advocate championing individual consumer rights against insurance claim rejections, flight/train booking refunds, online UPI fraud recovery, and wrongful employment terminations in MP.",
      education: "B.A. LL.B. - Indore Institute of Law (IIL)",
      officeLocation: "Geeta Bhawan, Indore",
      verifiedBadge: true
    }
  ],

  // Legal Knowledge Hub Articles
  articles: [
    {
      id: "art_01",
      category: "Family Law",
      categoryKey: "family",
      title: "Step-by-Step Guide to Mutual Consent Divorce in India (Section 13B Hindu Marriage Act)",
      readTime: "7 min read",
      publishedDate: "14 Oct 2026",
      lastReviewedDate: "21 Oct 2026",
      verifiedBy: "Adv. Meera Deshmukh (High Court of MP)",
      excerpt: "When both spouses mutually agree to dissolve their marriage peacefully, Section 13B provides a dignified, less contentious path. Learn the procedural stages, cooling-off waiver norms, and custody documentation.",
      intro: "Mutual consent divorce in India is codified under Section 13B of the Hindu Marriage Act, 1955 (and corresponding sections under the Special Marriage Act and Christian Divorce Act). Unlike contested proceedings that can drag through acrimonious litigation for years, mutual divorce focuses on mutually agreed terms regarding maintenance, division of stridhan, and child guardianship.",
      generalInfo: "To initiate this process, the parties must have lived separately for at least one continuous year and mutually concluded that they cannot live together as husband and wife. The law mandates two sequential court motions — the First Motion and the Second Motion. While the statute stipulates a 6-month cooling-off window between both motions to permit reconciliation, the Supreme Court of India in the landmark Amardeep Singh vs Harveen Kaur case clarified that Family Courts have discretionary authority to waive this cooling-off period if all disputes are completely settled.",
      proceduralSteps: [
        "1. Drafting & Settlement Agreement: Formulating a comprehensive Memorandum of Understanding (MOU) specifying alimony (lump sum or periodic), return of stridhan/jewellery, and custody/visitation rights.",
        "2. Filing First Motion Joint Petition: Presenting the joint petition with affidavits before the Family Court having territorial jurisdiction (where marriage was solemnized or where parties last resided).",
        "3. Recording Statements: Appearance of both parties before the Family Court Judge to record sworn statements under oath.",
        "4. Cooling-Off Period & Waiver Application: If 18 months have lapsed since separation and terms are honored, counsel can file an application under Amardeep Singh guidelines for waiver of the 6-month period.",
        "5. Second Motion & Final Decree: Confirmation of mutual consent, passing of formal dissolution judgment, and issuance of certified divorce decree."
      ],
      questionsToAsk: [
        "What specific clauses should be included in our Settlement MOU to prevent future maintenance claims?",
        "Can we request a waiver of the six-month statutory cooling-off period under our specific timeline?",
        "How is child visitation legally structured if one parent relocates to another city or abroad?",
        "What documents are required to prove one full continuous year of separate living?",
        "How does the return of stridhan get officially recorded before the court?"
      ],
      ctaDomain: "family",
      ctaText: "Facing a matrimonial matter? Connect with a verified family advocate"
    },
    {
      id: "art_02",
      category: "Property Law",
      categoryKey: "property",
      title: "Title Due Diligence & RERA Remedies for Delayed Property Possession",
      readTime: "9 min read",
      publishedDate: "08 Oct 2026",
      lastReviewedDate: "18 Oct 2026",
      verifiedBy: "Adv. Ananya Sharma (RERA Specialist)",
      excerpt: "Protecting home-buyers from delayed handovers and fraudulent land titles. Understand how to search 30-year revenue encumbrance certificates and file claims under Section 18 of the Real Estate Regulation Act.",
      intro: "Real estate investment represents the highest individual financial commitment for most Indian families. However, issues regarding disputed ownership, forged agricultural mutation, unauthorized floor construction, and indefinite possession delays by builders remain rampant.",
      generalInfo: "Under the Real Estate (Regulation and Development) Act (RERA) 2016, home-buyers possess statutory protection against builders defaulting on promised delivery schedules. Section 18 of RERA explicitly guarantees that if a promoter fails to give possession in accordance with the terms of the agreement for sale, the buyer has an unconditional right to either withdraw from the project with full refund plus interest at SBI Marginal Cost of Funds Based Lending Rate (MCLR) + 2%, or claim monthly delayed-possession interest while waiting for possession.",
      proceduralSteps: [
        "1. Comprehensive Title Search: Scrutinizing the chain of title for a minimum of 30 years through the Sub-Registrar's Office, verifying Encumbrance Certificates (Form 15 & 16) and revenue Jamabandi / Khasra records.",
        "2. Sanctioned Plan & RERA Registration Check: Verifying project approval numbers on state RERA portals and confirming designated escrow account compliance.",
        "3. Issuance of Statutory Legal Notice: Formal legal notice to the builder calling upon them to rectify defects, pay accrued delay interest, or refund principal within 15–30 days.",
        "4. Filing Complaint before RERA Adjudicating Officer / Authority: Form M complaint for delayed possession interest or Form N for compensation and damages.",
        "5. Execution Petition: If the builder fails to obey RERA orders, applying for recovery certificates enforceable through the District Collector as arrears of land revenue."
      ],
      questionsToAsk: [
        "Does the developer have a clear, non-mortgaged freehold title to the land parcel?",
        "Can the builder force me to accept an incomplete Occupancy Certificate (OC)?",
        "What is the current prescribed interest rate for possession delays under our State RERA rules?",
        "Should I file before the Consumer Commission (NCDRC) or State RERA authority for my specific claim?",
        "What happens if the builder enters insolvency (IBC) during our dispute?"
      ],
      ctaDomain: "property",
      ctaText: "Require property verification or builder dispute guidance? Consult property counsel"
    },
    {
      id: "art_03",
      category: "Criminal Law",
      categoryKey: "criminal",
      title: "Anticipatory Bail vs Regular Bail: Rights and Procedures under Bharatiya Nagarik Suraksha Sanhita (BNSS)",
      readTime: "8 min read",
      publishedDate: "12 Oct 2026",
      lastReviewedDate: "20 Oct 2026",
      verifiedBy: "Adv. Rajeshwar Sen (Senior Criminal Counsel)",
      excerpt: "An essential legal briefing on safeguarding personal liberty against arbitrary arrest, understanding notice of appearance, and moving Sessions and High Courts for bail protection.",
      intro: "Personal liberty is a core fundamental right under Article 21 of the Constitution of India. When faced with criminal allegations, false implication in business disputes, or matrimonial complaints under criminal provisions, understanding bail jurisprudence is vital to avoid immediate incarceration.",
      generalInfo: "Under Indian criminal law (BNSS / CrPC), bail is categorized into: (a) Anticipatory Bail, sought when a person apprehends arrest in a non-bailable offense before being physically taken into custody; (b) Regular Bail, applied for after an individual has been formally arrested and placed in police or judicial remand; and (c) Interim Bail, granting short-term protective cover pending adjudication of the main bail application.",
      proceduralSteps: [
        "1. Analyzing the FIR / Written Complaint: Reviewing the exact sections invoked, role attributed, and identifying if offenses are bailable or non-bailable.",
        "2. Filing Anticipatory Bail in Sessions Court: Drafting an urgent petition highlighting absence of criminal antecedents, cooperation with investigation, and risk of reputational harm.",
        "3. Interim Protection Hearing: Praying for ad-interim protection from coercive police action until case diary is summoned.",
        "4. High Court Recourse: If the Sessions Court rejects anticipatory bail, moving an immediate petition before the High Court.",
        "5. Furnishing Bail Bonds & Surety: Once granted, executing the personal bond and local surety before the competent Magistrate."
      ],
      questionsToAsk: [
        "Is the offense categorized as bailable or non-bailable under current statutes?",
        "What conditions (such as passport surrender or daily police reporting) might the judge impose?",
        "What documents should my family keep ready for local sureties in court?",
        "Can an anticipatory bail application be moved directly in the High Court without approaching Sessions?",
        "What is the procedure if a police officer threatens arrest without issuing a statutory notice of appearance?"
      ],
      ctaDomain: "criminal",
      ctaText: "Facing urgent criminal allegations or need bail defense? Connect now"
    },
    {
      id: "art_04",
      category: "Consumer Law",
      categoryKey: "consumer",
      title: "Filing a Complaint in the Consumer Commission under Consumer Protection Act 2019",
      readTime: "6 min read",
      publishedDate: "02 Oct 2026",
      lastReviewedDate: "19 Oct 2026",
      verifiedBy: "Adv. Sunita Joshi (Consumer Forum Practitioner)",
      excerpt: "From medical negligence to repudiated insurance claims and e-commerce frauds, discover your consumer redressal forums, jurisdiction thresholds, and e-Daakhil filing processes.",
      intro: "The Consumer Protection Act, 2019 modernized consumer redressal by expanding the definition of consumers to include e-commerce buyers and introducing online filing via the e-Daakhil portal.",
      generalInfo: "A consumer can approach District, State, or National Commissions depending on the total consideration paid. The Act recognizes unfair contracts, false endorsements, and product liability claims.",
      proceduralSteps: [
        "1. Preserve Evidence: Preserve all purchase receipts, warranty cards, emails, defect photographs, and grievance escalation tickets.",
        "2. Issue Statutory Legal Notice: Provide a 15-day rectification demand notice to the company.",
        "3. Identify Pecuniary Jurisdiction: District Commission (up to ₹50 Lakhs), State Commission (₹50 Lakhs to ₹2 Crores), National Commission (above ₹2 Crores).",
        "4. Filing Petition via e-Daakhil: Submit the petition with supporting affidavits and nominal statutory fee.",
        "5. Hearing & Relief: Seeking product replacement, full refund with interest, and mental agony compensation."
      ],
      questionsToAsk: [
        "What is the statutory limitation period (usually 2 years from date of cause of action) for my claim?",
        "Can I claim damages for mental agony and litigation expenses?",
        "How are insurance companies compelled to honor valid mediclaim reimbursements?"
      ],
      ctaDomain: "consumer",
      ctaText: "Unfair trade practice or rejected insurance? Talk to a consumer rights advocate"
    },
    {
      id: "art_05",
      category: "Cybercrime",
      categoryKey: "cybercrime",
      title: "Reporting Cyber Financial Fraud: The Golden Hour Protocol & Legal Recovery Mechanisms",
      readTime: "7 min read",
      publishedDate: "11 Oct 2026",
      lastReviewedDate: "22 Oct 2026",
      verifiedBy: "Adv. Priyadarshini Mehta (Cyber Legal Advisor)",
      excerpt: "Immediate steps to freeze stolen funds within the critical 2-3 hour window. How to coordinate with bank nodal officers, file cyber complaints, and pursue Section 66D recovery.",
      intro: "Digital banking, UPI payment gateways, and social engineering frauds have made cybercrime the fastest growing threat in India. Acting within the 'Golden Hour' is the difference between full fund recovery and permanent loss.",
      generalInfo: "The Ministry of Home Affairs operates the National Cyber Crime Reporting Portal (cybercrime.gov.in) and the citizen financial helpline 1930. When reported instantly, recipient bank accounts are electronically frozen across intermediary payment gateways.",
      proceduralSteps: [
        "1. Immediate 1930 Call: Dial 1930 within 2 hours with transaction UTR numbers and sender/receiver accounts.",
        "2. Formulate Police Cyber Cell Complaint: File formal complaint on cybercrime.gov.in and obtain an acknowledgement number.",
        "3. Written Representation to Bank: Formally submit an unauthorized transaction intimation to your bank branch within 72 hours for RBI zero-liability protection.",
        "4. Section 457 Application: Once funds are frozen in the beneficiary account, moving an application before the Chief Judicial Magistrate for release of funds back to your account."
      ],
      questionsToAsk: [
        "How does the RBI circular on limited customer liability apply to my transaction?",
        "What court order is needed to get my bank or cyber cell to reverse the frozen lien?",
        "What precautions must be taken during police cyber cell statement recording?"
      ],
      ctaDomain: "cybercrime",
      ctaText: "Victim of online theft or phishing? Consult a cyber legal expert immediately"
    },
    {
      id: "art_06",
      category: "Business Law",
      categoryKey: "business",
      title: "Drafting Enforceable Commercial Contracts for Indian Startups & SMEs",
      readTime: "8 min read",
      publishedDate: "05 Oct 2026",
      lastReviewedDate: "16 Oct 2026",
      verifiedBy: "Adv. Shourya Vashisht (Corporate Litigator)",
      excerpt: "Avoid costly litigation. Master essential clauses in Indian agreements: limitation of liability, indemnity caps, non-solicitation, and arbitration seat selection under Arbitration Act 1996.",
      intro: "A loosely drafted commercial agreement is an open invitation to breach and protracted courtroom battles. Learn how to draft bulletproof contracts under the Indian Contract Act, 1872.",
      generalInfo: "Ambiguities regarding dispute jurisdiction, payment milestones, and force majeure routinely stall business operations. Selecting a clear seated arbitration mechanism ensures speedy dispute resolution.",
      proceduralSteps: [
        "1. Clear Scope of Work & Deliverable Milestones with acceptance criteria.",
        "2. Payment Terms, Interest on Late Invoices (MSME Act 45-day statutory clause).",
        "3. Limitation of Liability & Indemnification caps.",
        "4. Dispute Resolution: Fast-track sole arbitrator clause under Arbitration and Conciliation Act, 1996.",
        "5. Proper Stamp Duty Payment: Ensuring agreement is stamped as per State Stamp Act to be admissible in court."
      ],
      questionsToAsk: [
        "Is our contract adequately stamped according to our state's Stamp Act to avoid impounding in court?",
        "Can we enforce a non-compete clause against employees or vendors under Section 27?",
        "How can we leverage the MSME Samadhaan portal for fast recovery of unpaid invoices?"
      ],
      ctaDomain: "business",
      ctaText: "Need contract drafting or business dispute resolution? Talk to a corporate advocate"
    },
    {
      id: "art_07",
      category: "Employment Law",
      categoryKey: "employment",
      title: "Wrongful Termination & Gratuity Rights under Indian Labour Laws",
      readTime: "6 min read",
      publishedDate: "28 Sep 2026",
      lastReviewedDate: "15 Oct 2026",
      verifiedBy: "Adv. Natasha Kapoor (Employment Specialist)",
      excerpt: "Rights of executives and employees during company layoffs, severance calculation formulas, mandatory gratuity payout rules, and unlawful non-compete enforceability.",
      intro: "Sudden terminations without notice or severance violate basic employment principles and contractual covenants. Employees have statutory protections under Payment of Gratuity Act, Industrial Disputes Act, and State Shops & Establishments Acts.",
      generalInfo: "Employers cannot withhold earned gratuity if an employee has served 5 continuous years (or 240 days in the 5th year). Furthermore, post-termination non-compete restrictions are generally held void under Section 27 of the Indian Contract Act.",
      proceduralSteps: [
        "1. Scrutinize Appointment Letter & Termination Order for notice period obligations.",
        "2. Demand Notice for Full & Final Settlement (F&F), gratuity, and encashable leaves.",
        "3. Grievance Escalation to Labour Commissioner or Controlling Authority under Gratuity Act.",
        "4. Civil Suit for Damages or Labour Court petition for unlawful retrenchment."
      ],
      questionsToAsk: [
        "Can an employer forfeit my gratuity or variable bonus due to an alleged performance issue?",
        "Is the non-compete clause in my appointment letter legally enforceable if I join a competitor?",
        "What is the statutory deadline for the company to disburse my Full and Final settlement?"
      ],
      ctaDomain: "employment",
      ctaText: "Facing unfair termination or withheld dues? Speak with an employment lawyer"
    }
  ]
};

// Expose on window for global access
window.APP_DATA = APP_DATA;
