# Web Snippets

This repo contains a collection of helpful code snippets for web development (TypeScript, Javascript, CSS).

## CSS Snippets

The files in `css/` form a good style basis for any new project. They follow the atomic css principle.

## Javascript Snippets

All Javascript snippets are generated from the corresponding TypeScript snippets in `src/`. So, do not edit the files in `js/`.

## TypeScript Snippets

The `src/` directory holds helpful utility scripts for a bunch of different tasks.

### General

All files should start with this line:

```ts
/*! <name> <version> | MIT | https://github.com/hd-code/web-snippets */
```

- `<name>` is the name of the package, it usually corresponds with the filename
- `<version>` is the version number in classical semver format (e.g `v1.2.3`)

Make sure to update the version number after changing a snippet.

### Preparation

Please install the dev dependencies before working on the TypeScript snippets.

```sh
npm install
```

### Testing

All TypeScript snippets should be tested thoroughly. Tests are placed in `test/` and are executed with <https://jestjs.io/>.

### Compile to Javascript

**Always run `npm run deploy` after editing the TypeScript snippets.**

This will perform several tasks: first it performs typechecks and validates the code style. It then runs the tests. If all goes well, the Javascript files will be compiled and put into the `js/` folder together with TypeScript declaration files. The Javascript files will be minified as well.

If anything goes wrong, the build will not succeed and errors will be logged to the console.
