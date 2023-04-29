<template>
  <div> div test </div>
  <PascalEditor v-model="code" theme="dy"/>
  <CHighlight :code="code"/>
</template>


<script>
import {ref} from 'vue';
import PascalEditor from './components/PascalEditor.vue';
import CHighlight from './components/C-Highlight.vue'
export default {
  data() {
    return {
      'code': ref('program HelloWorld;\nbegin\n  WriteLn(\'Hello, world!\');\nend.')
    }
  },
  components: {
    PascalEditor,
    CHighlight,
  },
}
</script>
