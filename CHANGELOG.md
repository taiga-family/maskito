# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2023-02-14)


### Features

* **angular:** create new library `@maskito/angular` ([#35](https://github.com/tinkoff/maskito/issues/35)) ([1855c35](https://github.com/tinkoff/maskito/commit/1855c3587b70522b0d1c196d1fe036e8bc11ae71))
* **angular:** improve DI-approach ([#72](https://github.com/tinkoff/maskito/issues/72)) ([0ecacfb](https://github.com/tinkoff/maskito/commit/0ecacfbb6ed0dcbe3b8c4514e4d3ad75654931f1))
* **core:** add `Delete`-key support ([#20](https://github.com/tinkoff/maskito/issues/20)) ([e62cfda](https://github.com/tinkoff/maskito/commit/e62cfda97bd008eea4bb343abcc3e3ae658df204))
* **core:** better caret position management + new class `MaskModel` ([#4](https://github.com/tinkoff/maskito/issues/4)) ([52e80ba](https://github.com/tinkoff/maskito/commit/52e80ba5ec02bab7b0c175d6401a642c11efb030))
* **core:** handle `Paste`-event ([#10](https://github.com/tinkoff/maskito/issues/10)) ([421f97c](https://github.com/tinkoff/maskito/commit/421f97cafb0be19d54bda1ebe5f2c9c29355578e))
* **core:** initialize new project `core` ([#2](https://github.com/tinkoff/maskito/issues/2)) ([7100057](https://github.com/tinkoff/maskito/commit/7100057e25e480cfa44671d0220eb5c0ed37090e))
* **core:** introduce concepts `preprocessor` / `postprocessor` ([#28](https://github.com/tinkoff/maskito/issues/28)) ([1fb443f](https://github.com/tinkoff/maskito/commit/1fb443fe0d57d497e7c5954b6799fee5c7d0fcb9))
* **core:** introducing the first draft of public API ([#3](https://github.com/tinkoff/maskito/issues/3)) ([303e863](https://github.com/tinkoff/maskito/commit/303e863867956ec51ba27b4c17f14901dcbb646a))
* **core:** new `MaskHistory` class (undo/redo support) ([#25](https://github.com/tinkoff/maskito/issues/25)) ([0847551](https://github.com/tinkoff/maskito/commit/084755181bac4e568caf02c815388ac32a34fa9b))
* **core:** new `maskitoPipe` utility ([#39](https://github.com/tinkoff/maskito/issues/39)) ([11f7953](https://github.com/tinkoff/maskito/commit/11f79530e52718447760cd52db5efb6fc2bea4ac))
* **core:** standardize pre- and postprocessors (separate mutable data from readonly) ([#47](https://github.com/tinkoff/maskito/issues/47)) ([cfedab5](https://github.com/tinkoff/maskito/commit/cfedab5a7d4587e93d9e9b193980f4f8b86d5c55))
* **core:** try guess value when autofill/paste/drop contains invalid characters ([#24](https://github.com/tinkoff/maskito/issues/24)) ([7be0f3b](https://github.com/tinkoff/maskito/commit/7be0f3b12ff3e41f7f3229a97a9f16ac6f51c855))
* **demo:** add `Phone`-page recipe ([#105](https://github.com/tinkoff/maskito/issues/105)) ([e039f29](https://github.com/tinkoff/maskito/commit/e039f29232e965e81783b4f990e3fd27e694b39e))
* **kit:** `Date` add max/min options ([#70](https://github.com/tinkoff/maskito/issues/70)) ([b708243](https://github.com/tinkoff/maskito/commit/b708243e247c16dc70ba76835c924eb4540c7905))
* **kit:** `Date` mask support `mm/yy` mode, add `Card` recipe ([#82](https://github.com/tinkoff/maskito/issues/82)) ([f085462](https://github.com/tinkoff/maskito/commit/f08546204e0c24ddc2eba2a5eac1ebdce7295aef))
* **kit:** `DateRange` add `min` / `max` options ([#94](https://github.com/tinkoff/maskito/issues/94)) ([5c578b3](https://github.com/tinkoff/maskito/commit/5c578b32a3a73662fd6031f88bc89f6e3e682edc))
* **kit:** `DateRange` add `minLength` / `maxLength` options ([#96](https://github.com/tinkoff/maskito/issues/96)) ([09aab26](https://github.com/tinkoff/maskito/commit/09aab2625912c6c5be27b8eaea248e69501508e9))
* **kit:** `Number` add new params `max` & `isNegativeAllowed` ([#53](https://github.com/tinkoff/maskito/issues/53)) ([217bbbc](https://github.com/tinkoff/maskito/commit/217bbbcfc5e928ec6685ea7d0faa062649c449f2))
* **kit:** create new library (run `nx g @nrwl/js:library kit`) ([#29](https://github.com/tinkoff/maskito/issues/29)) ([290e1f0](https://github.com/tinkoff/maskito/commit/290e1f0963af277068ed6d3a217eb90a59d2bd94))
* **kit:** new `Date` mask ([#62](https://github.com/tinkoff/maskito/issues/62)) ([ddc4540](https://github.com/tinkoff/maskito/commit/ddc4540858b0139b8c99002cba309c41da286b9d))
* **kit:** new `DateRange` mask ([#78](https://github.com/tinkoff/maskito/issues/78)) ([16e75c3](https://github.com/tinkoff/maskito/commit/16e75c3b877489fcf5cb11d8d943a26713b391c2))
* **kit:** new `Number`-mask ([#50](https://github.com/tinkoff/maskito/issues/50)) ([3e41989](https://github.com/tinkoff/maskito/commit/3e419895b2d0c402e7c6f7621346d281011eadc8))
* new `Time`-mask (`kit`) + new `overwriteMode`-mode (`core`) ([#37](https://github.com/tinkoff/maskito/issues/37)) ([43dea21](https://github.com/tinkoff/maskito/commit/43dea21494c9463bb761f31e536b85c801b6431f))


### Bug Fixes

* **angular:** no `FormControl` changes ([#48](https://github.com/tinkoff/maskito/issues/48)) ([ee7ce63](https://github.com/tinkoff/maskito/commit/ee7ce63d7fe19bb9ee63726c6013e12be8a4b3d1))
* **core:** `ElementState` has negative `selection` on `Backspace` at the start of element ([#65](https://github.com/tinkoff/maskito/issues/65)) ([f6d213b](https://github.com/tinkoff/maskito/commit/f6d213b07dadaf61927d9e124bbead2edff85078))
* **core:** `globalThis` Reference error +  new `Browser support` documentation page ([#49](https://github.com/tinkoff/maskito/issues/49)) ([b3a51ab](https://github.com/tinkoff/maskito/commit/b3a51ab4aa4a27830a2875f30ddd080250ac9fe9))
* **core:** `MaskModel` rejects new character if it is equal to the previous fixed character ([#111](https://github.com/tinkoff/maskito/issues/111)) ([9c18e05](https://github.com/tinkoff/maskito/commit/9c18e05717418a4b525bab30901f091ef379fd75))
* **core:** incorrect caret position (case with range selection + new key) ([#17](https://github.com/tinkoff/maskito/issues/17)) ([0357b5e](https://github.com/tinkoff/maskito/commit/0357b5e0e46c4c72d306426e40f1940faf0ec033))
* **core:** line-break support for `TextArea` ([#27](https://github.com/tinkoff/maskito/issues/27)) ([27a55a8](https://github.com/tinkoff/maskito/commit/27a55a88b069ce243ed5eef581f363ad060cd4ff))
* **core:** show fixed character only if there are other not-fixed characters after it ([#19](https://github.com/tinkoff/maskito/issues/19)) ([bfdcd54](https://github.com/tinkoff/maskito/commit/bfdcd54a2d286fda6a50fb41ef3d5ae382ee82f1))
* **demo:** `npm run build:prerender` throws `NullInjectorError` ([#52](https://github.com/tinkoff/maskito/issues/52)) ([83463fa](https://github.com/tinkoff/maskito/commit/83463fa931efab2b3d00c48073cc608932b8fd24))
* **kit:** `DateRange` broken paste from clipboard ([#113](https://github.com/tinkoff/maskito/issues/113)) ([acca2ab](https://github.com/tinkoff/maskito/commit/acca2ab96f41e61e42f51e2b4109a2bde9fcc6fd))
* **kit:** `DateRange` invalid validation of the last segment digit for the 2nd date ([#83](https://github.com/tinkoff/maskito/issues/83)) ([e5b40d1](https://github.com/tinkoff/maskito/commit/e5b40d1a05e1072ddc7735c82e276c0817526baf))
* **kit:** `Number` broken mask if `decimalSeparator` is a dot ([#69](https://github.com/tinkoff/maskito/issues/69)) ([19fda20](https://github.com/tinkoff/maskito/commit/19fda20014f974a3aef129c7bece92e1b950190c))
* **kit:** `Number` ignores `decimalZeroPadding: true` if integer part is deleted ([#67](https://github.com/tinkoff/maskito/issues/67)) ([073a35a](https://github.com/tinkoff/maskito/commit/073a35a8bb5495289c60032e53085478047d7750))
* **kit:** `Time` bug with zero padding ([#42](https://github.com/tinkoff/maskito/issues/42)) ([5ccc127](https://github.com/tinkoff/maskito/commit/5ccc12768d43bafb8a86c6d324497379976c6868))
* **kit:** accept dates and segments separator as valid input ([#102](https://github.com/tinkoff/maskito/issues/102)) ([90361c9](https://github.com/tinkoff/maskito/commit/90361c9320f338c533859d3a987d744f96e32979))
* webstorm `TS2307: Cannot find module '@maskito/core' or its corresponding type declarations` ([#101](https://github.com/tinkoff/maskito/issues/101)) ([804da87](https://github.com/tinkoff/maskito/commit/804da87bc5f335af0b39bfd49e21b038f7cbe459))

# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
