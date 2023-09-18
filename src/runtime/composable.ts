import SplitType, { TypesValue } from "split-type";
import { MaybeComputedElementRef, TypeOptions } from "./types";
import { ref, useWindowSize, unrefElement, watch } from "#imports";

type UseSplitTextOptions = {
  splitBy: TypeOptions;
  wrapping?: {
    wrapType: keyof HTMLElementTagNameMap;
    wrapClass: string;
    select: TypesValue;
  };
  onComplete?: (instanceVal: SplitType) => void;
};

export default function useSplitText(
  target: MaybeComputedElementRef,
  options: UseSplitTextOptions,
) {
  const instance = ref<SplitType>();
  const { splitBy, wrapping, onComplete } = options;

  const fn = () => {
    const unRefedTarget = unrefElement(target) as HTMLElement;
    instance.value = new SplitType(unRefedTarget, { types: splitBy });
    const instanceVal = instance.value;
    if (
      (["chars", "words"] as TypesValue[]).every((sp) => splitBy.includes(sp))
    )
      instanceVal.words?.forEach((el) => (el.style.display = "inline-flex"));

    if (wrapping) {
      instanceVal[wrapping.select]?.forEach((childEl, index) => {
        const { wrapType, wrapClass } = wrapping;
        const wrapEl = document.createElement(wrapType);
        childEl.classList.add("h-fit", "origin-top-left");
        wrapEl.classList.add(...wrapClass.split(" "));
        wrapEl.dataset[`${wrapping.select}-index`] = `${index}`;
        childEl.parentNode?.appendChild(wrapEl);
        wrapEl.appendChild(childEl);
      });
    }
  };

  fn();

  const { width } = useWindowSize();

  watch(width, () => {
    instance.value?.split({});
  });

  return { instance };
}
