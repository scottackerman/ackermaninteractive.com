<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import { useProjects } from '~/composables/useProjects'
import PortfolioCards from '~/components/global/portfolio-cards.vue'
import type { Project } from '~/types/project'

const route = useRoute()
const { allProjects, getRelatedProjects } = await useProjects()

// Project metadata
const project = computed<Project | undefined>(() =>
  allProjects.find(p => p.slug === route.params.slug)
)

// Related projects
const related = computed(() =>
  project.value ? getRelatedProjects(project.value.slug, 3) : []
)

// Markdown content
const { data: markdown } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(`/work/${route.params.slug}`).findOne()
)
</script>

<template>
  <div v-if="project">
    <div class="project-details section">
      <!-- Hero -->
      <section class="hero">
        <img :src="`/images/${project.heroImage}`" :alt="project.heroAltText || ''" />
        <h1>{{ project.title }}</h1>
        <p>{{ project.shortDescription }}</p>
      </section>

      <!-- Markdown content -->
      <section v-if="markdown" class="long-content">
        <ContentRenderer :value="markdown" />
      </section>

      <!-- Related projects -->
      <section class="related">
        <h2>Similar Projects</h2>
        <PortfolioCards :projects="related" />
      </section>
    </div>
  </div>

  <div v-else>
    <p>Project not found.</p>
  </div>
</template>
