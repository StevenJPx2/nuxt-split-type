import {
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  defineNuxtModule,
  installModule,
} from "@nuxt/kit";

import { name, version } from "../package.json";

// Module options TypeScript interface definition
export type ModuleOptions = Record<string, never>;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "splitType",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup() {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImports({
      name: "useSplitText",
      as: "useSplitText",
      from: resolver.resolve("./runtime/composable"),
    });
    addComponent({
      name: "SplitText",
      filePath: resolver.resolve("./runtime/component"),
    });

    await installModule("@vueuse/nuxt", {});
  },
});

export { vSplitText } from "./runtime/directive";
export { useSplitText } from "./runtime/composable";
export type {
  UseSplitTextReturn,
  UseSplitTextOptions,
} from "./runtime/composable";
