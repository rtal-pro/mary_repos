// Design tokens for Mary Agency - Following CLAUDE.md specifications

export const colors = {
  primary: '#000000',
  secondary: '#FFFFFF',
  accent: '#0066CC',
  gray: {
    100: '#F5F5F5',
    300: '#E0E0E0',
    500: '#9E9E9E',
    700: '#666666',
  }
} as const

export const typography = {
  fonts: {
    sans: '"Helvetica Neue", Arial, sans-serif',
    display: '"Playfair Display", serif',
  },
  sizes: {
    hero: 'clamp(3rem, 8vw, 6rem)',
    section: 'clamp(2rem, 5vw, 3.5rem)',
    body: '1rem',
    small: '0.875rem',
  }
} as const

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  lg: '4rem',
  xl: '6rem',
  '2xl': '8rem',
} as const

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const

export const animations = {
  durations: {
    fast: '0.2s',
    normal: '0.5s',
    slow: '1s',
  },
  easings: {
    linear: 'linear',
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
} as const