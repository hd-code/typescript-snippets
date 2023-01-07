[typescript-snippets](../README.md) / [Exports](../modules.md) / typeguards

# Module: typeguards

This file contains several type guards that can be used for excessive type
checking in Typescript or Javascript.

## Table of contents

### Type Aliases

- [EnumType](typeguards.md#enumtype)

### Functions

- [hasKey](typeguards.md#haskey)
- [isArray](typeguards.md#isarray)
- [isBool](typeguards.md#isbool)
- [isEnum](typeguards.md#isenum)
- [isInteger](typeguards.md#isinteger)
- [isNull](typeguards.md#isnull)
- [isNumber](typeguards.md#isnumber)
- [isObject](typeguards.md#isobject)
- [isString](typeguards.md#isstring)
- [isUndefined](typeguards.md#isundefined)

## Type Aliases

### EnumType

Ƭ **EnumType**: `Object`

#### Index signature

▪ [key: `number` \| `string`]: `number` \| `string`

#### Defined in

[typeguards.ts:111](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L111)

## Functions

### hasKey

▸ **hasKey**<`T`\>(`obj`, `key`, `typeGuard?`): obj is T

TypeGuard to check if a passed object contains the specified key.

Also, you can check an array or a string if they have an entry at a specific
index. Just pass the array as the object parameter and the index as the key
to this function.

Optional: You can pass a typeGuard as a third argument to this function. If
the given key is found, the value associated with that key is then
type-checked by the typeGuard.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `unknown` |
| `key` | keyof `T` |
| `typeGuard?` | (`el`: `unknown`) => el is T[keyof T] |

#### Returns

obj is T

#### Defined in

[typeguards.ts:96](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L96)

___

### isArray

▸ **isArray**<`T`\>(`value`, `typeGuard?`): value is T[]

TypeGuard to check if a value is an `array`.

Optional: You can pass a typeGuard as a second argument. This will perform a
type check on each element of the array. If the type check fails on any
element, the function will return false.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |
| `typeGuard?` | (`el`: `unknown`) => el is T |

#### Returns

value is T[]

#### Defined in

[typeguards.ts:50](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L50)

___

### isBool

▸ **isBool**(`value`): value is boolean

TypeGuard to check if a value is a `boolean`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is boolean

#### Defined in

[typeguards.ts:22](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L22)

___

### isEnum

▸ **isEnum**<`T`\>(`value`, `enumType`): value is T[keyof T]

TypeGuard to check if a value is an instance of an enum.

This guard is only effectively usable with typescript.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`EnumType`](typeguards.md#enumtype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |
| `enumType` | `T` |

#### Returns

value is T[keyof T]

#### Defined in

[typeguards.ts:118](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L118)

___

### isInteger

▸ **isInteger**(`value`): value is number

TypeGuard to check if a value is a `number` with no decimals.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is number

#### Defined in

[typeguards.ts:27](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L27)

___

### isNull

▸ **isNull**(`value`): value is null

TypeGuard to check if a value is `null`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is null

#### Defined in

[typeguards.ts:17](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L17)

___

### isNumber

▸ **isNumber**(`value`): value is number

TypeGuard to check if a value is a `number`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is number

#### Defined in

[typeguards.ts:32](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L32)

___

### isObject

▸ **isObject**<`T`\>(`value`): value is T

TypeGuard to check if a value is an object. If the value is `null`, the type
guard will reject the value. However, just an empty object (like this: `{}`)
is valid. Arrays are also not accepted as valid objects. Use `isArray()`
function in that case.

If you want to check the object for specific keys, use `hasKey()`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is T

#### Defined in

[typeguards.ts:79](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L79)

___

### isString

▸ **isString**(`value`): value is string

TypeGuard to check if a value is a `string`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is string

#### Defined in

[typeguards.ts:37](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L37)

___

### isUndefined

▸ **isUndefined**(`value`): value is undefined

TypeGuard to check if a value is `undefined`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is undefined

#### Defined in

[typeguards.ts:12](https://github.com/hd-code/typescript-snippets/blob/a489483/snippets/typeguards.ts#L12)
