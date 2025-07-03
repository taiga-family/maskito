# Contributing

> Thank you for considering contributing to our project. Your help if very welcome!

When contributing, it's better to first discuss the change you wish to make via issue, email, or any other method with
the owners of this repository before making a change.

All members of our community are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please make sure you are
welcoming and friendly in all of our spaces.

## Getting started

In order to make your contribution please make a fork of the repository. After you've pulled the code, follow these
steps to kick-start the development:

1. Run `npm ci` to install dependencies
2. Run `npm start` to launch demo project where you could test your changes
3. Use following commands to ensure code quality

```
npm run lint
npm run build
npm run test
npm run cy:run
```

## Pull Request Process

1. We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) in our commit messages, i.e.
   `feat(core): improve typing`
2. Update [demo](projects/demo) application to reflect changes related to public API and everything relevant
3. Make sure you cover all code changes with unit tests and/or [Cypress](https://www.cypress.io) tests
4. When you are ready, create Pull Request of your fork into original repository
