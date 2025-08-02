<template>
  <article class="project-detail">
    <!-- Render the HTML partial for this project -->
    <div v-html="projectHtml"></div>

    <!-- Related projects -->
    <section v-if="relatedProjects.length" class="related-projects">
      <h2>Related Projects</h2>
      <PortfolioCards :projects="relatedProjects" />
    </section>
  </article>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useProjects } from '~/composables/useProjects'
  import PortfolioCards from '~/components/global/portfolio-cards.vue'
  import type { Project } from '~/types/project'

  // Get the slug from the route
  const route = useRoute()
  const slug = route.params.slug as string

  // Load all projects & related helper
  const { allProjects, getRelatedProjects } = useProjects()

  // Find the current project metadata
  const project = allProjects.find((p: Project) => p.slug === slug)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  // Load HTML partials (all eager-loaded at build time)
  const partials = import.meta.glob('/partials/*.html', { as: 'raw', eager: true })

  // Match the file name to the project slug
  const partialPath = `/partials/${slug}.html`
  const projectHtml = partials[partialPath] || `<p>Content coming soon.</p>`

  // Get related projects
  const relatedProjects = getRelatedProjects(slug)
</script>