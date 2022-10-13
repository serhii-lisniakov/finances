import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: inherit;
  }

  * :before, * :after {
    box-sizing: border-box;
  }

  html {
    font-size: 1vw;
  }

  #root {
    height: 100%;
  }

  ::placeholder {
    color: inherit;
  }

  body {
    font-family: 'Ubuntu', sans-serif;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    text-rendering: optimizeLegibility;
    background: ${({theme}) => theme.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({theme}) => theme.colorPrimary};
  }

  ::-webkit-scrollbar {
    background: ${({theme}) => theme.hover};
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.colorPrimary};
  }

  img {
    max-width: 100%;
  }
  
  input, select {
    font-size: inherit;
  }
`;
