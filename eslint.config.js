
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': 'off'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
]