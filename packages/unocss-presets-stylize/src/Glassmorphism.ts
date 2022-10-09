import { pxToRem, toRem } from "./utils";

let prefix = `* {
    outline: none;
    box-sizing: border-box;
   }
   
   :root {
    --theme-bg-color: rgba(16 18 27 / 40%);
    --border-color: rgba(113 119 144 / 25%);
    --theme-color: #f9fafb;
    --inactive-color: rgb(113 119 144 / 78%);
    --body-font: "Poppins", sans-serif;
    --hover-menu-bg: rgba(12 15 25 / 30%);
    --content-title-color: #999ba5;
    --content-bg: rgb(146 151 179 / 13%);
    --button-inactive: rgb(249 250 251 / 55%);
    --dropdown-bg: #21242d;
    --dropdown-hover: rgb(42 46 60);
    --popup-bg: rgb(22 25 37);
    --search-bg:  #14162b;
    --overlay-bg: rgba(36, 39, 59, 0.3);
    --scrollbar-bg: rgb(1 2 3 / 40%);
   }
   
   .light-mode {
     --theme-bg-color: rgb(255 255 255 / 31%);
    --theme-color: #3c3a3a;
    --inactive-color: #333333;
     --button-inactive: #3c3a3a;
    --search-bg: rgb(255 255 255 / 31%);
    --dropdown-bg: #f7f7f7;
    --overlay-bg: rgb(255 255 255 / 30%);
    --dropdown-hover: rgb(236 236 236);
    --border-color: rgb(255 255 255 / 35%);
    --popup-bg: rgb(255 255 255);
    --hover-menu-bg: rgba(255 255 255 / 35%);
    --scrollbar-bg: rgb(255 253 253 / 57%);
    --content-title-color: --theme-color;
   }`;

let tab = `.header-menu a {
    padding: 20px 30px;
    text-decoration: none;
    color: var(--inactive-color);
    border-bottom: 2px solid transparent;
    transition: 0.3s;
}

.header-menu a.is-active, .header-menu a:hover {
    color: var(--theme-color);
    border-bottom: 2px solid var(--theme-color);
}`;

let mac = `.menu-circle {
    width: 15px;
    height: 15px;
    background-color: #f96057;
    border-radius: 50%;
    box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
    margin-right: 195px;
    flex-shrink: 0;
}`;

let side = `.side-menu a:hover {
    background-color: var(--hover-menu-bg);
}

.side-menu a {
    text-decoration: none;
    color: var(--theme-color);
    display: flex;
    align-items: center;
  
    border-radius: 6px;
    transition: 0.3s;
}
a:active, a:hover {
    outline-width: 0;
}`;

let content = `.content-section ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    background-color: var(--content-bg);
 
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    cursor: pointer;
}`;

let contentli = `.content-section ul li:hover:first-child {
    border-radius: 13px 13px 0 0;
}
.content-section ul li:hover {
    background-color: var(--theme-bg-color);
}
.content-section ul li {
    list-style: none;
 
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    white-space: nowrap;
    transition: 0.3s;
}`;

let card = `.app-card {
    display: flex;
    flex-direction: column;
    width: calc(33.3% - 20px);
    font-size: 16px;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
 
    cursor: pointer;
    transition: 0.3s ease;
}
.app-card:hover {
    transform: scale(1.02);
    background-color: var(--theme-bg-color);
}
`;

export let rule = [
  [/^glass$/, () => ({ " backdrop-filter": `blur(${pxToRem(20)})` })],
  [/^glass-(\d+)$/, (m) => ({ " backdrop-filter": `blur(${toRem(m[1])})` })],
  [
    /^glass-bg$/,
    () => ({
      " backdrop-filter": `blur(${pxToRem(20)})`,
      "background-color": " var(--glass-bg-color)",
    }),
  ],
  [
    /^glass-menu$/,
 
  ],
];

export let shotcuts = [{ "glass-menu": `` }];
// 