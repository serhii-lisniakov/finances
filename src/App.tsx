import React from "react";
import {useAppSelector} from "./hook";

import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./styles/global";
import {DevexpressStyles} from "./styles/devexpress";
import {themes} from "./styles/themes";

import {Layout} from "./components/Layout";

function App() {
    const {theme} = useAppSelector((state) => state.theme);

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyles />
            <DevexpressStyles />
            <Layout />
        </ThemeProvider>
    );
}

export default App;
