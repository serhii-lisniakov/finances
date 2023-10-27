import React from "react";
import {useAppDispatch, useAppSelector} from "../hook";
import {toggle} from "../store/themeSlice";
import {Icon} from "./Icon";
import themes from "devextreme/ui/themes";
import {Themes} from "../enums/Themes";

const icons: {
    [key in Themes]: {
        name: Themes;
        className: string;
        icon: string;
    };
} = {
    [Themes.Dark]: {
        name: Themes.Dark,
        className: "text-amber-500",
        icon: "sun",
    },
    [Themes.Light]: {
        name: Themes.Light,
        className: "text-black",
        icon: "moon",
    },
};

export const ThemeToggle = () => {
    const {theme} = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    return (
        <Icon
            onClick={() => {
                const newTheme = theme === Themes.Light ? Themes.Dark : Themes.Light;
                dispatch(toggle(newTheme));
                themes.current(`generic.${newTheme}`);
            }}
            icon={icons[theme].icon}
            className={icons[theme].className}
        />
    );
};
