import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Shell } from "@/components/shell/shell";

export const metadata: Metadata = {
  title: "Kameshwari Admin · CRM",
  description: "Operations & customer management for Kameshwari Selections.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#961a43",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
