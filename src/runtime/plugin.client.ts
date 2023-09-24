import { defineNuxtPlugin } from "#app";
import { vSplitText } from "./directive";
export { vSplitText };

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive("split-text", vSplitText);
});
