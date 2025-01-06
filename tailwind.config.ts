import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'noisy-background': 'url("/assets/images/noisy-background.svg")',
        'auth-background': 'url("/assets/images/auth-background.png")',
        'custom-gradient': 'linear-gradient(90deg, rgba(95,178,36,1) 0%, rgba(7,131,43,1) 100%)'
      },
      backgroundSize: {
        initial: 'initial'
      },

      backgroundColor: {
        // primary: 'var(--bg-primary)', -> hiện tại không dùng css này vì nó ghi đè lên css của nextui (chưa có thời gian fix)
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        'transparent-light': 'var(--bg-transparent-light)',
        lighter: 'var(--bg-lighter)',
        'default-300': 'var(--bg-default-300)',
        default: 'bg-default-300'
      },
      fontSize: {
        xsm: '0.8125rem',
        'icon-size': '24px'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        light: 'var(--text-light)',
        extraLight: 'var(--text-extra-light)',
        inverted: 'var(--text-inverted)',
        disabled: 'var(--text-disabled)',
        danger: 'var(--text-danger)',
        icon: '#205432'
      },
      borderColor: {
        'color-light': 'var(--border-color-light)',
        'color-medium': 'var(--border-color-medium)',
        'color-stronger': 'var(--border-color-stronger)'
      },
      colors: {
        gray: {
          0: 'var(--gray-0)',
          10: 'var(--gray-10)',
          15: 'var(--gray-15)',
          20: 'var(--gray-20)',
          25: 'var(--gray-25)',
          30: 'var(--gray-30)',
          35: 'var(--gray-35)',
          40: 'var(--gray-40)',
          45: 'var(--gray-45)',
          50: 'var(--gray-50)',
          55: 'var(--gray-55)',
          60: 'var(--gray-60)',
          65: 'var(--gray-65)',
          70: 'var(--gray-70)',
          75: 'var(--gray-75)',
          80: 'var(--gray-80)',
          85: 'var(--gray-85)',
          90: 'var(--gray-90)',
          95: 'var(--gray-95)',
          100: 'var(--gray-100)'
        },
        yellow: {
          10: 'var(--yellow-10)',
          20: 'var(--yellow-20)',
          30: 'var(--yellow-30)',
          40: 'var(--yellow-40)',
          50: 'var(--yellow-50)',
          60: 'var(--yellow-60)',
          70: 'var(--yellow-70)',
          80: 'var(--yellow-80)',
          90: 'var(--yellow-90)'
        },
        orange: {
          10: 'var(--orange-10)',
          20: 'var(--orange-20)',
          30: 'var(--orange-30)',
          40: 'var(--orange-40)',
          50: 'var(--orange-50)',
          60: 'var(--orange-60)',
          70: 'var(--orange-70)',
          80: 'var(--orange-80)',
          90: 'var(--orange-90)'
        },
        red: {
          10: 'var(--red-10)',
          20: 'var(--red-20)',
          30: 'var(--red-30)',
          40: 'var(--red-40)',
          50: 'var(--red-50)',
          60: 'var(--red-60)',
          70: 'var(--red-70)',
          80: 'var(--red-80)',
          90: 'var(--red-90)'
        },
        pink: {
          10: 'var(--pink-10)',
          20: 'var(--pink-20)',
          30: 'var(--pink-30)',
          40: 'var(--pink-40)',
          50: 'var(--pink-50)',
          60: 'var(--pink-60)',
          70: 'var(--pink-70)',
          80: 'var(--pink-80)',
          90: 'var(--pink-90)'
        },
        purple: {
          10: 'var(--purple-10)',
          20: 'var(--purple-20)',
          30: 'var(--purple-30)',
          40: 'var(--purple-40)',
          50: 'var(--purple-50)',
          60: 'var(--purple-60)',
          70: 'var(--purple-70)',
          80: 'var(--purple-80)',
          90: 'var(--purple-90)'
        },
        blue: {
          10: 'var(--blue-10)',
          20: 'var(--blue-20)',
          30: 'var(--blue-30)',
          40: 'var(--blue-40)',
          50: 'var(--blue-50)',
          60: 'var(--blue-60)',
          70: 'var(--blue-70)',
          80: 'var(--blue-80)',
          90: 'var(--blue-90)'
        },
        sky: {
          10: 'var(--sky-10)',
          20: 'var(--sky-20)',
          30: 'var(--sky-30)',
          40: 'var(--sky-40)',
          50: 'var(--sky-50)',
          60: 'var(--sky-60)',
          70: 'var(--sky-70)',
          80: 'var(--sky-80)',
          90: 'var(--sky-90)'
        },
        turquoise: {
          10: 'var(--turquoise-10)',
          20: 'var(--turquoise-20)',
          30: 'var(--turquoise-30)',
          40: 'var(--turquoise-40)',
          50: 'var(--turquoise-50)',
          60: 'var(--turquoise-60)',
          70: 'var(--turquoise-70)',
          80: 'var(--turquoise-80)',
          90: 'var(--turquoise-90)'
        },
        green: {
          10: 'var(--green-10)',
          20: 'var(--green-20)',
          30: 'var(--green-30)',
          40: 'var(--green-40)',
          50: 'var(--green-50)',
          60: 'var(--green-60)',
          70: 'var(--green-70)',
          80: 'var(--green-80)',
          90: 'var(--green-90)'
        },
        accent: {
          10: 'var(--accent-10)',
          15: 'var(--accent-15)',
          20: 'var(--accent-20)',
          25: 'var(--accent-25)',
          30: 'var(--accent-30)',
          35: 'var(--accent-35)',
          40: 'var(--accent-40)',
          45: 'var(--accent-45)',
          50: 'var(--accent-50)',
          55: 'var(--accent-55)',
          60: 'var(--accent-60)',
          65: 'var(--accent-65)',
          70: 'var(--accent-70)',
          75: 'var(--accent-75)',
          80: 'var(--accent-80)',
          85: 'var(--accent-85)',
          90: 'var(--accent-90)',
          95: 'var(--accent-95)',
          100: 'var(--accent-100)'
        },
        'custom-green': '#5FB224',
        'custom-dark-green': '#07832B',
        'icon-default': '#16A34A',
        'icon-hover': '#15803D'
      },
      boxShadow: {
        's-light-b-strong': '0px 2px 4px 0px rgba(0, 0, 0, 0.04), 0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
        's-strong-b-strong': '2px 4px 16px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.04)'
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      arial: ['Arial', 'sans-serif']
    },
    defaultBg: {
      defaultBg: '#011d33'
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,

      themes: {
        light: {
          colors: {}
        },
        dark: {
          colors: {}
        }
      }
    })
  ]
}

export default config
