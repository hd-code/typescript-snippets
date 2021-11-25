import {
  Activation,
  calcActivation,
  calcActivationDerivative,
  isActivation,
} from "../neural-net/activation";
import { testFunc } from "../../src/testutil";

const cases = [
  {
    act: Activation.sigmoid,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [
      0.000045397868702434395, 0.2689414213699951, 0.3775406687981454, 0.5,
      0.6224593312018546, 0.7310585786300049, 0.9999546021312976,
    ],
    deriv: [
      0.000045395807735951673, 0.19661193324148185, 0.2350037122015945, 0.25,
      0.2350037122015945, 0.19661193324148185, 0.000045395807735907655,
    ],
  },
  {
    act: Activation.tanh,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [
      -0.9999999958776926, -0.7615941559557649, -0.4621171572600098, 0,
      0.4621171572600098, 0.7615941559557649, 0.9999999958776926,
    ],
    deriv: [
      8.244614768671e-9, 0.41997434161402614, 0.7864477329659274, 1,
      0.7864477329659274, 0.41997434161402614, 8.244614768671e-9,
    ],
  },
  {
    act: Activation.hardTanh,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [-1, -1, -0.5, 0, 0.5, 1, 1],
    deriv: [0, 0, 1, 1, 1, 0, 0],
  },
  {
    act: Activation.linear,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [-10, -1, -0.5, 0, 0.5, 1, 10],
    deriv: [1, 1, 1, 1, 1, 1, 1],
  },
  {
    act: Activation.rectifiedLinear,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [0, 0, 0, 0, 0.5, 1, 10],
    deriv: [0, 0, 0, 0, 1, 1, 1],
  },
  {
    act: Activation.leakyRectifiedLinear,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [-0.1, -0.01, -0.005, 0, 0.5, 1, 10],
    deriv: [0.01, 0.01, 0.01, 0.01, 1, 1, 1],
  },
  {
    act: Activation.softplus,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [
      0.000045398899216870535, 0.31326168751822286, 0.4740769841801067,
      0.6931471805599453, 0.9740769841801067, 1.3132616875182228,
      10.000045398899218,
    ],
    deriv: [
      0.000045397868702434395, 0.2689414213699951, 0.3775406687981454, 0.5,
      0.6224593312018546, 0.7310585786300049, 0.9999546021312976,
    ],
  },
  {
    act: Activation.softmax,
    input: [-10, -1, -0.5, 0, 0.5, 1, 10],
    output: [
      2.060560383446606e-9, 0.000016696893724904762, 0.000027528523838869974,
      0.000045386862804120476, 0.0000748302861155019, 0.00012337428441120443,
      0.999712181088545,
    ],
    deriv: [
      2.060560379200697e-9, 0.000016696614938644704, 0.000027527766019245227,
      0.00004538480283680528, 0.00007482468654378176, 0.00012335906319715044,
      0.00028773607172922664,
    ],
  },
  {
    act: Activation.softmax,
    input: [1, 2, 3, 4],
    output: [
      0.03205860328008499, 0.08714431874203257, 0.23688281808991013,
      0.6439142598879722,
    ],
    deriv: [
      0.03103084923581511, 0.0795501864530196, 0.1807693485836927,
      0.22928868580089717,
    ],
  },
  {
    act: Activation.softmax,
    input: [1, 1, 1, 1],
    output: [0.25, 0.25, 0.25, 0.25],
    deriv: [0.1875, 0.1875, 0.1875, 0.1875],
  },
];

describe("neural-net/activation", () => {
  testFunc(isActivation, [
    [[Activation.sigmoid], true],
    [[Activation.tanh], true],
    [[Activation.hardTanh], true],
    [[Activation.linear], true],
    [[Activation.rectifiedLinear], true],
    [[Activation.leakyRectifiedLinear], true],
    [[Activation.softplus], true],
    [[Activation.softmax], true],
    [["test"], false],
    [[-2], false],
    [[59], false],
    [[[2]], false],
    [[{}], false],
  ]);

  testFunc(
    calcActivation,
    cases.map((c) => [[c.input, c.act] as [number[], Activation], c.output]),
  );

  testFunc(
    calcActivationDerivative,
    cases.map((c) => [[c.input, c.act] as [number[], Activation], c.deriv]),
  );
});
