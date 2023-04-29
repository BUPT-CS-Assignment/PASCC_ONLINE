<template>
  <codemirror
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="thd"
  />
</template>

<script setup>
import {Codemirror} from "vue-codemirror";
import {StreamLanguage} from '@codemirror/language';
import {pascal} from '@codemirror/legacy-modes/mode/pascal';
import {githubLight} from '@ddietr/codemirror-themes/github-light'
import {githubDark} from '@ddietr/codemirror-themes/github-dark'
const thl = [StreamLanguage.define(pascal),githubLight]
const thd = [StreamLanguage.define(pascal),githubDark]
// defineProps({
//   theme: {
//     type: String,
//     default: 'light'
//   }
// })

</script>

