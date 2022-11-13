[typescript-snippets](../README.md) / [Exports](../modules.md) / domfiles

# Module: domfiles

Download and upload data from and to data files in the browser.

## Table of contents

### Functions

- [download](domfiles.md#download)
- [openFile](domfiles.md#openfile)

## Functions

### download

▸ **download**(`data`, `filename?`): `Promise`<`void`\>

Download a string of data from the browser into a data file.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `string` | `undefined` |
| `filename` | `string` | `"data.txt"` |

#### Returns

`Promise`<`void`\>

#### Defined in

domfiles.ts:9

___

### openFile

▸ **openFile**(): `Promise`<`string`\>

Open a data file in the browser.

#### Returns

`Promise`<`string`\>

#### Defined in

domfiles.ts:30
