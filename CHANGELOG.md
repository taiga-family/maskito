# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
