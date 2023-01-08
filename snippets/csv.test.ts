import assert from "assert/strict";
import * as csv from "./csv";

describe("csv", function () {
    Object.entries({
        "records with primitive types": {
            records: [
                { id: 1, firstname: "John", lastname: "Doe", age: 42 },
                { id: 2, firstname: "Jane", lastname: "Doe", age: 38 },
                { id: 3, firstname: "Mary", lastname: "Bee", age: null },
                { id: 4, firstname: "Lloyd", lastname: true, age: false },
            ],
            string: "id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Lloyd,true,false",
        },
        "records with different keys in entries": {
            records: [
                { id: 1, firstname: "John", lastname: "Doe", age: 42 },
                { id: 2, firstname: "Jane", age: 38 },
                { id: 3, firstname: "Mary", lastname: "Bee", age: null },
                { id: 4, firstname: "Loyd", lastname: "Hue", rating: 5 },
            ],
            string: "id,firstname,lastname,age,rating\n1,John,Doe,42,\n2,Jane,,38,\n3,Mary,Bee,null,\n4,Loyd,Hue,,5",
        },
        "records with empty objects": {
            records: [
                { id: 1, firstname: "John", lastname: "Doe", age: 42 },
                { id: 2, firstname: "Jane", lastname: "Doe", age: 38 },
                {},
                { id: 4, firstname: "Loyd", lastname: "Hue", age: 54 },
            ],
            string: "id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n,,,\n4,Loyd,Hue,54",
        },
        "records with fields that must be escaped": {
            records: [
                {
                    page: "Home, get started",
                    description: "There is no place like 127.0.0.1",
                },
                {
                    page: "About",
                    description: 'The story of the Company: "CSV Adventures"',
                },
                { page: "Start", description: "Ready\nSteady\nGo!" },
            ],
            string: 'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"',
        },
        "records with embedded arrays and objects": {
            records: [
                {
                    id: 1,
                    products: [1, 2, 3],
                    custom: { delivery: "express" },
                },
                {
                    id: 2,
                    products: [4, 5, 6],
                    custom: { delivery: "normal" },
                },
                { id: 3, products: [2, 6] },
            ],
            string: 'id,products,custom\n1,"[1,2,3]","{""delivery"":""express""}"\n2,"[4,5,6]","{""delivery"":""normal""}"\n3,"[2,6]",',
        },
        "records with embedded functions (which are removed)": {
            records: [
                { id: 1, func: (x: number, y: number) => x + y },
                {
                    id: 2,
                    func: (x: number, y: number) => x - y,
                    default: 0,
                },
            ],
            recordsWant: [{ id: 1 }, { id: 2, default: 0 }],
            string: "id,func,default\n1,,\n2,,0",
        },
        empty: {
            records: [],
            string: "",
        },
    }).forEach(([name, testCase]) => {
        describe(name, function () {
            it(csv.stringify.name, function () {
                const got = csv.stringify(testCase.records as any);
                assert.equal(got, testCase.string);
            });
            it(csv.parse.name, function () {
                const got = csv.parse(testCase.string);
                assert.deepEqual(got, testCase.recordsWant ?? testCase.records);
            });
        });
    });
});
