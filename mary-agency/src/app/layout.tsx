import type { Metadata } from "next";
import React from "react";
import { Playfair_Display, Barlow_Condensed } from 'next/font/google'
import { OrganizationStructuredData, LocalBusinessStructuredData, WebsiteStructuredData } from '@/components/seo/StructuredData'
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Mary Agency - Authentic Digital Experiences | Premium Communication Agency Paris',
    template: '%s | Mary Agency'
  },
  description: 'Leading communication agency in Paris specializing in digital creation, film production, and web development. Crafting authentic brand experiences since 2015. Contact us at 06 58 77 33 30.',
  keywords: [
    'communication agency', 
    'digital creation', 
    'film production', 
    'web development', 
    'Paris', 
    'branding',
    'luxury design',
    'authentic experiences',
    'creative agency',
    'graphic design',
    'marketing digital',
    'agence communication Paris'
  ],
  authors: [{ name: 'Mary Agency', url: 'https://marybusinessgraphic.com' }],
  creator: 'Mary Agency',
  publisher: 'Mary Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://marybusinessgraphic.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Mary Agency - Authentic Digital Experiences',
    description: 'Leading communication agency in Paris specializing in digital creation and authentic brand experiences. 231 Rue Saint-Honoré, 75001 Paris.',
    url: 'https://marybusinessgraphic.com',
    siteName: 'Mary Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mary Agency - Premium Communication Agency Paris',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mary Agency - Authentic Digital Experiences',
    description: 'Leading communication agency in Paris specializing in digital creation and luxury branding.',
    images: ['/twitter-image.jpg'],
    creator: '@maryagency',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="fr" className={`scroll-smooth ${playfairDisplay.variable} ${barlowCondensed.variable}`}>
      <head>
        <OrganizationStructuredData />
        <LocalBusinessStructuredData />
        <WebsiteStructuredData />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
