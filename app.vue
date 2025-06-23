<template>
  <div>
    <Head>
    </Head>
    <div id="skip">
      <a class="skip-main" href="#main">Skip to main content</a>
    </div>
    <Body :class="{ killscroll: killscroll }" />
    <div class="site-wrapper">
      <SiteHeader></SiteHeader>
      <NuxtPage id="main" class="main" />
      <SiteFooter></SiteFooter>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const killscroll = ref(false)

</script>
