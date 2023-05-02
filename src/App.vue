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
            @click="submitAction"
  
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
              @update:model-value="result.codeout = action.index == 1 ? '/* ready */' : '/* runcode inactive */';"
            />
          </div>
        </v-card-title>
        <PascalEditor v-model="action.codepas" style="max-height: 2000px;overflow-y:auto"/>
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
          <v-tab value="test" :disabled="action.index == 0">
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
            <CHighlight :code="result.codec" style="max-height: 2000px;overflow-y:auto"/>
          </v-window-item>
          <v-window-item value="test" >
            <CHighlight :code="result.codeout" style="max-height: 2000px;overflow-y:auto"/>
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
import axios from 'axios';
export default {
  data() {
    return {
      action:{
        icons:['mdi-progress-wrench','mdi-play-speed'],
        msg:['Compile','Compile and Run'],
        index:0,
        loading:false,
        codepas: ref('program example(void);\nbegin\n  writeln(2023);\nend.'),
      },
      result:{
        'tab':0,
        codec: ref('#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n/// [ example ] created on 2023/5/2\nint main() {\n  printf("%d\\n", 2023);\n  return 0;\n}'),
        codeout: ref('/* runcode inactive */'),
      },

      loader:null,
      loading:false,
      feedback_d:false,
    }
  },
  components: {
    PascalEditor,
    CHighlight,
  },
  setup(){
    const init = () =>{
      localStorage.setItem('pascc-token', '')
      axios.get('http://api.netx.world:10400/register')
      .then(res => {
        if(res.data.status == 0){
          localStorage.setItem('pascc-token', res.data.token)
        }
      })
    }
    init();
    return {};
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
        this.action.codepas = e.target.result;
      };
      reader.readAsText(file);
    },
    submitAction(){
      const token = localStorage.getItem('pascc-token');
      this.loader = 'loading';
      const l = this.loader;
      this[l] = !this[l];
      this.result.codec = '/* compiling... */';
      this.result.codeout =  this.action.index == 1 ? '/* running... */' : '/* runcode inactive */';

      // submit
      const {res} = axios.post('http://api.netx.world:10400/submit', {
        token: token,
        source: this.action.codepas,
        runflag: this.action.index==1,
      })
      .then(res => {
        console.log('submit return ' + res.data.status)
        this.result.codec = res.data.result;
        if(this.action.index == 1){
          this.result.codeout = res.data.output;
        }

        this[l] = !this[l];
        this.loader = null;
      })
      
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