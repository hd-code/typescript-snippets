[typescript-snippets](../README.md) / [Exports](../modules.md) / csv

# Module: csv

This module gives the possibility to transform arrays of objects to csv
strings and backwards.

## Table of contents

### Functions

- [parse](csv.md#parse)
- [serialize](csv.md#serialize)

## Functions

### parse

▸ **parse**<`T`\>(`csv`): `T`[]

Converts a csv string back to an array of objects.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `csv` | `string` |

#### Returns

`T`[]

#### Defined in

[csv.ts:19](https://github.com/hd-code/typescript-snippets/blob/3d4193d/snippets/csv.ts#L19)

___

### serialize

▸ **serialize**<`T`\>(`data`): `string`

Converts an array of objects into a csv string.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |

#### Returns

`string`

#### Defined in

[csv.ts:12](https://github.com/hd-code/typescript-snippets/blob/3d4193d/snippets/csv.ts#L12)
