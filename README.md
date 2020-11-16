# JS Snippets

This repo contains a collection of very helpful JS functions and snippets that I use again and again in several projects.

## Structure

- `build/` holds the compiled and minified code for distribution and TypeScript declaration files. This is generated automatically during a build process.
- `src/` holds all the source code, which will be compiled to `build/`
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
/*! <name> <version> | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
```

- `<name>` is the name of the package, it usually corresponds with the filename
- `<version>` is the version number in classical semver format (e.g `v1.2.3`)

Make sure to update the version number after changing a snippet.

**Always run `npm run deploy` before committing changes.**

### Helpful commands

- `npm run build` will compile and minify the project to `build/`
- `npm run deploy` will lint the project, run all tests and if all goes well compile and minify the project to `build/`
- `npm run lint` will check and fix to some degree the syntax of the TypeScript files in `src/` and `test/`
- `npm test` will run all tests in `test/` and log the results
