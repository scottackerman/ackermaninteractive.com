import { useRoute, useHead } from '#imports'
import type { StructuredData } from '~/types/StructuredData'
import { watchEffect } from 'vue'

export function useStructuredData() {
  const route = useRoute()

  watchEffect(async () => {
    const routeName = route.path === '/' ? 'index' : route.path
      .replace(/^\/|\/$/g, '')
      .replace(/\//g, '-')

    try {
      const module = await import(`~/data/${routeName}.ts`) as { default: StructuredData }
      const schema = module.default

      useHead(() => ({
        script: [
          {
            key: 'structured-data', // important for deduping
            type: 'application/ld+json',
            innerHTML: JSON.stringify(schema),
          },
        ],
        __dangerouslyDisableSanitizers: ['script']
      }))
    } catch {
      // Silent fail if no schema found
    }
  })
}
