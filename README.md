<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt SplitType
- Package name: nuxt-split-type
- Description: Nuxt integration for SplitType.
-->

# Nuxt SplitType

> [!WARNING]
> This module is currently in pre-release and not production ready. However, I'm open to suggestions!

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Nuxt][nuxt-href] integration for [SplitType](https://github.com/lukepeavey/SplitType).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-split-type?file=playground%2Fapp.vue) -->
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
