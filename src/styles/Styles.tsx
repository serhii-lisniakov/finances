import React from "react";
import {useAppSelector} from "../hook";

import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

import "./global.css";
import "./devexpress.css";

import themes from "devextreme/ui/themes";

export function Styles() {
    const {theme} = useAppSelector((state) => state.theme);
    themes.current(`generic.${theme}`);

    return null;
}
