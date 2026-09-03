import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — F&O Wedding",
  robots: { index: false, follow: false },
};

export default function DashboardLoginPage() {
  return <LoginForm />;
}
