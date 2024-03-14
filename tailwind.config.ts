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
            'money':{
                100: '#64b481',
                200: '#40905F',
                300: '#176D3F',
                400: '#004C21',
                500: '#002C01',
            },
            'gold':{
                50: '#FFE979',
                100: '#f6d842',
                200: '#CEB11D',
                300: '#B0950E',
                400: '#877102',
            },
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