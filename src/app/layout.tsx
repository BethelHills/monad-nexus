import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProviders } from "@/providers/wallet-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monad Nexus — The Intelligence Layer for Monad",
  description:
    "Discover protocols, analyze portfolios, and navigate the Monad ecosystem with AI-powered intelligence.",
  icons: {
    icon: "/images/monad-nexus-logo.png",
    apple: "/images/monad-nexus-logo.png",
  },
  openGraph: {
    title: "Monad Nexus — The Intelligence Layer for Monad",
    description:
      "Discover protocols, analyze portfolios, and navigate the Monad ecosystem with AI-powered intelligence.",
    images: ["/images/monad-nexus-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WalletProviders>
          <TooltipProvider>{children}</TooltipProvider>
        </WalletProviders>
      </body>
    </html>
  );
}
