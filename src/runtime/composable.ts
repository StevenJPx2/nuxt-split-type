import type { MaybeComputedElementRef } from "@vueuse/core";
import {
  tryOnScopeDispose,
  unrefElement,
  useDebounceFn,
  useEventListener,
} from "@vueuse/core";
import {
  default as SplitType,
  type SplitTypeOptions,
  type TypesValue,
} from "split-type";
import { type ComputedRef, type Ref, computed, ref, watch } from "vue";
import type { TypeOptions } from "./types";

export type UseSplitTextOptions = {
  /** The types of splits to apply to the target element
   * @example `["lines", "words", "chars"]`
   *
   * */
  splitBy: TypeOptions;
  /**
   * The wrapping options
   * @default undefined
   * @example
   * ```ts
   * {
   *   select: "lines",
   *   wrapType: "span",
   *   wrapClass: "inline-block"
   *   selectElClass: "h-fit origin-top-left"
   * }
   * ```
   */
  wrapping?: {
    /** The type of element to wrap with - {HTMLTag} */
    wrapType?: keyof HTMLElementTagNameMap;
    /** The class to apply to the selected elements */
    wrapClass?: string;
    /** The type of split to apply the wrapping to */
    select: TypesValue[number];
    /** The class to apply to the wrapping element */
    selectElClass?: string;
  };
  /**
   * The callback to run after the split has completed
   * @param `instanceVal` - The instance of SplitType
   * @default undefined
   * @example
   * ```ts
   *  (instanceVal) => {
   *    instanceVal.words?.forEach((el) => (el.style.display = "inline-flex"));
   *  }
   *  ```
   *  */
  onComplete?: (instanceVal: SplitType) => void;
  /**
   * The options to pass to the SplitType instance
   * @default undefined
   * @example
   * ```ts
   * {
   *  splitClass: "splitted"
   * }
   * ```
   * */
  splitOptions?: Partial<Omit<SplitTypeOptions, "types" | "split">>;
};

export type UseSplitTextReturn = {
  /** The instance of SplitType as a ref
   * */
  instance: Ref<SplitType | undefined>;
  /** The lines of the split as a ref
   * @remarks It will be null if `lines` is not included in `splitBy`
   * */
  lines: ComputedRef<HTMLElement[] | null | undefined>;
  /** The words of the split as a ref
   * @remarks It will be null if `words` is not included in `splitBy`
   * */
  words: ComputedRef<HTMLElement[] | null | undefined>;
  /** The chars of the split as a ref
   * @remarks It will be null if `chars` is not included in `splitBy`
   * */
  chars: ComputedRef<HTMLElement[] | null | undefined>;
  /** The split function
   * @param `options` - The options to pass to the SplitType instance
   * @remarks This function will split the target element
   * Useful for splitting the element again after a resize event
   * This is done automatically on resize
   * */
  split: (options: Partial<SplitTypeOptions>) => void;
  /** The revert function
   * @remarks This function will revert the target element
   * Automatically called on component unmount
   * */
  revert: () => void;
};

export function useSplitText(
  target: MaybeComputedElementRef,
  options: UseSplitTextOptions,
): UseSplitTextReturn {
  const instance = ref<SplitType | undefined>();
  const lines = computed(() => instance.value?.lines);
  const words = computed(() => instance.value?.words);
  const chars = computed(() => instance.value?.chars);
  const split = (options: Partial<SplitTypeOptions>) => {
    instance.value?.split(options);
    if (!!instance.value && !!wrapping) wrapFn(instance.value);
  };
  const revert = () => instance.value?.revert();
  const { splitBy, wrapping, onComplete } = options;
  const wrapFn = (instance: SplitType) => {
    if ((["chars", "words"] as const).every((sp) => splitBy.includes(sp)))
      for (const el of instance.words ?? []) {
        el.style.display = "inline-flex";
      }

    if (!wrapping) return;
    instance[wrapping.select]?.forEach((childEl, index) => {
      const wrapEl = document.createElement(wrapping.wrapType ?? "span");
      if (wrapping.selectElClass)
        childEl.classList.add(...wrapping.selectElClass.split(" "));
      if (wrapping.wrapClass)
        wrapEl.classList.add(...wrapping.wrapClass.split(" "));
      wrapEl.dataset[`${wrapping.select}Index`] = `${index}`;
      childEl.parentNode?.appendChild(wrapEl);
      wrapEl.appendChild(childEl);
    });
  };

  watch(
    () => unrefElement(target),
    (el) => {
      if (!el) return;
      instance.value = new SplitType(el as HTMLElement, {
        types: splitBy,
        ...options.splitOptions,
      });
      split({});
      onComplete?.(instance.value);
    },
    { immediate: true, flush: "post" },
  );

  const resizeFn = useDebounceFn(() => {
    split({});
  }, 500);

  useEventListener("resize", resizeFn, { passive: true });

  tryOnScopeDispose(revert);

  return {
    instance,
    lines,
    words,
    chars,
    split,
    revert,
  };
}
