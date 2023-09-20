<script setup lang="ts">
import { ref, tryOnMounted, useSplitText } from "#imports";
import { promiseTimeout } from "@vueuse/core";
const divRef = ref<HTMLDivElement | null>(null);

tryOnMounted(async () => {
  const { instance } = useSplitText(divRef, {
    splitBy: "lines, words",
    wrapping: { select: "lines", wrapType: "span", wrapClass: "inline-block" },
  });
  await promiseTimeout(1000);
  instance.value?.revert();
});
</script>

<template>
  <p ref="divRef">Nuxt module playground!</p>
</template>
