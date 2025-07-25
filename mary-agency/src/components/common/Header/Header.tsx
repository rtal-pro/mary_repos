'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IHeaderProps } from './Header.types'
import { cn } from '@/lib/utils'
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation'

export default function Header({ 
  navigationItems, 
  isTransparent = true, 
  className 
}: IHeaderProps): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const headerRef = useGSAPAnimation<HTMLElement>((element, gsap) => {
    gsap.from(element, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    })
  }, [])

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleMobileMenu()
    }
  }

  return (
    <header 
      ref={headerRef}
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled || !isTransparent
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="Mary Agency - Premium Communication Agency Paris - Home"
            className="text-2xl font-display font-bold tracking-wide text-black hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm"
          >
            <span className="sr-only">Mary Agency - Home</span>
            mary
          </Link>

          {/* Desktop Navigation */}
          <nav 
            role="navigation" 
            aria-label="Main navigation"
            className="hidden md:flex items-center space-x-8"
          >
            <ul role="menubar" className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={item.isActive ? 'page' : undefined}
                    className={cn(
                      'text-sm uppercase tracking-wider font-medium transition-all duration-300',
                      'hover:text-accent relative focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2 py-1',
                      'after:absolute after:bottom-0 after:left-2 after:right-2 after:w-auto after:h-0.5',
                      'after:bg-accent after:transition-all after:duration-300',
                      'hover:after:w-auto',
                      item.isActive ? 'text-accent after:w-auto' : 'text-black after:w-0'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            onKeyDown={handleKeyDown}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            type="button"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span 
              className={cn(
                'w-6 h-0.5 bg-black transition-all duration-300',
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              )}
              aria-hidden="true"
            />
            <span 
              className={cn(
                'w-6 h-0.5 bg-black transition-all duration-300',
                isMobileMenuOpen ? 'opacity-0' : ''
              )}
              aria-hidden="true"
            />
            <span 
              className={cn(
                'w-6 h-0.5 bg-black transition-all duration-300',
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav 
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation"
          className={cn(
            'md:hidden mt-4 pt-4 border-t border-gray-200 transition-all duration-300',
            isMobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul role="menu" className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={item.isActive ? 'page' : undefined}
                  className={cn(
                    'block py-3 px-2 text-sm uppercase tracking-wider font-medium transition-colors rounded-sm',
                    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                    item.isActive ? 'text-accent bg-accent/10' : 'text-black hover:text-accent hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}