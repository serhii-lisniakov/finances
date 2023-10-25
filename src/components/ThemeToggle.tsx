import React, {useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../hook";
import {toggle} from "../store/themeSlice";
import {Icon} from "./Icon";
import {Icons} from "../models/Icon";

export const ThemeToggle = () => {
    const {theme} = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const icons: Icons = useMemo(
        () => ({
            dark: {color: "orange", icon: "sun"},
            light: {color: "grey", icon: "moon"},
        }),
        [],
    );

    return (
        <Icon
            onClick={() =>
                dispatch(toggle(theme === "light" ? "dark" : "light"))
            }
            icon={icons[theme].icon}
            color={icons[theme].color}
        />
    );
};
