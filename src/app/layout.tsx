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
  title: {
    default: "GetEasier — Softwares Simples para Problemas Complexos",
    template: "%s | GetEasier",
  },
  description:
    "Equipa de IT com desenvolvimento de software à medida e produtos próprios — TimeEasier, ConstructionEasier, StockEasier e WoodEasier — para simplificar a gestão da sua empresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="">
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
