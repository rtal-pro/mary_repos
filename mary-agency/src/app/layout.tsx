import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mary Agency - Premium Communication Agency",
  description: "Premium communication agency specializing in digital creation, film production, and web development. Luxury aesthetic meets exceptional results.",
  keywords: ["communication agency", "digital creation", "film production", "web development", "luxury design"],
  authors: [{ name: "Mary Agency" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="fr">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
