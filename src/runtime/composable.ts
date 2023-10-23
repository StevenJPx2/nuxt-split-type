import SplitType, { TypesValue, SplitTypeOptions } from "split-type";
import { MaybeComputedElementRef, TypeOptions } from "./types";
import {
  unrefElement,
  useEventListener,
  tryOnScopeDispose,
  computed,
  watch,
  ComputedRef,
} from "#imports";

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
   * ```
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
    select: TypesValue;
    /** The class to apply to the wrapping element */
    selectElClass?: string;
  };
  /**
   * The callback to run after the split has completed
   * @param `instanceVal` - The instance of SplitType
   * @default undefined
   * @example
   * ```
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
   * ```
   * {
   *  splitClass: "splitted"
   * }
   * ```
   * */
  splitOptions?: Partial<Omit<SplitTypeOptions, "types" | "split">>;
};

export type UseSplitTextReturn = {
  instance: ComputedRef<SplitType | undefined>;
  lines: ComputedRef<HTMLElement[] | null | undefined>;
  words: ComputedRef<HTMLElement[] | null | undefined>;
  chars: ComputedRef<HTMLElement[] | null | undefined>;
  split: (options: Partial<SplitTypeOptions>) => void;
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
      if (
        (["chars", "words"] as TypesValue[]).every((sp) => splitBy.includes(sp))
      )
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

  useEventListener(
    "resize",
    () => {
      split({});
    },
    { passive: true },
  );

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
