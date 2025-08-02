<template>
  <ul id="work" class="project-list">
    <li
      v-for="project in projects"
      :key="project.slug"
      class="project-card"
    >
      <article class="project-content">
        <div class="project-image-wrapper" aria-hidden="true">
          <img
            :src="`/images/${project.heroImage}`"
            :alt="project.heroAltText || ''"
            class="project-image"
          />
        </div>
        <div class="project-details">
          <div class="project-top">
            <h3 class="purple card-area-padding">{{ project.title }}</h3>
            <p class="quartzgray card-area-padding">
              {{ project.shortDescription }}
            </p>
          </div>
          <div class="project-bottom">
            <NuxtLink
              :to="`/${project.slug}`"
              class="white bg-purple btn icon card-area-padding wide full"
            >
              Find Out More
            </NuxtLink>
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { Project } from '~/types/project'

  defineProps<{
    projects: Project[]
  }>()
</script>