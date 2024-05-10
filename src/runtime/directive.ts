import { directiveHooks } from "@vueuse/core";
import type SplitType from "split-type";
import type { ObjectDirective } from "vue";
import { useSplitText } from "./composable";
import type { UseSplitTextOptions } from "./composable";

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
