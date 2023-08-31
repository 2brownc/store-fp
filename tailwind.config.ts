import type { Config } from 'tailwindcss'

let arbitaryMatchPlugin = require("tailwindcss/plugin");

type TArbitaryMatchPlugin = {
  matchVariant: any,
  theme: any
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    arbitaryMatchPlugin(function({ matchVariant, theme }: TArbitaryMatchPlugin) {
      matchVariant(
        'nth',
        (value: any) => {
          return `&:nth-child(${value})`;
        },
        {
          values: {
            DEFAULT: 'n', // Default value for `nth:`
            '2n': '2n', // `nth-2n:utility` will generate `:nth-child(2n)` CSS selector
            '3n': '3n',
            '4n': '4n',
            '5n': '5n',
            //... so on if you need
          },
        }
      );
    }),
  ],
}
export default config
