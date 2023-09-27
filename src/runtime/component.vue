<script setup lang="ts">
import { ref, useSplitText } from "#imports";
import { TypesValue, TypesValueTuple } from "./types";
import { UseSplitTextOptions } from "./composable";
import SplitType from "split-type";

const props = withDefaults(
  defineProps<{
    /**
     * What you want it to render as
     * @default "p"
     */
    as?: keyof HTMLElementTagNameMap;
    /**
     * Whether to split by lines or not
     * @default false
     */
    lines?: boolean;
    /**
     * Whether to split by words or not
     * @default false
     */
    words?: boolean;
    /**
     * Whether to split by chars or not
     * @default false
     */
    chars?: boolean;
    /**
     * The wrapping options
     * @param `select` - apply wrapping to the specified split type - {TypesValue}
     * @param `wrapType` - The type of element to wrap with - {HTMLTag}
     * @param `wrapClass` - The class to apply to the wrapping element
     * @default undefined
     * @example
     * ```
     * {
     *   select: "lines",
     *   wrapType: "span",
     *   wrapClass: "inline-block"
     * }
     * ```
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

const emit = defineEmits<{
  /**
   * The callback function
   * @example () => console.log("done")
   * @default undefined
   */
  complete: [instance: SplitType];
}>();

const compRef = ref<HTMLElement | null>(null);
const splitBy = TypesValue.filter((i) => props[i]) as TypesValueTuple;

const { instance } = useSplitText(compRef, {
  splitBy,
  wrapping: props.wrapping,
  onComplete: (instance) => emit("complete", instance),
});

defineExpose({ el: compRef });
</script>

<template>
  <component ref="compRef" :is="props.as">
    <slot :instance="instance" />
  </component>
</template>
