import form from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          'base-field': 'var(--color-text-field)',
          'placeholder-field': 'var(--color-placeholder-field)',
        },
      },
      ringColor: {
        skin: {
          'base-field': 'var(--color-ring-field)',
          'focus-field': 'var(--color-ring-focus-field)',
        },
      },
      borderColor: {
        skin: {
          'base-field': 'var(--color-border-field)',
          'focus-field': 'var(--color-border-focus-field)',
        },
      },
    },
  },
  plugins: [form],
}
