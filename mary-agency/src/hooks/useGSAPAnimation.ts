import { useRef, useEffect } from 'react'
import { gsap as gsapLib } from '@/lib/animations/gsap-config'

export function useGSAPAnimation<T extends HTMLElement = HTMLElement>(
  animationCallback: (element: T, gsap: typeof gsapLib) => void,
  dependencies: React.DependencyList = []
): React.RefObject<T | null> {
  const elementRef = useRef<T>(null)
  
  useEffect(() => {
    if (!elementRef.current) return
    
    const ctx = gsapLib.context(() => {
      animationCallback(elementRef.current!, gsapLib)
    }, elementRef)
    
    return () => ctx.revert()
  }, dependencies)
  
  return elementRef
}