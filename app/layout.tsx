import { Modals } from "@/contexts/Modals";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Web Stack",
  description: "Built with Next.js, Tailwind CSS, and Radix UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Modals>{children}</Modals>
      </body>
    </html>
  );
}
