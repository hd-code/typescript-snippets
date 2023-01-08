# Typescript Snippets

This repo contains a collection of helpful code snippets in TypeScript for several topics. See `snippets` folder for the actual code snippets. They are grouped into modules by topic.

## Installation & Usage

Since there are so many ways to build and pack TypeScript applications, prebuild versions of the code snippets are no longer provided. Just take the snippets directly from the source code files. Just make sure to preserve the copyright notice at the top of the file.

## Development

### Versioning

All files should start with this line:

```ts
/*! <name> <version> | MIT | https://github.com/hd-code/typescript-snippets */
```

- `<name>` is the name of the package, it usually corresponds with the filename
- `<version>` is the version number in classical semver format (e.g `v1.2.3`)

Make sure to update the version number after changing a snippet.

### Scripts

There a several scripts to support development.

- `npm start`: run all scripts below
- `npm test`: run all unit tests
- `npm run coverage`: display test coverage for all unit tests
- `npm run format`: auto format all snippets with prettier

The scripts can also be run for the modules in `ideas` directory by appending `:ideas` to the commands above.

### Contributing

**Alway run `npm start` before committing**
