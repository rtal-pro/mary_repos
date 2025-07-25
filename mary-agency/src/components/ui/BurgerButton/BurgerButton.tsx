'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { IBurgerButtonProps } from './BurgerButton.types'

export default function BurgerButton({
  isOpen,
  onClick,
  className,
  size = 'medium'
}: IBurgerButtonProps): React.JSX.Element {
  
  const sizeClasses = {
    small: 'w-5 h-4',
    medium: 'w-7 h-6',
    large: 'w-9 h-7'
  }
  
  const barClasses = {
    small: 'h-0.5',
    medium: 'h-px',
    large: 'h-0.5'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col justify-center items-center',
        'transition-all duration-300 ease-out',
        'hover:scale-105 focus:outline-none focus:scale-105',
        sizeClasses[size],
        className
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {/* Top Bar */}
      <span
        className={cn(
          'absolute bg-white transition-all duration-300 ease-out origin-center',
          barClasses[size],
          sizeClasses[size].split(' ')[0], // width only
        )}
        style={{
          transform: isOpen 
            ? 'translateY(0) rotate(45deg)' 
            : 'translateY(-8px) rotate(0deg)'
        }}
      />
      
      {/* Bottom Bar */}
      <span
        className={cn(
          'absolute bg-white transition-all duration-300 ease-out origin-center',
          barClasses[size],
          sizeClasses[size].split(' ')[0], // width only
        )}
        style={{
          transform: isOpen 
            ? 'translateY(0) rotate(-45deg)' 
            : 'translateY(8px) rotate(0deg)'
        }}
      />
    </button>
  )
}