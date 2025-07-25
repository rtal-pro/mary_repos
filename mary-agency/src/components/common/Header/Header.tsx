'use client'

import React from 'react'
import Link from 'next/link'
import { IHeaderProps } from './Header.types'
import { cn } from '@/lib/utils'

export default function Header({ 
  navigationItems, 
  className 
}: IHeaderProps): React.JSX.Element {

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-transparent',
        className
      )}
    >
      <div className="relative w-full px-8 py-4 md:px-12 md:py-6">
        
        {/* Logo - Full Left */}
        <Link 
          href="/" 
          className="absolute left-8 top-4 md:left-12 md:top-6"
        >
          <div className="text-left">
            <div className="text-3xl font-display font-bold text-white tracking-tight leading-none">
              mary
            </div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1 font-sans">
              BUSINESS GRAPHIC
            </div>
          </div>
        </Link>

        {/* Navigation - Center */}
        <nav className="hidden md:flex justify-center items-end h-full">
          <ul className="flex items-baseline space-x-12">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative text-lg uppercase tracking-wider font-semibold transition-colors duration-300',
                    'font-condensed leading-tight',
                    'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300',
                    'hover:after:w-full',
                    item.isActive 
                      ? 'text-white after:w-full' 
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu - Right */}
        <div className="absolute right-8 top-4 md:right-12 md:top-6">
          <button className="md:hidden flex flex-col space-y-1.5">
            <span className="w-7 h-px bg-white"></span>
            <span className="w-7 h-px bg-white"></span>
            <span className="w-7 h-px bg-white"></span>
          </button>
        </div>
        
      </div>
    </header>
  )
}