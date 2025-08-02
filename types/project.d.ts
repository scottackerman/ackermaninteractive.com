export interface Project {
  slug: string
  title: string
  shortDescription: string
  heroImage: string
  heroAltText?: string
  category: string[]
  priority?: number
  date?: string
  relatedTags?: string[]
  related?: string[]
}

export interface FeaturedData {
  default: string[]
  [category: string]: string[]
}
