import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        'card': '300px'
      },
      colors: {
        'main-gray': '#F1F2F4',
        'main-blue': '#0764DB',
        'main-blue-hover': '#0055CC'
      },
      fontSize: {
        "12": "12px",
        "14": "14px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "24": "24px",
        "28": "28px",
        "32": "32px",
        "36": "36px",
        "40": "40px",
        "44": "44px",
        "48": "48px",
      }
    },
  },
  plugins: [],
} satisfies Config
