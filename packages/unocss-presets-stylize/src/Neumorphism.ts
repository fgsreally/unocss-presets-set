import { pxToRem, toRem } from "./utils";

let input = `.input{
    box-shadow:
    inset 2px 2px 4px $neu-2,
    inset -2px -2px 4px $white;
}
.input:focus{
    box-shadow:
        inset 4px 4px 4px $neu-2,
        inset -4px -4px 4px $white;
}
`;

let out1 = `    box-shadow: 4px 2px 16px hsl(208deg 30% 64% / 48%), -4px -2px 16px #ffff`;

let inside1 = `box-shadow: inset 3px 3px 7px hsl(208deg 30% 64% / 48%), inset -3px -3px 7px #ffff;`;

export let rules = [
  [
    /^neu-out$/,
    (_, { theme }) => ({
      "box-shadow": `${pxToRem(4)} ${pxToRem(2)} ${pxToRem(
        16
      )} var(--$neu-1),${pxToRem(-4)} ${pxToRem(-2)} ${pxToRem(
        16
      )} var(--$neu-2)`,
    }),
  ],
  [
    /^neu-in$/,
    (_, { theme }) => ({
      "box-shadow": `inset ${pxToRem(3)} ${pxToRem(3)} ${pxToRem(
        7
      )} var(--$neu-1),inset ${pxToRem(-3)} ${pxToRem(-3)} ${pxToRem(
        7
      )} var(--$neu-2)`,
    }),
  ],
  [
    /^(-)?neu-(\d+)(-(\d+))?(-(\d+))?$/,
    (m) => {
      let offsetX = toRem(m[2]) || pxToRem(4);
      let offsetY = toRem(m[4]) || pxToRem(2);
      let blur = toRem(m[6]) || pxToRem(2);

      return {
        "box-shadow": `${
          m[1] ? "inset" : ""
        } ${offsetX} ${offsetY} ${blur} var(--$neu-1),${
          m[1] ? "inset" : ""
        } ${offsetX} ${offsetY} ${blur} var(--$neu-2)`,
      };
    },
  ],
  [
    /^(-)?neu-\[([a-z0-9]+)\](-\[([a-z0-9]+)\])?(-\[([a-z0-9]+)\])?$/,
    (m) => {
      let offsetX = m[2] || pxToRem(4);
      let offsetY = m[4] || pxToRem(2);
      let blur = m[6] || pxToRem(2);

      return {
        "box-shadow": `${
          m[1] ? "inset" : ""
        } ${offsetX} ${offsetY} ${blur} var(--$neu-1),${
          m[1] ? "inset" : ""
        } ${offsetX} ${offsetY} ${blur} var(--$neu-2)`,
      };
    },
  ],
];

export let shotcuts = [
  {
    "neu-btn": "neu-out active:neu-in",
    "neu-input": "neu-out focus:neu-in",
  },
];
let variants = [
  // hover:
  (matcher) => {
    if (!matcher.startsWith("focus:")) return matcher;
    return {
      // slice `hover:` prefix and passed to the next variants and rules
      matcher: matcher.slice(6),
      selector: (s) => `${s}:hover`,
    };
  },
];
