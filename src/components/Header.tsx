import React from "react";
import {ThemeToggle} from "./ThemeToggle";
import Currency from "./Currency";
import {Auth} from "./Auth";
import {Card} from "./Card";

export const Header = () => {
    return (
        <Card className="flex items-center justify-between gap-1 px-2 py-1">
            <ThemeToggle />
            <Auth />
            <span className="ml-auto"></span>
            <Currency />
        </Card>
    );
};
