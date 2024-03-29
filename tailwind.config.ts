import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
        colors: {
            'amour':{
                50: '#fe8c86',
                100: '#e85a53',
                200: '#d1362e',
                300: '#b01f17',
            },
            'bone':{
                50: '#f4e8d7',
                100: '#eadfce',
                200: '#d6ccbd',
                300: '#998f80',
            },
            'sky':'#80d5d8',
            'money':'#64b481',
            'gold':'#f6d842',
        },
        fontFamily:{
            bitter: ['Bitter', 'serif',],
            ubuntu: ['Ubuntu', 'sans-serif',],
            sacramento: ['Sacramento', 'sans-serif',],
            museoModerno: ['MuseoModerno', 'sans-serif']
        },
    },
    
  },
  plugins: [],
} satisfies Config