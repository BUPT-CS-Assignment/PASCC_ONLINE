<template>
  <div v-highlight >
    <pre style="padding:0;margin:0;
      border: none;
      white-space: pre-wrap; 
      word-wrap: break-word;"
    >
      <code>{{code}}</code>
    </pre>
  </div>
</template>

<script setup>
defineProps({
  code: {
    type: String,
    default: ''
  }
})
</script>