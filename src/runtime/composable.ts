import {
  type TypesValue,
  type SplitTypeOptions,
  default as SplitType,
} from "split-type";
import type { TypeOptions } from "./types";
import {
  unrefElement,
  useEventListener,
  tryOnScopeDispose,
  computed,
  watch,
  useDebounceFn,
  type ComputedRef,
} from "#imports";
import type { MaybeComputedElementRef } from "@vueuse/core";

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
    wrapType: keyof HTMLElementTagNameMap;
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
   * @remarks This is a computed ref
   * */
  instance: ComputedRef<SplitType | undefined>;
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
  const unRefedTarget = computed(() => unrefElement(target) as HTMLElement),
    instance = computed<SplitType | undefined>(() =>
      !unRefedTarget.value
        ? undefined
        : new SplitType(unRefedTarget.value, {
            types: options.splitBy,
            ...options.splitOptions,
          }),
    ),
    lines = computed(() => instance.value?.lines),
    words = computed(() => instance.value?.words),
    chars = computed(() => instance.value?.chars),
    split = (options: Partial<SplitTypeOptions>) => {
      instance.value?.split(options);
      if (!!instance.value && !!wrapping) wrapFn(instance.value);
    },
    revert = () => instance.value?.revert(),
    { splitBy, wrapping, onComplete } = options,
    wrapFn = (instance: SplitType) => {
      if ((["chars", "words"] as const).every((sp) => splitBy.includes(sp)))
        instance.words?.forEach((el) => (el.style.display = "inline-flex"));

      if (!wrapping) return;
      instance[wrapping.select]?.forEach((childEl, index) => {
        const wrapEl = document.createElement(wrapping.wrapType);
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
    instance,
    (instance) => {
      if (!instance) return;
      wrapFn(instance);
      onComplete?.(instance);
    },
    { flush: "post" },
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
