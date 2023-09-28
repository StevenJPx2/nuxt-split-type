import SplitType, { TypesValue } from "split-type";
import { MaybeComputedElementRef, TypeOptions } from "./types";
import {
  ref,
  unrefElement,
  useEventListener,
  tryOnScopeDispose,
  tryOnMounted,
  computed,
} from "#imports";
import { defaultWindow, watchOnce } from "@vueuse/core";

export type UseSplitTextOptions = {
  /** The types of splits to apply to the target element
   * @example `["lines", "words", "chars"]`
   *
   * */
  splitBy: TypeOptions;
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
  wrapping?: {
    wrapType: keyof HTMLElementTagNameMap;
    wrapClass?: string;
    select: TypesValue;
  };
  onComplete?: (instanceVal: SplitType) => void;
};

export function useSplitText(
  target: MaybeComputedElementRef,
  options: UseSplitTextOptions,
) {
  const hasRun = ref(false);
  const unRefedTarget = computed(() => unrefElement(target) as HTMLElement);
  const instance = ref<SplitType>();
  const { splitBy, wrapping, onComplete } = options;

  const fn = () => {
    if (!defaultWindow || hasRun.value) return;

    instance.value = new SplitType(unRefedTarget.value, { types: splitBy });
    const instanceVal = instance.value;
    if (
      (["chars", "words"] as TypesValue[]).every((sp) => splitBy.includes(sp))
    )
      instanceVal.words?.forEach((el) => (el.style.display = "inline-flex"));

    if (wrapping) {
      const { select, wrapClass, wrapType } = wrapping;

      instanceVal[select]?.forEach((childEl, index) => {
        const wrapEl = document.createElement(wrapType);
        childEl.classList.add("h-fit", "origin-top-left");
        if (wrapClass) wrapEl.classList.add(...wrapClass.split(" "));
        wrapEl.dataset[`${select}Index`] = `${index}`;
        childEl.parentNode?.appendChild(wrapEl);
        wrapEl.appendChild(childEl);
      });
    }

    onComplete?.(instanceVal);
    hasRun.value = true;
  };

  watchOnce(unRefedTarget, fn, { immediate: false, flush: "pre" });
  tryOnMounted(fn);

  useEventListener(
    "resize",
    () => {
      instance.value?.split({});
    },
    { passive: true },
  );

  tryOnScopeDispose(instance.value?.revert ?? (() => {}));

  return {
    instance,
  };
}

export type UseSplitTextReturn = ReturnType<typeof useSplitText>;
