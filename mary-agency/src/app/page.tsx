import React from "react";
import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import HeroSection from '@/components/sections/HeroSection'
import { INavigationItem } from '@/types'

export const metadata: Metadata = {
  title: 'Accueil - Agence de Communication Premium Paris',
  description: 'Mary Agency, agence de communication premium à Paris. Spécialisée en création digitale, production audiovisuelle et développement web. Expériences de marque authentiques depuis 2015.',
  openGraph: {
    title: 'Mary Agency - Expériences Digitales Authentiques',
    description: 'Agence de communication leader à Paris spécialisée en création digitale et expériences de marque authentiques.',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Mary Agency - Page d\'accueil',
      },
    ],
  },
}

const navigationItems: INavigationItem[] = [
  { label: 'ACCUEIL', href: '/', isActive: true },
  { label: 'AGENCE', href: '/agence', isActive: false },
  { label: 'PROJETS', href: '/projets', isActive: false },
  { label: 'CONTACT', href: '/contact', isActive: false }
]

export default async function HomePage(): Promise<React.JSX.Element> {
  return (
    <>
      <Header navigationItems={navigationItems} />
      <main role="main">
        <HeroSection 
          title="WE MAKE ONLY AUTHENTIC DIGITAL EXPERIENCES"
          backgroundText="mary"
          ctaText="VIEW MORE"
          ctaHref="#portfolio"
        />
        
        {/* Future sections will be added here */}
        <section id="portfolio" className="sr-only">
          <h2>Portfolio section coming soon</h2>
        </section>
      </main>
    </>
  );
}
