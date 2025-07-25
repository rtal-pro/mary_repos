# Claude Code Configuration - Mary Agency

## Project Overview

You are building a premium communication agency website called "Mary Agency" using Next.js 14, TypeScript, Supabase, and Docker. The site requires sophisticated animations and a luxury aesthetic with exceptional code quality.

## Strict Coding Rules

### 1. Component Rules

- **Maximum 150 lines per component** - Split larger components into smaller sub-components
- **One component per file** - No multiple exports
- **Descriptive names** - Use full words, no abbreviations (e.g., `NavigationMenu` not `NavMenu`)
- **Props interface always defined** - Even for components with no props
- **Default props where applicable** - Provide sensible defaults

### 2. TypeScript Rules

```typescript
// ❌ NEVER DO THIS
const handleClick = (e: any) => { }
const data = response as SomeType

// ✅ ALWAYS DO THIS
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { }
const data = response satisfies SomeType
```

- **No `any` type ever** - Use `unknown` and type guards if needed
- **Explicit return types** for all functions
- **Interfaces over types** for object shapes
- **Enums for constants** with string values
- **Strict null checks** - Handle all nullable values

### 3. File Structure Rules

```
components/
  ComponentName/
    ComponentName.tsx      // Main component
    ComponentName.types.ts // Types/interfaces
    ComponentName.styles.ts // Styled components or style objects
    ComponentName.test.tsx // Tests
    index.ts              // Re-export
```

### 4. Naming Conventions

- **Components**: PascalCase (`HeroSection`, `ProjectCard`)
- **Hooks**: camelCase with 'use' prefix (`useScrollAnimation`)
- **Utilities**: camelCase (`formatDate`, `validateEmail`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase with 'I' prefix for interfaces (`IProject`, `IContactForm`)

### 5. Code Readability Rules

```typescript
// ❌ AVOID
const d = projects.filter(p => p.f && p.c === 'web').map(p => ({...p, n: p.t.toUpperCase()}))

// ✅ PREFER
const webProjects = projects
  .filter(project => project.featured && project.category === 'web')
  .map(project => ({
    ...project,
    displayName: project.title.toUpperCase()
  }));
```

- **Descriptive variable names** - No single letters except loop indices
- **Comments for complex logic** - Explain WHY, not WHAT
- **Consistent spacing** - Empty lines between logical blocks
- **Early returns** to reduce nesting
- **Destructuring** for cleaner code

## Next.js 14 Best Practices

### 1. App Router Structure

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx - Server Component by default
export default async function HomePage(): Promise<JSX.Element> {
  const projects = await getProjects() // Server-side data fetching
  return <HomePageClient projects={projects} />
}
```

### 2. Server vs Client Components

```typescript
// 'use client' only when needed for:
// - useState, useEffect, useContext
// - onClick, onChange handlers
// - Browser APIs
// - GSAP animations

// components/sections/HeroSection.tsx
'use client' // Required for GSAP

// components/ui/Card.tsx
// No 'use client' - can be server component
```

### 3. Data Fetching Patterns

```typescript
// Server Actions (app/actions/contact.ts)
'use server'

export async function submitContactForm(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  // Validate and process
}

// Route Handlers (app/api/projects/route.ts)
export async function GET(request: Request): Promise<Response> {
  // Handle API requests
}
```

### 4. Image Optimization

```typescript
import Image from 'next/image'

// Always use Next.js Image component
<Image
  src="/hero-image.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

## Animation Architecture

### GSAP Configuration

```typescript
// lib/animations/gsap-config.ts
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
```

### Animation Patterns

```typescript
// hooks/useGSAPAnimation.ts
export function useGSAPAnimation<T extends HTMLElement = HTMLElement>(
  animationCallback: (element: T, gsap: typeof GSAP) => void,
  dependencies: React.DependencyList = []
): React.RefObject<T> {
  const elementRef = useRef<T>(null)
  
  useEffect(() => {
    if (!elementRef.current) return
  
    const ctx = gsap.context(() => {
      animationCallback(elementRef.current!, gsap)
    }, elementRef)
  
    return () => ctx.revert()
  }, dependencies)
  
  return elementRef
}
```

## Site Structure Reference

### Pages

- **/** - Homepage with all sections
- **/agence** - About/Agency page
- **/projets** - Projects listing
- **/projets/[slug]** - Project detail
- **/contact** - Contact page

### Key Sections (Homepage)

1. **HeroSection** - Full viewport with parallax text
2. **ServicesGrid** - 6 service cards with icons
3. **PortfolioGrid** - Filterable project gallery
4. **NewsSection** - Statistics and updates
5. **AboutSection** - Company story with team
6. **AwardsSection** - Recognition badges
7. **ContactSection** - Form and info

### Design Tokens

```typescript
// config/design-tokens.ts
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
```

## Component Examples

### Example: Section Title Component

```typescript
// components/ui/SectionTitle/SectionTitle.types.ts
export interface ISectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  animate?: boolean
  className?: string
}

// components/ui/SectionTitle/SectionTitle.tsx
'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ISectionTitleProps } from './SectionTitle.types'
import { cn } from '@/lib/utils'

export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
  animate = true,
  className
}: ISectionTitleProps): JSX.Element {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  
  useEffect(() => {
    if (!animate || !titleRef.current) return
  
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      })
  
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 80%',
          }
        })
      }
    })
  
    return () => ctx.revert()
  }, [animate])
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  
  return (
    <div className={cn(
      'mb-12',
      alignmentClasses[align],
      className
    )}>
      <h2 
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold uppercase tracking-wide"
      >
        {title}
      </h2>
  
      {subtitle && (
        <p 
          ref={subtitleRef}
          className="mt-4 text-gray-700 text-lg"
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// components/ui/SectionTitle/index.ts
export { default } from './SectionTitle'
export type { ISectionTitleProps } from './SectionTitle.types'
```

## Animation Requirements

### Required GSAP Animations

1. **Text Reveal** - Split text with staggered letter animation
2. **Scroll Fade** - Elements fade in on scroll
3. **Parallax** - Background elements move at different speeds
4. **Counter** - Number animations for statistics
5. **Hover Effects** - Smooth transitions on interaction
6. **Page Transitions** - Smooth routing animations

### Performance Considerations

- Use `will-change` sparingly
- Implement `ScrollTrigger.refresh()` on dynamic content
- Batch DOM reads/writes
- Use CSS transforms over position changes
- Implement progressive enhancement

## Supabase Schema

```sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100) CHECK (category IN ('creation', 'digital', 'film', 'web')),
  featured_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  client VARCHAR(255),
  year INTEGER CHECK (year >= 2000 AND year <= 2100),
  services TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_published ON projects(published);
```

## Error Handling

```typescript
// Always handle errors gracefully
export async function getProjects(): Promise<IProject[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })
  
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  
    return data || []
  } catch (error) {
    console.error('Unexpected error:', error)
    return []
  }
}
```

## Testing Requirements

```typescript
// Every component should have tests
describe('SectionTitle', () => {
  it('renders title correctly', () => {
    render(<SectionTitle title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
  
  it('applies correct alignment class', () => {
    const { container } = render(
      <SectionTitle title="Test" align="center" />
    )
    expect(container.firstChild).toHaveClass('text-center')
  })
})
```

## Docker Development Rules

### Development Environment

**ALWAYS use Docker for development with hot reload:**

```bash
# Quick start development with hot reload
npm run docker:dev

# Or use the enhanced script
npm run docker:dev:script

# Stop development environment
npm run docker:dev:down
```

### Docker Configuration Requirements

```dockerfile
# Dockerfile.dev - Development with hot reload
FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Environment variables for hot reload
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
```

### Docker Compose Development

```yaml
# docker-compose.dev.yml
services:
  app-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app              # Mount source for hot reload
      - /app/node_modules   # Exclude node_modules
      - /app/.next          # Exclude .next cache
    environment:
      - NODE_ENV=development
      - WATCHPACK_POLLING=true
      - CHOKIDAR_USEPOLLING=true
```

### Next.js Docker Configuration

```typescript
// next.config.ts - Docker-optimized
const nextConfig: NextConfig = {
  // Conditional output for production
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
  
  // Webpack hot reload for Docker
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,           // Check every second
        aggregateTimeout: 300  // Wait 300ms after change
      }
    }
    return config
  }
}
```

### Docker Scripts Requirements

**Every project MUST have these scripts:**

```json
{
  "scripts": {
    "docker:dev": "docker-compose -f docker-compose.dev.yml up --build",
    "docker:dev:down": "docker-compose -f docker-compose.dev.yml down",
    "docker:prod": "docker-compose up --build",
    "docker:prod:down": "docker-compose down",
    "docker:clean": "docker system prune -a --volumes"
  }
}
```

### Hot Reload Troubleshooting

**Common issues and solutions:**

1. **Hot reload not working:**
   ```bash
   # Verify polling is enabled
   docker exec -it container_name env | grep WATCH
   
   # Check file permissions
   chmod -R 755 src/
   ```

2. **Performance issues:**
   ```typescript
   // Increase polling interval
   config.watchOptions = {
     poll: 2000,
     aggregateTimeout: 500
   }
   ```

3. **Port conflicts:**
   ```yaml
   # Change host port
   ports:
     - "3001:3000"
   ```

### Docker Best Practices

- **Use .dockerignore** to exclude unnecessary files
- **Multi-stage builds** for production optimization
- **Volume mounting** for development hot reload
- **Non-root user** for security
- **Health checks** for monitoring
- **Separate configs** for dev/prod environments

## Git Commit Convention

```bash
# Format: <type>(<scope>): <subject>

feat(hero): add parallax animation to background text
fix(navigation): resolve mobile menu z-index issue
style(global): update typography scale for better readability
refactor(portfolio): split PortfolioGrid into smaller components
test(contact): add validation tests for contact form
docs(readme): update setup instructions for Docker
docker(dev): add hot reload support for development environment
```

## SEO Excellence Rules

### 1. Meta Tags & Structured Data

**Every page MUST have:**

```typescript
// app/layout.tsx or page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mary Agency - Authentic Digital Experiences | Premium Communication Agency',
  description: 'Leading communication agency in Paris specializing in digital creation, film production, and web development. Crafting authentic brand experiences since 2015.',
  keywords: ['communication agency', 'digital creation', 'film production', 'web development', 'Paris', 'branding'],
  authors: [{ name: 'Mary Agency' }],
  creator: 'Mary Agency',
  publisher: 'Mary Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://marybusinessgraphic.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Mary Agency - Authentic Digital Experiences',
    description: 'Leading communication agency specializing in digital creation and authentic brand experiences.',
    url: 'https://marybusinessgraphic.com',
    siteName: 'Mary Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mary Agency - Premium Communication Agency',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mary Agency - Authentic Digital Experiences',
    description: 'Leading communication agency specializing in digital creation.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

**Structured Data (JSON-LD):**

```typescript
// components/seo/StructuredData.tsx
export function OrganizationStructuredData(): React.JSX.Element {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mary Agency",
    "alternateName": "Mary Business Graphic",
    "url": "https://marybusinessgraphic.com",
    "logo": "https://marybusinessgraphic.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-6-58-77-33-30",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "231 Rue Saint-Honoré",
      "addressLocality": "Paris",
      "postalCode": "75001",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.instagram.com/maryagency",
      "https://www.linkedin.com/company/maryagency"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### 2. Semantic HTML Requirements

**Every component MUST use semantic HTML:**

```typescript
// ❌ NEVER DO THIS
<div className="header">
  <div className="nav">
    <div className="logo">Mary</div>
    <div className="menu">...</div>
  </div>
</div>

// ✅ ALWAYS DO THIS
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <div className="logo">
      <Link href="/" aria-label="Mary Agency - Home">Mary</Link>
    </div>
    <ul role="menubar">...</ul>
  </nav>
</header>
```

**Required semantic elements:**
- `<header>` for site/section headers
- `<nav>` for navigation menus
- `<main>` for main content area
- `<section>` for distinct sections
- `<article>` for standalone content
- `<aside>` for sidebar content
- `<footer>` for site/section footers
- `<h1>` through `<h6>` in hierarchical order

### 3. Image Optimization Rules

```typescript
// Every image MUST be optimized
import Image from 'next/image'

// ✅ PROPER IMAGE IMPLEMENTATION
<Image
  src="/hero-image.jpg"
  alt="Mary Agency creative team working on authentic digital experiences"
  width={1920}
  height={1080}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  loading={isAboveFold ? 'eager' : 'lazy'}
/>
```

**Image Requirements:**
- WebP format with JPEG fallback
- Responsive sizing with `sizes` attribute
- Descriptive `alt` text (not just filename)
- Blur-up placeholder for smooth loading
- `priority` for above-the-fold images
- Proper `width` and `height` to prevent CLS

### 4. URL Structure & Navigation SEO

```typescript
// URL structure MUST be clean and descriptive
// ✅ GOOD URLs
/agence
/projets
/projets/branding-luxury-hotel
/contact

// ❌ BAD URLs
/page1
/p?id=123
/project.php?type=branding&id=456
```

**Navigation SEO Rules:**
- Breadcrumb navigation on all pages
- XML sitemap auto-generation
- Clean URL structure
- Proper internal linking
- Canonical URLs to prevent duplicates

### 5. Performance SEO Requirements

```typescript
// Core Web Vitals optimization
export const webVitalsConfig = {
  // Largest Contentful Paint: < 2.5s
  LCP: {
    target: 2500,
    optimizations: [
      'Preload hero images',
      'Optimize font loading',
      'Critical CSS inlining'
    ]
  },
  // First Input Delay: < 100ms
  FID: {
    target: 100,
    optimizations: [
      'Code splitting',
      'Reduce JavaScript execution time',
      'Use passive event listeners'
    ]
  },
  // Cumulative Layout Shift: < 0.1
  CLS: {
    target: 0.1,
    optimizations: [
      'Set image dimensions',
      'Reserve space for ads/embeds',
      'Avoid inserting content above existing content'
    ]
  }
}
```

### 6. Content SEO Rules

**Heading Hierarchy:**
```typescript
// ✅ PROPER HEADING STRUCTURE
<h1>Mary Agency - Authentic Digital Experiences</h1>
  <h2>Our Services</h2>
    <h3>Digital Creation</h3>
    <h3>Film Production</h3>
  <h2>Our Portfolio</h2>
    <h3>Luxury Branding Projects</h3>

// ❌ NEVER SKIP HEADING LEVELS
<h1>Main Title</h1>
<h4>Subtitle</h4> // Missing h2, h3
```

**Content Requirements:**
- One `<h1>` per page
- Descriptive, keyword-rich headings
- Alt text for all images
- Internal linking with descriptive anchor text
- Content length: minimum 300 words per page
- Keyword density: 1-2% (natural integration)

### 7. Technical SEO Implementation

```typescript
// robots.txt generation
// app/robots.txt/route.ts
export function GET(): Response {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://marybusinessgraphic.com/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  )
}

// Sitemap generation
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://marybusinessgraphic.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://marybusinessgraphic.com/agence',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://marybusinessgraphic.com/projets',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ]
}
```

### 8. Local SEO Requirements (Paris Agency)

```typescript
// Local business structured data
const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Mary Agency",
  "image": "https://marybusinessgraphic.com/mary-agency-paris.jpg",
  "telephone": "+33-6-58-77-33-30",
  "email": "contact@marybusinessgraphic.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "231 Rue Saint-Honoré",
    "addressLocality": "Paris",
    "addressRegion": "Île-de-France",
    "postalCode": "75001",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8651",
    "longitude": "2.3297"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "geoRadius": "50000"
  }
}
```

### 9. Accessibility SEO Integration

```typescript
// Accessibility directly impacts SEO
export interface IAccessibleComponentProps {
  // ARIA attributes
  ariaLabel?: string
  ariaDescribedBy?: string
  ariaLabelledBy?: string
  role?: string
  
  // Keyboard navigation
  tabIndex?: number
  onKeyDown?: (event: React.KeyboardEvent) => void
  
  // Screen reader support
  srOnly?: string // Screen reader only text
}

// Example implementation
<button
  aria-label="Open navigation menu"
  aria-expanded={isMenuOpen}
  aria-controls="main-navigation"
  onClick={toggleMenu}
  onKeyDown={handleKeyDown}
>
  <span className="sr-only">Menu</span>
  <HamburgerIcon />
</button>
```

### 10. SEO Monitoring & Testing

```typescript
// Required SEO testing checklist for every component:
const seoChecklist = [
  'Valid HTML5 markup',
  'Proper heading hierarchy',
  'Alt text for all images',
  'ARIA labels where needed',
  'Keyboard navigation',
  'Color contrast ratio > 4.5:1',
  'Mobile-friendly design',
  'Fast loading times (<3s)',
  'No console errors',
  'Structured data validation'
]

// Use these tools for validation:
// - Google Lighthouse
// - Google Search Console
// - Wave Web Accessibility Evaluator
// - HTML5 Validator
// - Schema.org Validator
```

## Remember

1. **Components should be self-contained** - Props in, JSX out
2. **Animations should be progressive** - Site works without JS
3. **TypeScript is your friend** - Let it help catch errors
4. **Mobile-first responsive** - Design for small screens first
5. **Accessibility matters** - ARIA labels, keyboard navigation
6. **Performance is UX** - Lazy load, optimize, measure
7. **SEO is built-in** - Every component follows SEO best practices
8. **Content is king** - Semantic HTML and descriptive text always
9. **Local SEO matters** - Optimize for Paris and French market
10. **Test everything** - Use tools to validate SEO implementation

# Mary Agency - Complete Site Structure Analysis & Implementation Guide

## 1. Site Architecture Overview

### Primary Pages

* **Accueil** (Home) - Main landing page with all sections
* **Agence** (Agency) - About page
* **Projets** (Projects) - Portfolio showcase
* **Contact** - Contact form and information

### Navigation Structure

* Fixed header with transparent background on hero
* Transforms to solid background on scroll
* Hamburger menu for mobile
* Logo placement: top-left

## 2. Homepage Sections Breakdown

### Section 1: Hero Section

**Layout:** Full viewport height with overlay text
**Components:**

* Logo (mary)
* Navigation menu (ACCUEIL, AGENCE, PROJETS, CONTACT)
* Hero headline: "WE MAKE ONLY AUTHENTIC DIGITAL EXPERIENCES"
* Large background text: "mary" (decorative)
* CTA Button: "VIEW MORE"
* Background: Artistic photography with motion blur effect

**Animations (GSAP):**

* Text reveal: Staggered letter/word animation on load
* Background text: Subtle parallax on scroll
* Image: Ken Burns effect or subtle zoom
* Navigation: Fade in from top
* CTA button: Fade up with hover effects

### Section 2: Services/Features Grid

**Layout:** 6-column grid with icon-based cards
**Components:**

* Icon cards with:
  * Custom icons
  * Service titles
  * Short descriptions

**Animations:**

* Scroll-triggered fade-in
* Staggered appearance for each card
* Hover: Scale and shadow effects

### Section 3: Portfolio Grid

**Layout:** Masonry/Grid layout (2-3 columns)
**Components:**

* Project thumbnails with:
  * Overlay on hover
  * Project title
  * Category tag
  * View project link

**Featured Projects:**

* Foie d'Alsace (Food/Product)
* Various lifestyle/commercial photography
* Product showcases

**Animations:**

* Parallax scrolling for alternating columns
* Hover: Overlay slide-up with project details
* Click: Smooth transition to project page

### Section 4: News/Updates Section

**Layout:** Dark background with statistics
**Components:**

* Title: "NEWS..."
* Statistics cards:
  * "MAKE SOMETHING OUT OF YOUR GREAT IDEAS" (260)
  * "THE BEST BRANDING COMPANY OF 2018" (100)
  * Other achievement metrics

**Animations:**

* Number counter animation on scroll
* Text reveal animations
* Background gradient animation

### Section 5: About/Work Section ("NOTRE TRAVAIL")

**Layout:** Split layout with text and image
**Components:**

* Section title
* Descriptive paragraphs
* Team member feature with:
  * Photo (artistic black & white)
  * Name and role
  * Bio text
* Stats/metrics sidebar

**Animations:**

* Image parallax effect
* Text fade-in on scroll
* Stats counter animation

### Section 6: Awards/Recognition ("RECOMPENSES")

**Layout:** Grid of achievement cards
**Components:**

* Award logos/badges
* Achievement descriptions
* Year/date stamps

### Section 7: Footer

**Layout:** Multi-column with contact info
**Components:**

* Newsletter signup form
* Contact information
* Social media links (Instagram, Facebook, Twitter, LinkedIn)
* Copyright notice
* Agency tagline

## 3. Component Library Requirements

### Typography Components

```
- H1: Hero headlines (bold, uppercase)
- H2: Section titles (medium weight)
- H3: Subsection titles
- Body: Regular paragraph text
- Caption: Small text for metadata
```

### UI Components

```
- Button (primary/secondary variants)
- Navigation menu (desktop/mobile)
- Project card
- Service card
- Team member card
- Newsletter form
- Contact form
- Social media icons
- Loading states
- Page transitions
```

### Interactive Elements

```
- Hover effects (scale, color, overlay)
- Scroll indicators
- Progress bars
- Image galleries
- Video players (if needed)
- Cursor effects (custom cursor on hover)
```

## 4. Animation Strategy (GSAP Implementation)

### On Page Load

1. Logo fade in (0.5s)
2. Navigation slide down (0.7s)
3. Hero text staggered reveal (1s)
4. Background image zoom (1.5s)
5. CTA button fade up (1.2s)

### On Scroll (ScrollTrigger)

* Section reveals with fade and slight Y movement
* Parallax effects on images (-20% to 20% movement)
* Text animations triggered at 80% viewport
* Counter animations for statistics
* Staggered grid item reveals

### Hover Interactions

* Button: Scale 1.05 with shadow
* Project cards: Overlay slide with content reveal
* Navigation items: Underline animation
* Images: Slight zoom with overlay

## 5. Design System Specifications

### Colors

scss

```scss
$primary-black:#000000;
$primary-white:#FFFFFF;
$accent-gray:#F5F5F5;
$text-gray:#666666;
$hover-overlay:rgba(0,0,0,0.8);
```

### Typography

scss

```scss
// Likely custom or premium fonts
$font-primary:'Helvetica Neue', Arial, sans-serif;
$font-display:'Playfair Display', serif;// For elegant headers

// Font sizes
$text-hero:clamp(3rem,8vw,6rem);
$text-section:clamp(2rem,5vw,3.5rem);
$text-body:1rem;
$text-small:0.875rem;
```

### Spacing System

scss

```scss
$space-xs:0.5rem;
$space-sm:1rem;
$space-md:2rem;
$space-lg:4rem;
$space-xl:6rem;
$space-2xl:8rem;
```

### Grid System

* Container: max-width 1400px
* Columns: 12-column grid
* Gutters: 2rem
* Mobile: Single column
* Tablet: 2-column for portfolio
* Desktop: 3-4 columns for portfolio

## 7. Slider Requirements

Based on the design, you'll need:

* **Hero slider** (if multiple hero images)
* **Portfolio slider** for project showcases
* **Testimonial slider** (if included in inner pages)

Recommended: Use Swiper.js for better performance than Slider Revolution

## 8. Interactive Features

### Cursor Effects

* Custom cursor on desktop
* Hover state changes
* Magnetic effect on buttons

### Page Transitions

* Smooth fade between pages
* Loading animation overlay
* Progress indicator

### Scroll Features

* Smooth scrolling
* Scroll progress indicator
* Back to top button
* Parallax layers

## 9. Performance Considerations

### Image Optimization

* Use Next.js Image component
* Implement lazy loading
* WebP format with fallbacks
* Blur-up placeholders

### Animation Performance

* Use CSS transforms over position changes
* Implement will-change on animated elements
* Throttle scroll events
* Use requestAnimationFrame for smooth animations

## 10. Responsive Design Strategy

### Breakpoints

scss

```scss
$mobile:640px;
$tablet:768px;
$desktop:1024px;
$wide:1280px;
```

### Mobile Adaptations

* Hamburger menu
* Stacked portfolio grid
* Simplified animations
* Touch-friendly interactions
* Reduced parallax effects

This comprehensive structure gives you a clear roadmap for building the Mary agency website with all the sophisticated features expected from a high-end communication agency.
