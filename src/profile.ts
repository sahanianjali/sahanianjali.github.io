// Everything on the site comes from Anjali's CV (Anjali_Sahani_CV.pdf, Oct 2026).
// Edit facts here; the sections only lay them out.

export type YM = { y: number; m: number }; // m is 1–12

export const profile = {
  name: "Anjali Sahani",
  initials: "AS",
  title: "Global Transformation Lead",
  positioning: "Strategy & transformation lead",
  location: "Gurugram, Haryana",
  email: "anjalisahani4@gmail.com",
  linkedin: "https://www.linkedin.com/in/anjali-sahani",
  // Shows the "Open to new roles" badges in the hero and contact sections.
  openToWork: false,
  summary:
    "setting up and running governance for CEO/CTO-level agendas, from review cadences and councils to KPI dashboards, and aligning cross-functional teams to deliver against them.",
  topSkills: ["Governance & PMO", "Go-to-market strategy", "CXO stakeholder management"],
  coreSkills: [
    "Governance & PMO",
    "Steering forums & workgroups",
    "KPI frameworks & tracking",
    "Prioritization & roadmapping",
    "CXO stakeholder management",
    "Sales enablement & training",
    "Go-to-market strategy",
  ],
  tools: ["Power BI", "CRM & revenue data"],
  awards: [
    { name: "Star Awards", detail: "MXC and CEC", when: "2025, 2026" },
    { name: "ACE Award", when: "Mar 2026" },
    { name: "Pat on Back", when: "Mar 2026" },
  ],
  athlete: { medals: 120, years: "2008 – 2020" },
};

export type Role = {
  title: string;
  short: string;
  team?: string;
  level: number;
  start: YM;
  end: YM | null;
  highlights?: string[];
};

export const employer = {
  company: "Tech Mahindra",
  monogram: "TM",
  start: { y: 2021, m: 7 },
  // Newest first. `level` drives the career chart in the hero.
  roles: [
    {
      title: "Global Transformation Lead",
      short: "Transformation Lead",
      level: 3,
      start: { y: 2025, m: 10 },
      end: null,
      highlights: [
        "Set up GVI governance, driving CEO/CTO reviews and aligning cross-functional teams on revenue growth, pipeline acceleration and strategic priorities.",
        "Built and launched the Comms Experience Centre (CEC), securing $300K+ in sponsorships and onboarding 30+ live demos for customer engagements.",
        "Led MWC, DTW, Sales Masterclass and Partner Connect, driving 100+ executive, customer, partner and sales engagements.",
      ],
    },
    {
      title: "Strategy and Marketing Manager",
      short: "Strategy & Marketing Manager",
      level: 2,
      start: { y: 2024, m: 1 },
      end: { y: 2025, m: 10 },
      highlights: [
        "Program-managed the CEO-led Manufacturing Council, driving initiatives across growth, capability and marketing via 6+ cross-functional workgroups.",
        "Spearheaded MFG Eye, a Power BI platform tracking 15+ KPIs, improving visibility into revenue, pipeline and growth opportunities.",
        "Designed and executed GTM strategy across 15+ channels, 20+ solutions and 50+ accounts; defined success metrics and tracked progress across verticals and service offerings.",
        "Led the end-to-end launch of the Manufacturing Experience Centre (MXC): ₹3.3 Cr+ in sponsorships, 5+ strategic partners, 35+ solution showcases across 6 zones and 60+ customer and partner engagements.",
        "Hosted 20+ Pro-connect and 10+ GeoEnablement sessions (30+ service offerings pitched) to build sales readiness; organized MFGxcelerate for 40+ manufacturing leaders, securing ₹20 L+ in partner sponsorship.",
      ],
    },
    {
      title: "Growth Manager",
      short: "Growth Manager",
      team: "Sales Strategy & Operations – EMEA & Network Services",
      level: 1,
      start: { y: 2021, m: 7 },
      end: { y: 2023, m: 12 },
      highlights: [
        "Led investment planning and budgeting, aligning allocations to growth potential and projected revenue; improved allocation accuracy by 15%.",
        "Analyzed CRM and revenue data on 150+ deals to track progression, forecast closures and evaluate performance; supported 50+ leadership reviews.",
      ],
    },
  ] satisfies Role[],
};

// Headline results from the CV, shown in the hero and the Impact section.
export const impact = {
  mxc: {
    name: "Manufacturing Experience Centre",
    short: "MXC",
    amount: 3.3, // ₹ Cr+ in sponsorships
    stats: [
      ["5+", "strategic partners"],
      ["35+", "solution showcases"],
      ["6", "zones"],
      ["60+", "customer & partner engagements"],
    ],
  },
  cec: { name: "Comms Experience Centre", short: "CEC", amount: 300, stats: [["30+", "live demos onboarded"]] }, // $K+ in sponsorships
  engagements: 100,
  kpis: 15,
  gtm: { channels: 15, solutions: 20, accounts: 50 },
  allocationAccuracy: 15,
};

export const education = [
  { school: "Indian Institute of Management Indore", short: "IIM Indore", degree: "MBA", years: "2019 – 2021" },
  { school: "Lady Shri Ram College, University of Delhi", short: "Lady Shri Ram College", degree: "BA", years: "2015 – 2018" },
];

export const organisations = ["Tech Mahindra", "IIM Indore", "Lady Shri Ram College", "University of Delhi"];

/* ------------------------------------------------------------------ dates */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const today = new Date();
export const NOW: YM = { y: today.getFullYear(), m: today.getMonth() + 1 };

/** Months in a role, counted the way LinkedIn does (both end months included). */
export function monthsBetween(a: YM, b: YM | null) {
  const e = b ?? NOW;
  return (e.y - a.y) * 12 + (e.m - a.m) + 1;
}

export function fmtDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}

export const fmtYM = ({ y, m }: YM) => `${MONTHS[m - 1]} ${y}`;
export const fmtRange = (a: YM, b: YM | null) => `${fmtYM(a)} – ${b ? fmtYM(b) : "Present"}`;

export const employerMonths = monthsBetween(employer.start, null);
export const employerYears = Math.floor(employerMonths / 12);
const lead = employer.roles[0].start;
export const toLeadYears = lead.y - employer.start.y + (lead.m - employer.start.m) / 12;

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
export const inWords = (n: number) => WORDS[n] ?? String(n);
