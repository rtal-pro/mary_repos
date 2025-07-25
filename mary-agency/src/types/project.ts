export interface IProject {
  id: string
  title: string
  slug: string
  description?: string
  category: 'creation' | 'digital' | 'film' | 'web'
  featured_image: string
  images: string[]
  client?: string
  year?: number
  services: string[]
  order_index: number
  published: boolean
  created_at: string
  updated_at: string
}