<script setup lang="ts">
import { ref, useSplitText } from "#imports";
import { TypesValue, TypesValueTuple } from "./types";
import { UseSplitTextOptions } from "./composable";

const props = withDefaults(
  defineProps<{
    /**
     * What you want it to render as
     * @default "p"
     */
    as: keyof HTMLElementTagNameMap;
    /**
     * Whether to split by lines or not
     * @default false
     */
    lines: boolean;
    /**
     * Whether to split by words or not
     * @default false
     */
    words: boolean;
    /**
     * Whether to split by chars or not
     * @default false
     */
    chars: boolean;
    /**
     * The wrapping options
     * @default undefined
     * @example { select: "lines", wrapType: "span", wrapClass: "inline-block" }
     */
    wrapping?: UseSplitTextOptions["wrapping"];
  }>(),
  {
    as: "p",
    lines: false,
    words: false,
    chars: false,
  },
);

const compRef = ref<HTMLElement | null>(null);
const splitBy = TypesValue.filter((i) => props[i]) as TypesValueTuple;

useSplitText(compRef, {
  splitBy,
  wrapping: props.wrapping,
});

defineExpose({ el: compRef });
</script>

<template>
  <component ref="compRef" :is="props.as"><slot /></component>
</template>
