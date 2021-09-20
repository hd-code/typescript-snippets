import { toBinary, toBinaryString } from "binary";
import { testFunc } from "./testutil";

const cases = [
  { args: [2], wantStr: "10", wantArr: [1, 0] },
  { args: [5], wantStr: "101", wantArr: [1, 0, 1] },
  { args: [5.5], wantStr: "101", wantArr: [1, 0, 1] },
  { args: [7.2], wantStr: "111", wantArr: [1, 1, 1] },
  { args: [5, 5], wantStr: "00101", wantArr: [0, 0, 1, 0, 1] },
  { args: [-1, 4], wantStr: "1111", wantArr: [1, 1, 1, 1] },
  { args: [-2, 4], wantStr: "1110", wantArr: [1, 1, 1, 0] },
  { args: [20, 4], wantStr: "0100", wantArr: [0, 1, 0, 0] },
  { args: [2, 0], wantStr: "", wantArr: [] },
  { args: [2, -1], wantStr: "", wantArr: [] },
  { args: [2, 1.7], wantStr: "0", wantArr: [0] },
  { args: [2, 2.7], wantStr: "10", wantArr: [1, 0] },
  { args: [2, 3.7], wantStr: "010", wantArr: [0, 1, 0] },
];

describe("binary", () => {
  testFunc(
    toBinary,
    cases.map(({ args, wantArr }) => ({ args, want: wantArr })),
  );
  testFunc(
    toBinaryString,
    cases.map(({ args, wantStr }) => ({ args, want: wantStr })),
  );
});
