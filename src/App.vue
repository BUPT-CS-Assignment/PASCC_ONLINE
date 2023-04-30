<template>
  <v-app class="bg-grey-darken-4">

    <v-card class="mx-15 mt-16 mb-3 px-2 pt-6 pb-3 rounded-lg elevation-10 " 
            color="grey-darken-3">
      <v-card-title>
        <p class="text-h3 font-weight-black text-decoration-overline">PASCC</p>
      </v-card-title>
      <v-card-subtitle class="mb-3">
        <p class="text-overline font-weight-bold">A Pascal-S to C Compiler</p>
      </v-card-subtitle>
      <!-- <v-card-text>
        <p>
          This is a simple Pascal editor written in Vue.js. It uses Monaco Editor as the code editor.
        </p>
      </v-card-text> -->
    </v-card>

    <!-- code space -->
    <v-card class="mx-15 my-6 rounded-lg elevation-10">
      <v-card-title class="text-button font-weight-bold">Pascal-S Editor</v-card-title>
      <PascalEditor v-model="codepas"/>
    </v-card>
    <v-card class="mx-15 my-6 rounded-lg elevation-10">
      <v-card-title class="text-button font-weight-bold">C Language</v-card-title>
      <CHighlight :code="codec"/>
    </v-card>
    
  </v-app>

</template>


<script>
import {ref} from 'vue';
import PascalEditor from './components/PascalEditor.vue';
import CHighlight from './components/C-Highlight.vue'
export default {
  data() {
    return {
      'codepas': ref('program HelloWorld;\nbegin\n  WriteLn(\'Hello, world!\');\nend.'),
      'codec': ref('#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}')
    }
  },
  components: {
    PascalEditor,
    CHighlight,
  },
}
</script>
