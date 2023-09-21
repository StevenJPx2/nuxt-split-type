<script setup lang="ts">
import { ref, useSplitText } from "#imports";

const props = withDefaults(
  defineProps<{
    /**
     * What you want it to render as
     * @default "p"
     */
    as?: keyof HTMLElementTagNameMap;
  }>(),
  {
    as: "p",
  },
);
const compRef = ref<HTMLElement | null>(null);
useSplitText(compRef, {
  splitBy: "lines, words",
  wrapping: { select: "lines", wrapType: "span", wrapClass: "inline-block" },
});

defineExpose({ el: compRef });
</script>

<template>
  <component ref="compRef" :is="props.as"><slot /></component>
</template>
