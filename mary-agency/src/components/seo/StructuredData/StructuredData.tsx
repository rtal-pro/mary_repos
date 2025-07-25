import React from 'react'
import { IOrganizationStructuredDataProps, ILocalBusinessStructuredDataProps } from './StructuredData.types'

export function OrganizationStructuredData({
  name = 'Mary Agency',
  alternateName = 'Mary Business Graphic',
  url = 'https://marybusinessgraphic.com',
  logo = 'https://marybusinessgraphic.com/logo.png',
  telephone = '+33-6-58-77-33-30',
  email = 'contact@marybusinessgraphic.com',
  address = {
    streetAddress: '231 Rue Saint-Honoré',
    addressLocality: 'Paris',
    addressRegion: 'Île-de-France',
    postalCode: '75001',
    addressCountry: 'FR'
  },
  geo = {
    latitude: '48.8651',
    longitude: '2.3297'
  },
  openingHours = {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  sameAs = [
    'https://www.instagram.com/maryagency',
    'https://www.linkedin.com/company/maryagency',
    'https://www.facebook.com/maryagency',
    'https://twitter.com/maryagency'
  ]
}: IOrganizationStructuredDataProps): React.JSX.Element {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    alternateName,
    url,
    logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
      availableLanguage: ['French', 'English']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: openingHours.dayOfWeek,
      opens: openingHours.opens,
      closes: openingHours.closes
    },
    sameAs
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function LocalBusinessStructuredData({
  name = 'Mary Agency',
  alternateName = 'Mary Business Graphic',
  url = 'https://marybusinessgraphic.com',
  logo = 'https://marybusinessgraphic.com/logo.png',
  telephone = '+33-6-58-77-33-30',
  email = 'contact@marybusinessgraphic.com',
  address = {
    streetAddress: '231 Rue Saint-Honoré',
    addressLocality: 'Paris',
    addressRegion: 'Île-de-France',
    postalCode: '75001',
    addressCountry: 'FR'
  },
  geo = {
    latitude: '48.8651',
    longitude: '2.3297'
  },
  serviceArea = {
    latitude: '48.8566',
    longitude: '2.3522',
    radius: '50000'
  },
  priceRange = '€€€',
  aggregateRating,
  sameAs = [
    'https://www.instagram.com/maryagency',
    'https://www.linkedin.com/company/maryagency',
    'https://www.facebook.com/maryagency',
    'https://twitter.com/maryagency'
  ]
}: ILocalBusinessStructuredDataProps): React.JSX.Element {
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    alternateName,
    url,
    logo,
    image: logo,
    telephone,
    email,
    priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: serviceArea.latitude,
        longitude: serviceArea.longitude
      },
      geoRadius: serviceArea.radius
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs
  }

  if (aggregateRating) {
    structuredData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      ratingCount: aggregateRating.ratingCount
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({
  url = 'https://marybusinessgraphic.com',
  name = 'Mary Agency',
  alternateName = 'Mary Business Graphic'
}: {
  url?: string
  name?: string
  alternateName?: string
}): React.JSX.Element {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    alternateName,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}