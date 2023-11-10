import React from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {toggle} from "./store";
import {Icon} from "../../components/Icon";
import {Themes} from "../../enums/Themes";
import {Button} from "devextreme-react/button";
import {enableTheme} from "../../styles/Styles";

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
        className: "",
        icon: "moon",
    },
};

export const ThemeSelector = () => {
    const {theme} = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    return (
        <Button
            onClick={() => {
                const newTheme = theme === Themes.Light ? Themes.Dark : Themes.Light;
                enableTheme(newTheme);
                dispatch(toggle(newTheme));
            }}
            className="rounded-full"
            render={() => (
                <Icon
                    icon={icons[theme].icon}
                    className={icons[theme].className}
                />
            )}
        />
    );
};
