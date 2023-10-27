import React from "react";
import {ThemeToggle} from "./ThemeToggle";
import Currency from "./Currency";
import {Auth} from "./Auth";

export const Header = () => {
    return (
        <div className="dx-theme-background-color dx-theme-border-color flex items-center justify-between gap-1 border-b-2 px-2 py-1">
            <ThemeToggle />
            <Auth />
            <span className="ml-auto"></span>
            <Currency />
        </div>
    );
};
