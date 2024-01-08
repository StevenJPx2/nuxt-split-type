<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt SplitType
- Package name: nuxt-split-type
- Description: Nuxt integration for SplitType.
-->

# Nuxt SplitType

> [!NOTE]
> This module is currently pre v1, and might have bugs. Please feel free to open an issue if you see a bug!

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Nuxt][nuxt-href] integration for [SplitType](https://github.com/lukepeavey/SplitType).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://codesandbox.io/p/devbox/charming-leaf-3mct89?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clr3qtcdc00073b6h4wunverv%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clr3qtcdc00023b6ht7nocw3j%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clr3qtcdc00043b6hn5bwdnw6%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clr3qtcdc00063b6h1609gb2f%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clr3qtcdc00023b6ht7nocw3j%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clr3qtcdc00013b6ho7x1scje%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522clr3qtcdc00023b6ht7nocw3j%2522%252C%2522activeTabId%2522%253A%2522clr3qtcdc00013b6ho7x1scje%2522%257D%252C%2522clr3qtcdc00063b6h1609gb2f%2522%253A%257B%2522id%2522%253A%2522clr3qtcdc00063b6h1609gb2f%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clr3qtcdc00053b6hn5in815l%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clr3qtcdc00053b6hn5in815l%2522%257D%252C%2522clr3qtcdc00043b6hn5bwdnw6%2522%253A%257B%2522id%2522%253A%2522clr3qtcdc00043b6hn5bwdnw6%2522%252C%2522activeTabId%2522%253A%2522clr3r7t3h00wf3b6hgv4d7ahy%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clr3r7t3h00wf3b6hgv4d7ahy%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)
- [📖 &nbsp;Documentation](#usage)

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰  Activate SplitType however you want: directive, component or composable
- 💪 Full Typescript support, including improvements on the original SplitType library.
- ✨ Special `wrapping` selector to wrap either lines, words or chars with a special HTML element with defined classes
- 🚠 Callback for SpiltType Proxy

## Quick Setup

1. Add `nuxt-split-type` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-split-type

# Using yarn
yarn add --dev nuxt-split-type

# Using npm
npm install --save-dev nuxt-split-type
```

2. Add `nuxt-split-type` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-split-type'
  ]
})
```

That's it! You can now use Nuxt SplitType in your Nuxt app ✨

## Usage

### Composable
```vue
<script setup lang="ts">
const pRef = ref<HTMLParagraphElement | null>(null);
const { revert } = useSplitText(pRef, {
  splitBy: "lines, words",
  onComplete: (instance) => {
    console.log("complete", instance);
  },
});

useTimeoutFn(async () => {
  console.log("revert");
  revert();
}, 4000);

</script>

<template>
  <p ref="pRef">Nuxt SplitType is the best!</p>
</template>
```

### Component
```vue
<template>
  <split-text
    lines
    words
    :wrapping="{ wrapType: 'span', wrapClass: 'inline-block', select: 'lines' }"
    @complete="(ins) => console.log('done', ins)"
    v-slot="{ instance }"
  >
    Nuxt SplitType is the best!
  </split-text>
</template>
```

### Directive
```vue
<template>
  <p v-split-text="{ splitBy: 'lines, words' }">
    Nuxt SplitType is the best!
  </p>
</template>

```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-split-type/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-split-type

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-split-type.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-split-type

[license-src]: https://img.shields.io/npm/l/nuxt-split-type.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-split-type

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
