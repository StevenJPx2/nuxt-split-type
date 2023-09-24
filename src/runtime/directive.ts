import { ObjectDirective } from "nuxt/dist/app/compat/capi";
import { UseSplitTextOptions, useSplitText } from "./composable";
import { directiveHooks } from "@vueuse/core";
import SplitType from "split-type";

type VSplitTextOptions = UseSplitTextOptions & {
  onComplete?: (instance: SplitType) => void;
};

export const vSplitText: ObjectDirective<HTMLElement, VSplitTextOptions> = {
  [directiveHooks.mounted]: (el, binding) => {
    const { value } = binding;
    const { onComplete } = useSplitText(el, value);
    if (!!value.onComplete) onComplete(value.onComplete);
  },
};
