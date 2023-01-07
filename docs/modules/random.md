[typescript-snippets](../README.md) / [Exports](../modules.md) / random

# Module: random

The JavaScript `Math.random()` function is not seedable. This package
provides an implementation of the Lehmer random number generator, which is
seedable.

Make sure to set the seed only once in your application, ideally on startup.

## Table of contents

### Variables

- [MAX\_INT](random.md#max_int)

### Functions

- [float](random.md#float)
- [int](random.md#int)
- [seed](random.md#seed)

## Variables

### MAX\_INT

• `Const` **MAX\_INT**: `number`

The maximum int value returned by `int()` without args.

#### Defined in

random.ts:22

## Functions

### float

▸ **float**(): `number`

Returns a random float between 0 and 1 (both included).

#### Returns

`number`

#### Defined in

random.ts:25

▸ **float**(`max`): `number`

Returns a random float between 0 and `max` (both included).

#### Parameters

| Name | Type |
| :------ | :------ |
| `max` | `number` |

#### Returns

`number`

#### Defined in

random.ts:27

▸ **float**(`min`, `max`): `number`

Returns a random float between `min` and `max` (both included).

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

random.ts:29

___

### int

▸ **int**(): `number`

Returns a random int between 0 and `MAX_INT` (both included).

#### Returns

`number`

#### Defined in

random.ts:38

▸ **int**(`max`): `number`

Returns a random int between 0 and `max` (both included).

#### Parameters

| Name | Type |
| :------ | :------ |
| `max` | `number` |

#### Returns

`number`

#### Defined in

random.ts:40

▸ **int**(`min`, `max`): `number`

Returns a random int between `min` and `max` (both included).

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

random.ts:42

___

### seed

▸ **seed**(`s?`): `void`

Sets the seed for the random number generator. Defaults to 0.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `s` | `number` | `0` |

#### Returns

`void`

#### Defined in

random.ts:64
