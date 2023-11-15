import React from "react";
import {useAppSelector} from "../hook";

import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

import "./global.css";
import "./devexpress.css";

import themes from "devextreme/ui/themes";
import localization from "devextreme/localization";
import {Themes} from "../enums/Themes";

export const enableTheme = (theme: Themes) => {
    themes.current(`generic.${theme}`);
};

export function Styles() {
    const {theme} = useAppSelector((state) => state.theme);
    enableTheme(theme);

    return null;
}
