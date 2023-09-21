<script setup lang="ts">
import SplitText from "../src/runtime/component.vue";
import { ref, useSplitText, useTimeoutFn } from "#imports";
import { promiseTimeout } from "@vueuse/core";

const divRef = ref<HTMLDivElement | null>(null);
const compRef = ref<InstanceType<typeof SplitText> | null>(null);

const { instance, onComplete } = useSplitText(divRef, {
  splitBy: "lines, words",
  wrapping: { select: "lines", wrapType: "span", wrapClass: "inline-block" },
});

onComplete((instance) => {
  console.log("complete", instance);
});

useTimeoutFn(async () => {
  await promiseTimeout(3000);
  console.log("revert");
  instance.value?.revert();
}, 1000);
</script>

<template>
  <p ref="divRef">Nuxt module playground!</p>
  <split-text
    lines
    words
    :wrapping="{ wrapType: 'span', wrapClass: 'inline-block', select: 'lines' }"
    ref="compRef"
  >
    Hello! brudda
  </split-text>

  <pre>
    {{ compRef?.el?.innerText }}
  </pre>
</template>

<style>
.inline-block {
  display: inline-block;
}
</style>
