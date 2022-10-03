import React from 'react';
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./styles/global";
import {useAppSelector} from "./hook";
import {themes} from "./styles/themes";
import {Layout} from "./components/Layout";


function App() {
    const {theme} = useAppSelector(state => state.theme);

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyles/>
            <Layout/>
        </ThemeProvider>
    );
}

export default App;
