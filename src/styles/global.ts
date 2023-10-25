import {createGlobalStyle} from "styled-components";
import "devextreme/dist/css/dx.light.css";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: inherit;
  }

  * :before, * :after {
    box-sizing: border-box;
  }

  #root {
    height: 100%;
  }
  
  body {
    height: 100dvh;
    width: 100dvw;
    overflow: hidden;
    position: relative;
    text-rendering: optimizeLegibility;
    background: ${({theme}) => theme.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
