import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': 'off'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
]