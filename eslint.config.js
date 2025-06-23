import pluginVue from 'eslint-plugin-vue'
import pluginNuxt from 'eslint-plugin-nuxt'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*'],
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      vue: pluginVue,
      nuxt: pluginNuxt
    },
    rules: {
      // Nuxt-specific rules (from pluginNuxt.configs.recommended.rules)
      'nuxt/no-env-in-context': 'error',
      'nuxt/no-env-in-hooks': 'error',
      'nuxt/no-globals-in-created': 'error',
      'nuxt/no-this-in-fetch-data': 'error',
      'nuxt/no-cjs-in-config': 'error',
      'nuxt/no-timing-in-fetch-data': 'error',
      'nuxt/no-global-nuxt-import': 'off'
    }
  },
  ...tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  }
])
