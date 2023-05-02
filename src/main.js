import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Highlightjs
import 'highlight.js/styles/github-dark-dimmed.css'
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import cpp from 'highlight.js/lib/languages/cpp';
hljs.registerLanguage('c', cpp);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(hljsVuePlugin)
app.mount('#app')
