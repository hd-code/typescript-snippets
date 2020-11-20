import * as assert from 'assert';
import round from '../../src/math/round';

// -----------------------------------------------------------------------------

const precisions = [ undefined, 0, 2, -2 ];
const cases = [
    { number: 0, expected: [0,0,0,0] },
    { number: 3, expected: [ 3, 3, 3, 0] },
    { number:-3, expected: [-3,-3,-3,-0] },
    { number: 123.456, expected: [ 123, 123, 123.46, 100] },
    { number:-123.456, expected: [-123,-123,-123.46,-100] },
    { number: 654.321, expected: [ 654, 654, 654.32, 700] },
    { number:-654.321, expected: [-654,-654,-654.32,-700] },
];

describe('math/round', () => {
    describe('number', () => {
        cases.forEach(({number, expected}) => {
            describe(number+'', () => {
                precisions.forEach((precision, i) => {
                    it('with ' + (precision ?? 'standard') + ' precision', () => {
                        const actual = round(number, precision);
                        assert.strictEqual(actual, expected[i]);
                    });
                });
            });
        });
    });

    describe('vector', () => {
        const indices = [3,4,6];
        const input = indices.map(i => cases[i].number);

        precisions.forEach((precision, precI) => {
            it('with ' + (precision ?? 'standard') + ' precision', () => {
                const expected = indices.map(i => cases[i].expected[precI]);
                const actual = round(input, precision);

                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe('matrix', () => {
        const indices = [[0,1,2],[3,4,6]];
        const input = indices.map(row => row.map(i => cases[i].number));

        precisions.forEach((precision, precI) => {
            it('with ' + (precision ?? 'standard') + ' precision', () => {
                const expected = indices.map(row => row.map(i => cases[i].expected[precI]));
                const actual = round(input, precision);

                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});