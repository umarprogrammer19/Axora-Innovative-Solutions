/**
 * Single source of copy for the home page.
 *
 * Copy rules held here: no em-dashes, one register (plain operational English),
 * no invented certifications, no invented pricing. Metrics that are not yet
 * sourced from a real engagement are marked with ILLUSTRATIVE and must be
 * replaced with real numbers before launch.
 */

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Why Axora", href: "#why" },
  { label: "FAQ", href: "#faq" },
] as const;

/** One label per intent, reused everywhere on the page. */
export const cta = {
  contact: "Book a call",
  contactHref: "#inquiry",
  work: "See our work",
  workHref: "#work",
  submit: "Send inquiry",
} as const;

export const hero = {
  headline: "Whatever Slows You Down, We Automate It",
  sub: "We design, build, and run automation for operations teams. First release live in two weeks, measured in hours saved.",
  badges: ["NDA before the first call", "Fixed-scope quotes", "Your cloud, your data"],
} as const;

export const tickerItems = [
  "We build and run it",
  "Live in two weeks",
  "You own the code",
  "Fixed scope, fixed price",
  "Integrates with your stack",
  "Operations, not slide decks",
] as const;

export const problem = {
  heading: "Your team is not slow. Your process is manual.",
  body: "Every hour spent re-typing, chasing, and rebuilding is an hour nobody planned for. It compounds quietly until growth starts to hurt.",
  now: {
    title: "What it costs you today",
    items: [
      "Staff re-typing the same data into three systems",
      "Approvals parked in an inbox for two days",
      "Month-end reporting rebuilt by hand, every month",
      "Errors your customers find before your team does",
    ],
  },
  after: {
    title: "What it looks like after",
    items: [
      "Data entered once, then routed everywhere it is needed",
      "Approvals that clear in minutes with a full audit trail",
      "Reports that are already correct when you open them",
      "Exceptions flagged to a person before they reach a customer",
    ],
  },
} as const;

export const services = [
  {
    id: "workflow",
    title: "Workflow automation",
    body: "Order intake, approvals, invoicing, reporting. The repetitive middle of your operation, handled by software that does not forget.",
    points: ["Document and data pipelines", "Approval routing", "Scheduled reporting"],
  },
  {
    id: "agents",
    title: "AI agents and copilots",
    body: "Assistants that read your documents, answer your team, and draft the work your staff currently redoes every day.",
    points: ["Retrieval over your own files", "Drafting and triage", "Human review built in"],
  },
  {
    id: "integration",
    title: "Systems integration",
    body: "Your ERP, CRM, accounting tool, spreadsheets, and inbox connected so nothing has to be re-typed between them.",
    points: ["API and webhook plumbing", "Legacy and file-based systems", "Two-way sync"],
  },
  {
    id: "software",
    title: "Custom internal software",
    body: "Portals, dashboards, and operational tools built around how your team actually works.",
    points: ["Internal portals", "Operational dashboards", "Role-based access"],
  },
  {
    id: "operate",
    title: "Run and improve",
    body: "We monitor what we ship, fix what breaks, and keep tuning after launch.",
    points: ["Monitoring and alerting", "Issue response", "Quarterly tuning"],
  },
] as const;

export const process = [
  {
    id: "map",
    title: "Map the bottleneck",
    body: "A working session with the people doing the work. We time the current process and pick the one costing you most.",
    meta: "Week 1, no charge",
  },
  {
    id: "design",
    title: "Design the system",
    body: "You get a written plan: what gets automated, what stays human, what it costs, and how we will know it worked.",
    meta: "Week 1",
  },
  {
    id: "build",
    title: "Ship the first release",
    body: "A working slice runs in your environment, on your data, with your team using it. Not a prototype and not a slide deck.",
    meta: "Week 2",
  },
  {
    id: "operate",
    title: "Operate and extend",
    body: "We run the system, watch the numbers it produces, and move on to the next bottleneck once this one is quiet.",
    meta: "Ongoing",
  },
] as const;

/**
 * ILLUSTRATIVE case studies. Client names, sectors, and metrics are placeholders
 * for layout and must be replaced with signed-off references before launch.
 */
export const projects = [
  {
    id: "marhaba",
    client: "Marhaba Freight",
    sector: "Logistics",
    title: "Dispatch paperwork that took a full shift now takes minutes",
    body: "Consignment notes, driver assignment, and customer invoices were three separate manual jobs. They are now one flow with a single point of human review.",
    metrics: [
      { value: "6 hrs", label: "returned per shift" },
      { value: "12 days", label: "to first release" },
    ],
    asset: "Operations floor photograph, 16:9",
  },
  {
    id: "nadir",
    client: "Nadir Health Group",
    sector: "Clinics",
    title: "Patient intake and claims moved off paper",
    body: "Front-desk forms feed the clinical system directly, and claims are assembled and checked before submission rather than after rejection.",
    metrics: [
      { value: "3 staff", label: "moved to patient care" },
      { value: "Half", label: "the claim rejections" },
    ],
    asset: "Clinic reception photograph, 4:3",
  },
  {
    id: "ravi",
    client: "Ravi Retail Group",
    sector: "Retail",
    title: "Nightly stock reconciliation across 40 stores",
    body: "Store counts, supplier deliveries, and the ERP now reconcile themselves overnight. Only genuine mismatches reach a human in the morning.",
    metrics: [
      { value: "40", label: "stores reconciled nightly" },
      { value: "9 hrs", label: "of manual checks removed" },
    ],
    asset: "Retail back-office photograph, 4:3",
  },
] as const;

export const why = {
  heading: "Why operations teams pick Axora",
  reasons: [
    {
      title: "We run what we build",
      body: "Most agencies hand over a repository and disappear. We stay on the system, on call, and on the numbers it produces.",
    },
    {
      title: "You own everything",
      body: "Code, credentials, infrastructure, and documentation live in your accounts from the first commit onward.",
    },
    {
      title: "Fixed scope, fixed price",
      body: "Every phase is quoted and approved before it starts. No open-ended retainers and no surprise change orders.",
    },
    {
      title: "Two weeks to something real",
      body: "The first release goes into your environment inside two weeks, so you judge working software instead of promises.",
    },
  ],
  /** ILLUSTRATIVE metrics. Replace with real figures before launch. */
  stats: [
    { value: "14 days", label: "median time to first release" },
    { value: "60+", label: "workflows running in production" },
    { value: "24 hrs", label: "response time on production issues" },
  ],
} as const;

export const faqs = [
  {
    q: "How long before something is actually running?",
    a: "The first release goes live in your environment within two weeks of the scoping session. Larger systems continue to ship in slices after that, usually every two to three weeks.",
  },
  {
    q: "What does a project cost?",
    a: "Every phase is quoted as a fixed scope and approved before work starts, so you see the number before we build. Pilots are deliberately small so you can judge us on one workflow first.",
  },
  {
    q: "Where does our data go?",
    a: "Into your accounts. We build inside your cloud, your database, and your identity provider. An NDA is in place before we get into specifics on the first call.",
  },
  {
    q: "Do we own the code?",
    a: "Yes. Repositories, infrastructure definitions, and documentation sit in your organisation from the first commit. If you part ways with us, nothing stops working.",
  },
  {
    q: "Will this work with the software we already use?",
    a: "That is usually the job. We integrate with ERPs, CRMs, accounting tools, spreadsheets, and email rather than asking you to replace systems your team already knows.",
  },
  {
    q: "What happens when something breaks?",
    a: "We monitor the workflows we operate and respond to production issues within 24 hours, with a faster escalation path for anything blocking revenue or patient care.",
  },
] as const;

export const inquiry = {
  eyebrow: "Start here",
  heading: "Tell us what is slowing you down",
  body: "One form, one reply from an engineer rather than a sales sequence. If automation is the wrong answer for your problem, we will say so.",
  next: [
    { title: "A reply within one working day", body: "From someone who would work on the build, not a queue." },
    { title: "A 30-minute scoping call", body: "We time your current process and look for the expensive part." },
    { title: "A written plan and a fixed quote", body: "Yours to keep, whether or not you hire us." },
  ],
  budgets: [
    "Not sure yet",
    "Under 10,000 USD",
    "10,000 to 30,000 USD",
    "30,000 to 75,000 USD",
    "Over 75,000 USD",
  ],
} as const;

export const contact = {
  email: "hello@axora.com",
  phone: "+92 21 111 123 672",
  location: "Tech Square, Karachi, Pakistan",
} as const;

export const footer = {
  columns: [
    {
      title: "Services",
      links: [
        { label: "Workflow automation", href: "#services" },
        { label: "AI agents and copilots", href: "#services" },
        { label: "Systems integration", href: "#services" },
        { label: "Custom internal software", href: "#services" },
        { label: "Run and improve", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "How a project runs", href: "#process" },
        { label: "Recent work", href: "#work" },
        { label: "Why Axora", href: "#why" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
