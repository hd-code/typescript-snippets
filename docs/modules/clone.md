[typescript-snippets](../README.md) / [Exports](../modules.md) / clone

# Module: clone

Shallow and deep clone objects in JavaScript.

## Table of contents

### Functions

- [clone](clone.md#clone)
- [deepClone](clone.md#deepclone)

## Functions

### clone

▸ **clone**<`T`\>(`original`): `T`

Clones an object, array or primitive value. It creates shallow clones only.
So, nested arrays or objects are copied only by reference. Changes to the
nested elements in the copy will effect the original and vice versa.

If deep clones are needed, use [deepClone](clone.md#deepclone). However, deep cloning is a
lot slower.

_Attention_: Classes are not correctly cloned.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `original` | `T` |

#### Returns

`T`

#### Defined in

[clone.ts:18](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/clone.ts#L18)

___

### deepClone

▸ **deepClone**<`T`\>(`original`): `T`

Clones a passed object, array or primitive value. It creates deep clones.
So nested arrays or objects will be copied as well. That means that the
original and the clone are completely independent from each other.

_Attention_: Classes are not correctly cloned.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `original` | `T` |

#### Returns

`T`

#### Defined in

[clone.ts:37](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/clone.ts#L37)
