export const DIAGNOSTIC_AUDIT_STORAGE_KEY = "brandlabel-diagnostic-audit";

export type DiagnosticAuditContext = {
  version: 1;
  generatedAt: string;
  problems: Array<{
    title: string;
    people: number;
    frequency: string;
    minutes: number;
    hourlyCost: number;
    weeklyHours: number;
    annualHours: number;
    annualCost: number;
  }>;
  totals: {
    weeklyHours: number;
    annualHours: number;
    monthlyCost: number;
    annualCost: number;
  };
};
