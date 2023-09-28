<script setup lang="ts">
import { computed, ref, toRefs, useSplitText, watch } from "#imports";
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
    wrapping: undefined,
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

const reactiveProps = toRefs(props);

const compRef = ref<HTMLElement | null>(null);
const splitBy = computed(
  () => TypesValue.filter((i) => reactiveProps[i].value) as TypesValueTuple,
);

const { instance, split } = useSplitText(compRef, {
  splitBy: splitBy.value,
  wrapping: props.wrapping,
  onComplete: (instance) => emit("complete", instance),
});

watch(splitBy, (arr) => split({ types: arr }));

defineExpose({ el: compRef });
</script>

<template>
  <component :is="props.as" ref="compRef">
    <slot :instance="instance" />
  </component>
</template>
