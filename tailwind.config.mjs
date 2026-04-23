/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1F3C',
          light:   '#162E56',
          dark:    '#080F1E',
        },
        oak: {
          DEFAULT: '#C4955A',
          light:   '#DDB97A',
          dark:    '#A07340',
        },
        cream: {
          DEFAULT: '#FAF8F4',
          warm:    '#F2EDE4',
          dark:    '#E8E0D2',
        },
        stone: '#7A7469',
      },

      fontFamily: {
        serif:  ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:   ['DM Sans', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Typographie fluide avec clamp()
        'display': ['clamp(2.75rem, 6vw + 1rem, 6.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1':      ['clamp(2.25rem, 4vw + 1rem, 4.5rem)',  { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'h2':      ['clamp(1.875rem, 3vw + 0.5rem, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3':      ['clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['clamp(1rem, 1vw + 0.5rem, 1.2rem)',   { lineHeight: '1.75' }],
      },

      spacing: {
        'section': 'clamp(5rem, 10vw, 9rem)',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      maxWidth: {
        'content': '1320px',
        'prose-xl': '72ch',
      },

      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      animation: {
        'reveal-up':    'revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-in':    'revealIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'line-grow':    'lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'counter-up':   'counterUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },

      keyframes: {
        revealUp: {
          '0%':   { opacity: '0', transform: 'translateY(2.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        lineGrow: {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        counterUp: {
          '0%':   { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      boxShadow: {
        'luxury':    '0 4px 32px rgba(13,31,60,0.12), 0 1px 4px rgba(13,31,60,0.08)',
        'luxury-lg': '0 12px 60px rgba(13,31,60,0.18), 0 4px 16px rgba(13,31,60,0.1)',
        'oak':       '0 0 0 2px #C4955A',
      },
    },
  },
  plugins: [],
};
