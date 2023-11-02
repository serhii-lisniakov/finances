import React from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {toggle} from "./themeSlice";
import {Icon} from "../../components/Icon";
import themes from "devextreme/ui/themes";
import {Themes} from "../../enums/Themes";
import {Button} from "devextreme-react/button";

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
                dispatch(toggle(newTheme));
                themes.current(`generic.${newTheme}`);
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
