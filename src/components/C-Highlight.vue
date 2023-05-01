<template>
  <highlightjs 
    autodetect
  />
</template>

<script setup>
// import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/styles/github-dark-dimmed.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
const highlightjs = hljsVuePlugin.component;
</script>