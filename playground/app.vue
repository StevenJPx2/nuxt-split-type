<script setup lang="ts">
import { ref, useSplitText, useTimeoutFn } from "#imports";
import SplitText from "../dist/runtime/component.vue";
import { promiseTimeout } from "@vueuse/core";
import { vSplitText } from "../src/runtime/directive";

const useWords = ref(true);
const pRef = ref<HTMLParagraphElement | null>(null);

const { instance, lines, revert } = useSplitText(pRef, {
  splitBy: "lines,words",
  wrapping: { select: "lines", wrapType: "span", wrapClass: "inline-block" },
  onComplete: (instance) => {
    console.log("complete", instance);
  },
});

useTimeoutFn(async () => {
  useWords.value = false;
  await promiseTimeout(3000);
  console.log("revert", lines.value, instance.value?.lines);
  revert();
}, 3000);

const log = console.log;
</script>

<template>
  <p ref="pRef">
    Nuxt module playground!
  </p>
  <split-text
    lines
    :words="useWords"
    :wrapping="{ wrapType: 'span', wrapClass: 'inline-block', select: 'lines' }"
    @complete="(ins) => log('done', ins)"
  >
    Hello! brudda
  </split-text>

  <p
    v-split-text="{
      splitBy: 'lines,words',
      onComplete: (ins) => log('done directive', ins),
    }"
  >
    Yo yo yooooooo nuxt module playground
  </p>

  <pre>
    {{ pRef?.innerText }}
  </pre>
</template>

<style>
.inline-block {
  display: inline-block;
}
</style>
