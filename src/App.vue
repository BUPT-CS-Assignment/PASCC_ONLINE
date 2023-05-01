<template>
  <v-app class="bg-grey-darken-4 px-16">
    <div class="mt-16"></div>
    <!-- TITLE CARD -->
    <v-card class="align-self-center elevation-0 rounded-0"
      color="transparent" 
      width="90%"
    >
      <v-card color="grey-darken-3"
        class="mx-3 mb-3 px-2 pt-7 pb-2 rounded-lg elevation-10 align-self-center"
      >
        <v-card-title>
          <p class="text-h3 font-weight-black text-decoration-overline">PASCC</p>
        </v-card-title>
        
        <!-- SUBTITLE -->
        <div class="d-flex flex-wrap">
          <p class="text-overline font-weight-bold 
                    ml-4 align-self-center 
                    text-grey">
            A Pascal-S to C Compiler
          </p>
          <!-- BUTTONS -->
          <div class="d-flex flex-row align-end align-self-center mr-2 ml-auto">
            <v-btn size="x-large" density="compact" variant="text"
              icon="mdi-file-document"
            >
              <v-icon></v-icon>
              <v-tooltip activator="parent" location="top">
                <p class="text-white">Offical Document</p>
              </v-tooltip>
            </v-btn>
            <v-btn size="x-large" density="compact" variant="text"
              icon="mdi-message-alert"
            >
              <v-icon></v-icon>
              <v-tooltip activator="parent" location="top">
                <p class="text-white">Feed Back</p>
              </v-tooltip>
            </v-btn>
            <v-btn size="x-large" density="compact" variant="text"
              icon="mdi-github"
            >
              <v-icon></v-icon>
              <v-tooltip activator="parent" location="top">
                <p class="text-white">Github Repo</p>
              </v-tooltip>
            </v-btn>
          </div>

        </div>
      </v-card>
  
    </v-card>

    <!-- CODE SPACE -->
    <v-card class="d-flex flex-wrap align-self-center elevation-0 rounded-0 ma-0 pa-0"
      color="transparent" 
      width="90%"
    >
      <v-card class="flex-1-1 my-6 rounded-lg
        elevation-10 align-self-start mx-3" 
      >
        <v-card-title class="d-flex flex-row align-center">
          <p class="text-button font-weight-bold ml-1 me-auto">
            Editor
          </p>
          <v-btn density="compact" variant="text"
            :loading="loading"
            :disabled="loading"
            @click="loader = 'loading'"
  
            size="x-large"
            :icon="action.icons[action.index]"
            class="mr-3" 
            color="white"
          >
            <v-icon></v-icon>
            <v-tooltip v-if="!loading" activator="parent" location="left">
              <p class="text-white">{{action.msg[action.index]}}</p>
            </v-tooltip>
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <div>
            <v-switch hide-details inset label="RunCode"
              true-value="1"
              false-value="0"
              v-model="action.index"
            />
          </div>
        </v-card-title>
        <PascalEditor v-model="codepas"/>
      </v-card>

      <v-card class="flex-1-1 my-6 rounded-lg overflow-auto
        elevation-10 align-self-start mx-3" 
      >
        <!-- TABS -->
        <v-tabs v-model="result.tab">
          <v-tab value="code">
            <p class="text-button font-weight-black">C Code</p>
          </v-tab>
          <v-tab value="test">
            <p class="text-button font-weight-black">Output</p>
          </v-tab>
          <v-btn density="compact" variant="text"
            class="align-self-center ms-auto mr-4"
            icon="mdi-progress-download"
            size="x-large"
          >
            <v-icon></v-icon>
            <v-tooltip activator="parent" location="left">
              <p class="text-white">Download</p>
            </v-tooltip>
          </v-btn>
        </v-tabs>

        <!-- CODE OUTPUT -->
        <v-window v-model="result.tab">
          <v-window-item value="code">
            <CHighlight :code="codec"/>
          </v-window-item>
          <v-window-item value="test">
            <v-card color="grey-darken-2" rounded="0">
              <v-card-text>
                {{result.msg[action.index]}}
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>

      </v-card>
    </v-card>
    
    <v-footer padless absolute max-height="50px" >
      <v-col class="text-center" cols="12" >
        Copyright 2023 <strong>PASCC-TEAM</strong>
      </v-col>
    </v-footer>
  </v-app>
    
</template>


<script>
import {ref} from 'vue';
import PascalEditor from './components/PascalEditor.vue';
import CHighlight from './components/C-Highlight.vue'
export default {
  data() {
    return {
      'action':{
        icons:['mdi-progress-wrench','mdi-play-speed'],
        msg:['Compile','Compile and Run'],
        index:0,
        loading:false,
      },
      result:{
        'tab':0,
        'msg':['-- RunCode Inactive', 'Hello World!\n'],
      },
      'codepas': ref('program HelloWorld;\nbegin\n  WriteLn(\'Hello, world!\');\nend.'),
      'codec': ref('#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}'),
      loader:null,
      loading:false,
    }
  },
  components: {
    PascalEditor,
    CHighlight,
  },
  watch:{
    loader(){
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => {
        this[l] = !this[l]
      }, 3000);
      this.loader = null;
    }
  }
  
}

</script>


<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>