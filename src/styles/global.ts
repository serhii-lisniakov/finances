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
    font-size: 14px;
    min-height: 100%;
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
    padding: 10px;
    color: ${({theme}) => theme.colorPrimary};

    &::-webkit-scrollbar {
      background: ${({theme}) => theme.background};
      width: 0.4em;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({theme}) => theme.scrollBar};
    }
  }

  img {
    max-width: 100%;
  }
`;
