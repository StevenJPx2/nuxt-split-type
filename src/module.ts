import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  installModule,
} from "@nuxt/kit";

import { name, version } from "../package.json";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "splitType",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));

    await installModule("@vueuse/nuxt", {});
  },
});