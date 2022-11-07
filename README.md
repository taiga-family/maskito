# Angular Open-source Starter

[![Deploy](https://github.com/Tinkoff/angular-open-source-starter/actions/workflows/deploy.yml/badge.svg)](https://github.com/Tinkoff/angular-open-source-starter/actions/workflows/deploy.yml)
[![Unit tests](https://github.com/Tinkoff/angular-open-source-starter/actions/workflows/test.yml/badge.svg)](https://github.com/Tinkoff/angular-open-source-starter/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Tinkoff/angular-open-source-starter/branch/main/graph/badge.svg?token=KfV90T6KkK)](https://codecov.io/gh/Tinkoff/angular-open-source-starter)
[![Demo](https://img.shields.io/badge/demo-website-green)](https://tinkoff.github.io/angular-open-source-starter/)

## How to use

> This is a starter project for creating open-source libraries for Angular. It is a full-fledged Angular workspace with
> demo application and easy library addition. It is designed to be used for open-sourcing libraries on GitHub and has
> everything you'd need ready for CI, code coverage, SSR testing, StackBlitz demo deployment and more.

1. Run `npm ci` to install everything

2. Change `npmScope` inside `nx.json`

3. Create basic file structure via [Nx-generators](https://nx.dev/plugin-features/use-code-generators):

   - `nx g @nrwl/js:library [your-library-name]` - create Typescript library. See
     [available options](https://nx.dev/packages/js/generators/library#options).
   - `nx g @nrwl/angular:library [your-library-name]` - create Angular library. See
     [available options](https://nx.dev/packages/angular/generators/library#options).

4. Fill in `projects/[your-library-name]/package.json` metadata for your newly generated library

5. Add your email at [INSERT YOUR EMAIL HERE] in `CODE_OF_CONDUCT.md`

6. Update `LICENSE` file according to your preferences

7. Update root `package.json` metadata to represent your project

8. Code your library and create demo for it

## Cool features

- [x] Versioning is ready for you with following simple commands:

```json
{
  "release": "standard-version",
  "release:patch": "npm run release -- --release-as patch",
  "release:minor": "npm run release -- --release-as minor",
  "release:major": "npm run release -- --release-as major",
  "publish": "nx run-many --target build --all --exclude=demo && nx run-many --target publish --all"
}
```

Just use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) format and `CHANGELOG.md` will be
automatically generated on releases by
[Standard Version](https://github.com/conventional-changelog/standard-version#standard-version).

- [x] This project has Angular Universal — you can easily test your library with SSR and Prerender:

  `npm run serve:dev:ssr` or `npm run build:prerender && npm run serve:prerender`

- [x] CI and code coverage are ready, GitHub Action checks that packages build, test and lint correctly. It also sends
      test results to [Codecov](https://about.codecov.io).

- [x] Precommit checks, prettier, linter and all that jazz is there.

- [x] You can also deploy your demo to [StackBlitz](https://stackblitz.com) with no hustle, just use link in the
      following format:

         https://stackblitz.com/github/[User|Organization]/[Repository]/tree/main/projects/demo

- [x] You can add more libraries using the same [Nx-generators](https://nx.dev/plugin-features/use-code-generators) to
      create a whole Angular Workspace with multiple libraries. Versioning and publishing is configured that they are
      released simultaneously like Angular packages.

## Infrastructure

- [x] GitHub Actions
- [x] Node.js 16+, npm 8+
- [x] Angular 12+
- [x] TypeScript 4+
- [x] Prettier 2.6+
- [x] Stylelint 14+
- [x] ESLint 7+
- [x] Husky 7+
- [x] Cypress 10+
- [x] Jest 27+
- [x] Nx 13+

## Badge

Show that your project is based off of our starter

[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/Tinkoff/angular-open-source-starter)

```md
[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/Tinkoff/angular-open-source-starter)
```
