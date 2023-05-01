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
              @click="showDocument"
            >
              <v-icon></v-icon>
              <v-tooltip activator="parent" location="top">
                <p class="text-white">Offical Document</p>
              </v-tooltip>
            </v-btn>
            <v-btn size="x-large" density="compact" variant="text"
              icon="mdi-message-alert" @click="feedback_d=true"
            >
              <v-icon></v-icon>
              <v-tooltip activator="parent" location="top">
                <p class="text-white">Feed Back</p>
              </v-tooltip>
            </v-btn>
            <v-btn size="x-large" density="compact" variant="text"
              icon="mdi-github"
              @click="showGithubLink"
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
        <v-card-title class="d-flex flex-wrap align-center">
          <p class="text-button font-weight-bold ml-1 me-auto">
            Editor
          </p>
          <v-btn density="compact" variant="text"
            size="x-large"
            color="white"
            class="mr-1"
            icon="mdi-file-upload-outline"
          >
            <v-icon></v-icon>
            <!-- FILE UPLOAD -->
            <input type="file" ref="file" 
              style="position:absolute;z-index:9;width:100%;height:100%;opacity:0;" 
              accept=".pas,.pass,.txt"
              @change="uploadSourceCode"
            />
            <v-tooltip activator="parent" location="top">
              <p class="text-white">Upload SourceCode</p>
            </v-tooltip>
          </v-btn>
          <v-btn density="compact" variant="text"
            :loading="loading"
            :disabled="loading"
            @click="loader = 'loading', runAction"
  
            size="x-large"
            :icon="action.icons[action.index]"
            class="mr-3" 
            color="white"
          >
            <v-icon></v-icon>
            <v-tooltip v-if="!loading" activator="parent" location="top">
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
        <v-card-title class="d-flex flex-wrap ma-0 pa-0">
          <v-tabs v-model="result.tab">
          <v-tab value="code">
            <p class="text-button font-weight-black">C Code</p>
          </v-tab>
          <v-tab value="test" :disabled="action.index==0">
            <p class="text-button font-weight-black">Output</p>
          </v-tab>
        </v-tabs>
          <v-btn density="compact" variant="text"
            class="align-self-center ms-auto mr-4"
            icon="mdi-progress-download"
            size="x-large"
            @click="downloadResult"
          >
            <v-icon></v-icon>
            <v-tooltip activator="parent" location="left">
              <p class="text-white">Download</p>
            </v-tooltip>
          </v-btn>
        </v-card-title>
        

        <!-- CODE OUTPUT -->
        <v-window v-model="result.tab">
          <v-window-item value="code">
            <CHighlight :code="codec"/>
          </v-window-item>
          <v-window-item value="test">
            <v-card color="grey-darken-3" rounded="0">
              <v-card-text>
                {{result.msg[action.index]}}
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>

      </v-card>
    </v-card>
    
    <!-- FEEDBACK DIALOG -->
    <v-dialog v-model="feedback_d" width="60%" theme="light" elevation-10>
      <v-card class="rounded-lg" theme="light">
        <v-toolbar color="grey-darken-3">
          <v-btn size="x-large" density="compact" variant="text"
            icon="mdi-arrow-left-bold"
            @click="feedback_d = false"
          />
          <v-card-title class="text-button font-weight-bold text-center me-auto">
            Feed Back
          </v-card-title>
          <v-btn size="x-large" density="compact" variant="text"
              icon="mdi-email-fast-outline" class="mr-4"
              @click="sendFeedBack"
          />
        </v-toolbar>

        <v-textarea auto-grow shaped class="mt-2 mx-5" theme="light"
          label="Tell us about any problems"
          variant="underlined"
          ref="feedback"/>
      </v-card>
    </v-dialog>

    <!-- FOOTER -->
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
        'msg':['-- RunCode Inactive', 'Pascal-S Example.\n'],
      },
      'codepas': ref('program example;\nbegin\n  writeln(\'Pascal-S Example.\');\nend.'),
      'codec': ref('#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n/// Program Name :  example\nint main() {\n  printf("Pascal-S Example.\\n");\n  return 0;\n}'),
      loader:null,
      loading:false,
      feedback_d:false,
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
  },
  methods:{
    uploadSourceCode(){
      const file = this.$refs.file.files[0];
      console.log(file);
      const fileMaxSize = 1024*512; // 512KB
      
      if(file.size > fileMaxSize){
        alert('source code exceeds 512KB');
        return;
      }
      // read contents
      const reader = new FileReader();
      reader.onload = (e) => {
        this.codepas = e.target.result;
      };
      reader.readAsText(file);
    },
    runAction(){
      // TODO
    },
    downloadResult(){
      // TODO
    },
    sendFeedBack(){
      const feedback = this.$refs.feedback.value;
      console.log(feedback)
      this.feedback_d = false;
    },
    showDocument(){
      // TODO
    },
    showGithubLink(){
      // TODO
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