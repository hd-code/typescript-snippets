# JS Snippets

This repo just contains a collection of very helpful JS functions and snippets that I use again and again in several projects.

## Structure

* `build` contains the transpiled JavaScript code.
* `src` contains all the snippets source code in TypeScript.
* `test` contains tests for all the code snippets.

## Development

All files in `src` should start with this line:

```ts
/*! <name> <version> | MIT | © Hannes Dröse https://github.com/hd-code/js-snippets */
```

* `<name>` is the name of the package, it usually corresponds with the filename
* `<version>` is the version number in classical semver format (e.g `v1.2.3`)

Make sure to update the version number after changing a snippet.

Always run `npm run deploy` before committing changes. That will run the linter as well as all tests and then build and minify the source code into the `build` directory.