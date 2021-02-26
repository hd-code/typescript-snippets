# Web Snippets

This repo contains a collection of helpful code snippets for the web (TypeScript, Javascript, CSS).

## Structure

- `build/` holds the compiled and minified JS code for distribution and TypeScript declaration files. This is generated automatically during a build process.
- `src/` holds the TypeScript code snippets, which will be compiled to `build/`
- `styles/` holds a basic collection of CSS files, which can be used as a base for a new web project
- `test/` holds automatic test scripts for the code in `src/`

## Development

### Preparation

Please install the dev dependencies before working on this repository.

```sh
npm install
```

### General

All files in `src` should start with this line:

```ts
/*! <name> <version> | MIT | © Hannes Dröse https://github.com/hd-code/web-snippets */
```

- `<name>` is the name of the package, it usually corresponds with the filename
- `<version>` is the version number in classical semver format (e.g `v1.2.3`)

Make sure to update the version number after changing a snippet.

**Always run `npm run deploy` before committing changes.**

### Helpful commands

- `npm run build` will compile and minify the TypeScript snippets to `build/`
- `npm run check` will typecheck the TypeScript snippets with the TypeScript compiler
- `npm run lint` will check the syntax of the TypeScript files in `src/` and `test/`
- `npm run lint-fix` will resolve some of the linter errors – use carefully
- `npm run deploy` will check and lint the TypeScript snippets, run all tests and, if all goes well, compile and minify the project to `build/`
- `npm test` will run all tests in `test/` and log the results
