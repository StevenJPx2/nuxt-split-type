import type { ObjectDirective } from "nuxt/dist/app/compat/capi";
import { useSplitText } from "./composable";
import type { UseSplitTextOptions } from "./composable";
import { directiveHooks } from "@vueuse/core";
import type SplitType from "split-type";

type VSplitTextOptions = UseSplitTextOptions & {
  /** Callback when the split is complete */
  onComplete?: (instance: SplitType) => void;
};

export const vSplitText: ObjectDirective<HTMLElement, VSplitTextOptions> = {
  [directiveHooks.mounted]: (el, binding) => {
    const { value } = binding;
    useSplitText(el, value);
  },
};
