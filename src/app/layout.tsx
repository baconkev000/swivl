import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import Script from "next/script";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"], variable: "--font-inter-extrabold" });

export const metadata: Metadata = {
    title: "swivo - AI Marketing System",
description: "AI that runs your marketing. swivo automatically runs your SEO, ads, and website to grow your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
        />
      </head>
        <body className={`antialiased ${inter.variable}`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="ac7698f2-a38b-41d3-98e1-66161d9459d0"
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
