import type { Metadata } from "next";
import GuestDashboard from "./GuestDashboard";

export const metadata: Metadata = {
  title: "Guest Dashboard — F&O Wedding",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <GuestDashboard />;
}
