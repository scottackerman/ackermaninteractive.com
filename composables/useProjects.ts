import { computed } from 'vue'
import type { Project, FeaturedData } from '~/types/project'

// Eager‑load all project metadata
const projectModules = import.meta.glob<{ default: Project }>(
  '~/data/work/*.json',
  { eager: true }
)
const allProjects: Project[] = Object.values(projectModules).map(m => m.default)

// Eager‑load featured.json
import featuredData from '~/data/featured.json'

// Tell TS the shape
const featured: FeaturedData = featuredData as FeaturedData

export function useProjects(options: { category?: string | null } = {}) {
  const { category = null } = options

  const sortedProjects = computed<Project[]>(() => {
    const featuredSlugs = category
      ? featured[category] || []
      : featured.default || []

    const ordered: Project[] = []

    // Add featured first
    featuredSlugs.forEach(slug => {
      const proj = allProjects.find(p => p.slug === slug)
      if (proj) ordered.push(proj)
    })

    if (category) {
      // Add other projects in the same category
      const othersInCategory = allProjects
        .filter(
          p => p.category.includes(category) && !featuredSlugs.includes(p.slug)
        )
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      ordered.push(...othersInCategory)

      // Add remaining projects
      const remaining = allProjects
        .filter(p => !ordered.some(o => o.slug === p.slug))
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      ordered.push(...remaining)
    } else {
      // If no category, sort by priority
      const remaining = allProjects
        .filter(p => !featuredSlugs.includes(p.slug))
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      ordered.push(...remaining)
    }

    return ordered
  })

  function getRelatedProjects(currentSlug: string, count = 3): Project[] {
    const current = allProjects.find(p => p.slug === currentSlug)
    if (!current) return []

    const related: Project[] = []

    // Explicit related list first
    if (current.related?.length) {
      current.related.forEach(slug => {
        const proj = allProjects.find(p => p.slug === slug)
        if (proj) related.push(proj)
      })
    }

    // Same category
    const sameCategory = allProjects.filter(
      p =>
        p.slug !== current.slug &&
        !related.some(r => r.slug === p.slug) &&
        p.category.some(cat => current.category.includes(cat))
    )
    related.push(...sameCategory)

    // Shared tags
    const sharedTags = allProjects.filter(
      p =>
        p.slug !== current.slug &&
        !related.some(r => r.slug === p.slug) &&
        p.relatedTags?.some(tag => current.relatedTags?.includes(tag))
    )
    related.push(...sharedTags)

    // Fallback: by priority
    const fallback = allProjects
      .filter(
        p => p.slug !== current.slug && !related.some(r => r.slug === p.slug)
      )
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
    related.push(...fallback)

    return related.slice(0, count)
  }

  return {
    allProjects,
    sortedProjects,
    getRelatedProjects
  }
}
