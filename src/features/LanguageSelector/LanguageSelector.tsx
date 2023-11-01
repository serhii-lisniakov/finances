import React, {useEffect, useState} from "react";
import i18n, {resources} from "../../i18n";
import {DropDownButton} from "devextreme-react/drop-down-button";

const changeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
};

const LANGUAGES = Object.keys(resources).map((lang) => lang.toUpperCase());

export const LanguageSelector: React.FC = () => {
    const [lang, setLang] = useState<string>(i18n.language);

    return (
        <DropDownButton
            text={lang}
            icon="globe"
            items={LANGUAGES}
            onItemClick={(e) => {
                const lang = e.itemData.toLowerCase();
                changeLanguage(lang);
                setLang(lang);
            }}
            className="uppercase"
            showArrowIcon={false}
        />
    );
};
