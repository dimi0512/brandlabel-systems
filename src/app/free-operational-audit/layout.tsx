import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = createPageMetadata("/free-operational-audit");

export default function FreeOperationalAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
