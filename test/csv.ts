import assert from 'assert';
import * as csv from '../src/csv';

// -----------------------------------------------------------------------------

describe('csv', () => {
    describe('serialize()', () => {
        it('should correctly convert an object array to CSV', () => {
            const data = [
                { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
            ];
            
            const expected = 'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54';
            const actual = csv.serialize(data);

            assert.strictEqual(actual, expected);
        });

        it('should correctly convert an object array with different keys to CSV', () => {
            const data = [
                { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                { id: 2, firstname: 'Jane', age: 38 },
                { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                { id: 4, firstname: 'Loyd', lastname: 'Hue', rating: 5 },
            ];
            
            const expected = 'id,firstname,lastname,age,rating\n1,John,Doe,42,\n2,Jane,,38,\n3,Mary,Bee,null,\n4,Loyd,Hue,,5';
            const actual = csv.serialize(data);

            assert.strictEqual(actual, expected);
        });

        it('should correctly convert an object array with empty entries to CSV', () => {
            const data = [
                { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                {},
                { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
            ];
            
            const expected = 'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n,,,\n4,Loyd,Hue,54';
            const actual = csv.serialize(data);

            assert.strictEqual(actual, expected);
        });

        it('should escape entires with , or " or newline', () => {
            const data = [
                { page: 'Home, get started', description: 'There is no place like 127.0.0.1' },
                { page: 'About', description: 'The story of the Company: "CSV Adventures"' },
                { page: 'Start', description: 'Ready\nSteady\nGo!' },
            ];
            
            const expected = 'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"';
            const actual = csv.serialize(data);

            assert.strictEqual(actual, expected);
        });

        it('should stringify embedded arrays and objects', () => {
            const data = [
                { id: 1, products: [1,2,3], custom: { delivery: 'express' } },
                { id: 2, products: [4,5,6], custom: { delivery: 'normal' } },
                { id: 3, products: [2,6] },
            ];
            
            const expected = 'id,products,custom\n1,"[1,2,3]","{""delivery"":""express""}"\n2,"[4,5,6]","{""delivery"":""normal""}"\n3,"[2,6]",';
            const actual = csv.serialize(data);

            assert.strictEqual(actual, expected);
        });

        it('should remove functions', () => {
            const data = [
                { id: 1, func: (x: number, y: number) => x + y },
                { id: 2, func: (x: number, y: number) => x - y, default: 0 },
            ];
            
            const expected = 'id,func,default\n1,,\n2,,0';
            const actual = csv.serialize(data);

            assert.strictEqual(actual, expected);
        });
    });

    describe('parse()', () => {
        it('should correctly parse a CSV string with plain types', () => {
            const data = 'id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54';

            const expected = [
                { id: 1, firstname: 'John', lastname: 'Doe', age: 42 },
                { id: 2, firstname: 'Jane', lastname: 'Doe', age: 38 },
                { id: 3, firstname: 'Mary', lastname: 'Bee', age: null },
                { id: 4, firstname: 'Loyd', lastname: 'Hue', age: 54 },
            ];
            const actual = csv.parse(data);

            assert.deepStrictEqual(actual, expected);
        });

        it('should correctly parse a CSV string with escaped strings', () => {
            const data = 'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"';

                const expected = [
                    { page: 'Home, get started', description: 'There is no place like 127.0.0.1' },
                    { page: 'About', description: 'The story of the Company: "CSV Adventures"' },
                    { page: 'Start', description: 'Ready\nSteady\nGo!' },
                ];
            const actual = csv.parse(data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});