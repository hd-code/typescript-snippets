import { parse, serialize } from 'csv';

// -----------------------------------------------------------------------------

describe('csv', () => {
    describe(serialize.name + '()', () => {
        it.each([
            [
                'should correctly serialize array with objects with primitive types',
                [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                    { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
                ],
                'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54',
            ],
            [
                'should correctly serialize array with objects with different keys in entries',
                [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', age: 38 },
                    { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', rating: 5 },
                ],
                'id,firstname,lastname,age,rating\n1,John,Doe,42,\n2,Jane,,38,\n3,Mary,Bee,null,\n4,Loyd,Hue,,5',
            ],
            [
                'should correctly serialize array with empty objects',
                [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                    {},
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
                ],
                'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n,,,\n4,Loyd,Hue,54',
            ],
            [
                'should escape entires with , or " or newline',
                [
                    { page: 'Home, get started', description: 'There is no place like 127.0.0.1' },
                    { page: 'About', description: 'The story of the Company: "CSV Adventures"' },
                    { page: 'Start', description: 'Ready\nSteady\nGo!' },
                ],
                'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"',
            ],
            [
                'should stringify embedded arrays and objects',
                [
                    { id: 1, products: [1, 2, 3], custom: { delivery: 'express' } },
                    { id: 2, products: [4, 5, 6], custom: { delivery: 'normal' } },
                    { id: 3, products: [2, 6] },
                ],
                'id,products,custom\n1,"[1,2,3]","{""delivery"":""express""}"\n2,"[4,5,6]","{""delivery"":""normal""}"\n3,"[2,6]",',
            ],
            [
                'should remove functions',
                [
                    { id: 1, func: (x: number, y: number) => x + y },
                    { id: 2, func: (x: number, y: number) => x - y, default: 0 },
                ],
                'id,func,default\n1,,\n2,,0',
            ],
        ])('%s', (_, input, expected) => {
            const actual = serialize(input as any); // eslint-disable-line @typescript-eslint/no-explicit-any
            expect(actual).toEqual(expected);
        });
    });

    describe(parse.name + '()', () => {
        it.each([
            [
                'should correctly parse a CSV string with plain types',
                'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54',
                [
                    { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                    { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                    { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                    { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
                ],
            ],
            [
                'should correctly parse a CSV string with more complex numbers, undefined, null and bool',
                'id,level,filled\n1,12,true\n2,null,false\n3,-0.5,',
                [
                    { id: 1, level: 12, filled: true },
                    { id: 2, level: null, filled: false },
                    { id: 3, level: -0.5 },
                ],
            ],
            [
                'should correctly parse a CSV string with escaped strings',
                'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"',
                [
                    { page: 'Home, get started', description: 'There is no place like 127.0.0.1' },
                    { page: 'About', description: 'The story of the Company: "CSV Adventures"' },
                    { page: 'Start', description: 'Ready\nSteady\nGo!' },
                ],
            ],
        ])('%s', (_, input, expected) => {
            const actual = parse(input);
            expect(actual).toEqual(expected);
        });
    });
});
