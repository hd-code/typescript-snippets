import * as assert from 'assert';
import { parse, serialize } from '../ts/csv';

// -----------------------------------------------------------------------------

describe('csv', () => {
    describe(serialize.name + '()', () => {
        [
            {
                name: 'should correctly serialize array with objects with primitive types',
                input: [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                    { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
                ],
                expected: 'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54',
            },
            {
                name: 'should correctly serialize array with objects with different keys in entries',
                input: [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', age: 38 },
                    { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', rating: 5 },
                ],
                expected:
                    'id,firstname,lastname,age,rating\n1,John,Doe,42,\n2,Jane,,38,\n3,Mary,Bee,null,\n4,Loyd,Hue,,5',
            },
            {
                name: 'should correctly serialize array with empty objects',
                input: [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                    {},
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
                ],
                expected: 'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n,,,\n4,Loyd,Hue,54',
            },
            {
                name: 'should escape entires with , or " or newline',
                input: [
                    { page: 'Home, get started', description: 'There is no place like 127.0.0.1' },
                    { page: 'About', description: 'The story of the Company: "CSV Adventures"' },
                    { page: 'Start', description: 'Ready\nSteady\nGo!' },
                ],
                // eslint-disable-next-line max-len
                expected:
                    'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"',
            },
            {
                name: 'should stringify embedded arrays and objects',
                input: [
                    { id: 1, products: [1, 2, 3], custom: { delivery: 'express' } },
                    { id: 2, products: [4, 5, 6], custom: { delivery: 'normal' } },
                    { id: 3, products: [2, 6] },
                ],
                // eslint-disable-next-line max-len
                expected:
                    'id,products,custom\n1,"[1,2,3]","{""delivery"":""express""}"\n2,"[4,5,6]","{""delivery"":""normal""}"\n3,"[2,6]",',
            },
            {
                name: 'should remove functions',
                input: [
                    { id: 1, func: (x: number, y: number) => x + y },
                    { id: 2, func: (x: number, y: number) => x - y, default: 0 },
                ],
                expected: 'id,func,default\n1,,\n2,,0',
            },
        ].forEach(({ name, input, expected }) =>
            it(name, () => {
                const actual = serialize(input as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                assert.strictEqual(actual, expected);
            }),
        );
    });

    describe(parse.name + '()', () => {
        [
            {
                name: 'should correctly parse a CSV string with plain types',
                input: 'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54',
                expected: [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                    { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
                ],
            },
            {
                name: 'should correctly parse a CSV string with more complex numbers, undefined, null and bool',
                input: 'id,level,filled\n1,12,true\n2,null,false\n3,-0.5,',
                expected: [
                    { id: 1, level: 12, filled: true },
                    { id: 2, level: null, filled: false },
                    { id: 3, level: -0.5 },
                ],
            },
            {
                name: 'should correctly parse a CSV string with escaped strings',
                // eslint-disable-next-line max-len
                input:
                    'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"',
                expected: [
                    { page: 'Home, get started', description: 'There is no place like 127.0.0.1' },
                    { page: 'About', description: 'The story of the Company: "CSV Adventures"' },
                    { page: 'Start', description: 'Ready\nSteady\nGo!' },
                ],
            },
        ].forEach(({ name, input, expected }) =>
            it(name, () => {
                const actual = parse(input);
                assert.deepStrictEqual(actual, expected);
            }),
        );
    });
});
