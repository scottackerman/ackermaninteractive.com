<template>
    <imageHandler :class="name + '-picture'">
        <source v-if="webp" type="image/webp" :srcset="useAsset(name + '.webp') + ' 1x, ' + useAsset(name + '@2x.webp') + ' 2x'">
        <source v-if="png" type="image/png" :srcset="useAsset(name + '.png') + ' 1x, ' + useAsset(name + '@2x.png') + ' 2x'">
        <source v-if="jpg" type="image/jpeg" :srcset="useAsset(name + '.jpg') + ' 1x, ' + useAsset(name + '@2x.jpg') + ' 2x'">
        <source v-if="svg" type="image/svg+xml" :srcset="useAsset(name + '.svg')">
        <img :class="name + '-image'" :alt="alt" :role="alt === '' ? 'presentation' : ''">
    </imageHandler>
</template>

<script setup>
function useAsset(path) {
  const assets = import.meta.glob('~/assets/images/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/images/' + path]
}

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    webp: {
        type: Boolean,
        default: false
    },
    png: {
        type: Boolean,
        default: false
    },
    jpg: {
        type: Boolean,
        default: false
    },
    svg: {
        type: Boolean,
        default: false
    },
    alt: {
        type: String,
        default: ''
    }
})
const { name, webp, png, jpg } = props
</script>
