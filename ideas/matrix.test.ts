import * as matrix from "./matrix";
import { testFunc } from "./testutil";

// -----------------------------------------------------------------------------

describe("matrix", () => {
    testFunc(matrix.isMatrix, [
        [[[]], true],
        [[[[]]], true],
        [
            [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
            true,
        ],
        [
            [
                [
                    [1, 2],
                    [null, 4],
                ],
            ],
            false,
        ],
        [
            [
                [
                    [1, "2"],
                    [3, 4],
                ],
            ],
            false,
        ],
        [[[[1], [3, 4]]], false],
        [
            [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
            ],
            true,
        ],
        [
            [
                [
                    [1, 2, 3],
                    [4, 6],
                ],
            ],
            false,
        ],
        [[[[1, 2, 3]]], true],
        [[[1, 2, 3]], false],
        [[123], false],
        [["123"], false],
        [[{}], false],
    ]);

    // ---------------------------------------------------------------------------

    testFunc(matrix.flatten, [
        [
            [
                [
                    [1, 2],
                    [3, 4],
                ],
            ],
            [1, 2, 3, 4],
        ],
        [
            [
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [1, 2, 3, 4, 5, 6],
        ],
        [[[[1], [2], [3], [4]]], [1, 2, 3, 4]],
        [[[]], []],
        [[[[], []]], []],
    ]);

    testFunc(matrix.transpose, [
        [
            [
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [
                [1, 3, 5],
                [2, 4, 6],
            ],
        ],
        [
            [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
            ],
            [
                [1, 4],
                [2, 5],
                [3, 6],
            ],
        ],
        [[[[1], [2], [3], [4]]], [[1, 2, 3, 4]]],
        [[[[1, 2, 3, 4]]], [[1], [2], [3], [4]]],
        [[[]], []],
        [[[[], []]], []],
    ]);

    // ---------------------------------------------------------------------------

    const data = [
        { mat1: [], mat2: [], add: [], sub: [], mul: [], div: [] },
        {
            mat1: [[1]],
            mat2: [[2]],
            add: [[3]],
            sub: [[-1]],
            mul: [[2]],
            div: [[0.5]],
        },
        {
            mat1: [[12, 4]],
            mat2: [[6, 3]],
            add: [[18, 7]],
            sub: [[6, 1]],
            mul: [[72, 12]],
            div: [[2, 4 / 3]],
        },
        {
            mat1: [[12], [4]],
            mat2: [[6], [3]],
            add: [[18], [7]],
            sub: [[6], [1]],
            mul: [[72], [12]],
            div: [[2], [4 / 3]],
        },
        { mat1: [[1, 2]], mat2: [[3]], add: [], sub: [], mul: [], div: [] },
        { mat1: [[1]], mat2: [[2, 3]], add: [], sub: [], mul: [], div: [] },
        {
            mat1: [[1], [2]],
            mat2: [[3, 4]],
            add: [],
            sub: [],
            mul: [],
            div: [],
        },
    ];

    [matrix.add, matrix.sub, matrix.mul, matrix.div].forEach((func) => {
        const name = func.name as keyof typeof data[0];
        const cases: [[matrix.Matrix, matrix.Matrix], matrix.Matrix][] =
            data.map((d) => [[d.mat1, d.mat2], d[name]]);
        testFunc(func, cases);
    });

    // ---------------------------------------------------------------------------

    testFunc(matrix.scale, [
        [
            [
                0,
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [
                [0, 0],
                [0, 0],
                [0, 0],
            ],
        ],
        [
            [
                0.5,
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [
                [0.5, 1],
                [1.5, 2],
                [2.5, 3],
            ],
        ],
        [
            [
                1,
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        ],
        [
            [
                -0.5,
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [
                [-0.5, -1],
                [-1.5, -2],
                [-2.5, -3],
            ],
        ],
        [
            [
                3,
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
            ],
            [
                [3, 6],
                [9, 12],
                [15, 18],
            ],
        ],
        [
            [
                2,
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
            ],
            [
                [2, 4, 6],
                [8, 10, 12],
            ],
        ],
        [[-3, [[1, 2, 3, 4, 5, 6]]], [[-3, -6, -9, -12, -15, -18]]],
        [[0, []], []],
        [[1, []], []],
        [[0.5, []], []],
        [
            [0, [[], []]],
            [[], []],
        ],
        [
            [1, [[], []]],
            [[], []],
        ],
        [
            [0.5, [[], []]],
            [[], []],
        ],
    ]);

    testFunc(matrix.mulVector, [
        [
            [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                [2, 4, 6],
            ],
            [28, 64],
        ],
        [[[[1, 2, 3]], [0.5, 2, 1]], [7.5]],
        [
            [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                [1, 1, 1],
            ],
            [6, 15],
        ],
        [
            [
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                [2, 4, 6],
            ],
            [],
        ],
        [
            [
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                ],
                [2],
            ],
            [],
        ],
    ]);

    testFunc(matrix.dot, [
        [
            [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
                [
                    [7, 8],
                    [9, 10],
                    [11, 12],
                ],
            ],
            [
                [58, 64],
                [139, 154],
            ],
        ],
        [
            [
                [[3, 4, 2]],
                [
                    [13, 9, 7, 15],
                    [8, 7, 4, 6],
                    [6, 4, 0, 3],
                ],
            ],
            [[83, 63, 37, 75]],
        ],
        [[[[1, 2, 3]], [[4], [5], [6]]], [[32]]],
        [
            [[[4], [5], [6]], [[1, 2, 3]]],
            [
                [4, 8, 12],
                [5, 10, 15],
                [6, 12, 18],
            ],
        ],
        [
            [
                [
                    [1, 2],
                    [4, 5],
                ],
                [
                    [7, 8],
                    [9, 10],
                    [11, 12],
                ],
            ],
            [],
        ],
        [[[[1, 2, 3]], [[1, 2, 3]]], []],
    ]);
});