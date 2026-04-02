import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Vue 3 rules
  ...pluginVue.configs['flat/recommended'],

  // Prettier disables formatting rules that conflict
  prettierConfig,

  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ── TypeScript ─────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // Allow ternary-as-statement: `condition ? a() : b()` is idiomatic Vue
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],

      // ── Vue ─────────────────────────────────────────────────────
      'vue/multi-word-component-names': 'off',          // DS components can be single-word
      'vue/no-reserved-component-names': 'off',         // DS uses names like Select, Input intentionally
      'vue/require-default-prop': 'off',                // withDefaults handles this
      'vue/require-prop-types': 'off',                  // TypeScript provides typing
      'vue/no-required-prop-with-default': 'off',       // withDefaults pattern triggers this
      'vue/no-v-html': 'off',                           // intentionally used in some components
      'vue/one-component-per-file': 'off',              // compound component pattern used throughout
      'vue/attributes-order': 'off',                    // handled by Prettier
      'vue/order-in-components': 'off',                 // script-setup has no options API ordering concern
      'vue/define-macros-order': 'off',                 // too strict for existing codebase patterns
      'vue/component-api-style': ['error', ['script-setup']], // enforce <script setup>
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
    },
  },

  // Test files — relax some rules
  {
    files: ['src/**/*.test.ts', 'src/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Stories — relax component-api-style (some stories use options API render fns)
  {
    files: ['src/**/*.stories.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Ignore build output and config files
  {
    ignores: ['dist/**', 'storybook-static/**', '*.config.{js,ts}', 'src/main.ts'],
  },
)
