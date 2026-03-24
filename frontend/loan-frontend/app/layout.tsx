import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LoanGuard AI | Loan Default Prediction",
  description: "Professional ML interface for loan default risk prediction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.variable} antialiased selection:bg-[#e78a53] selection:text-[#121113]`}
      >
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
