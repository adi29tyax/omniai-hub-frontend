import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LimitReachedWrapper from "@/components/ui/LimitReachedWrapper";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoading from "@/components/ui/GlobalLoading";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OmniAI Hub",
  description: "AI-Powered Video Creation Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased relative`}>
        <LoadingProvider>
          <GlobalLoading />
          {children}
          <Toaster />
          {/* ✨ Floating Stars for Dark Mode */}
          <div className="dark:block hidden">
            <div className="stars"></div>
            <div className="stars"></div>
            <div className="stars"></div>
          </div>
          <LimitReachedWrapper />
        </LoadingProvider>
      </body>
    </html>
  );
}
