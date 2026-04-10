import type { Metadata } from "next";
import { EB_Garamond, Cinzel } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/ui/site-header";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Witness Protocol | The Summons",
  description: "A solemn call to duty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${ebGaramond.variable} ${cinzel.variable} antialiased`}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
