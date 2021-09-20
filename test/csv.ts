import { parse, serialize } from "csv";
import { testFunc } from "./testutil";

describe("csv", () => {
  testFunc(serialize, {
    "primitive types": {
      args: [
        [
          { id: 1, firstname: "John", lastname: "Doe", age: 42 },
          { id: 2, firstname: "Jane", lastname: "Doe", age: 38 },
          { id: 3, firstname: "Mary", lastname: "Bee", age: null },
          { id: 4, firstname: "Loyd", lastname: "Hue", age: 54 },
        ],
      ],
      want: "id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54",
    },
    "different keys in entries": {
      args: [
        [
          { id: 1, firstname: "John", lastname: "Doe", age: 42 },
          { id: 2, firstname: "Jane", age: 38 },
          { id: 3, firstname: "Mary", lastname: "Bee", age: null },
          { id: 4, firstname: "Loyd", lastname: "Hue", rating: 5 },
        ],
      ],
      want: "id,firstname,lastname,age,rating\n1,John,Doe,42,\n2,Jane,,38,\n3,Mary,Bee,null,\n4,Loyd,Hue,,5",
    },
    "empty objects": {
      args: [
        [
          { id: 1, firstname: "John", lastname: "Doe", age: 42 },
          { id: 2, firstname: "Jane", lastname: "Doe", age: 38 },
          {},
          { id: 4, firstname: "Loyd", lastname: "Hue", age: 54 },
        ],
      ],
      want: "id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n,,,\n4,Loyd,Hue,54",
    },
    'escape entires with , or " or newline': {
      args: [
        [
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
      ],
      want: 'page,description\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"',
    },
    "stringify embedded arrays and objects": {
      args: [
        [
          { id: 1, products: [1, 2, 3], custom: { delivery: "express" } },
          { id: 2, products: [4, 5, 6], custom: { delivery: "normal" } },
          { id: 3, products: [2, 6] },
        ],
      ],
      want: 'id,products,custom\n1,"[1,2,3]","{""delivery"":""express""}"\n2,"[4,5,6]","{""delivery"":""normal""}"\n3,"[2,6]",',
    },
    "remove functions": {
      args: [
        [
          { id: 1, func: (x: number, y: number) => x + y },
          { id: 2, func: (x: number, y: number) => x - y, default: 0 },
        ],
      ],
      want: "id,func,default\n1,,\n2,,0",
    },
  });

  testFunc(parse, {
    "plain types": {
      args: [
        "id,firstname,lastname,age\n1,John,Doe,42\n2,Jane,Doe,38\n3,Mary,Bee,null\n4,Loyd,Hue,54",
      ],
      want: [
        { id: 1, firstname: "John", lastname: "Doe", age: 42 },
        { id: 2, firstname: "Jane", lastname: "Doe", age: 38 },
        { id: 3, firstname: "Mary", lastname: "Bee", age: null },
        { id: 4, firstname: "Loyd", lastname: "Hue", age: 54 },
      ],
    },
    "more complex numbers, undefined, null and bool": {
      args: ["id,level,filled\n1,12,true\n2,null,false\n3,-0.5,"],
      want: [
        { id: 1, level: 12, filled: true },
        { id: 2, level: null, filled: false },
        { id: 3, level: -0.5 },
      ],
    },
    "with escaped strings": {
      args: [
        'page,description\r\n"Home, get started",There is no place like 127.0.0.1\nAbout,"The story of the Company: ""CSV Adventures"""\nStart,"Ready\nSteady\nGo!"\r\n"Posts, Pages and more","[1,12]"',
      ],
      want: [
        {
          page: "Home, get started",
          description: "There is no place like 127.0.0.1",
        },
        {
          page: "About",
          description: 'The story of the Company: "CSV Adventures"',
        },
        { page: "Start", description: "Ready\nSteady\nGo!" },
        { page: "Posts, Pages and more", description: "[1,12]" },
      ],
    },
  });
});
