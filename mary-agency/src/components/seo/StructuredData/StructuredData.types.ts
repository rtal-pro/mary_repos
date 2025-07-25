export interface IOrganizationStructuredDataProps {
  name?: string
  alternateName?: string
  url?: string
  logo?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion?: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: string
    longitude: string
  }
  openingHours?: {
    dayOfWeek: string[]
    opens: string
    closes: string
  }
  sameAs?: string[]
}

export interface ILocalBusinessStructuredDataProps extends IOrganizationStructuredDataProps {
  serviceArea?: {
    latitude: string
    longitude: string
    radius: string
  }
  priceRange?: string
  aggregateRating?: {
    ratingValue: string
    ratingCount: string
  }
}