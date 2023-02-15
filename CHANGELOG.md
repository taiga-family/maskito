# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2023-02-14)

This release introduces the first publishing of the following packages:

- `@maskito/core` <br /> It is the main zero-dependency and framework-agnostic package. It can be used alone in Vanilla
  Javascript project. It listens `beforeinput` and `input` events to validate and calibrate textfield's value. <br />
  Read more: https://tinkoff.github.io/maskito/core-concepts/overview
- `@maskito/kit` <br /> The optional framework-agnostic package. It contains ready-to-use masks with configurable
  parameters. This release introduces the following masks:
  - [Number](https://tinkoff.github.io/maskito/kit/number)
  - [Time](https://tinkoff.github.io/maskito/kit/time)
  - [Date](https://tinkoff.github.io/maskito/kit/date)
  - [DateRange](https://tinkoff.github.io/maskito/kit/date-range)
- `@maskito/angular` The Angular-specific library. It provides two convenient ways of using Maskito: - Basic directive
  approach (when developer has direct access to native input element). - Dependency Injection approach (when native
  input element is hidden somewhere deep inside another component).
