<template>
  <ul class="trial-list">
    <li v-for="(trial, index) in trials" :key="index" class="trial-card">
      <article class="trial-content">
        <div class="trial-icon-wrapper" aria-hidden="true">
          <img :src="`/images/icons/${trial.icon}`" alt="" class="trial-icon" />
        </div>

        <div class="trial-details">
          <div class="trial top">
            <h3 class="purple card-area-padding">{{ trial.title }}</h3>
            <p class="quartzgray card-area-padding">{{ trial.description }}</p>

            <section class="card-area-padding" :aria-labelledby="`status-heading-${index}`">
              <h4 class="purple eyebrow-medium" :id="`status-heading-${index}`">Status</h4>
              <ul>
                <li>Status: {{ trial.status }}</li>
                <li>Phase: {{ trial.phase }}</li>
                <li>Locations: {{ trial.locations }}</li>
              </ul>
            </section>

            <section class="card-area-padding" :aria-labelledby="`criteria-heading-${index}`">
              <h4 class="purple eyebrow-medium" :id="`criteria-heading-${index}`">Key Criteria</h4>
              <ul>
                <li v-for="(item, i) in trial.criteria" :key="i">{{ item }}</li>
              </ul>
            </section>
          </div>
          <div class="trial-bottom">
            <p class="trial-identity card-area-padding">{{ trial.identity }}</p>
            <a :href="trial.url" class="white bg-purple btn icon card-area-padding wide full" target="_blank">Find Out More</a>
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<script setup lang="ts">
	import trials from '~/data/trials.json'
</script>