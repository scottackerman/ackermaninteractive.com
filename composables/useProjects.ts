import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Project, FeaturedData } from '~/types/project'

// Pull in all project metadata
const projectModules = import.meta.glob<{ default: Project }>(
  '~/data/work/*.json',
  { eager: true }
)
const allProjects: Project[] = Object.values(projectModules).map(m => m.default)

// Load featured.json
const featuredData: FeaturedData = (await import('~/data/featured.json')).default

export function useProjects() {
  const route = useRoute()

  // Sort projects based on category query param
  const sortedProjects = computed<Project[]>(() => {
    const category = (route.query.category as string) || null
    const featuredSlugs = category
      ? featuredData[category] || []
      : featuredData.default || []

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
      // If no category, sort by project level priority
      const remaining = allProjects
        .filter(p => !featuredSlugs.includes(p.slug))
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      ordered.push(...remaining)
    }

    return ordered
  })

  // Get related projects for a detail page
  function getRelatedProjects(currentSlug: string, count = 3): Project[] {
    const current = allProjects.find(p => p.slug === currentSlug)
    if (!current) return []

    const related: Project[] = []

    // Put featured projects from same category first
    if (current.related?.length) {
      current.related.forEach(slug => {
        const proj = allProjects.find(p => p.slug === slug)
        if (proj) related.push(proj)
      })
    }

    // Then the rest of that category
    const sameCategory = allProjects.filter(
      p =>
        p.slug !== current.slug &&
        !related.some(r => r.slug === p.slug) &&
        p.category.some(cat => current.category.includes(cat))
    )
    related.push(...sameCategory)

    // Then shared tags if any
    const sharedTags = allProjects.filter(
      p =>
        p.slug !== current.slug &&
        !related.some(r => r.slug === p.slug) &&
        p.relatedTags?.some(tag => current.relatedTags?.includes(tag))
    )
    related.push(...sharedTags)

    // Project level priority
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