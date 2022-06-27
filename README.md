# Web Snippets

This repo contains a collection of helpful code snippets for web development (Javascript, CSS).

## Overview

The CSS snippets are on the `css/` directory, JS snippets in the `js/` directory.

CSS is compiled from SASS and JS from TypeScript source code. There is always a `src/` directory with the source files. The generated CSS and JS files are put in a `build/` directory. So do not edit anything in the `build/` folders. Also, the code is the `build/` folders is always standalone and ready to be copied and used.

For the TypeScript code there are automated tests in the corresponding `*.test.ts` files. There are also some manual tests. These are usually done with help of an HTML file of the same name. These can be found in a separate `test/` folder.

## Development

### Versioning

All files should start with this line:

```ts
/*! <name> <version> | MIT | https://github.com/hd-code/web-snippets */
```

- `<name>` is the name of the package, it usually corresponds with the filename
- `<version>` is the version number in classical semver format (e.g `v1.2.3`)

Make sure to update the version number after changing a snippet.

### Tools

Please install the dev dependencies before working on the source code. To use any of the snippets in the `build/` folders no external dependencies are required. They can be used right away.

```sh
npm ci
```

### Compile `build/` files

**Always run `npm run all` after editing anything.**

This will perform several tasks: first it performs type checks and validates the code style. It then runs the tests. If all goes well, the Javascript files will be compiled and put into the `js/` folder together with TypeScript declaration files. The Javascript files will be minified as well.

If anything goes wrong, the build will not succeed and errors will be logged to the console.
