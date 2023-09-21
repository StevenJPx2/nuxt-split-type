import SplitType, { TypesValue } from "split-type";
import { MaybeComputedElementRef, TypeOptions } from "./types";
import {
  ref,
  unrefElement,
  useEventListener,
  tryOnScopeDispose,
  useMounted,
  tryOnMounted,
  createEventHook,
} from "#imports";

type UseSplitTextOptions = {
  splitBy: TypeOptions;
  wrapping?: {
    wrapType: keyof HTMLElementTagNameMap;
    wrapClass?: string;
    select: TypesValue;
  };
};

export function useSplitText(
  target: MaybeComputedElementRef,
  options: UseSplitTextOptions,
) {
  const instance = ref<SplitType>();
  const isMounted = useMounted();
  const { splitBy, wrapping } = options;
  const onComplete = createEventHook<SplitType>();

  const fn = () => {
    if (!isMounted.value) return;

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

    onComplete.trigger(instanceVal);
  };

  fn();
  tryOnMounted(fn);

  useEventListener(
    "resize",
    () => {
      console.log("resized");
      instance.value?.split({});
    },
    { passive: true },
  );

  tryOnScopeDispose(instance.value?.revert ?? (() => {}));

  return {
    instance,
    onComplete: onComplete.on,
  };
}
