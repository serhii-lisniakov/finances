import React from "react";
import {useAppSelector} from "../hook";

import {GlobalStyles} from "./global";
import {DevexpressStyles} from "./devexpress";

import themes from "devextreme/ui/themes";

export function Styles() {
    const {theme} = useAppSelector((state) => state.theme);
    themes.current(`generic.${theme}`);

    return (
        <>
            <GlobalStyles />
            <DevexpressStyles />
        </>
    );
}
