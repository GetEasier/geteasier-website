import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetEasier",
  description: "Softwares Simples para Problemas Complexos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={cn(
        'relative h-full font-sans antialiased ',
        inter.className)}>
        <LanguageProvider>
          <main className="relative overflow-hidden flex flex-col">
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </main>
          <Toaster
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
