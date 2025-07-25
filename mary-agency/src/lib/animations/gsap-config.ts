import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
  
  // Global defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 1
  })
}

export { gsap, ScrollTrigger, TextPlugin }