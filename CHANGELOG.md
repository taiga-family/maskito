# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.1](https://github.com/tinkoff/maskito/compare/v0.7.0...v0.7.1) (2023-03-22)

### Bug Fixes

- **angular:** use `@nrwl/angular:package` executor instead of `@nrwl/angular:ng-packagr-lite`
  ([#216](https://github.com/tinkoff/maskito/issues/216))
  ([164d015](https://github.com/tinkoff/maskito/commit/164d015c2f18a279e195b45329e84c0d023c9483))
- **kit:** `Number` broken `Delete`-button navigation if `decimalZeroPadding=true`
  ([#211](https://github.com/tinkoff/maskito/issues/211))
  ([1b750d1](https://github.com/tinkoff/maskito/commit/1b750d135ebd53bfeda2ca734425de08a808b1af))

## [0.7.0](https://github.com/tinkoff/maskito/compare/v0.6.0...v0.7.0) (2023-03-20)

### Features

- **core:** add `deleteSoftLineBackward` & `deleteSoftLineForward` support
  ([#207](https://github.com/tinkoff/maskito/issues/207))
  ([cbd5479](https://github.com/tinkoff/maskito/commit/cbd5479c04c07113804eee6ea6c9838ee8681597))
- **kit:** use 1 as min segment value in `Date`-related masks ([#197](https://github.com/tinkoff/maskito/issues/197))
  ([c85ca23](https://github.com/tinkoff/maskito/commit/c85ca2355cb0b6fcef73f3e7497f7c31fa82c87c))

### Bug Fixes

- **core:** `Maskito` losses valid characters on invalid insertion (`overwriteMode: replace`)
  ([#208](https://github.com/tinkoff/maskito/issues/208))
  ([ef183b4](https://github.com/tinkoff/maskito/commit/ef183b454e4a7db5b2cb48cbe26129bf303f676a))
- **kit:** `Number` should drop leading zeroes for negative numbers
  ([#204](https://github.com/tinkoff/maskito/issues/204))
  ([6e9adf7](https://github.com/tinkoff/maskito/commit/6e9adf758aa585944ee08f2e2aff81a5664adefd))

## [0.6.0](https://github.com/tinkoff/maskito/compare/v0.5.0...v0.6.0) (2023-03-15)

### Features

- **angular:** add CVA and pipe ([#187](https://github.com/tinkoff/maskito/issues/187))
  ([a099257](https://github.com/tinkoff/maskito/commit/a099257a16b569444cdae9276ce66e9a806f531e))
- **core:** add `deleteWordBackward` & `deleteWordForward` support
  ([#193](https://github.com/tinkoff/maskito/issues/193))
  ([24b761c](https://github.com/tinkoff/maskito/commit/24b761c84d0947df5e4c78a2114f1de8f6ca20f4))

### Bug Fixes

- **core:** show trailing fixed characters + duplicated fixed character on `Drop`
  ([#185](https://github.com/tinkoff/maskito/issues/185))
  ([c7f6a1b](https://github.com/tinkoff/maskito/commit/c7f6a1bb8098b5641ed8c6921c2ebc86c6135b58))
- **kit:** `maskitoParseNumber` incorrectly parses negative numbers
  ([#190](https://github.com/tinkoff/maskito/issues/190))
  ([d713bd1](https://github.com/tinkoff/maskito/commit/d713bd143e5090870a406ea14498cb99843bb9d0))
- **kit:** `Number` should drop decimal part on paste from clipboard if `precision=0`
  ([#195](https://github.com/tinkoff/maskito/issues/195))
  ([ba85c38](https://github.com/tinkoff/maskito/commit/ba85c38ec0c81a22ff758f4ba386d045ac49ffd5))

## [0.5.0](https://github.com/tinkoff/maskito/compare/v0.4.0...v0.5.0) (2023-03-09)

### Features

- **core:** new utility `maskitoTransform(value, maskitoOptions)`
  ([#177](https://github.com/tinkoff/maskito/issues/177))
  ([20316f1](https://github.com/tinkoff/maskito/commit/20316f15e153bfeeb45eda6406b8792e00f3238f))
- **kit:** new utility `maskitoParseNumber` ([#178](https://github.com/tinkoff/maskito/issues/178))
  ([fc58141](https://github.com/tinkoff/maskito/commit/fc58141625ecbdc7d804aa382a69b38bf7146fc4))

### Bug Fixes

- **kit:** `Number` mask throws an error on empty string in `thousandSeparator`
  ([#176](https://github.com/tinkoff/maskito/issues/176))
  ([cd52fad](https://github.com/tinkoff/maskito/commit/cd52fad80bc278f171dafa1709c54cba3f8fbc81))

## [0.4.0](https://github.com/tinkoff/maskito/compare/v0.3.0...v0.4.0) (2023-03-02)

### Features

- **angular:** `maskitoElement` add new input ([#164](https://github.com/tinkoff/maskito/issues/164))
  ([407c131](https://github.com/tinkoff/maskito/commit/407c131d2d8f8514173ad7a5e248759e2d4f8abc))

### Bug Fixes

- **kit:** `Number` pads empty integer part when paste from clipboard
  ([#168](https://github.com/tinkoff/maskito/issues/168))
  ([d043a82](https://github.com/tinkoff/maskito/commit/d043a82561cbed94b19d59d174fa6da7f08d49d4))

## [0.3.0](https://github.com/tinkoff/maskito/compare/v0.2.0...v0.3.0) (2023-03-01)

### Features

- **angular:** add other maskito packages to `ng-update.packageGroup` of `package.json`
  ([#161](https://github.com/tinkoff/maskito/issues/161))
  ([bdecdaa](https://github.com/tinkoff/maskito/commit/bdecdaa9cac2681e35191cabd2d5d853eb97a09d))

### Bug Fixes

- **kit:** `Date`-mask fix wrong year that appears using the min property
  ([#157](https://github.com/tinkoff/maskito/issues/157))
  ([544e891](https://github.com/tinkoff/maskito/commit/544e8912d2752e0fc8f77757e935070b94823f65))

## [0.2.0](https://github.com/tinkoff/maskito/compare/v0.1.1...v0.2.0) (2023-02-28)

### Features

- **kit:** new `DateTime` mask ([#146](https://github.com/tinkoff/maskito/issues/146))
  ([6d6b2c1](https://github.com/tinkoff/maskito/commit/6d6b2c17b5c0f62bc804451524cd4b2ce3e50660))

### Bug Fixes

- **kit:** `Number` is now replacing hyphen, en-dash and em-dash with minus sign
  ([#153](https://github.com/tinkoff/maskito/issues/153))
  ([1f21f11](https://github.com/tinkoff/maskito/commit/1f21f1159baadcef65e49bacaec77eba3b6f36d8))

### [0.1.1](https://github.com/tinkoff/maskito/compare/v0.1.0...v0.1.1) (2023-02-15)

### Bug Fixes

- **core:** `Module parse failed: 'import' and 'export' may appear only with 'sourceType: module'`
  ([#131](https://github.com/tinkoff/maskito/issues/131))
  ([41e05c0](https://github.com/tinkoff/maskito/commit/41e05c09e41ed611e0c2b9aa07a953dfbe049da7))

## 0.1.0 (2023-02-14)

This release introduces the first publishing of the following packages:

- `@maskito/core` <br /> It is the main zero-dependency and framework-agnostic package. It can be used alone in Vanilla
  JavaScript project. It listens `beforeinput` and `input` events to validate and calibrate textfield's value. <br />
  Read more: https://tinkoff.github.io/maskito/core-concepts/overview
- `@maskito/kit` <br /> The optional framework-agnostic package. It contains ready-to-use masks with configurable
  parameters. This release introduces the following masks:
  - [Number](https://tinkoff.github.io/maskito/kit/number)
  - [Time](https://tinkoff.github.io/maskito/kit/time)
  - [Date](https://tinkoff.github.io/maskito/kit/date)
  - [DateRange](https://tinkoff.github.io/maskito/kit/date-range)
- `@maskito/angular`<br /> The Angular-specific library. It provides two convenient ways of using Maskito:
  - Basic directive approach (when developer has direct access to native input element).
  - Dependency Injection approach (when native input element is hidden somewhere deep inside another component).
