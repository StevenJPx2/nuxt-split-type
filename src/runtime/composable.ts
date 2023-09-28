import SplitType, { TypesValue, SplitTypeOptions } from "split-type";
import { MaybeComputedElementRef, TypeOptions } from "./types";
import {
  unrefElement,
  useEventListener,
  tryOnScopeDispose,
  computed,
  watch,
} from "#imports";

export type UseSplitTextOptions = {
  /** The types of splits to apply to the target element
   * @example `["lines", "words", "chars"]`
   *
   * */
  splitBy: TypeOptions;
  /**
   * The wrapping options
   * @param `select` - apply wrapping to the specified split type - {TypesValue}
   * @param `selectElClass` - The class to apply to the selected elements
   * @param `wrapType` - The type of element to wrap with - {HTMLTag}
   * @param `wrapClass` - The class to apply to the wrapping element
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
    wrapType: keyof HTMLElementTagNameMap;
    wrapClass?: string;
    select: TypesValue;
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

export function useSplitText(
  target: MaybeComputedElementRef,
  options: UseSplitTextOptions,
) {
  const unRefedTarget = computed(() => unrefElement(target) as HTMLElement);
  const instance = computed<SplitType | undefined>(() =>
    !unRefedTarget.value
      ? undefined
      : new SplitType(unRefedTarget.value, {
          types: options.splitBy,
          ...options.splitOptions,
        }),
  );
  const { splitBy, wrapping, onComplete } = options;

  const wrapFn = (instance: SplitType) => {
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

      if (
        (["chars", "words"] as TypesValue[]).every((sp) => splitBy.includes(sp))
      )
        instance.words?.forEach((el) => (el.style.display = "inline-flex"));

      wrapFn(instance);
      onComplete?.(instance);
    },
    { flush: "post" },
  );

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
    lines: computed(() => instance.value?.lines),
    words: computed(() => instance.value?.words),
    chars: computed(() => instance.value?.chars),
    split: (options: Partial<SplitTypeOptions>) => {
      instance.value?.split(options);
      if (!!instance.value && !!wrapping) wrapFn(instance.value);
    },
    revert: () => instance.value?.revert(),
  };
}

export type UseSplitTextReturn = ReturnType<typeof useSplitText>;
