import React from "react";
import {useMediaQuery} from "../hooks/useMediaQuery";
import {ThemeSelector} from "../features/ThemeSelector/ThemeSelector";
import {LanguageSelector} from "../features/LanguageSelector/LanguageSelector";
import {Logout} from "../features/Auth/Logout";

export const Settings: React.FC = () => {
    const mobile = useMediaQuery("lg");

    return (
        <section className="grid h-full place-content-center gap-2 text-center">
            <div>Settings</div>
            <ThemeSelector />
            <LanguageSelector />
            <Logout />
        </section>
    );
};
