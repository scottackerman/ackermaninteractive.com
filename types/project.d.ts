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

export type FeaturedData = Record<string, string[]>