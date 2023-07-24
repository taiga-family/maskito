# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0](https://github.com/tinkoff/maskito/compare/v1.2.2...v1.3.0) (2023-07-24)

### Features

- **kit:** `DateRange` add configurable parameter `rangeSeparator`
  ([#376](https://github.com/tinkoff/maskito/issues/376))
  ([d904842](https://github.com/tinkoff/maskito/commit/d90484214da76f4c73ad925eef5fe391a154c499))

### Bug Fixes

- **kit:** `Number` has problems with run-time updates of postfix
  ([#380](https://github.com/tinkoff/maskito/issues/380))
  ([8210896](https://github.com/tinkoff/maskito/commit/8210896d2095a44e79a27a38e4c8745e2beccdb7))

### [1.2.2](https://github.com/tinkoff/maskito/compare/v1.2.1...v1.2.2) (2023-07-19)

### Bug Fixes

- **kit:** `maskitoCaretGuard` should wait for `mouseup` before execution
  ([#372](https://github.com/tinkoff/maskito/issues/372))
  ([8554fea](https://github.com/tinkoff/maskito/commit/8554fead2a2474104f0674fb597cf86467274943))
- **kit:** `Number` should remove repeated leading zeroes for integer part only on `blur`-event
  ([#373](https://github.com/tinkoff/maskito/issues/373))
  ([7cf4938](https://github.com/tinkoff/maskito/commit/7cf4938853ccbd049b89482f8eb22ab4e71fe01f))

### [1.2.1](https://github.com/tinkoff/maskito/compare/v1.2.0...v1.2.1) (2023-07-11)

### Bug Fixes

- **kit:** `Number` with `postfix` should be compatible with `decimalZeroPadding`
  ([#364](https://github.com/tinkoff/maskito/issues/364))
  ([501cf9c](https://github.com/tinkoff/maskito/commit/501cf9c747229d1776fb62cc04fbc8879990c617))
- **kit:** `Prefix`/`Postfix` is incompatible if they end/start with the same character
  ([#366](https://github.com/tinkoff/maskito/issues/366))
  ([06afbcb](https://github.com/tinkoff/maskito/commit/06afbcb4a2c5c15e2ef9dc81db4309adf01aa8ef))

## [1.2.0](https://github.com/tinkoff/maskito/compare/v1.1.1...v1.2.0) (2023-07-03)

### Features

- **kit:** `maskitoCaretGuard`'s function has the 2nd argument with current selection range
  ([#358](https://github.com/tinkoff/maskito/issues/358))
  ([eedc4d6](https://github.com/tinkoff/maskito/commit/eedc4d610efaf36b98a4049f5c5334561b5b21c5))

### Bug Fixes

- **kit:** `maskitoCaretGuard` incorrectly validates the left side of constraints
  ([#356](https://github.com/tinkoff/maskito/issues/356))
  ([17ee90f](https://github.com/tinkoff/maskito/commit/17ee90fe055f6a8370d6ea75ff2b236fd498441e))
- **kit:** `Number` should skip min/max validation if value does not contain any digits
  ([#359](https://github.com/tinkoff/maskito/issues/359))
  ([ed8221e](https://github.com/tinkoff/maskito/commit/ed8221e14eca62334af41b4c8e571eb86ed68247))

### [1.1.1](https://github.com/tinkoff/maskito/compare/v1.1.0...v1.1.1) (2023-06-29)

### Bug Fixes

- **core:** don't ignore native attribute `maxlength` ([#350](https://github.com/tinkoff/maskito/issues/350))
  ([8504f49](https://github.com/tinkoff/maskito/commit/8504f497152931da06dd745763be2505587f97b4))
- **kit:** `Number` should ignore new typed decimal separator if it already exists in text field
  ([#351](https://github.com/tinkoff/maskito/issues/351))
  ([4ccfdc8](https://github.com/tinkoff/maskito/commit/4ccfdc86ff08bcebfd18c04403aa9c9c83cbbd02))

## [1.1.0](https://github.com/tinkoff/maskito/compare/v1.0.0...v1.1.0) (2023-06-23)

### Features

- **kit:** `maskitoEventHandler` accepts `AddEventListenerOptions` as the 3d optional argument
  ([#346](https://github.com/tinkoff/maskito/issues/346))
  ([1d5866e](https://github.com/tinkoff/maskito/commit/1d5866efa5e0e4736dd735ae006e027e9bd01e31))
- **kit:** use capturing phase for `focus`/`blur` events in plugins
  ([#347](https://github.com/tinkoff/maskito/issues/347))
  ([ef539e1](https://github.com/tinkoff/maskito/commit/ef539e160f601023e513036d704f7daff9689286))

### Bug Fixes

- **kit:** `Date` allows to replace the whole selection range with zero
  ([#345](https://github.com/tinkoff/maskito/issues/345))
  ([98fd21d](https://github.com/tinkoff/maskito/commit/98fd21d50899db365b864faf597fad9a21a3db06))

## [1.0.0](https://github.com/tinkoff/maskito/compare/v0.16.0...v1.0.0) (2023-06-21)

### ⚠ BREAKING CHANGES

- **core:** delete deprecated `preprocessor` & `postprocessor` from `MaskitoOptions`
  ([#337](https://github.com/tinkoff/maskito/issues/337))
  ([0b6aad2](https://github.com/tinkoff/maskito/commit/0b6aad2622ed152d12c91f8ca64b767709ecdbc2))
- **kit:** delete deprecated `isNegativeAllowed` parameter from `Number` mask
  ([#338](https://github.com/tinkoff/maskito/issues/338))
  ([9fd3005](https://github.com/tinkoff/maskito/commit/9fd30055b3157072076f7a8567045fac05b6af9e))

## [0.16.0](https://github.com/tinkoff/maskito/compare/v0.15.0...v0.16.0) (2023-06-20)

### Features

- **vue:** support async predicate ([#336](https://github.com/tinkoff/maskito/issues/336))
  ([d1452b5](https://github.com/tinkoff/maskito/commit/d1452b5f1b2f8a252dfd05a5c1eb04ba971a1970))

### Bug Fixes

- **kit:** `Number` fails to parse small number on blur (exponential notation problem)
  ([#339](https://github.com/tinkoff/maskito/issues/339))
  ([7f83a7f](https://github.com/tinkoff/maskito/commit/7f83a7f170906c1911eb4444da2d636c0338ed4a))

## [0.15.0](https://github.com/tinkoff/maskito/compare/v0.14.0...v0.15.0) (2023-06-14)

### Features

- **core:** add new parameters `preprocessors` & `postprocessors` and deprecate `preprocessor` & `postprocessor`
  ([#333](https://github.com/tinkoff/maskito/issues/333))
  ([0137775](https://github.com/tinkoff/maskito/commit/01377751a9875143257930934b1e2a9143b6da03))

### Bug Fixes

- **kit:** `maskitoParseNumber` should return `NaN` for all strings with no digits
  ([#331](https://github.com/tinkoff/maskito/issues/331))
  ([d1ebcec](https://github.com/tinkoff/maskito/commit/d1ebceceedf418b21a68082f7350002d09159ebf))
- **kit:** `Number` incorrectly implements `min`/`max` behaviour ([#334](https://github.com/tinkoff/maskito/issues/334))
  ([9876d88](https://github.com/tinkoff/maskito/commit/9876d885f98f86d18db04d723460b468bca3837d))

## [0.14.0](https://github.com/tinkoff/maskito/compare/v0.13.0...v0.14.0) (2023-06-09)

### Features

- **angular:** `[maskitoElement]` can accept asynchronous predicate
  ([#316](https://github.com/tinkoff/maskito/issues/316))
  ([3d8949e](https://github.com/tinkoff/maskito/commit/3d8949e878e644079b7f5404cb9ebf6c5eadab86))
- **kit:** `Number` pads empty integer part with zero on blur (if decimal part exists)
  ([#328](https://github.com/tinkoff/maskito/issues/328))
  ([bd01967](https://github.com/tinkoff/maskito/commit/bd01967fba38be26a3c8f0d2f23c0ced12d3b1c2))

## [0.13.0](https://github.com/tinkoff/maskito/compare/v0.12.1...v0.13.0) (2023-06-02)

### Features

- **core:** better layout-independent way to detect `Undo` and `Redo`
  ([#320](https://github.com/tinkoff/maskito/issues/320))
  ([4c5a7f6](https://github.com/tinkoff/maskito/commit/4c5a7f64b9a8ac209584c75e17ec022674b87c1b))
- **vue:** add dedicated Vue package ([#321](https://github.com/tinkoff/maskito/issues/321))
  ([f6ffb24](https://github.com/tinkoff/maskito/commit/f6ffb24eca5f1a1a57a93103b9e74cdf410e4132))

### [0.12.1](https://github.com/tinkoff/maskito/compare/v0.12.0...v0.12.1) (2023-05-25)

### Bug Fixes

- **kit:** `DateTime` validate min / max if date is complete ([#314](https://github.com/tinkoff/maskito/issues/314))
  ([5783e76](https://github.com/tinkoff/maskito/commit/5783e766a657abcf0fc7f8a8d12ac1bf412dc18a))
- **kit:** `Time` & `DateTime` should accept time segment separator typed by user
  ([#317](https://github.com/tinkoff/maskito/issues/317))
  ([3bcac7f](https://github.com/tinkoff/maskito/commit/3bcac7f6566043991a9211f04db744a5ec6f019f))

## [0.12.0](https://github.com/tinkoff/maskito/compare/v0.11.1...v0.12.0) (2023-05-19)

### Features

- **core:** add `plugins` to `MaskitoOptions` ([#305](https://github.com/tinkoff/maskito/issues/305))
  ([b512ae2](https://github.com/tinkoff/maskito/commit/b512ae2c64b2a2c6560e2e5c68d8c72952474c71))
- **core:** expose `MaskitoMask`, `MaskitoPreprocessor`, `MaskitoPostprocessor` and `MaskitoPlugin`
  ([#307](https://github.com/tinkoff/maskito/issues/307))
  ([9315a9f](https://github.com/tinkoff/maskito/commit/9315a9f4620b3be86cf3b7af993861664f281a19))
- **kit:** new `maskitoWithPlaceholder` utility ([#299](https://github.com/tinkoff/maskito/issues/299))
  ([21eb69c](https://github.com/tinkoff/maskito/commit/21eb69cfeb73bbe645d5a5879659ab8b6aadbf0c))

### [0.11.1](https://github.com/tinkoff/maskito/compare/v0.11.0...v0.11.1) (2023-05-11)

### Bug Fixes

- **core:** `insertFromDrop` action behaves now in the same way as `insertFromPaste`
  ([#291](https://github.com/tinkoff/maskito/issues/291))
  ([58e0fcc](https://github.com/tinkoff/maskito/commit/58e0fccb7ddd3c741ffa3c8b99efbcf4571aab37))
- **kit:** `Time` doesn't validate time segments on `drop` event ([#289](https://github.com/tinkoff/maskito/issues/289))
  ([0c6d1b9](https://github.com/tinkoff/maskito/commit/0c6d1b9917d0c86a98c0d215c38a0e2076ff5680))

## [0.11.0](https://github.com/tinkoff/maskito/compare/v0.10.0...v0.11.0) (2023-05-02)

### Features

- **react:** new library `@maskito/react` ([#273](https://github.com/tinkoff/maskito/issues/273))
  ([4c2f755](https://github.com/tinkoff/maskito/commit/4c2f755bac9513689964af7fdb7f4deec56bfb52))

## [0.10.0](https://github.com/tinkoff/maskito/compare/v0.9.0...v0.10.0) (2023-04-25)

### Features

- **kit:** `Number` keeps untouched decimal part if `precision: Infinity`
  ([#253](https://github.com/tinkoff/maskito/issues/253))
  ([261779e](https://github.com/tinkoff/maskito/commit/261779ead327397a61b27e634bc827ee70b718f4))
- **kit:** `Number` supports new `prefix` & `postfix` parameters ([#264](https://github.com/tinkoff/maskito/issues/264))
  ([6e78581](https://github.com/tinkoff/maskito/commit/6e785818dabcde623d8c1c40a584166a0a66f5b6))
- **kit:** new `maskitoPostfixPostprocessorGenerator` ([#257](https://github.com/tinkoff/maskito/issues/257))
  ([fdc86db](https://github.com/tinkoff/maskito/commit/fdc86dbad368bfc17efd1047b7d68d9622968bb0))

### Bug Fixes

- **kit:** `Number` fails to trim leading zeroes after deleting of leading digit
  ([#268](https://github.com/tinkoff/maskito/issues/268))
  ([4ae0010](https://github.com/tinkoff/maskito/commit/4ae0010ef2149694d22d7ae9eb8c9880120c8c75))
- **kit:** `Number` should trim redundant thousand separators ([#267](https://github.com/tinkoff/maskito/issues/267))
  ([100b793](https://github.com/tinkoff/maskito/commit/100b79317a420103ca98a3b43fe646a6f77d19d5))
- **kit:** fix first zero in short-format date-mask ([#251](https://github.com/tinkoff/maskito/issues/251))
  ([08bdfd2](https://github.com/tinkoff/maskito/commit/08bdfd26727777c3a6fc870e433003be2b64cc0e))

## [0.9.0](https://github.com/tinkoff/maskito/compare/v0.8.1...v0.9.0) (2023-03-31)

### Features

- **kit:** new `maskitoPrefixPostprocessorGenerator` ([#235](https://github.com/tinkoff/maskito/issues/235))
  ([50f0d58](https://github.com/tinkoff/maskito/commit/50f0d58ccbfa22d15174d76479a9d642687db099))

### Bug Fixes

- **angular:** Jest throws `Class constructor DefaultValueAccessor cannot be invoked without 'new'`
  ([#232](https://github.com/tinkoff/maskito/issues/232))
  ([5089612](https://github.com/tinkoff/maskito/commit/508961288898a5fdd21cc0e26b23ecc8845f9068))

### [0.8.1](https://github.com/tinkoff/maskito/compare/v0.8.0...v0.8.1) (2023-03-27)

### Bug Fixes

- `@maskito/core` & `@maskito/kit` now include both `UMD` and `ESM` module formats
  ([#227](https://github.com/tinkoff/maskito/issues/227))
  ([fa1c514](https://github.com/tinkoff/maskito/commit/fa1c514a5753e3bca20e8b0994e4bf9f1c0ab6a4))

## [0.8.0](https://github.com/tinkoff/maskito/compare/v0.7.2...v0.8.0) (2023-03-23)

### Features

- **kit:** `DateRange` swaps dates if the 2nd date is less than the 1st one
  ([#212](https://github.com/tinkoff/maskito/issues/212))
  ([3efbb42](https://github.com/tinkoff/maskito/commit/3efbb42f2dd5c4e43ff514da7a82abfc7c4b3a38))

### Bug Fixes

- **core:** incorrect order of actions during update of native element
  ([#225](https://github.com/tinkoff/maskito/issues/225))
  ([394d5d9](https://github.com/tinkoff/maskito/commit/394d5d996bdb9d21229ea0301eb3f776bee05d30))

### [0.7.2](https://github.com/tinkoff/maskito/compare/v0.7.1...v0.7.2) (2023-03-23)

### Bug Fixes

- **angular:** `@maskito/angular` should not depend on `@maskito/kit`
  ([#221](https://github.com/tinkoff/maskito/issues/221))
  ([0ae7b20](https://github.com/tinkoff/maskito/commit/0ae7b2089ec0436caa8dbb14d5c696ae93e9e7ed))
- **angular:** `npm i @maskito/angular` throws `ERESOLVE unable to resolve dependency tree`
  ([#220](https://github.com/tinkoff/maskito/issues/220))
  ([8b4d6e6](https://github.com/tinkoff/maskito/commit/8b4d6e6186db47f97d328186b7afd9af75a3889b))

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
