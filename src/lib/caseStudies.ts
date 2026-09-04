export const caseStudySlugs = [
  "project-operations",
  "workforce-operations",
  "client-operations",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type CaseStudyScreen = CaseStudyImage & {
  title: string;
  kind?: "interface" | "photo";
};

export type CaseStudyScopeGroup = {
  title: string;
  items: string[];
};

export type CaseStudy = {
  slug: CaseStudySlug;
  eyebrow: string;
  title: string;
  summary: string;
  compactIntro?: string;
  screens?: CaseStudyScreen[];
  scopeGroups?: CaseStudyScopeGroup[];
  scopeSummary?: string;
  before?: string;
  after?: string;
  resultLabel?: string;
  resultValue?: string;
  facts: Array<{ value: string; label: string }>;
  heroImage: string;
  heroImageAlt: string;
  heroImageWidth: number;
  heroImageHeight: number;
  problemTitle: string;
  problem: string;
  solutionTitle: string;
  solution: string;
  capabilities: string[];
  workflowTitle: string;
  workflow: Array<{ number: string; title: string; text: string }>;
  outcomeValue: string;
  outcomeLabel: string;
  outcome: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  secondaryImageWidth?: number;
  secondaryImageHeight?: number;
  secondaryCaption?: string;
  supportingImages?: Partial<
    Record<"problem" | "solution" | "workflow" | "role" | "outcome", CaseStudyImage>
  >;
  confidentiality: string;
};

export const caseStudies: Record<CaseStudySlug, CaseStudy> = {
  "project-operations": {
    slug: "project-operations",
    eyebrow: "PROJECT OPERATIONS · MARKETING COMPANY · BELGIUM",
    title: "One workspace for every lead, project and client approval.",
    summary:
      "A custom project management and client approval platform that replaced spreadsheets, email threads, notes and generic SaaS tools with one connected operating system.",
    compactIntro:
      "Built for a seven-person marketing team, the platform connects the complete journey from first lead to project delivery and client approval.",
    screens: [
      {
        title: "Operations dashboard",
        src: "/case-studies/project-operations-dashboard.png",
        alt: "Anonymised project operations dashboard with lead pipeline, priorities and project status",
        width: 2216,
        height: 1566,
        caption: "Leads, proposals, follow-ups and active projects share one operational view, making the next action visible to the whole team.",
      },
      {
        title: "Client portal",
        src: "/case-studies/project-operations-client-portal.png",
        alt: "Anonymised client portal for project updates, documents and approvals",
        width: 2216,
        height: 1522,
        caption: "A dedicated client view turns visual review, document requests and project communication into a traceable approval workflow.",
      },
    ],
    scopeGroups: [
      { title: "PIPELINE", items: ["Lead pipeline CRM", "Follow-ups", "Daily priorities", "Quotation tracking"] },
      { title: "PROJECTS", items: ["Project management", "Tasks & deadlines", "Documents", "Project status"] },
      { title: "CLIENTS", items: ["Client workspace", "Project updates", "Approvals", "Change requests"] },
      { title: "ADMINISTRATION", items: ["Team visibility", "Communication history", "Reporting", "Role-based access"] },
    ],
    scopeSummary:
      "The platform connects lead generation, project delivery, client communication and approvals within one operational workspace.",
    before:
      "Leads, quotations, deadlines, project information and approvals were scattered across spreadsheets, email, notes and separate tools.",
    after:
      "One connected environment gives the team and each client a clear view of the next action, project status and approval history.",
    resultLabel: "Monthly delivery capacity",
    resultValue: "+6–10 projects",
    facts: [
      { value: "7", label: "internal users" },
      { value: "Client view", label: "approval workspace" },
      { value: "6–10", label: "more projects handled monthly" },
      { value: "Belgium", label: "marketing company" },
    ],
    heroImage: "/case-studies/project-operations-dashboard.png",
    heroImageAlt: "Anonymised project operations dashboard with lead pipeline, priorities and project status",
    heroImageWidth: 2216,
    heroImageHeight: 1566,
    problemTitle: "Information was everywhere. Follow-up depended on memory.",
    problem:
      "Leads, quotations, project notes, deadlines and visual approvals lived across Excel files, templates, emails, notes and a generic subscription tool. The team lost time searching and important follow-ups were regularly missed.",
    solutionTitle: "A custom agency operations system built around the complete client journey.",
    solution:
      "The platform connects lead pipeline management, daily priorities, project delivery, quotations and client approvals. Every team member sees the next action, while each client receives a focused view of their own project.",
    capabilities: [
      "Lead pipeline CRM",
      "Project management",
      "Daily priorities",
      "Quotation tracking",
      "Client approval portal",
      "Deadline management",
    ],
    workflowTitle: "From first contact to approved delivery.",
    workflow: [
      { number: "01", title: "Capture the lead", text: "Every opportunity enters one shared pipeline with an owner and next action." },
      { number: "02", title: "Move into delivery", text: "Won leads become projects with tasks, priorities, quotations and deadlines." },
      { number: "03", title: "Share with the client", text: "Visuals and updates are uploaded directly to the client’s private workspace." },
      { number: "04", title: "Approve without email", text: "Clients approve, reject or request changes while the team keeps a clear record." },
    ],
    outcomeValue: "6–10",
    outcomeLabel: "additional projects handled each month",
    outcome:
      "The team stayed aligned, followed leads on time and strengthened client relationships through clearer communication. The extra operational capacity translated into more active customers and projects each month.",
    secondaryImage: "/case-studies/project-operations-client-portal.png",
    secondaryImageAlt: "Anonymised client portal for project updates, documents and approvals",
    secondaryImageWidth: 2216,
    secondaryImageHeight: 1522,
    secondaryCaption: "A dedicated client view turns visual review and project communication into a traceable approval workflow.",
    confidentiality: "Company identity withheld. Interfaces use anonymised demonstration data based on the delivered workflow.",
  },
  "workforce-operations": {
    slug: "workforce-operations",
    eyebrow: "WORKFORCE OPERATIONS · FIELD SERVICES · LABELX",
    title: "Five-minute payroll, connected to the work behind it.",
    summary:
      "LabelX is a custom workforce management system connecting location-based time tracking, projects, payroll, payments, inventory, quotations and field communication.",
    compactIntro:
      "Built for a 10-person field team, LabelX gives employees, partners, clients and administration one shared operational view. Weekly payroll preparation fell from hours to around five minutes.",
    screens: [
      {
        title: "Calendar",
        src: "/case-studies/labelx-planning.png",
        alt: "Anonymised LabelX team planning calendar",
        width: 760,
        height: 500,
        caption: "The shared calendar coordinates field work, deadlines and team availability in one place, so everyone sees the same plan.",
      },
      {
        title: "Projects",
        src: "/case-studies/labelx-projects.png",
        alt: "Anonymised LabelX projects overview",
        width: 761,
        height: 500,
        caption: "Every job moves through a visible operational status. Labour, expenses and invoicing stay linked to the project instead of separate files.",
      },
      {
        title: "Clients",
        src: "/case-studies/labelx-clients.png",
        alt: "Anonymised LabelX clients overview",
        width: 760,
        height: 517,
        caption: "Client records keep contacts, active work and communication together. Role-based access gives each external user only the view they need.",
      },
      {
        title: "Dashboard",
        src: "/case-studies/labelx-dashboard.png",
        alt: "Anonymised LabelX dashboard with the full application navigation visible",
        width: 761,
        height: 517,
        caption: "The dashboard brings urgent requests, assigned work, upcoming projects and approvals into one daily view. The open sidebar reveals the wider system around it.",
      },
    ],
    scopeGroups: [
      { title: "WORKFORCE", items: ["Time tracking", "Attendance", "Payroll & payments", "Team management"] },
      { title: "PROJECTS", items: ["Project management", "Quotations", "Expenses", "Invoicing"] },
      { title: "OPERATIONS", items: ["Planning & calendar", "Inventory", "Client management", "Tickets & requests"] },
      { title: "ADMINISTRATION", items: ["Documents", "Approvals", "Reporting", "Role-based access"] },
    ],
    scopeSummary:
      "LabelX connects workforce management, project operations, client management, financial workflows and administration within one operational platform.",
    before:
      "Scheduling, project information, payroll preparation and operational administration required separate manual steps and information sources.",
    after:
      "One connected environment links the work performed in the field with projects, clients, administration and payroll.",
    resultLabel: "Weekly payroll preparation",
    resultValue: "Hours → ±5 minutes",
    facts: [
      { value: "10", label: "employees" },
      { value: "5 min", label: "weekly payroll preparation" },
      { value: "7 roles", label: "team, partner and client access" },
      { value: "One view", label: "project cost and invoicing" },
    ],
    heroImage: "/case-studies/workforce-operations-system.png",
    heroImageAlt: "Anonymised LabelX workforce operations system with planning, projects, clients and reporting",
    heroImageWidth: 2216,
    heroImageHeight: 1510,
    problemTitle: "Hours, project costs and follow-up disappeared between paper, WhatsApp and Excel.",
    problem:
      "Time tracking and payroll took hours to reconstruct. Projects could be missed, invoicing status was unclear, and materials, expenses and labour costs were not connected to the work they belonged to.",
    solutionTitle: "One field service management platform for the team, partners, clients and administration.",
    solution:
      "LabelX connects workdays to locations, clients and projects. Daily approvals build a reliable weekly payroll, while management sees project status, labour, expenses, inventory and invoicing in context.",
    capabilities: [
      "Location-based time tracking",
      "Payroll automation",
      "Field service management",
      "Project costing",
      "Inventory and QR codes",
      "Quotes and invoicing",
      "Client messaging",
      "Role-based access",
    ],
    workflowTitle: "One approved record from clock-in to payment.",
    workflow: [
      { number: "01", title: "Start the workday", text: "The employee clocks in on location; the system connects the time to the right project and client." },
      { number: "02", title: "Record real hours", text: "Work time, breaks, daily activity and urgent requests remain visible to the team." },
      { number: "03", title: "Approve every day", text: "The manager reviews the shift while the details are still fresh instead of rebuilding the week later." },
      { number: "04", title: "Lock the week", text: "Approved hours create payroll, a payment-ready PDF and the team’s transparent earnings view." },
    ],
    outcomeValue: "Hours → minutes",
    outcomeLabel: "for payroll, project costing and invoicing checks",
    outcome:
      "Management now sees completed work, labour, expenses, materials, invoiced value and remaining billing from the project itself. Employees see their approved hours and expected pay, improving trust and team satisfaction.",
    secondaryCaption: "Admin, deputy manager, inventory manager, partner, employee and client views reveal only the actions each role needs.",
    confidentiality: "Company identity withheld. LabelX screens use fictional demonstration data and preserve the delivered operational logic.",
  },
  "client-operations": {
    slug: "client-operations",
    eyebrow: "CLIENT OPERATIONS · HAIR SALON · INTERNAL SYSTEM",
    title: "Every appointment becomes a usable client history.",
    summary:
      "A custom salon management system connecting appointments, client records, formulas, allergies, products, stock, income and expenses in one private workspace.",
    compactIntro:
      "Built for four employees, the private system gives the salon one reliable operational memory that remains available whoever is working.",
    screens: [
      {
        title: "Calendar & client view",
        src: "/case-studies/salon-operations-calendar.png",
        alt: "Anonymised salon management system with appointment calendar, client history, stock and weekly income",
        width: 1586,
        height: 992,
        caption: "Appointments, recent client history, stock alerts and weekly income are visible together, while the full client record remains one click away.",
      },
      {
        title: "Built for daily use",
        src: "/case-studies/salon-interior.webp",
        alt: "Interior of the salon supported by the private operations system",
        width: 2200,
        height: 3911,
        caption: "The system follows the rhythm of the salon: quick to consult between appointments and detailed enough to preserve every client’s history.",
        kind: "photo",
      },
    ],
    scopeGroups: [
      { title: "CLIENTS", items: ["Client records", "Service history", "Allergies & notes", "Formulas & photos"] },
      { title: "SCHEDULING", items: ["Appointment calendar", "Service details", "Previous prices", "Team visibility"] },
      { title: "STOCK", items: ["Product inventory", "Retail sales", "Stock levels", "Low-stock view"] },
      { title: "FINANCES", items: ["Daily income", "Weekly reporting", "Expenses", "Monthly & yearly view"] },
    ],
    scopeSummary:
      "The platform connects appointments, client history, products, stock and financial reporting within one private internal system.",
    before:
      "Appointments, formulas, allergies, prices, photos and stock depended on memory, paper notes and whoever happened to be present.",
    after:
      "One shared workspace gives every employee the same client history and updates stock and financial reporting from daily activity.",
    resultLabel: "Operational knowledge",
    resultValue: "One shared record",
    facts: [
      { value: "4", label: "internal users" },
      { value: "One record", label: "for every client" },
      { value: "4 areas", label: "calendar, clients, stock and finance" },
      { value: "Internal", label: "employee-only access" },
    ],
    heroImage: "/case-studies/salon-operations-calendar.png",
    heroImageAlt: "Anonymised salon management system with appointment calendar, client history, stock and weekly income",
    heroImageWidth: 1586,
    heroImageHeight: 992,
    problemTitle: "The client history existed mainly in the owner’s memory.",
    problem:
      "Appointments, past services, formulas, prices, allergies, photos and product stock were remembered or written on paper. When one employee was absent, the rest of the team had to call and ask what had happened before.",
    solutionTitle: "A focused salon CRM and appointment management system for everyday use.",
    solution:
      "The internal platform gives every employee the same view of the calendar and each client’s history. Products sold during an appointment update stock and contribute to daily, weekly, monthly and yearly financial reporting.",
    capabilities: [
      "Appointment calendar",
      "Salon CRM",
      "Client history",
      "Allergy records",
      "Formula and photo history",
      "Product inventory",
      "Income and expense reporting",
    ],
    workflowTitle: "The next appointment starts with the complete history.",
    workflow: [
      { number: "01", title: "Book the appointment", text: "The employee selects an existing client, services, time and expected price." },
      { number: "02", title: "Review the history", text: "Past services, formulas, photos, allergies, notes and previous prices are available immediately." },
      { number: "03", title: "Complete the visit", text: "The team records what was done and any products sold during the appointment." },
      { number: "04", title: "Update the business view", text: "Client history, stock and financial reporting update from the same operational record." },
    ],
    outcomeValue: "One shared memory",
    outcomeLabel: "for the complete salon team",
    outcome:
      "Employees no longer search through notes or call colleagues for missing context. The salon has a clearer view of its clientele, stronger internal communication and reliable operational history.",
    secondaryImage: "/case-studies/salon-interior.webp",
    secondaryImageAlt: "Interior of the salon supported by the private operations system",
    secondaryImageWidth: 2200,
    secondaryImageHeight: 3911,
    secondaryCaption: "Designed for the rhythm of a real salon: quick to consult between appointments and detailed enough to preserve every client’s history.",
    confidentiality: "Salon identity and client data withheld. The interface is an anonymised reconstruction using fictional demonstration data.",
  },
};

export function getCaseStudy(slug: string) {
  return caseStudies[slug as CaseStudySlug];
}
