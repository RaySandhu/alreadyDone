import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from "vuetify/iconsets/mdi";

import 'vuetify/styles'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createVuetify } from 'vuetify'

const lightTheme = {
    dark: false,
    colors: {
      background: "#000000",
      surface: "#F2F3F1",
      primary: "#1E60AD",
      "primary-darken-1": "#133C6C",
      secondary: "#F0BCD4",
      "secondary-darken-1": "#E27DAC",
      error: "#DA4167",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  };

export default defineNuxtPlugin((app) => {
    // add themes here using tips from https://vuetifyjs.com/en/features/global-configuration/#contextual-defaults
  const vuetify = createVuetify({
    theme: {
        defaultTheme: "lightTheme",
        themes: {
            lightTheme,
        },
      },
    //   swap to these icons if css in config does not work
    // icons: {
    //     defaultSet: "mdi",
    //     aliases,
    //     sets: { mdi },
    //   },
      components,
      directives
  })
  app.vueApp.use(vuetify)
})