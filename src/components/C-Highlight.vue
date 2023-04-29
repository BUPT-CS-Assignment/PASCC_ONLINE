<template>
  <highlightjs 
    autodetect
  />
</template>

<script>
// import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/styles/stackoverflow-dark.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
export default {
  data() {
  },
  components: {
    highlightjs: hljsVuePlugin.component
  }
}
</script>