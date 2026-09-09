/**
 * Single source of copy for the home page.
 *
 * This page is built to match axora-reference.png section for section, so the
 * copy here mirrors that reference rather than an independent brief. Metrics
 * pulled straight from the reference (200+, 500+, 40%, 99.9%, 2,500+, 30+) are
 * the reference's own numbers, not sourced from a real Axora engagement, and
 * should be replaced with real figures before launch.
 */

/**
 * Navbar and Footer render from the root layout now, so every href here has
 * to work from any route, not just "/". Anchors into a home page section are
 * written "/#id" for that reason; a bare "#id" would try to scroll the
 * current page instead of navigating home first.
 */
export const nav = [
  { label: "Why Axora", href: "/#impact" },
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "Process Automation", href: "/services#automation" },
      { label: "Data Intelligence", href: "/services#data" },
      { label: "System Integration", href: "/services#integration" },
      { label: "Intelligent Agents & Copilots", href: "/services#agents" },
      { label: "Cybersecurity & Compliance", href: "/services#security" },
      { label: "Custom Software & Platforms", href: "/services#software" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Financial Services", href: "/industries#financial" },
      { label: "Telecom & Connectivity", href: "/industries#telecom" },
      { label: "Retail & Consumer", href: "/industries#retail" },
      { label: "Energy & Utilities", href: "/industries#energy" },
      { label: "Manufacturing & Supply Chain", href: "/industries#manufacturing" },
      { label: "Healthcare & Life Sciences", href: "/industries#healthcare" },
      { label: "Public Sector & Development", href: "/industries#public" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
  {
    label: "Insights",
    href: "#",
    items: [
      { label: "Articles", href: "#" },
      { label: "Case Studies", href: "/our-work" },
      { label: "Whitepapers", href: "#" },
      { label: "Reports", href: "#" },
      { label: "Webinars", href: "#" },
    ],
  },
  { label: "Careers", href: "#" },
  {
    label: "About Us",
    href: "#",
    items: [
      { label: "About Us", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Partners", href: "/#partners" },
      { label: "Newsroom", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

/** One label per intent, reused everywhere on the page. Every "contact"
 * intent routes to /contact, the dedicated page with the real form. */
export const cta = {
  contact: "Contact Us",
  contactHref: "/contact",
  exploreSolutions: "Explore Solutions",
  exploreSolutionsHref: "/services",
  bookBriefing: "Book an Executive Briefing",
  bookBriefingHref: "/contact",
  startTransformation: "Start Your Transformation",
  startTransformationHref: "/contact",
  submit: "Send Inquiry",
} as const;

export const hero = {
  eyebrow: "AI. CLOUD. DATA. OUTCOMES.",
  headline: { lead: "Whatever Slows You Down, We", accent: "Automate", tail: "It." },
  sub: "We design and build intelligent automation systems that remove operational drag, cut down manual busywork, and let your team move at the speed the business actually needs.",
  trustedLabel: "Trusted by forward-thinking enterprises worldwide",
  logos: ["HBL", "airblue", "engro", "Dawlance", "Fatima", "ZONG 4G"],
} as const;

export const servicesSection = {
  eyebrow: "WHAT WE DO",
  heading: { lead: "Solutions built for", accent: "operational scale." },
  body: "Comprehensive automation, intelligence, and integration capabilities designed to elevate how your enterprise runs.",
  stats: ["4-16 weeks to live", "2-6 month payback", "25-50+ hours freed per week"],
  exploreLink: "Explore all services",
  exploreHref: "/services",
} as const;

/**
 * `points` is the capability list shown on /services (each service's detail
 * row); the home page card grid only ever reads `body`.
 */
export const services = [
  {
    id: "automation",
    title: "Process Automation",
    body: "Turn repetitive, multi-step workflows into automated processes that run themselves, day and night.",
    points: [
      "Robotic process automation for repetitive tasks",
      "Workflow orchestration across departments",
      "Monitoring that catches failures before people do",
    ],
  },
  {
    id: "data",
    title: "Data Intelligence",
    body: "Turn raw operational data into dashboards and models built around how your team actually works.",
    points: [
      "Real-time analytics and forecasting",
      "Machine learning models built on your own data",
      "Dashboards your team will actually open",
    ],
  },
  {
    id: "integration",
    title: "System Integration",
    body: "Connect the systems you already run into one coherent, high-performance operational architecture.",
    points: [
      "API and legacy system integration",
      "Two-way sync between the tools you already use",
      "One architecture instead of a dozen point solutions",
    ],
  },
  {
    id: "agents",
    title: "Intelligent Agents & Copilots",
    body: "AI assistants that read your documents, answer your team, and draft the work that used to eat a day.",
    points: [
      "Retrieval over your own documents and data",
      "Drafting and triage for repetitive knowledge work",
      "Human review built into every workflow",
    ],
  },
  {
    id: "security",
    title: "Cybersecurity & Compliance",
    body: "Proactive security and compliance built into every system we automate, not bolted on afterward.",
    points: [
      "Threat detection and incident response",
      "Compliance mapped to ISO, SOC 2, and local regulation",
      "Security reviewed at every stage of delivery",
    ],
  },
  {
    id: "software",
    title: "Custom Software & Platforms",
    body: "Internal tools and platforms built around how your operation actually runs, not a generic template.",
    points: [
      "Internal portals and operational dashboards",
      "Role-based access and audit trails",
      "Built to fit your process, not the other way around",
    ],
  },
] as const;

export const servicesPage = {
  eyebrow: "WHAT WE DO",
  heading: { lead: "Every capability, one", accent: "accountable team." },
  body: "Six practices that cover the enterprise stack end to end, from the data layer to the people who have to live with what gets shipped.",
  process: {
    heading: "How an engagement runs.",
    steps: [
      {
        title: "Discover",
        body: "We map the current system, the constraints, and the outcome that actually matters before writing a proposal.",
      },
      {
        title: "Design",
        body: "A written plan: scope, architecture, timeline, and cost, reviewed with your team before anything gets built.",
      },
      {
        title: "Build",
        body: "Delivery in slices you can see running, not one release at the very end of the contract.",
      },
      {
        title: "Operate",
        body: "We stay on the system after launch, watching the numbers it produces and tuning what needs it.",
      },
    ],
  },
} as const;

export const impact = {
  eyebrow: "AI THAT DRIVES OUTCOMES",
  heading: { lead: "From insight to impact at", accent: "enterprise scale." },
  body: "We combine deep industry expertise with emerging technologies to solve complex business challenges and unlock sustainable value.",
  cta: "Our Approach",
  ctaHref: "/services",
  stats: [
    {
      value: "200+",
      label: "Enterprise Clients",
      body: "Across 12+ countries trust Axora to deliver transformation.",
      tone: "azure",
    },
    {
      value: "500+",
      label: "AI Use Cases Delivered",
      body: "Solving real-world problems and driving measurable results.",
      tone: "azure",
    },
    {
      value: "40%",
      label: "Average Efficiency Gain",
      body: "Through automation, modernization, and intelligent workflows.",
      tone: "violet",
    },
    {
      value: "99.9%",
      label: "Security & Reliability",
      body: "Enterprise-grade security and resilient delivery at scale.",
      tone: "magenta",
    },
  ],
} as const;

export const industriesPage = {
  eyebrow: "INDUSTRIES WE SERVE",
  heading: { lead: "Deep expertise, built for", accent: "your sector." },
  body: "Every industry runs on different systems and carries a different bottleneck. Here is how the same automation discipline applies to seven of them.",
} as const;

/**
 * `points` is the capability list shown on /industries (each industry's detail
 * row), mirroring the `services[].points` convention. Distinct from
 * `industrySolutions` below: that set is four SME-specific pain-point pitches
 * (Insurance, Law Firms, Healthcare Clinics, Real Estate), this is the broader
 * enterprise-sector catalogue linked from the main nav and footer.
 */
export const industries = [
  {
    id: "financial",
    title: "Financial Services",
    body: "Banks, lenders, and fintechs run on manual reconciliation, compliance reporting, and fraud review that scales with headcount instead of transaction volume.",
    points: [
      "Real-time fraud and anomaly detection across transaction streams",
      "Automated reconciliation between core banking and ledger systems",
      "Compliance reporting mapped to regulatory change, not rebuilt each cycle",
    ],
  },
  {
    id: "telecom",
    title: "Telecom & Connectivity",
    body: "Provisioning, network monitoring, and churn analysis still run through systems that were never built to talk to each other.",
    points: [
      "Automated provisioning and service activation",
      "Network anomaly detection before customers notice an outage",
      "Churn prediction built on your own usage data",
    ],
  },
  {
    id: "retail",
    title: "Retail & Consumer",
    body: "Store, warehouse, and e-commerce inventory rarely agree, and demand forecasting still runs on last season's spreadsheet.",
    points: [
      "Unified inventory across stores, warehouse, and storefront",
      "Demand forecasting built on real sell-through data",
      "Automated supplier reordering before shelves go empty",
    ],
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    body: "Asset monitoring, outage response, and field service scheduling depend on manual inspection rounds instead of live telemetry.",
    points: [
      "Predictive maintenance from live asset telemetry",
      "Automated outage detection and crew dispatch",
      "Regulatory and safety reporting generated, not compiled by hand",
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Supply Chain",
    body: "Production scheduling, quality inspection, and supplier coordination still run on phone calls and spreadsheets that fall out of sync within a day.",
    points: [
      "Production scheduling that reacts to real-time line data",
      "Automated quality inspection and defect flagging",
      "Supplier and logistics coordination in one system",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & Life Sciences",
    body: "Clinical and administrative staff lose hours a day to insurance verification, scheduling, and documentation that adds nothing to patient care.",
    points: [
      "Insurance verification and prior authorization automated",
      "Scheduling and no-show reduction built on patient history",
      "Clinical documentation drafted from the visit, reviewed by staff",
    ],
  },
  {
    id: "public",
    title: "Public Sector & Development",
    body: "Citizen services and case management often run on paper-based workflows and legacy systems never designed for the volume they carry today.",
    points: [
      "Citizen service requests triaged and routed automatically",
      "Case management systems that finally talk to each other",
      "Reporting built for audit and compliance from day one",
    ],
  },
] as const;

export const industrySolutionsSection = {
  eyebrow: "AI AUTOMATION FOR SMES",
  heading: "Select your industry.",
} as const;

export const industrySolutions = [
  {
    id: "insurance",
    title: "Insurance Companies",
    body: "Claims take 5 days? We make it same-day. Manual renewals? Automated. Compliance reports eating time? Done automatically.",
    link: "View Insurance Solutions",
    href: "/contact",
  },
  {
    id: "legal",
    title: "Law Firms",
    body: "Associates waste weeks on document review. Contracts scattered everywhere. Time entry manual. We automate all of it.",
    link: "View Legal Solutions",
    href: "/contact",
  },
  {
    id: "healthcare",
    title: "Healthcare Clinics",
    body: "Staff drowning in admin. 25% no-show rate. Insurance verification slow. Billing backlog. We fix it.",
    link: "View Healthcare Solutions",
    href: "/contact",
  },
  {
    id: "realestate",
    title: "Real Estate",
    body: "Leads wait hours and admin slows deals. We automate lead qualification, follow-ups, showing scheduling, documents, CRM, and tracking.",
    link: "View Real Estate Solutions",
    href: "/contact",
  },
] as const;

export const howItWorks = {
  heading: "How it works.",
  subheading: "Same process, every industry.",
  steps: [
    {
      week: "Week 1",
      title: "We map your workflow",
      body: "A working session with the people doing the work, to see exactly where the time goes.",
    },
    {
      week: "Week 2",
      title: "We identify high-ROI automations",
      body: "Ranked by impact, so the first release targets the most expensive bottleneck.",
    },
    {
      week: "Week 3-4",
      title: "We build and test",
      body: "A working slice runs on your data, with your team using it, not a slide deck.",
    },
    {
      week: "Week 5+",
      title: "We deploy and optimize",
      body: "Live in your environment, then tuned against the numbers it actually produces.",
    },
  ],
} as const;

export const homeFaq = {
  eyebrow: "COMMON QUESTIONS",
  heading: "Frequently asked questions.",
  items: [
    {
      q: "What is AI automation exactly?",
      a: "We build intelligent systems that handle repetitive work automatically. Data entry, document processing, scheduling, and approvals, things that do not require human judgment, are handled by AI. Your team handles the decisions and strategy.",
    },
    {
      q: "How long does implementation take?",
      a: "4 to 16 weeks depending on complexity. Most teams start with the 4-week Starter package to prove the concept.",
    },
    {
      q: "How much does it cost?",
      a: "Starts at 20,000 USD for the Starter package, scaling to 50,000 to 150,000+ USD depending on scope. No hidden fees, pricing is upfront.",
    },
    {
      q: "When will we see ROI?",
      a: "First improvements in 2 to 3 weeks. Full payback period is 2 to 6 months for most organizations.",
    },
    {
      q: "Do we need to hire technical people to run this?",
      a: "No. Your existing team learns to use it. We handle the technical side.",
    },
    {
      q: "How fast do we see results?",
      a: "First improvements in 2 to 3 weeks. Full ROI is typically achieved in 2 to 6 months.",
    },
    {
      q: "Will this disrupt our workflow?",
      a: "No. We integrate into your existing processes. Your team barely notices the transition.",
    },
    {
      q: "Is it secure?",
      a: "Yes. SOC 2 Type II certified, HIPAA compliant where applicable, data encrypted, with audit trails included.",
    },
    {
      q: "Can we change it later?",
      a: "Yes. Your team gets trained, and you can modify it yourselves or we can help.",
    },
    {
      q: "What if we are not sure where to start?",
      a: "That is what our 30-minute consultation is for. We will identify your best opportunities together.",
    },
  ],
} as const;

export const nextSteps = {
  heading: "Next steps.",
  paths: [
    {
      title: "Free 30-min consultation",
      price: "Free",
      body: "Tell us your biggest bottleneck. We will suggest what to automate first.",
      tone: "azure",
    },
    {
      title: "14-day assessment",
      price: "$10,000 to $15,000",
      body: "A detailed roadmap showing exact ROI and timeline.",
      tone: "violet",
    },
    {
      title: "Start with the Starter package",
      price: "From $20,000",
      body: "Prove the concept in 4 weeks before committing to more.",
      tone: "magenta",
    },
  ],
  ctas: [
    { label: "Book a Consultation", href: "/contact" },
    { label: "Get a Quote", href: "/contact" },
    { label: "See Results by Industry", href: "#industry-solutions" },
  ],
} as const;

export const trust = {
  eyebrow: "TRUSTED. CERTIFIED. RECOGNIZED.",
  headingLine1: "Built on trust.",
  headingLine2Lead: "Driven by",
  headingAccent: "excellence.",
  badges: [
    { title: "ISO 27001", subtitle: "Certified" },
    { title: "ISO 9001", subtitle: "Certified" },
    { title: "CMMI", subtitle: "Level 3" },
    { title: "Microsoft", subtitle: "Solutions Partner" },
    { title: "AWS", subtitle: "Advanced Partner" },
    { title: "Google Cloud", subtitle: "Partner" },
  ],
} as const;

export const partners = {
  eyebrow: "OUR PARTNER ECOSYSTEM",
  heading: "Stronger together.",
  logos: ["Microsoft", "AWS", "Google Cloud", "Oracle", "SAP", "servicenow", "Snowflake"],
  link: "See Partnerships",
  linkHref: "#partners",
} as const;

export const projectsSection = {
  heading: { lead: "Work that", accent: "moves the numbers." },
  body: "A sample of the systems we have shipped into production.",
  link: "See more work",
  linkHref: "#",
} as const;

/**
 * ILLUSTRATIVE case studies. Client names, sectors, and metrics are placeholders
 * for layout and must be replaced with signed-off references before launch.
 */
export const projects = [
  {
    id: "meridian",
    client: "Meridian Bank",
    sector: "Financial Services",
    title: "Real-time fraud detection at national scale",
    body: "An AI-driven risk engine now screens millions of transactions a day, catching patterns a rules-based system never could.",
    metrics: [
      { value: "40%", label: "fewer fraud losses" },
      { value: "6 weeks", label: "to first deployment" },
    ],
    asset: "Product/dashboard screenshot, banking risk console, 4:3",
    tone: "azure",
  },
  {
    id: "zonal",
    client: "Zonal Telecom",
    sector: "Telecom & Connectivity",
    title: "A cloud migration with zero downtime",
    body: "Core billing and provisioning moved off legacy infrastructure while the network kept running, market by market.",
    metrics: [
      { value: "99.98%", label: "network uptime" },
      { value: "3x", label: "faster provisioning" },
    ],
    asset: "Network operations photograph, 4:3",
    tone: "violet",
  },
  {
    id: "atlas",
    client: "Atlas Retail Group",
    sector: "Retail & Consumer",
    title: "One data platform for twelve markets",
    body: "Store, supplier, and e-commerce data now reconcile in one place, replacing spreadsheets that never agreed with each other.",
    metrics: [
      { value: "25%", label: "better forecast accuracy" },
      { value: "12", label: "markets unified" },
    ],
    asset: "Retail warehouse photograph, 4:3",
    tone: "magenta",
  },
] as const;

export const ourWorkPage = {
  eyebrow: "OUR WORK",
  heading: { lead: "Automation and platforms,", accent: "shipped and running." },
  body: "A selection of the systems we have designed, built, and put into production, filtered by the problem each one solves.",
} as const;

/**
 * ILLUSTRATIVE case studies, same convention as `projects` above: placeholders
 * for layout, sector, and category, not signed-off client references. `category`
 * matches a `services[].id` so the filter sidebar on /our-work can reuse the
 * service catalogue instead of a second taxonomy.
 */
export const ourWork = [
  {
    id: "nightshift",
    category: "automation",
    client: "Nightshift Logistics",
    title: "Dispatch scheduling that runs itself overnight",
    body: "A rules engine replaced a night-shift coordinator manually re-routing drivers by phone.",
    asset: "Product/dashboard screenshot, dispatch console, 4:3",
    tone: "azure",
  },
  {
    id: "fenwick",
    category: "automation",
    client: "Fenwick & Cole Legal",
    title: "First-pass document review off associates' desks",
    body: "Intake, tagging, and a first-pass summary now happen before a human opens the file.",
    asset: "Product screenshot, document review queue, 4:3",
    tone: "violet",
  },
  {
    id: "meridian-capital",
    category: "data",
    client: "Meridian Capital Partners",
    title: "One risk dashboard instead of five spreadsheets",
    body: "Portfolio exposure now updates live instead of through a Friday afternoon reconciliation.",
    asset: "Product/dashboard screenshot, portfolio risk console, 4:3",
    tone: "magenta",
  },
  {
    id: "harborview",
    category: "data",
    client: "Harborview Health Network",
    title: "Staffing forecasts built on real patient flow",
    body: "Ward managers plan shifts against a live model instead of last month's average.",
    asset: "Product/dashboard screenshot, staffing forecast, 4:3",
    tone: "azure",
  },
  {
    id: "solstice",
    category: "integration",
    client: "Solstice Retail Group",
    title: "One inventory truth across three systems",
    body: "Store, warehouse, and storefront stock now reconcile automatically, every few minutes.",
    asset: "Product screenshot, unified inventory view, 4:3",
    tone: "violet",
  },
  {
    id: "prairie-grain",
    category: "integration",
    client: "Prairie Grain Cooperative",
    title: "A legacy ERP finally talking to modern tools",
    body: "One integration layer replaced a dozen brittle scripts moving data between systems by hand.",
    asset: "Systems diagram, ERP integration layer, 4:3",
    tone: "magenta",
  },
  {
    id: "bellcrest",
    category: "agents",
    client: "Bellcrest Property Management",
    title: "A tenant copilot that closes most tickets alone",
    body: "Routine maintenance requests get triaged, scheduled, and confirmed without a human touching them.",
    asset: "Product screenshot, tenant support copilot, 4:3",
    tone: "azure",
  },
  {
    id: "ashworth",
    category: "agents",
    client: "Ashworth & Reyes Accounting",
    title: "First-draft client replies from the firm's own files",
    body: "An internal assistant drafts responses grounded in the firm's own engagement history.",
    asset: "Product screenshot, internal assistant interface, 4:3",
    tone: "violet",
  },
  {
    id: "northgate",
    category: "security",
    client: "Northgate Utilities",
    title: "Continuous monitoring without a security hire",
    body: "Access auditing and threat detection now run around the clock, flagged before they become incidents.",
    asset: "Product/dashboard screenshot, security monitoring console, 4:3",
    tone: "magenta",
  },
  {
    id: "kepler",
    category: "software",
    client: "Kepler Field Services",
    title: "One platform replacing spreadsheets and phone calls",
    body: "Forty field technicians now get jobs, parts, and sign-off through one custom-built app.",
    asset: "Product screenshot, field service platform, 4:3",
    tone: "azure",
  },
] as const;

export const meaningfulWork = {
  eyebrow: "PURPOSE BEYOND PROFIT",
  headingLine1Lead: "Meaningful",
  headingLine1Accent: "work.",
  headingLine2Lead: "Lasting",
  headingLine2Accent: "impact.",
  body: "At Axora, we build solutions that create opportunities, empower communities, and shape a better tomorrow.",
  link: "Life at Axora",
  linkHref: "#",
  stats: [
    { value: "2,500+", label: "Axorians Worldwide" },
    { value: "30+", label: "Countries" },
    { value: "1", label: "Purpose" },
  ],
  purpose: "Accelerate Innovation. Empower People.",
} as const;

/**
 * DRAFT copy. Name and title are real; the quote, bio, and stats are a
 * starting point written for layout and must be reviewed and replaced with
 * Manal's own words and real figures before launch.
 */
export const founder = {
  name: "Manal Rana",
  title: "Founder & CEO",
  headline: { lead: "Bringing engineering discipline to", accent: "operational chaos." },
  body: "Manal founded Axora after watching capable teams get buried under manual execution that had nothing to do with their real expertise. We do not just automate individual tasks, we build the autonomous infrastructure that keeps entire operations running underneath them, so people spend their time on the work only they can do.",
  stats: [
    { value: "12+", label: "Years in enterprise technology" },
    { value: "3x", label: "Faster time to production" },
  ],
  photo: "Portrait photograph, Manal Rana, Founder and CEO, 4:5",
} as const;

export const finalCta = {
  heading: "Ready to transform your enterprise with AI-powered innovation?",
} as const;

export const contactPage = {
  eyebrow: "GET IN TOUCH",
  heading: { lead: "Let's talk about your", accent: "next system." },
  body: "Pick the channel that fits, or use the form below. Either way, a person reads it, not a queue.",
  channels: [
    {
      title: "Talk to sales",
      body: "Scoping a new engagement or evaluating Axora for a project.",
      action: "team.manax@gmail.com",
      href: "mailto:team.manax@gmail.com",
    },
    {
      title: "Get support",
      body: "Already running something with us and need a hand.",
      action: "support@axora.com",
      href: "mailto:support@axora.com",
    },
    {
      title: "Explore a partnership",
      body: "Technology, reseller, or delivery partnership inquiries.",
      action: "partners@axora.com",
      href: "mailto:partners@axora.com",
    },
  ],
  hours: "Monday to Friday, 9:00 to 18:00 GMT",
  faqs: [
    {
      q: "How soon will I hear back?",
      a: "Within one working day, from someone who would work on the engagement.",
    },
    {
      q: "Do you work with companies outside the UK?",
      a: "Yes. Roughly a third of current engagements are fully remote, across different time zones.",
    },
    {
      q: "Is the first call a sales pitch?",
      a: "No. It is a scoping conversation. If we are not the right fit, we will say so on that call.",
    },
  ],
} as const;

export const inquiry = {
  heading: "Tell us what you are trying to solve.",
  body: "One form, one reply from an engineer, not a sales sequence. If AI, cloud, or data modernization is not the right next step for you, we will say so.",
  next: [
    { title: "A reply within one working day", body: "From someone who would work on the engagement, not a queue." },
    { title: "A 30-minute scoping call", body: "We look at your current setup and where the highest-value gap is." },
    { title: "A written plan and a fixed quote", body: "Yours to keep, whether or not you hire us." },
  ],
  budgets: [
    "Not sure yet",
    "Under 25,000 USD",
    "25,000 to 100,000 USD",
    "100,000 to 250,000 USD",
    "Over 250,000 USD",
  ],
} as const;

export const contact = {
  email: "team.manax@gmail.com",
  phone: "+44 7359 639090",
  location: "82 Salisbury Avenue, Barking, Essex, IG11 9XS",
} as const;

export const footer = {
  blurb:
    "Axora Innovative Solutions helps enterprises reimagine their future through AI, cloud, data, and intelligent engineering.",
  columns: [
    {
      title: "Solutions",
      links: services.map((s) => ({ label: s.title, href: `/services#${s.id}` })),
    },
    {
      title: "Industries",
      links: industries.map((i) => ({ label: i.title, href: `/industries#${i.id}` })),
    },
    {
      title: "Insights",
      links: [
        { label: "Articles", href: "#" },
        { label: "Case Studies", href: "/our-work" },
        { label: "Whitepapers", href: "#" },
        { label: "Reports", href: "#" },
        { label: "Webinars", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Leadership", href: "#" },
        { label: "Partners", href: "/#partners" },
        { label: "Careers", href: "#" },
        { label: "Newsroom", href: "#" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
  getInTouch: {
    heading: "Get in Touch",
    blurb: "Let's build what's next, together.",
  },
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
