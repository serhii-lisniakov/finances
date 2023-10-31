import React from "react";
import {ThemeSelector} from "../features/ThemeSelector/ThemeSelector";
import CurrencySelector from "../features/CurrencySelector/CurrencySelector";
import {Auth} from "../components/Auth";

export const Header = () => {
    return (
        <div className="dx-theme-background-color dx-theme-border-color flex items-center justify-between gap-1 border-b-2 px-2 py-1">
            <ThemeSelector />
            <Auth />
            <span className="ml-auto"></span>
            <CurrencySelector />
        </div>
    );
};
