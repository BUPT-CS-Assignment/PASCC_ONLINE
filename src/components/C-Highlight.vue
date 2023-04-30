<template>
  <highlightjs 
    language="c"
  />
</template>

<script>
// import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/styles/github-dark-dimmed.css'
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