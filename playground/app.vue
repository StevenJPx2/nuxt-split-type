<script setup lang="ts">
import { ref, tryOnMounted, useSplitText } from "#imports";
const divRef = ref<HTMLDivElement | null>(null);
tryOnMounted(() => {
  const { instance } = useSplitText(divRef, {
    splitBy: "lines, words",
    wrapping: { select: "words", wrapType: "span", wrapClass: "inline-block" },
  });
});
</script>

<template>
  <div ref="divRef">Nuxt module playground!</div>
</template>
