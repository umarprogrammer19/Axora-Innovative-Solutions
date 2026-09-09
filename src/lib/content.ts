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
    href: "/#industries",
    items: [
      { label: "Financial Services", href: "/#industries" },
      { label: "Telecom & Connectivity", href: "/#industries" },
      { label: "Retail & Consumer", href: "/#industries" },
      { label: "Energy & Utilities", href: "/#industries" },
      { label: "Manufacturing & Supply Chain", href: "/#industries" },
      { label: "Healthcare & Life Sciences", href: "/#industries" },
      { label: "Public Sector & Development", href: "/#industries" },
    ],
  },
  {
    label: "Insights",
    href: "#",
    items: [
      { label: "Articles", href: "#" },
      { label: "Case Studies", href: "#" },
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

export const industriesSection = {
  eyebrow: "INDUSTRIES WE EMPOWER",
  headingLine1: "Deep expertise.",
  headingLine2Lead: "Real‑world",
  headingAccent: "impact.",
  exploreLink: "View all industries",
  exploreHref: "#industries",
} as const;

export const industries = [
  { id: "financial", title: "Financial Services" },
  { id: "telecom", title: "Telecom & Connectivity" },
  { id: "retail", title: "Retail & Consumer" },
  { id: "energy", title: "Energy & Utilities" },
  { id: "manufacturing", title: "Manufacturing & Supply Chain" },
  { id: "healthcare", title: "Healthcare & Life Sciences" },
  { id: "public", title: "Public Sector & Development" },
] as const;

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
      action: "hello@axora.com",
      href: "mailto:hello@axora.com",
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
  hours: "Sunday to Thursday, 9:00 to 18:00 PKT",
  faqs: [
    {
      q: "How soon will I hear back?",
      a: "Within one working day, from someone who would work on the engagement.",
    },
    {
      q: "Do you work with companies outside Pakistan?",
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
  email: "hello@axora.com",
  phone: "+92 21 111 123 672",
  location: "Plot #, Tech Square, Karachi, Pakistan",
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
      links: industries.map((i) => ({ label: i.title, href: "/#industries" })),
    },
    {
      title: "Insights",
      links: [
        { label: "Articles", href: "#" },
        { label: "Case Studies", href: "#" },
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
