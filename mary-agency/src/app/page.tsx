import Header from '@/components/common/Header'
import { INavigationItem } from '@/types'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Mary Agency - Header Development',
  description: 'Header bar development for Mary Agency website',
}

const navigationItems: INavigationItem[] = [
  { label: 'ACCUEIL', href: '/', isActive: true },
  { label: 'AGENCE', href: '/agence', isActive: false },
  { label: 'PROJETS', href: '/projets', isActive: false },
  { label: 'CONTACT', href: '/contact', isActive: false },
]

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black">
      <Header navigationItems={navigationItems} />

      {/* Temporary content to see header positioning */}
      <div className="pt-32 px-8 text-white">
        <h1 className="text-4xl font-bold text-center">
          Header Bar Development
        </h1>
        <p className="text-center mt-4 text-white/60">
          Focus: Perfecting the header layout according to landing.png mockup
        </p>
      </div>
    </div>
  )
}
