import React from "react";
import {useAppDispatch, useAppSelector} from "../hook";
import {toggle} from "../store/themeSlice";
import {Icon} from "./Icon";
import {Icons} from "../models/Icon";

export const ThemeToggle = () => {
    const {theme} = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const icons: Icons = {
        dark: {color: 'orange', icon: 'light_mode'},
        light: {color: 'grey', icon: 'dark_mode'},
    }

    return (
        <Icon
            onClick={() => dispatch(toggle(theme === 'light' ? 'dark' : 'light'))}
            icon={icons[theme].icon}
            color={icons[theme].color}
        />
    )
}
