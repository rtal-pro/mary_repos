'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IMobileDrawerProps } from './MobileDrawer.types'

export default function MobileDrawer({
  isOpen,
  onClose,
  navigationItems,
  className
}: IMobileDrawerProps): React.JSX.Element {

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed top-20 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-30',
          'transition-all duration-700 ease-in-out',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 max-w-[85vw] bg-black z-40',
          'flex flex-col transition-transform duration-700 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <div className="text-left">
            <div className="text-2xl font-display font-bold text-white tracking-tight leading-none">
              mary
            </div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1 font-sans">
              BUSINESS GRAPHIC
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav 
          className="flex-1 px-8 py-12"
          role="navigation"
          aria-label="Navigation mobile principale"
        >
          <ul className="space-y-8" role="menubar" aria-orientation="vertical">
            {navigationItems.map((item, index) => (
              <li
                key={item.href}
                role="none"
                className={cn(
                  'transform transition-all duration-500 ease-in-out',
                  isOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-8 opacity-0'
                )}
                style={{ 
                  transitionDelay: isOpen ? `${200 + index * 100}ms` : '0ms' 
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  role="menuitem"
                  aria-current={item.isActive ? 'page' : undefined}
                  className={cn(
                    'block text-2xl font-condensed font-semibold uppercase tracking-wider',
                    'transition-colors duration-300 leading-tight',
                    'hover:text-white',
                    item.isActive 
                      ? 'text-white' 
                      : 'text-white/70'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <footer className="p-8 border-t border-white/10" role="contentinfo">
          <address className="text-white/40 text-sm font-sans not-italic">
            <p className="mb-2">231 Rue Saint-Honoré</p>
            <p className="mb-2">75001 Paris, France</p>
            <p>
              <a 
                href="tel:+33658773330" 
                className="hover:text-white transition-colors"
                aria-label="Appeler Mary Agency"
              >
                +33 6 58 77 33 30
              </a>
            </p>
          </address>
        </footer>
      </div>
    </>
  )
}