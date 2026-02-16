### [5.1.1](https://github.com/taiga-family/maskito/compare/v5.1.0...v5.1.1) (2026-02-16)

### 🐞 Bug Fixes

- **kit**: `maskitoStringifyDate` incorrectly formats year with leading zeroes (#2538)
  [(9817f08)](https://github.com/taiga-family/maskito/commit/9817f084dd34628afd1bebe8070189edf8f3fd1f)
- **kit**: `Number` deletes the previous non-selected character on the first deletion (#2537)
  [(40ef2e0)](https://github.com/taiga-family/maskito/commit/40ef2e03b8ecaf564a1d4f055b8d629ba8932370)
- **phone**: `Phone` preserves previously entered digits on new digits paste (#2481)
  [(f836f4f)](https://github.com/taiga-family/maskito/commit/f836f4f5ec94d865a2bcb44960161cfe25fe3a64)

## [5.1.0](https://github.com/taiga-family/maskito/compare/v5.0.1...v5.1.0) (2026-01-22)

### 🚀 Features

- **phone:** `Phone` supports national format ([#2461](https://github.com/taiga-family/maskito/issues/2461))
  ([c90bca2](https://github.com/taiga-family/maskito/commit/c90bca2c2f0f3bc3746a2559fc84bd688075c1be))

### 🐞Bug Fixes

- **kit:** `Number` fails to dynamically change postfix ([#2501](https://github.com/taiga-family/maskito/issues/2501))
  ([cd73d6a](https://github.com/taiga-family/maskito/commit/cd73d6a729068e4b301509b12def6e149a7b5d66))
- **kit:** `Number` throws `Failed to parse String to BigInt` error
  ([#2509](https://github.com/taiga-family/maskito/issues/2509))
  ([7b80f79](https://github.com/taiga-family/maskito/commit/7b80f79140740462d3d924ba49993e1376d2b6e3))
- **react:** `useMaskito` should destroy Maskito instance if element is detached from the DOM
  ([#2507](https://github.com/taiga-family/maskito/issues/2507))
  ([1cdb203](https://github.com/taiga-family/maskito/commit/1cdb20359aaf4fa479420638d76bc7b238a6cb4c))

### [5.0.1](https://github.com/taiga-family/maskito/compare/v5.0.0...v5.0.1) (2025-12-26)

### 🐞 Bug Fixes

- **phone**: `Phone` removes last digit if pasted without '+' (#2480)
  [(5d709ca)](https://github.com/taiga-family/maskito/commit/5d709ca9c2e4a8abbe99a38c47551a9e6b2d8d36)
- **kit**: `maskitoStringifyNumber` supports extremal exponent values (#2463)
  [(1340257)](https://github.com/taiga-family/maskito/commit/1340257486a86499f94c96dbe67949ada32ebae4)
- **phone**: `Phone` with initial value has problems with the first time delete action (#2455)
  [(fa596fa)](https://github.com/taiga-family/maskito/commit/fa596fa101333b519bc3d760d6f4969151178e1a)

## [5.0.0](https://github.com/taiga-family/maskito/compare/v4.0.1...v5.0.0) (2025-12-03)

### ⚠ BREAKING CHANGES

- Bump Safari browser support (#2439)

  |                | < 5.0.0 | ≥ 5.0.0 |
  | -------------- | ------- | ------- |
  | Safari Desktop | 13.1+   | 14.1+   |
  | Safari Mobile  | 13.4+   | 14.5+   |

- **kit**: `Number` supports `BigInt` (#2431)
  [(2d2f86d)](https://github.com/taiga-family/maskito/commit/2d2f86dafb1524528305908af27b4df37d9e1330)

  New default values for `maskitoNumberOptionsGenerator` / `maskitoStringifyNumber`:

  | MaskitoNumberParams | < 5.0.0                   | ≥ 5.0.0     |
  | ------------------- | ------------------------- | ----------- |
  | `min`               | `Number.MIN_SAFE_INTEGER` | `-Infinity` |
  | `max`               | `Number.MAX_SAFE_INTEGER` | `Infinity`  |

### [4.0.1](https://github.com/taiga-family/maskito/compare/v4.0.0...v4.0.1) (2025-11-14)

### 🐞 Bug Fixes

- **kit**: `Time` with `[step]` ignores `timeSegmentMinValues` on arrow stepping (#2420)
  [(398a5c1)](https://github.com/taiga-family/maskito/commit/398a5c163d03502d413ca15c8756f41891b75197)
- **kit**: `DateRange` with `[minLength]` & `[maxLength]` incorrectly appends month in backward direction (#2369)
  [(3c80959)](https://github.com/taiga-family/maskito/commit/3c80959773a4c44b29e70a420bc1fc6e074030b9)

## [4.0.0](https://github.com/taiga-family/maskito/compare/v3.11.1...v4.0.0) (2025-10-13)

### ⚠ BREAKING CHANGES

- **kit**: delete deprecated `precision` & `decimalZeroPadding` parameters from `Number` mask (#2354)

  **Previous behavior:**

  ```ts
  import {maskitoNumberOptionsGenerator} from '@maskito/kit';

  const options = maskitoNumberOptionsGenerator({
    precision: 2, // ---> Use `maximumFractionDigits` instead
    decimalZeroPadding: true, // ---> Use `minimumFractionDigits` instead
  });
  ```

  <p align="center">⬇️ </p>

  **New behavior**:

  ```ts
  import {maskitoNumberOptionsGenerator} from '@maskito/kit';

  const options = maskitoNumberOptionsGenerator({
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  ```

- **kit**: `maskitoParseNumber` accepts only `MaskitoNumberParams` as the 2nd argument (#2355)

  **Previous behavior:**

  ```ts
  import {maskitoParseNumber} from '@maskito/kit';

  maskitoParseNumber(
    '0,42',
    ',', // decimalSeparator
  );
  ```

  <p align="center">⬇️ </p>

  **New behavior**:

  ```ts
  import {maskitoParseNumber} from '@maskito/kit';

  maskitoParseNumber(
    '0,42',
    {decimalSeparator: ','}, // MaskitoNumberParams
  );
  ```

- **kit**: remove invalid `MM.SS.MSS` type from `MaskitoTimeMode` (use `MM:SS.MSS` instead) (#2365)
- **angular**: bump minimum required Angular version (16+ => 19+) (#2347) (#2348) (#2349)
- **angular**: `MaskitoDirective` uses model inputs (#2363)

### [3.11.1](https://github.com/taiga-family/maskito/compare/v3.11.0...v3.11.1) (2025-09-30)

### 🐞 Bug Fixes

- **kit**: resolve circular dependencies inside `Number` mask (#2344)
  [(efb3039)](https://github.com/taiga-family/maskito/commit/efb303980905c33bfe58e0163b74c72da5f83fcd)
- **kit**: `Number` fails to clear initial value (by selecting all + Backspace/Delete) (#2343)
  [(63f6e72)](https://github.com/taiga-family/maskito/commit/63f6e725af215dc492ddca02d30123de0dd026de)
- **kit**: `Number` has broken support for postfix with leading point (#2337)
  [(e9a3598)](https://github.com/taiga-family/maskito/commit/e9a3598c9ce7f5c39f932d4e6b3c0ffabcde3741)

### [3.11.0](https://github.com/taiga-family/maskito/compare/v3.10.3...v3.11.0) (2025-09-23)

### 🚀 Features

- **kit**: `Number` supports minus before prefix (#2281)
  [(480c1fd)](https://github.com/taiga-family/maskito/commit/480c1fde7693b62df768364c0df00fc7328cb4e6)
- **kit**: `Number` uses `toNumberParts` / `fromNumberParts` approach (#2270)
  [(891780a)](https://github.com/taiga-family/maskito/commit/891780a8f179345a49dbe8b8036e639ae0a98cbd)

### 🐞 Bug Fixes

- **kit**: `PostfixPostprocessor` duplicates postfix on paste of value with incompleted postfix (#2267)
  [(2707771)](https://github.com/taiga-family/maskito/commit/27077719ffc8628758664638e802e1ad3c9f8e27)
- **kit**: `maskitoStringifyTime` and `maskitoParseTime` should support `AM` / `PM` formats (#2260)
  [(a0aea6f)](https://github.com/taiga-family/maskito/commit/a0aea6f741fea3139f4e7d7c8f84ce46c1738c26)
- **angular**: use `@Input` setters instead of `ngOnChanges` to handle programmatic changes (#2257)
  [(cb8c129)](https://github.com/taiga-family/maskito/commit/cb8c129f1afd196a38f87dd4b36328ddea3b60a5)

### [3.10.3](https://github.com/taiga-family/maskito/compare/v3.10.2...v3.10.3) (2025-08-06)

### 🐞 Bug Fixes

- **kit**: `DateRange` + `minLength` / `maxLength` has incorrect limits (#2210)
  [(e8917e0)](https://github.com/taiga-family/maskito/commit/e8917e0a124b26ffc9806f74c5c70016084f5280)
- **kit**: `maskitoStringifyNumber` fails to stringify number with exponential notation (#2224)
  [(9fe0b08)](https://github.com/taiga-family/maskito/commit/9fe0b080b2703a72674a25b8ce352486cc274663)

### [3.10.2](https://github.com/taiga-family/maskito/compare/v3.10.1...v3.10.2) (2025-07-28)

### 🐞 Bug Fixes

- **kit**: `Number` with `input[maxlength]` is incompatible with `document.execCommand('delete')` (#2217)
  [(2604d2c)](https://github.com/taiga-family/maskito/commit/2604d2ce8dc60e16f464a3fc4328f907bef58d55)

### [3.10.1](https://github.com/taiga-family/maskito/compare/v3.10.0...v3.10.1) (2025-07-18)

### 🐞 Bug Fixes

- **core**: dynamic mask switching to mask without fixed character fails on new character insertion (#2207)
  [(50e68d4)](https://github.com/taiga-family/maskito/commit/50e68d4bb8f6e5330bda76c67806514a7fa53294)

### [3.10.0](https://github.com/taiga-family/maskito/compare/v3.9.1...v3.10.0) (2025-07-04)

### 🚀 Features

- **kit**: `Time` supports `prefix` & `postfix` parameters (#2185)
  [(2cc7462)](https://github.com/taiga-family/maskito/commit/2cc7462583a2fe372d0cad312fb5f0d90ca0fe8e)

### 🐞 Bug Fixes

- **core**: invalid behavior of dynamic mask expression with trailing fixed characters (#2184)
  [(cecf9d6)](https://github.com/taiga-family/maskito/commit/cecf9d69468e56de8ff4f39af7ebc07d5a686fe8)
- **core**: do not insert fixed character on attempt to enter invalid character at its position (#2181)
  [(7a51702)](https://github.com/taiga-family/maskito/commit/7a51702361237a41cd9bbdcdbb8e46d0bfa2e4bc)
- **kit**: date-related mask with month-first mode has incorrect zero-padding logic (#2166)
  [(26294e8)](https://github.com/taiga-family/maskito/commit/26294e8250591c727f99ccec563e8492df7c1068)

### [3.9.1](https://github.com/taiga-family/maskito/compare/v3.9.0...v3.9.1) (2025-06-23)

### 🐞 Bug Fixes

- **kit**: `Number` with custom `minusSign` has broken `min`/`max` behavior (#2164)
  [(52ed25d)](https://github.com/taiga-family/maskito/commit/52ed25debaa2838a0b360983a508a3d627c78277)
- **core**: Android with Microsoft SwiftKey Keyboard ignores `preventDefault()` for `beforeinput` event on backspace
  (#2163) [(722d9af)](https://github.com/taiga-family/maskito/commit/722d9afc265df8392613c770759df3bb8955e08e)

### [3.9.0](https://github.com/taiga-family/maskito/compare/v3.8.0...v3.9.0) (2025-06-05)

### 🚀 Features

- **react**: add support for React-specific `onChange` event handler (#2153)
  [(e941847)](https://github.com/taiga-family/maskito/commit/e941847990662835343c4e25d3f2b2e64ab54345)

### 🐞 Bug Fixes

- **core**: do not unnecessarily trigger element's `value` setter on every keystroke (#2152)
  [(fd3449b)](https://github.com/taiga-family/maskito/commit/fd3449b69f88dbcab5b06b03ff19273b511bcd64)

### [3.8.0](https://github.com/taiga-family/maskito/compare/v3.7.2...v3.8.0) (2025-05-13)

### 🚀 Features

- **angular**: new `MaskitoPattern` directive (#2081)
  [(c3f7142)](https://github.com/taiga-family/maskito/commit/c3f7142245b603af9136541de9d181189e01a7a3)

### 🐞 Bug Fixes

- **kit**: update the first digit zero-padding logic for date-related mask (#2117)
  [(b5b2598)](https://github.com/taiga-family/maskito/commit/b5b2598f455f3ad3438c3bd89b81009aca82f17c)
- **core**: incorrect handle of paste event for `&lt;input /&gt;` with `maxlength` attribute (#2090)
  [(e20e50b)](https://github.com/taiga-family/maskito/commit/e20e50bb92aca9d70bc483f9fc66904264a64c35)
- **kit**: `Number` should support non-erasable minus (as `prefix`) for `max &lt;= 0` (#2087)
  [(3910914)](https://github.com/taiga-family/maskito/commit/39109144075d58734d1545be888cbd03c5b6286e)

### [3.7.2](https://github.com/taiga-family/maskito/compare/v3.7.1...v3.7.2) (2025-04-22)

### 🐞 Bug Fixes

- **kit**: missing export of `maskitoParseDateTime` & `maskitoStringifyDateTime` utilities (#2074)
  [(6aa34aa)](https://github.com/taiga-family/maskito/commit/6aa34aa610cf140248bc7a691beb5aaba1f0e0cd)

### [3.7.1](https://github.com/taiga-family/maskito/compare/v3.7.0...v3.7.1) (2025-04-16)

### 🐞 Bug Fixes

- **core**: updated selection range (even if textfield value is untouched) should not be ignored (#2069)
  [(9276117)](https://github.com/taiga-family/maskito/commit/927611775e8d23eb89663150cd84e7981b12d2e7)

### [3.7.0](https://github.com/taiga-family/maskito/compare/v3.6.0...v3.7.0) (2025-04-15)

### 🚀 Features

- **kit**: new `maskitoParseDateTime` and `maskitoStringifyDateTime` helpers (#2055)
  [(5028084)](https://github.com/taiga-family/maskito/commit/5028084f9be876cf8b1dc2607956cd4906285c43)

### 🐞 Bug Fixes

- **core**: add possibility to overwrites `selection` property in processors (#2053)
  [(de354f4)](https://github.com/taiga-family/maskito/commit/de354f4fbeed7a632e23c0e1d00809effbb0229b)

### [3.6.0](https://github.com/taiga-family/maskito/compare/v3.5.0...v3.6.0) (2025-04-08)

### 🚀 Features

- **kit**: `Number` supports new properties `minimumFractionDigits` & `maximumFractionDigits` (#2022)
  [(8719b9e)](https://github.com/taiga-family/maskito/commit/8719b9e30d6463deff4aed213cba774189ddd305)

### 🐞 Bug Fixes

- **core**: double space bar removes characters (#2040)
  [(ccbebd8)](https://github.com/taiga-family/maskito/commit/ccbebd878ae7ba92da0a8d25d5b9d0b5c3ed3bcf)

### [3.5.0](https://github.com/taiga-family/maskito/compare/v3.4.0...v3.5.0) (2025-03-21)

### 🚀 Features

- **kit**: `Time` supports `MM:SS` mode (#2008)
  [(b93ad1e)](https://github.com/taiga-family/maskito/commit/b93ad1ecc71f608dd68de01b43487153b8e89d95)

### 🐞 Bug Fixes

- **kit**: `maskitoParseDate` should return `null` for incompleted date string (#2009)
  [(9eec35b)](https://github.com/taiga-family/maskito/commit/9eec35b878411a79fec84986cbea94fbdc9f24d8)

### [3.4.0](https://github.com/taiga-family/maskito/compare/v3.3.0...v3.4.0) (2025-03-10)

### 🚀 Features

- **kit**: new `maskitoStringifyNumber` helper (#1987)
  [(cbfd4bc)](https://github.com/taiga-family/maskito/commit/cbfd4bc4bb6ca56bf12667bb3626c55ae1b04c48)

### 🐞 Bug Fixes

- **phone**: `Phone` should accept incomplete phone number of selected country (even with `strict=true`) (#1982)
  [(965d735)](https://github.com/taiga-family/maskito/commit/965d7358ad39888d3844c121dd6934ee66cdc541)

### [3.3.0](https://github.com/taiga-family/maskito/compare/v3.2.1...v3.3.0) (2025-02-28)

### 🚀 Features

- **kit**: new `maskitoParseDate` and `maskitoStringifyDate` helpers (#1973)
  [(208a4ab)](https://github.com/taiga-family/maskito/commit/208a4abc8018b368d3154ebc26a81504b6abec3d)
- **kit**: `Date` supports `dd/mm` and `mm/dd` modes (#1939)
  [(bc290af)](https://github.com/taiga-family/maskito/commit/bc290affdcdc1cd6e088a32a60dc5e74fd00a1d8)

### 🐞 Bug Fixes

- **kit**: `SelectionChangeHandler` does not work for Safari after programmatic update of textfield value (#1930)
  [(34c11d0)](https://github.com/taiga-family/maskito/commit/34c11d0ee88b861ab21d54113aff21f3091a053f)

### [3.2.1](https://github.com/taiga-family/maskito/compare/v3.2.0...v3.2.1) (2024-12-26)

### 🚀 Features

- **kit**: remove circular import (#1861)
  [(15ff0b8)](https://github.com/taiga-family/maskito/commit/15ff0b8558bc954ac6eda07bdb13d087fc2f3491)

### 🐞 Bug Fixes

- **kit**: `Number` should ignore `[decimalSeparator]` value if `[precision]=0` (#1908)
  [(19effe2)](https://github.com/taiga-family/maskito/commit/19effe2c7218646335b2f08c53a1ed3c3f0d89a1)
- **kit**: `Number` + postfix (with leading space) adds unnecessary spaces on paste value with trailing spaces (#1865)
  [(c37b1d6)](https://github.com/taiga-family/maskito/commit/c37b1d636fefee1cba17b4aa07ccdd30edc5ff66)
- **kit**: `DateRange` should accept single character date segment paste even if date and range separators are equal
  (#1796) [(be6a4c3)](https://github.com/taiga-family/maskito/commit/be6a4c3c57132cf320ec462372fd8536dca4781a)

### [3.2.0](https://github.com/taiga-family/maskito/compare/v3.1.2...v3.2.0) (2024-10-29)

### 🚀 Features

- **kit**: new `maskitoSelectionChangeHandler` plugin (#1794)
  [(c6e9a4d)](https://github.com/taiga-family/maskito/commit/c6e9a4d9b1a2e75bc44aaecbda840b84f786d065)

### [3.1.2](https://github.com/taiga-family/maskito/compare/v3.1.1...v3.1.2) (2024-10-22)

### 🐞 Bug Fixes

- **kit**: `Time` & `DateTime` has conflicts between `step` & `AM/PM` features (#1791)
  [(805f70b)](https://github.com/taiga-family/maskito/commit/805f70b74e04fb3b8613f89d84e771c734438dab)
- **kit**: `Number` incorrectly shift caret for 1st time insertion into textfield with initial value (#1792)
  [(0049d91)](https://github.com/taiga-family/maskito/commit/0049d91a0a498977bb5f4cba9fbf9f02cb74dae9)

### [3.1.1](https://github.com/taiga-family/maskito/compare/v3.1.0...v3.1.1) (2024-10-17)

### 🐞 Bug Fixes

- **kit**: `Number` fails to prevent user insertion of extra spaces on invalid positions (#1789)
  [(a40445c)](https://github.com/taiga-family/maskito/commit/a40445cf4d852328a9310a55cf38801e17525476)
- **kit**: `DateTime` fails to process value without any separators (paste from clipboard) (#1779)
  [(1733422)](https://github.com/taiga-family/maskito/commit/1733422b803fda3de9b40a9fa675ef6bb8b5195e)

### [3.1.0](https://github.com/taiga-family/maskito/compare/v3.0.3...v3.1.0) (2024-10-09)

### 🚀 Features

- **kit**: `Time` & `DateTime` support `AM` / `PM` formats (#1708)
  [(98ce35e)](https://github.com/taiga-family/maskito/commit/98ce35e8fd3318a750959d840f36caaf427fe8f0)
- **kit**: simplify some code logic for `Time` mask (#1688)
  [(8c608b8)](https://github.com/taiga-family/maskito/commit/8c608b8cb5eaeca1166b78c6691d38303eb67c6c)

### 🐞 Bug Fixes

- **core**: `overwriteMode: replace` has incorrect behavior on attempt to insert invalid characters (#1772)
  [(5aeb074)](https://github.com/taiga-family/maskito/commit/5aeb0741fa82ad6e43e862059a17b2e78ee9831b)
- **deps**: update dependency libphonenumber-js to v1.11.11 (#1760)
  [(b8781fb)](https://github.com/taiga-family/maskito/commit/b8781fbe9a2cbacee0d53d5e143687f83b5c3773)
- **deps**: update dependency vue to v3.5.11 (#1754)
  [(47f12a3)](https://github.com/taiga-family/maskito/commit/47f12a3ecc16b7f9d79ba31632abc3e1af80b516)
- **deps**: update dependency @types/react to v18.3.11 (#1751)
  [(86328e6)](https://github.com/taiga-family/maskito/commit/86328e6b2b76049958f215cfe6551d63f8d3ffcc)
- **deps**: update dependency libphonenumber-js to v1.11.10 (#1747)
  [(37a4d8c)](https://github.com/taiga-family/maskito/commit/37a4d8cc374e1f03878692ccc44379b3d92acafe)

### [3.0.3](https://github.com/taiga-family/maskito/compare/v3.0.2...v3.0.3) (2024-09-25)

### 🐞 Bug Fixes

- **angular**: race condition when `[maskitoOptions]` are changed before long element predicate is resolved (#1696)
  [(9f9bad3)](https://github.com/taiga-family/maskito/commit/9f9bad3036774fa51350c3c8402cf57f15e789d6)
- **kit**: `Time` has invalid segment separator for `MM:SS.MSS` mode (#1687)
  [(93972be)](https://github.com/taiga-family/maskito/commit/93972be370e1abf4278497b11f61d3c923ae5caa)
- **core**: incorrect behavior of `overwriteMode = replace` if selection contains several characters (#1685)
  [(67c3c10)](https://github.com/taiga-family/maskito/commit/67c3c10704f62efff4c47f1ad802859d54257752)
- **react**: race condition when `options` are changed before long element predicate is resolved (#1651)
  [(f2932ce)](https://github.com/taiga-family/maskito/commit/f2932ce10ec80a1080befaee9e5c235bc41a1b16)

### [3.0.2](https://github.com/taiga-family/maskito/compare/v3.0.1...v3.0.2) (2024-09-20)

### 🐞 Bug Fixes

- **core:** `Time` with `[step]` has unexpected cursor jump to the next segment on `ArrowUp`/`ArrowDown`
  ([#1478](https://github.com/taiga-family/maskito/issues/1478))
  ([59a5927](https://github.com/taiga-family/maskito/commit/59a5927822e2c20691dc0948c438d67d497b6381))
- **core:** fix scroll for masked narrow textfields ([#1645](https://github.com/taiga-family/maskito/issues/1645))
  ([c6d2828](https://github.com/taiga-family/maskito/commit/c6d282873f10892ecb3536b878d919fc57f5c921))

### [3.0.1](https://github.com/taiga-family/maskito/compare/v3.0.0...v3.0.1) (2024-08-19)

### 🐞 Bug Fixes

- **kit:** `maskitoStringifyTime` was adding `0` on the wrong side
  ([#1401](https://github.com/taiga-family/maskito/issues/1401))
  ([b28ee12](https://github.com/taiga-family/maskito/commit/b28ee12f923b86eb3a8c32d17cd401e9222cfc30))
- **kit:** `Placeholder` should support partial programmatic removal of placeholder's characters
  ([#1441](https://github.com/taiga-family/maskito/issues/1441))
  ([146a557](https://github.com/taiga-family/maskito/commit/146a55723ec4a1ac8b9cfba254056b84173326c9))
- **kit:** `Time` incorrectly validates value if `timeSegmentMaxValues` includes single digit
  ([#1402](https://github.com/taiga-family/maskito/issues/1402))
  ([26670f4](https://github.com/taiga-family/maskito/commit/26670f4dbdfb84495ea0faa127868185d7bb0765))

## [3.0.0](https://github.com/taiga-family/maskito/compare/v2.5.0...v3.0.0) (2024-07-18)

### ⚠ BREAKING CHANGES

- **phone:** remove built-in `RemoveOnBlur` / `AddOnFocus` plugins from `@maskito/phone`
  ([#1352](https://github.com/taiga-family/maskito/issues/1352))

  Learn more: https://maskito.dev/addons/phone#focus-blur

- **angular:** bump minimum required Angular version (15+ => 16+)
  ([#1328](https://github.com/taiga-family/maskito/issues/1328))

- **angular:** delete deprecated `MaskitoModule` & `MaskitoCVA`
  ([#1391](https://github.com/taiga-family/maskito/issues/1391))

### 🚀 Features

- **core:** new built-in `maskitoChangeEventPlugin` ([#1338](https://github.com/taiga-family/maskito/issues/1338))

  Learn more: https://maskito.dev/core-concepts/plugins#change-event

## [2.5.0](https://github.com/taiga-family/maskito/compare/v2.4.0...v2.5.0) (2024-06-24)

### 🚀 Features

- **kit:** new `maskitoParseTime` and `maskitoStringifyTime` utils
  ([#1302](https://github.com/taiga-family/maskito/issues/1302))
  ([d0f9b13](https://github.com/taiga-family/maskito/commit/d0f9b1331f3bb18403691ac7c513c31f5123cf78))

### 🐞 Bug Fixes

- **core:** correct handling of browser autofill/suggestion in Firefox
  ([#1326](https://github.com/taiga-family/maskito/issues/1326))
  ([a049207](https://github.com/taiga-family/maskito/commit/a049207b355da72092948a8c556020062fb7c819))
- **kit:** `Date`, `DateRange`, `DateTime` supports multi-character date segments separator
  ([#1306](https://github.com/taiga-family/maskito/issues/1306))
  ([cdf2fae](https://github.com/taiga-family/maskito/commit/cdf2faee4c16cd3963557a511d4ec053e2d41fc0))
- **kit:** move caret after attempt to erase fixed character in a mask with `Placeholder`
  ([#1307](https://github.com/taiga-family/maskito/issues/1307))
  ([87ae431](https://github.com/taiga-family/maskito/commit/87ae431ded798e3c31d6247f965a00c27ddad3f1))

## [2.4.0](https://github.com/taiga-family/maskito/compare/v2.3.2...v2.4.0) (2024-06-03)

### 🚀 Features

- **kit:** `Time` & `DateTime` support increment / decrement of time segment via `ArrowUp` / `ArrowDown`
  ([#1223](https://github.com/taiga-family/maskito/issues/1223))
  ([af961b8](https://github.com/taiga-family/maskito/commit/af961b84f8765e7d2147c80210e3a8ac6ed30597))
- **kit:** `Time` supports `SS.MSS` & `MM.SS.MSS` modes ([#1224](https://github.com/taiga-family/maskito/issues/1224))
  ([7bed4bc](https://github.com/taiga-family/maskito/commit/7bed4bcaac14908e7e445b277f5b4b6e5b0fd281))

### 🐞 Bug Fixes

- **core:** add `.select()`-method support for `MaskitoElement`
  ([#1268](https://github.com/taiga-family/maskito/issues/1268))
  ([51f5934](https://github.com/taiga-family/maskito/commit/51f5934f382b7862a6653412b687c46fd318b0bb))
- **kit:** `Number` should support float `min`/`max`-parameters in range -1 < x < 1
  ([#1280](https://github.com/taiga-family/maskito/issues/1280))
  ([b44013e](https://github.com/taiga-family/maskito/commit/b44013e0a45ffcfa69564f13d634a79d45b4d926))

### [2.3.2](https://github.com/taiga-family/maskito/compare/v2.3.1...v2.3.2) (2024-05-16)

### 🐞 Bug Fixes

- **kit:** `Number` pads integer part with zero if user selects all and then types decimal separator
  ([#1220](https://github.com/taiga-family/maskito/issues/1220))
  ([8371e45](https://github.com/taiga-family/maskito/commit/8371e45767150ebc4db03a2b74c68afd6fe1e593))
- **phone:** revert mistakenly fixated `libphonenumber-js` peer-dependency to just `>=1.0.0`
  ([#1234](https://github.com/taiga-family/maskito/issues/1234))
  ([27ee4a1](https://github.com/taiga-family/maskito/commit/27ee4a1264c0a70a5a06427368b8d18ed0e25bd4))
- **react:** revert mistakenly fixated `react` & `react-demo` peer-dependencies to just `>=16.8`
  ([#1231](https://github.com/taiga-family/maskito/issues/1231))
  ([ae89d6f](https://github.com/taiga-family/maskito/commit/ae89d6ff549dfb21d7db56b26e3c1f3a7044a817))
- **vue:** revert mistakenly fixated `vue` peer-dependency to just `>=3.0.0`
  ([#1232](https://github.com/taiga-family/maskito/issues/1232))
  ([22d84e2](https://github.com/taiga-family/maskito/commit/22d84e2f731ae8798f457466be7c9538d2f40fd9))

### [2.3.1](https://github.com/taiga-family/maskito/compare/v2.3.0...v2.3.1) (2024-04-23)

### 🐞 Bug Fixes

- **kit:** `Number` should drop decimal separator if all digits are erased
  ([#1211](https://github.com/taiga-family/maskito/issues/1211))
  ([5836c96](https://github.com/taiga-family/maskito/commit/5836c965d6ce5ad497aaa59118204adc3e8625d8))
- **kit:** `Number` with `decimalZeroPadding=true` should erase everything on `.00`
  ([#1207](https://github.com/taiga-family/maskito/issues/1207))
  ([d72f225](https://github.com/taiga-family/maskito/commit/d72f2257cec1a023aa81bb7de62e9543404630bd))
- **kit:** `Placeholder` can have now the same character as textfield's value
  ([#1209](https://github.com/taiga-family/maskito/issues/1209))
  ([ed06936](https://github.com/taiga-family/maskito/commit/ed06936c41297cbd2e8ed308558914e9ad6c2eda))

## [2.3.0](https://github.com/taiga-family/maskito/compare/v2.2.0...v2.3.0) (2024-04-16)

### 🚀 Features

- **core:** add `contenteditable` support ([#1039](https://github.com/taiga-family/maskito/issues/1039))
  ([0d5bb31](https://github.com/taiga-family/maskito/commit/0d5bb319225fb61f3ac7643c21208122b4a2a2ae))
- **kit:** `DateTime` supports configurable parameter `dateTimeSeparator`
  ([#1143](https://github.com/taiga-family/maskito/issues/1143))
  ([ec86284](https://github.com/taiga-family/maskito/commit/ec8628467814cff7dfae22668370236f402d8146))

### 🐞 Bug Fixes

- **kit:** `Date` formatting errors for `mm/yyyy`, `yyyy/mm`, `mm/yy` modes
  ([#1177](https://github.com/taiga-family/maskito/issues/1177))
  ([948a350](https://github.com/taiga-family/maskito/commit/948a35098da2233bc78793eb7e83b7c5136becbd))

## [2.2.0](https://github.com/taiga-family/maskito/compare/v2.1.0...v2.2.0) (2024-03-07)

### 🚀 Features

- **kit:** `Number` supports new configurable parameter `minusSign`
  ([#1118](https://github.com/taiga-family/maskito/issues/1118))
  ([a7bec35](https://github.com/taiga-family/maskito/commit/a7bec35f19d7dfa4023ad83fa36a935b2d636fc7))

### 🐞 Bug Fixes

- totally disable `Maskito` if nullable options are passed inside `@maskito/{angular,react,vue}`
  ([#1117](https://github.com/taiga-family/maskito/issues/1117))
  ([8cbadcf](https://github.com/taiga-family/maskito/commit/8cbadcfdf9af283dc687b131361f7bb19a7f9b02))

## [2.1.0](https://github.com/taiga-family/maskito/compare/v2.0.2...v2.1.0) (2024-03-04)

### 🚀 Features

- **kit:** `Date` & `DateRange` & `DateTime` has improved zero-padding support for browser autofill & IME composition
  ([#1027](https://github.com/taiga-family/maskito/issues/1027))
  ([77ac01c](https://github.com/taiga-family/maskito/commit/77ac01ca0b5e61d36dc3240a35c3dc93ce5fe93c))
- **kit:** add full-width numbers support for `Time`, `Date`, `DateTime`, `DateRange`
  ([#1043](https://github.com/taiga-family/maskito/issues/1043))
  ([434c9c5](https://github.com/taiga-family/maskito/commit/434c9c5f349ab3c19e11722e95313c5763203b08))

### 🐞 Bug Fixes

- **kit:** `maskitoParseNumber` should interpret japanese prolonged sound mark as pseudo minus
  ([#1115](https://github.com/taiga-family/maskito/issues/1115))
  ([b152698](https://github.com/taiga-family/maskito/commit/b152698fda8ac671286eb5f4a29de62562934fa2))

### [2.0.2](https://github.com/taiga-family/maskito/compare/v2.0.1...v2.0.2) (2024-02-01)

### 🐞 Bug Fixes

- **kit:** `Number` with initial value has problems with the first time input
  ([#986](https://github.com/taiga-family/maskito/issues/986))
  ([e40d3ff](https://github.com/taiga-family/maskito/commit/e40d3ff93c668c8afa60cd347faa7ebec76d0e6a))
- **react:** `@maskito/react` includes again missing `cjs` module format
  ([#991](https://github.com/taiga-family/maskito/issues/991))
  ([18e3e0c](https://github.com/taiga-family/maskito/commit/18e3e0cf8911fa764a73e2e937081186f1dcde79))

### [2.0.1](https://github.com/taiga-family/maskito/compare/v2.0.0...v2.0.1) (2024-01-31)

### 🐞 Bug Fixes

- **core:** `maskitoUpdateElement` should not dispatch `InputEvent` if value is not changed
  ([#977](https://github.com/taiga-family/maskito/issues/977))
  ([2410b64](https://github.com/taiga-family/maskito/commit/2410b6478c88f4d530b4469d7d50b1e4663d1572))
- **core:** don't execute `setSelectionRange` if element is not focused
  ([#937](https://github.com/taiga-family/maskito/issues/937))
  ([92f288b](https://github.com/taiga-family/maskito/commit/92f288b677dbe77f7978308dd7b1612d6bfd68fb))
- **kit:** `Number` rejects the first time input of full width digits
  ([#955](https://github.com/taiga-family/maskito/issues/955))
  ([c416884](https://github.com/taiga-family/maskito/commit/c41688488630e83d69eba795580916145e5fe17c))
- **react:** `@maskito/react` library should not include `core-js` imports
  ([#962](https://github.com/taiga-family/maskito/issues/962))
  ([3b7e401](https://github.com/taiga-family/maskito/commit/3b7e4014029fae206020723c18762f08e92b8c41))

## [2.0.0](https://github.com/taiga-family/maskito/compare/v1.9.0...v2.0.0) (2024-01-22)

### ⚠ BREAKING CHANGES

- **core:** merge `MaskitoElementPredicate` & `MaskitoElementPredicateAsync` into single type
  ([#757](https://github.com/taiga-family/maskito/issues/757))
- **core:** remove value's calibration on initialization + new `maskitoInitialCalibrationPlugin`
  ([#778](https://github.com/taiga-family/maskito/issues/778))
- **core:** bump Firefox browser support (55+ => 87+) ([#876](https://github.com/taiga-family/maskito/issues/876)) and
  drop legacy fallbacks for `Firefox` ([#756](https://github.com/taiga-family/maskito/issues/756))
- **kit:** delete deprecated `separator` for `DateRange` (use `dateSeparator` instead)
  ([#790](https://github.com/taiga-family/maskito/issues/790))
- **angular:** bump minimum required Angular version (12+ => 15+)
  ([#710](https://github.com/taiga-family/maskito/issues/710))
  ([#720](https://github.com/taiga-family/maskito/issues/720))
  ([#725](https://github.com/taiga-family/maskito/issues/725))
- **angular:** deprecate `MaskitoModule` (use standalone `MaskitoDirective`, `MaskitoCVA`, `MaskitoPipe`)
  ([#754](https://github.com/taiga-family/maskito/issues/754))

### 🚀 More features

- **core:** new built-in `maskitoStrictCompositionPlugin` ([#881](https://github.com/taiga-family/maskito/issues/881))
- **kit:** `Number` allows to enter full width numbers ([#864](https://github.com/taiga-family/maskito/issues/864))

### 🐞 Bug Fixes

- **core:** drop some excess dispatches of `Input`-event ([#882](https://github.com/taiga-family/maskito/issues/882))
- **kit:** add `{bubbles:true}` for `input` events inside all built-in plugins to support `ReactSyntheticEvent`
  ([#806](https://github.com/taiga-family/maskito/issues/806))
- **kit:** `Number` has problems when prefix/postfix includes `decimalSeparator` symbol
  ([#874](https://github.com/taiga-family/maskito/issues/874))
  ([#816](https://github.com/taiga-family/maskito/issues/816))
  ([#921](https://github.com/taiga-family/maskito/issues/921))
- **kit:** `Placeholder` is not compatible with `maskitoEventHandler` + `focus`/`blur` events
  ([#928](https://github.com/taiga-family/maskito/pull/928))

## [1.9.0](https://github.com/taiga-family/maskito/compare/v1.8.2...v1.9.0) (2023-11-23)

### 🚀 Features

- **phone:** add ability to configure the separator ([#685](https://github.com/taiga-family/maskito/issues/685))
  ([ab6bb11](https://github.com/taiga-family/maskito/commit/ab6bb11b1b40e069d31598b676c04456329aaf64))

### [1.8.2](https://github.com/taiga-family/maskito/compare/v1.8.1...v1.8.2) (2023-11-16)

### 🐞 Bug Fixes

- **kit:** `PrefixPostprocessor` has problems with multi-character prefix
  ([#669](https://github.com/taiga-family/maskito/issues/669))
  ([be459e5](https://github.com/taiga-family/maskito/commit/be459e51f3cbf028fa36b1b6a57e47d7fe8482a3))

### [1.8.1](https://github.com/taiga-family/maskito/compare/v1.8.0...v1.8.1) (2023-10-19)

### 🐞 Bug Fixes

- **kit:** `Date` accept single character date segment during paste
  ([#610](https://github.com/taiga-family/maskito/issues/610))
  ([e493198](https://github.com/taiga-family/maskito/commit/e4931987c2fad37894ea07f658f08e35152040df))

## [1.8.0](https://github.com/taiga-family/maskito/compare/v1.7.0...v1.8.0) (2023-10-18)

### 🚀 Features

- **angular:** allow nullable options ([#605](https://github.com/taiga-family/maskito/issues/605))
  ([21eaa7c](https://github.com/taiga-family/maskito/commit/21eaa7c0c0e7d5173c6f070f5222ba6492e196a6))

### 🐞 Bug Fixes

- **kit:** `Number` has broken zero padding when `decimalSeparator` equals to non-default value
  ([#586](https://github.com/taiga-family/maskito/issues/586))
  ([7241761](https://github.com/taiga-family/maskito/commit/72417614dd4974c22854dfacc2ee35044c080074))

## [1.7.0](https://github.com/taiga-family/maskito/compare/v1.6.0...v1.7.0) (2023-09-15)

### 🚀 Features

New `@maskito/phone` library ([#425](https://github.com/taiga-family/maskito/pull/425))
([#482](https://github.com/taiga-family/maskito/issues/482))

Learn more: https://maskito.dev/addons/phone

## [1.6.0](https://github.com/taiga-family/maskito/compare/v1.5.1...v1.6.0) (2023-09-15)

### 🚀 Features

- **react:** `elementPredicate` can accept asynchronous predicate
  ([#502](https://github.com/taiga-family/maskito/issues/502))
  ([4bbf758](https://github.com/taiga-family/maskito/commit/4bbf758107ed4b2fdbde5a241f22c0f363c22104))

### 🐞 Bug Fixes

- **kit:** `Number` should accept all types of spaces as interchangeable characters for `thousandSeparator`
  ([#505](https://github.com/taiga-family/maskito/issues/505))
  ([73975bb](https://github.com/taiga-family/maskito/commit/73975bbc676487330359056c367f73e32ea6eaf4))

### [1.5.1](https://github.com/taiga-family/maskito/compare/v1.5.0...v1.5.1) (2023-09-08)

### 🐞 Bug Fixes

- **vue:** `elementPredicate` should accept `MaskitoElementPredicateAsync` type
  ([#487](https://github.com/taiga-family/maskito/issues/487))
  ([fe7e9dc](https://github.com/taiga-family/maskito/commit/fe7e9dcb468bf3ab30978c947d8fa21cc0e51a75))

## [1.5.0](https://github.com/taiga-family/maskito/compare/v1.4.0...v1.5.0) (2023-09-04)

### 🚀 Features

- **core:** add IME composition support ([#467](https://github.com/taiga-family/maskito/issues/467))
  ([e7d664b](https://github.com/taiga-family/maskito/commit/e7d664b66a008a742c0a532e341b0e0bb0a0f759))
- **demo:** documentation is now available at https://maskito.dev
  ([#392](https://github.com/taiga-family/maskito/issues/392))
  ([355f87f](https://github.com/taiga-family/maskito/commit/355f87fd536758bc2db59f760ed114d28264122a))

### 🐞 Bug Fixes

- **kit:** `maskitoCaretGuard` doesn't work after focus on `<select />`
  ([#462](https://github.com/taiga-family/maskito/issues/462))
  ([9f456da](https://github.com/taiga-family/maskito/commit/9f456dad7f7f9d02db4eb5993ecb5fb5aabfe613))
- **kit:** `Number` should drop items from `decimalPseudoSeparators` if any is equal to `thousandSeparator`
  ([#390](https://github.com/taiga-family/maskito/issues/390))
  ([2107adc](https://github.com/taiga-family/maskito/commit/2107adc445ed26ce1507c5e0c534b668d7ae5b12))

## [1.4.0](https://github.com/taiga-family/maskito/compare/v1.3.0...v1.4.0) (2023-07-27)

### 🚀 Features

- **kit:** `Date` & `DateRange` support new modes `yyyy`, `mm/yyyy`, `yyyy/mm`
  ([#384](https://github.com/taiga-family/maskito/issues/384))
  ([7886d50](https://github.com/taiga-family/maskito/commit/7886d50012a76fec872816b6d5e2b7e67c931dd7))
- **kit:** `Time` supports new mode `HH` ([#385](https://github.com/taiga-family/maskito/issues/385))
  ([3c7a3f6](https://github.com/taiga-family/maskito/commit/3c7a3f65a0013152473ba57af8da28012cb58f32))

## [1.3.0](https://github.com/taiga-family/maskito/compare/v1.2.2...v1.3.0) (2023-07-24)

### 🚀 Features

- **kit:** `DateRange` add configurable parameter `rangeSeparator`
  ([#376](https://github.com/taiga-family/maskito/issues/376))
  ([d904842](https://github.com/taiga-family/maskito/commit/d90484214da76f4c73ad925eef5fe391a154c499))

### 🐞 Bug Fixes

- **kit:** `Number` has problems with run-time updates of postfix
  ([#380](https://github.com/taiga-family/maskito/issues/380))
  ([8210896](https://github.com/taiga-family/maskito/commit/8210896d2095a44e79a27a38e4c8745e2beccdb7))

### [1.2.2](https://github.com/taiga-family/maskito/compare/v1.2.1...v1.2.2) (2023-07-19)

### 🐞 Bug Fixes

- **kit:** `maskitoCaretGuard` should wait for `mouseup` before execution
  ([#372](https://github.com/taiga-family/maskito/issues/372))
  ([8554fea](https://github.com/taiga-family/maskito/commit/8554fead2a2474104f0674fb597cf86467274943))
- **kit:** `Number` should remove repeated leading zeroes for integer part only on `blur`-event
  ([#373](https://github.com/taiga-family/maskito/issues/373))
  ([7cf4938](https://github.com/taiga-family/maskito/commit/7cf4938853ccbd049b89482f8eb22ab4e71fe01f))

### [1.2.1](https://github.com/taiga-family/maskito/compare/v1.2.0...v1.2.1) (2023-07-11)

### 🐞 Bug Fixes

- **kit:** `Number` with `postfix` should be compatible with `decimalZeroPadding`
  ([#364](https://github.com/taiga-family/maskito/issues/364))
  ([501cf9c](https://github.com/taiga-family/maskito/commit/501cf9c747229d1776fb62cc04fbc8879990c617))
- **kit:** `Prefix`/`Postfix` is incompatible if they end/start with the same character
  ([#366](https://github.com/taiga-family/maskito/issues/366))
  ([06afbcb](https://github.com/taiga-family/maskito/commit/06afbcb4a2c5c15e2ef9dc81db4309adf01aa8ef))

## [1.2.0](https://github.com/taiga-family/maskito/compare/v1.1.1...v1.2.0) (2023-07-03)

### 🚀 Features

- **kit:** `maskitoCaretGuard`'s function has the 2nd argument with current selection range
  ([#358](https://github.com/taiga-family/maskito/issues/358))
  ([eedc4d6](https://github.com/taiga-family/maskito/commit/eedc4d610efaf36b98a4049f5c5334561b5b21c5))

### 🐞 Bug Fixes

- **kit:** `maskitoCaretGuard` incorrectly validates the left side of constraints
  ([#356](https://github.com/taiga-family/maskito/issues/356))
  ([17ee90f](https://github.com/taiga-family/maskito/commit/17ee90fe055f6a8370d6ea75ff2b236fd498441e))
- **kit:** `Number` should skip min/max validation if value does not contain any digits
  ([#359](https://github.com/taiga-family/maskito/issues/359))
  ([ed8221e](https://github.com/taiga-family/maskito/commit/ed8221e14eca62334af41b4c8e571eb86ed68247))

### [1.1.1](https://github.com/taiga-family/maskito/compare/v1.1.0...v1.1.1) (2023-06-29)

### 🐞 Bug Fixes

- **core:** don't ignore native attribute `maxlength` ([#350](https://github.com/taiga-family/maskito/issues/350))
  ([8504f49](https://github.com/taiga-family/maskito/commit/8504f497152931da06dd745763be2505587f97b4))
- **kit:** `Number` should ignore new typed decimal separator if it already exists in text field
  ([#351](https://github.com/taiga-family/maskito/issues/351))
  ([4ccfdc8](https://github.com/taiga-family/maskito/commit/4ccfdc86ff08bcebfd18c04403aa9c9c83cbbd02))

## [1.1.0](https://github.com/taiga-family/maskito/compare/v1.0.0...v1.1.0) (2023-06-23)

### 🚀 Features

- **kit:** `maskitoEventHandler` accepts `AddEventListenerOptions` as the 3d optional argument
  ([#346](https://github.com/taiga-family/maskito/issues/346))
  ([1d5866e](https://github.com/taiga-family/maskito/commit/1d5866efa5e0e4736dd735ae006e027e9bd01e31))
- **kit:** use capturing phase for `focus`/`blur` events in plugins
  ([#347](https://github.com/taiga-family/maskito/issues/347))
  ([ef539e1](https://github.com/taiga-family/maskito/commit/ef539e160f601023e513036d704f7daff9689286))

### 🐞 Bug Fixes

- **kit:** `Date` allows to replace the whole selection range with zero
  ([#345](https://github.com/taiga-family/maskito/issues/345))
  ([98fd21d](https://github.com/taiga-family/maskito/commit/98fd21d50899db365b864faf597fad9a21a3db06))

## [1.0.0](https://github.com/taiga-family/maskito/compare/v0.16.0...v1.0.0) (2023-06-21)

### ⚠ BREAKING CHANGES

- **core:** delete deprecated `preprocessor` & `postprocessor` from `MaskitoOptions`
  ([#337](https://github.com/taiga-family/maskito/issues/337))
  ([0b6aad2](https://github.com/taiga-family/maskito/commit/0b6aad2622ed152d12c91f8ca64b767709ecdbc2))
- **kit:** delete deprecated `isNegativeAllowed` parameter from `Number` mask
  ([#338](https://github.com/taiga-family/maskito/issues/338))
  ([9fd3005](https://github.com/taiga-family/maskito/commit/9fd30055b3157072076f7a8567045fac05b6af9e))

## [0.16.0](https://github.com/taiga-family/maskito/compare/v0.15.0...v0.16.0) (2023-06-20)

### 🚀 Features

- **vue:** support async predicate ([#336](https://github.com/taiga-family/maskito/issues/336))
  ([d1452b5](https://github.com/taiga-family/maskito/commit/d1452b5f1b2f8a252dfd05a5c1eb04ba971a1970))

### 🐞 Bug Fixes

- **kit:** `Number` fails to parse small number on blur (exponential notation problem)
  ([#339](https://github.com/taiga-family/maskito/issues/339))
  ([7f83a7f](https://github.com/taiga-family/maskito/commit/7f83a7f170906c1911eb4444da2d636c0338ed4a))

## [0.15.0](https://github.com/taiga-family/maskito/compare/v0.14.0...v0.15.0) (2023-06-14)

### 🚀 Features

- **core:** add new parameters `preprocessors` & `postprocessors` and deprecate `preprocessor` & `postprocessor`
  ([#333](https://github.com/taiga-family/maskito/issues/333))
  ([0137775](https://github.com/taiga-family/maskito/commit/01377751a9875143257930934b1e2a9143b6da03))

### 🐞 Bug Fixes

- **kit:** `maskitoParseNumber` should return `NaN` for all strings with no digits
  ([#331](https://github.com/taiga-family/maskito/issues/331))
  ([d1ebcec](https://github.com/taiga-family/maskito/commit/d1ebceceedf418b21a68082f7350002d09159ebf))
- **kit:** `Number` incorrectly implements `min`/`max` behaviour
  ([#334](https://github.com/taiga-family/maskito/issues/334))
  ([9876d88](https://github.com/taiga-family/maskito/commit/9876d885f98f86d18db04d723460b468bca3837d))

## [0.14.0](https://github.com/taiga-family/maskito/compare/v0.13.0...v0.14.0) (2023-06-09)

### 🚀 Features

- **angular:** `[maskitoElement]` can accept asynchronous predicate
  ([#316](https://github.com/taiga-family/maskito/issues/316))
  ([3d8949e](https://github.com/taiga-family/maskito/commit/3d8949e878e644079b7f5404cb9ebf6c5eadab86))
- **kit:** `Number` pads empty integer part with zero on blur (if decimal part exists)
  ([#328](https://github.com/taiga-family/maskito/issues/328))
  ([bd01967](https://github.com/taiga-family/maskito/commit/bd01967fba38be26a3c8f0d2f23c0ced12d3b1c2))

## [0.13.0](https://github.com/taiga-family/maskito/compare/v0.12.1...v0.13.0) (2023-06-02)

### 🚀 Features

- **core:** better layout-independent way to detect `Undo` and `Redo`
  ([#320](https://github.com/taiga-family/maskito/issues/320))
  ([4c5a7f6](https://github.com/taiga-family/maskito/commit/4c5a7f64b9a8ac209584c75e17ec022674b87c1b))
- **vue:** add dedicated Vue package ([#321](https://github.com/taiga-family/maskito/issues/321))
  ([f6ffb24](https://github.com/taiga-family/maskito/commit/f6ffb24eca5f1a1a57a93103b9e74cdf410e4132))

### [0.12.1](https://github.com/taiga-family/maskito/compare/v0.12.0...v0.12.1) (2023-05-25)

### 🐞 Bug Fixes

- **kit:** `DateTime` validate min / max if date is complete
  ([#314](https://github.com/taiga-family/maskito/issues/314))
  ([5783e76](https://github.com/taiga-family/maskito/commit/5783e766a657abcf0fc7f8a8d12ac1bf412dc18a))
- **kit:** `Time` & `DateTime` should accept time segment separator typed by user
  ([#317](https://github.com/taiga-family/maskito/issues/317))
  ([3bcac7f](https://github.com/taiga-family/maskito/commit/3bcac7f6566043991a9211f04db744a5ec6f019f))

## [0.12.0](https://github.com/taiga-family/maskito/compare/v0.11.1...v0.12.0) (2023-05-19)

### 🚀 Features

- **core:** add `plugins` to `MaskitoOptions` ([#305](https://github.com/taiga-family/maskito/issues/305))
  ([b512ae2](https://github.com/taiga-family/maskito/commit/b512ae2c64b2a2c6560e2e5c68d8c72952474c71))
- **core:** expose `MaskitoMask`, `MaskitoPreprocessor`, `MaskitoPostprocessor` and `MaskitoPlugin`
  ([#307](https://github.com/taiga-family/maskito/issues/307))
  ([9315a9f](https://github.com/taiga-family/maskito/commit/9315a9f4620b3be86cf3b7af993861664f281a19))
- **kit:** new `maskitoWithPlaceholder` utility ([#299](https://github.com/taiga-family/maskito/issues/299))
  ([21eb69c](https://github.com/taiga-family/maskito/commit/21eb69cfeb73bbe645d5a5879659ab8b6aadbf0c))

### [0.11.1](https://github.com/taiga-family/maskito/compare/v0.11.0...v0.11.1) (2023-05-11)

### 🐞 Bug Fixes

- **core:** `insertFromDrop` action behaves now in the same way as `insertFromPaste`
  ([#291](https://github.com/taiga-family/maskito/issues/291))
  ([58e0fcc](https://github.com/taiga-family/maskito/commit/58e0fccb7ddd3c741ffa3c8b99efbcf4571aab37))
- **kit:** `Time` doesn't validate time segments on `drop` event
  ([#289](https://github.com/taiga-family/maskito/issues/289))
  ([0c6d1b9](https://github.com/taiga-family/maskito/commit/0c6d1b9917d0c86a98c0d215c38a0e2076ff5680))

## [0.11.0](https://github.com/taiga-family/maskito/compare/v0.10.0...v0.11.0) (2023-05-02)

### 🚀 Features

- **react:** new library `@maskito/react` ([#273](https://github.com/taiga-family/maskito/issues/273))
  ([4c2f755](https://github.com/taiga-family/maskito/commit/4c2f755bac9513689964af7fdb7f4deec56bfb52))

## [0.10.0](https://github.com/taiga-family/maskito/compare/v0.9.0...v0.10.0) (2023-04-25)

### 🚀 Features

- **kit:** `Number` keeps untouched decimal part if `precision: Infinity`
  ([#253](https://github.com/taiga-family/maskito/issues/253))
  ([261779e](https://github.com/taiga-family/maskito/commit/261779ead327397a61b27e634bc827ee70b718f4))
- **kit:** `Number` supports new `prefix` & `postfix` parameters
  ([#264](https://github.com/taiga-family/maskito/issues/264))
  ([6e78581](https://github.com/taiga-family/maskito/commit/6e785818dabcde623d8c1c40a584166a0a66f5b6))
- **kit:** new `maskitoPostfixPostprocessorGenerator` ([#257](https://github.com/taiga-family/maskito/issues/257))
  ([fdc86db](https://github.com/taiga-family/maskito/commit/fdc86dbad368bfc17efd1047b7d68d9622968bb0))

### 🐞 Bug Fixes

- **kit:** `Number` fails to trim leading zeroes after deleting of leading digit
  ([#268](https://github.com/taiga-family/maskito/issues/268))
  ([4ae0010](https://github.com/taiga-family/maskito/commit/4ae0010ef2149694d22d7ae9eb8c9880120c8c75))
- **kit:** `Number` should trim redundant thousand separators
  ([#267](https://github.com/taiga-family/maskito/issues/267))
  ([100b793](https://github.com/taiga-family/maskito/commit/100b79317a420103ca98a3b43fe646a6f77d19d5))
- **kit:** fix first zero in short-format date-mask ([#251](https://github.com/taiga-family/maskito/issues/251))
  ([08bdfd2](https://github.com/taiga-family/maskito/commit/08bdfd26727777c3a6fc870e433003be2b64cc0e))

## [0.9.0](https://github.com/taiga-family/maskito/compare/v0.8.1...v0.9.0) (2023-03-31)

### 🚀 Features

- **kit:** new `maskitoPrefixPostprocessorGenerator` ([#235](https://github.com/taiga-family/maskito/issues/235))
  ([50f0d58](https://github.com/taiga-family/maskito/commit/50f0d58ccbfa22d15174d76479a9d642687db099))

### 🐞 Bug Fixes

- **angular:** Jest throws `Class constructor DefaultValueAccessor cannot be invoked without 'new'`
  ([#232](https://github.com/taiga-family/maskito/issues/232))
  ([5089612](https://github.com/taiga-family/maskito/commit/508961288898a5fdd21cc0e26b23ecc8845f9068))

### [0.8.1](https://github.com/taiga-family/maskito/compare/v0.8.0...v0.8.1) (2023-03-27)

### 🐞 Bug Fixes

- `@maskito/core` & `@maskito/kit` now include both `UMD` and `ESM` module formats
  ([#227](https://github.com/taiga-family/maskito/issues/227))
  ([fa1c514](https://github.com/taiga-family/maskito/commit/fa1c514a5753e3bca20e8b0994e4bf9f1c0ab6a4))

## [0.8.0](https://github.com/taiga-family/maskito/compare/v0.7.2...v0.8.0) (2023-03-23)

### 🚀 Features

- **kit:** `DateRange` swaps dates if the 2nd date is less than the 1st one
  ([#212](https://github.com/taiga-family/maskito/issues/212))
  ([3efbb42](https://github.com/taiga-family/maskito/commit/3efbb42f2dd5c4e43ff514da7a82abfc7c4b3a38))

### 🐞 Bug Fixes

- **core:** incorrect order of actions during update of native element
  ([#225](https://github.com/taiga-family/maskito/issues/225))
  ([394d5d9](https://github.com/taiga-family/maskito/commit/394d5d996bdb9d21229ea0301eb3f776bee05d30))

### [0.7.2](https://github.com/taiga-family/maskito/compare/v0.7.1...v0.7.2) (2023-03-23)

### 🐞 Bug Fixes

- **angular:** `@maskito/angular` should not depend on `@maskito/kit`
  ([#221](https://github.com/taiga-family/maskito/issues/221))
  ([0ae7b20](https://github.com/taiga-family/maskito/commit/0ae7b2089ec0436caa8dbb14d5c696ae93e9e7ed))
- **angular:** `npm i @maskito/angular` throws `unable to resolve dependency tree`
  ([#220](https://github.com/taiga-family/maskito/issues/220))
  ([8b4d6e6](https://github.com/taiga-family/maskito/commit/8b4d6e6186db47f97d328186b7afd9af75a3889b))

### [0.7.1](https://github.com/taiga-family/maskito/compare/v0.7.0...v0.7.1) (2023-03-22)

### 🐞 Bug Fixes

- **angular:** use `@nrwl/angular:package` executor instead of `@nrwl/angular:ng-packagr-lite`
  ([#216](https://github.com/taiga-family/maskito/issues/216))
  ([164d015](https://github.com/taiga-family/maskito/commit/164d015c2f18a279e195b45329e84c0d023c9483))
- **kit:** `Number` broken `Delete`-button navigation if `decimalZeroPadding=true`
  ([#211](https://github.com/taiga-family/maskito/issues/211))
  ([1b750d1](https://github.com/taiga-family/maskito/commit/1b750d135ebd53bfeda2ca734425de08a808b1af))

## [0.7.0](https://github.com/taiga-family/maskito/compare/v0.6.0...v0.7.0) (2023-03-20)

### 🚀 Features

- **core:** add `deleteSoftLineBackward` & `deleteSoftLineForward` support
  ([#207](https://github.com/taiga-family/maskito/issues/207))
  ([cbd5479](https://github.com/taiga-family/maskito/commit/cbd5479c04c07113804eee6ea6c9838ee8681597))
- **kit:** use 1 as min segment value in `Date`-related masks
  ([#197](https://github.com/taiga-family/maskito/issues/197))
  ([c85ca23](https://github.com/taiga-family/maskito/commit/c85ca2355cb0b6fcef73f3e7497f7c31fa82c87c))

### 🐞 Bug Fixes

- **core:** `Maskito` losses valid characters on invalid insertion (`overwriteMode: replace`)
  ([#208](https://github.com/taiga-family/maskito/issues/208))
  ([ef183b4](https://github.com/taiga-family/maskito/commit/ef183b454e4a7db5b2cb48cbe26129bf303f676a))
- **kit:** `Number` should drop leading zeroes for negative numbers
  ([#204](https://github.com/taiga-family/maskito/issues/204))
  ([6e9adf7](https://github.com/taiga-family/maskito/commit/6e9adf758aa585944ee08f2e2aff81a5664adefd))

## [0.6.0](https://github.com/taiga-family/maskito/compare/v0.5.0...v0.6.0) (2023-03-15)

### 🚀 Features

- **angular:** add CVA and pipe ([#187](https://github.com/taiga-family/maskito/issues/187))
  ([a099257](https://github.com/taiga-family/maskito/commit/a099257a16b569444cdae9276ce66e9a806f531e))
- **core:** add `deleteWordBackward` & `deleteWordForward` support
  ([#193](https://github.com/taiga-family/maskito/issues/193))
  ([24b761c](https://github.com/taiga-family/maskito/commit/24b761c84d0947df5e4c78a2114f1de8f6ca20f4))

### 🐞 Bug Fixes

- **core:** show trailing fixed characters + duplicated fixed character on `Drop`
  ([#185](https://github.com/taiga-family/maskito/issues/185))
  ([c7f6a1b](https://github.com/taiga-family/maskito/commit/c7f6a1bb8098b5641ed8c6921c2ebc86c6135b58))
- **kit:** `maskitoParseNumber` incorrectly parses negative numbers
  ([#190](https://github.com/taiga-family/maskito/issues/190))
  ([d713bd1](https://github.com/taiga-family/maskito/commit/d713bd143e5090870a406ea14498cb99843bb9d0))
- **kit:** `Number` should drop decimal part on paste from clipboard if `precision=0`
  ([#195](https://github.com/taiga-family/maskito/issues/195))
  ([ba85c38](https://github.com/taiga-family/maskito/commit/ba85c38ec0c81a22ff758f4ba386d045ac49ffd5))

## [0.5.0](https://github.com/taiga-family/maskito/compare/v0.4.0...v0.5.0) (2023-03-09)

### 🚀 Features

- **core:** new utility `maskitoTransform(value, maskitoOptions)`
  ([#177](https://github.com/taiga-family/maskito/issues/177))
  ([20316f1](https://github.com/taiga-family/maskito/commit/20316f15e153bfeeb45eda6406b8792e00f3238f))
- **kit:** new utility `maskitoParseNumber` ([#178](https://github.com/taiga-family/maskito/issues/178))
  ([fc58141](https://github.com/taiga-family/maskito/commit/fc58141625ecbdc7d804aa382a69b38bf7146fc4))

### 🐞 Bug Fixes

- **kit:** `Number` mask throws an error on empty string in `thousandSeparator`
  ([#176](https://github.com/taiga-family/maskito/issues/176))
  ([cd52fad](https://github.com/taiga-family/maskito/commit/cd52fad80bc278f171dafa1709c54cba3f8fbc81))

## [0.4.0](https://github.com/taiga-family/maskito/compare/v0.3.0...v0.4.0) (2023-03-02)

### 🚀 Features

- **angular:** `maskitoElement` add new input ([#164](https://github.com/taiga-family/maskito/issues/164))
  ([407c131](https://github.com/taiga-family/maskito/commit/407c131d2d8f8514173ad7a5e248759e2d4f8abc))

### 🐞 Bug Fixes

- **kit:** `Number` pads empty integer part when paste from clipboard
  ([#168](https://github.com/taiga-family/maskito/issues/168))
  ([d043a82](https://github.com/taiga-family/maskito/commit/d043a82561cbed94b19d59d174fa6da7f08d49d4))

## [0.3.0](https://github.com/taiga-family/maskito/compare/v0.2.0...v0.3.0) (2023-03-01)

### 🚀 Features

- **angular:** add other maskito packages to `ng-update.packageGroup` of `package.json`
  ([#161](https://github.com/taiga-family/maskito/issues/161))
  ([bdecdaa](https://github.com/taiga-family/maskito/commit/bdecdaa9cac2681e35191cabd2d5d853eb97a09d))

### 🐞 Bug Fixes

- **kit:** `Date`-mask fix wrong year that appears using the min property
  ([#157](https://github.com/taiga-family/maskito/issues/157))
  ([544e891](https://github.com/taiga-family/maskito/commit/544e8912d2752e0fc8f77757e935070b94823f65))

## [0.2.0](https://github.com/taiga-family/maskito/compare/v0.1.1...v0.2.0) (2023-02-28)

### 🚀 Features

- **kit:** new `DateTime` mask ([#146](https://github.com/taiga-family/maskito/issues/146))
  ([6d6b2c1](https://github.com/taiga-family/maskito/commit/6d6b2c17b5c0f62bc804451524cd4b2ce3e50660))

### 🐞 Bug Fixes

- **kit:** `Number` is now replacing hyphen, en-dash and em-dash with minus sign
  ([#153](https://github.com/taiga-family/maskito/issues/153))
  ([1f21f11](https://github.com/taiga-family/maskito/commit/1f21f1159baadcef65e49bacaec77eba3b6f36d8))

### [0.1.1](https://github.com/taiga-family/maskito/compare/v0.1.0...v0.1.1) (2023-02-15)

### 🐞 Bug Fixes

- **core:** `Module parse failed: 'import' and 'export' may appear only with 'sourceType: module'`
  ([#131](https://github.com/taiga-family/maskito/issues/131))
  ([41e05c0](https://github.com/taiga-family/maskito/commit/41e05c09e41ed611e0c2b9aa07a953dfbe049da7))

## 0.1.0 (2023-02-14)

This release introduces the first publishing of the following packages:

- `@maskito/core` <br /> It is the main zero-dependency and framework-agnostic package. It can be used alone in Vanilla
  JavaScript project. It listens `beforeinput` and `input` events to validate and calibrate textfield's value. <br />
  Read more: https://maskito.dev/core-concepts/overview
- `@maskito/kit` <br /> The optional framework-agnostic package. It contains ready-to-use masks with configurable
  parameters. This release introduces the following masks:
  - [Number](https://maskito.dev/kit/number)
  - [Time](https://maskito.dev/kit/time)
  - [Date](https://maskito.dev/kit/date)
  - [DateRange](https://maskito.dev/kit/date-range)
- `@maskito/angular`<br /> The Angular-specific library. It provides two convenient ways of using Maskito:
  - Basic directive approach (when developer has direct access to native input element).
  - Dependency Injection approach (when native input element is hidden somewhere deep inside another component).
