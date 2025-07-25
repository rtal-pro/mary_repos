'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { IHeroSectionProps } from './HeroSection.types'
import { cn } from '@/lib/utils'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-config'

export default function HeroSection({
  title,
  backgroundText = 'mary',
  ctaText = 'VIEW MORE',
  ctaHref = '#portfolio',
  backgroundImage,
  className
}: IHeroSectionProps): React.JSX.Element {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const backgroundTextRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      // Timeline for coordinated animations
      const tl = gsap.timeline()

      // Animate background image with zoom effect
      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1.1 })
        tl.to(imageRef.current, {
          scale: 1,
          duration: 2,
          ease: 'power2.out'
        }, 0)
      }

      // Split and animate title text
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || ''
        const words = titleText.split(' ')
        titleRef.current.innerHTML = words
          .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
          .join(' ')

        const wordSpans = titleRef.current.querySelectorAll('span span')
        
        gsap.set(wordSpans, { y: '100%' })
        tl.to(wordSpans, {
          y: '0%',
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
        }, 0.5)
      }

      // Animate background text with parallax
      if (backgroundTextRef.current) {
        gsap.set(backgroundTextRef.current, { y: 50, opacity: 0 })
        tl.to(backgroundTextRef.current, {
          y: 0,
          opacity: 0.1,
          duration: 1.5,
          ease: 'power2.out'
        }, 0.8)
      }

      // Animate CTA button
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 30, opacity: 0 })
        tl.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }, 1.2)
      }

      // Add scroll-triggered parallax for background text
      if (backgroundTextRef.current) {
        gsap.to(backgroundTextRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        })
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={heroRef}
      role="banner"
      aria-label="Hero section showcasing Mary Agency's premium digital experiences"
      className={cn(
        'relative h-screen flex items-center justify-center overflow-hidden',
        'bg-black text-white',
        className
      )}
    >
      {/* Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        role="img"
        aria-label="Creative artistic background representing Mary Agency's authentic digital experiences"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      {/* Background Text */}
      <div 
        ref={backgroundTextRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-display font-bold text-white/10 select-none">
          {backgroundText}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide mb-8 leading-tight"
        >
          <span className="sr-only">Mary Agency - </span>
          {title}
        </h1>

        <Link
          ref={ctaRef}
          href={ctaHref}
          aria-label={`${ctaText} - Explore Mary Agency's portfolio and services`}
          className={cn(
            'inline-block px-8 py-4 border-2 border-white text-white',
            'uppercase tracking-wider text-sm font-medium',
            'hover:bg-white hover:text-black transition-all duration-300',
            'transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
            'focus:scale-105'
          )}
        >
          {ctaText}
          <span className="sr-only"> - View our portfolio</span>
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        role="img"
        aria-label="Scroll down indicator"
      >
        <div className="flex flex-col items-center">
          <div className="w-px h-16 bg-white/60 mb-4 animate-pulse" aria-hidden="true" />
          <span className="text-white/60 text-xs uppercase tracking-wider rotate-90 origin-center">
            <span className="sr-only">Scroll down to see more content</span>
            <span aria-hidden="true">Scroll</span>
          </span>
        </div>
      </div>
    </section>
  )
}