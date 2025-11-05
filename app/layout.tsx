import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

// ✅ Replacing deprecated Geist fonts with stable Google fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OmniAI Studio Universe",
  description: "NextTech.J – Build the future with AI ✨",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased relative`}
      >
        {/* Main content */}
        {children}

        {/* ✨ Floating Stars for Dark Mode */}
        <div className="dark:hidden">
          {/* Light Mode - clean background (no stars) */}
        </div>

        <div className="dark:block hidden">
          <div className="stars"></div>
          <div className="stars"></div>
          <div className="stars"></div>
        </div>
      </body>
    </html>
  );
}
