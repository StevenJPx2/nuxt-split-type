import SplitType, { TypesValue } from "split-type";
import { MaybeComputedElementRef, TypeOptions } from "./types";
import {
  ref,
  useWindowSize,
  unrefElement,
  watch,
  tryOnMounted,
  useEventListener,
  tryOnScopeDispose,
} from "#imports";

// TODO: Return reset function

type UseSplitTextOptions = {
  splitBy: TypeOptions;
  wrapping?: {
    wrapType: keyof HTMLElementTagNameMap;
    wrapClass?: string;
    select: TypesValue;
  };
  onComplete?: (instanceVal: SplitType) => void;
};

function isInstanceNotNullish(
  instance: SplitType | null | undefined,
): asserts instance is SplitType {
  if (!instance || typeof instance !== "object")
    throw new Error("useSplitText only works on mount");
}

export function useSplitText(
  target: MaybeComputedElementRef,
  options: UseSplitTextOptions,
) {
  const instance = ref<SplitType>();
  const { splitBy, wrapping, onComplete } = options;

  const fn = () => {
    if (window || undefined) return;
    const unRefedTarget = unrefElement(target) as HTMLElement;
    instance.value = new SplitType(unRefedTarget, { types: splitBy });
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
        if (!!wrapClass) wrapEl.classList.add(...wrapClass.split(" "));
        wrapEl.dataset[`${select}Index`] = `${index}`;
        childEl.parentNode?.appendChild(wrapEl);
        wrapEl.appendChild(childEl);
      });
    }
  };

  fn();

  useEventListener(
    "resize",
    () => {
      console.log("resized");
      instance.value?.split({});
    },
    { passive: true },
  );

  isInstanceNotNullish(instance.value);

  tryOnScopeDispose(instance.value.revert);

  return {
    instance,
    revert: instance.value.revert,
    split: instance.value.split,
  };
}
