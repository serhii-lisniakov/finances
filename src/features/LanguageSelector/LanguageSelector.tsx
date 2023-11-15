import React from "react";
import {DropDownButton} from "devextreme-react/drop-down-button";
import {useLocale} from "../../hooks/useLocale";

export const LanguageSelector: React.FC = () => {
    const {lang, setLang, changeLocale, locales} = useLocale();

    return (
        <DropDownButton
            text={lang.label}
            icon="globe"
            items={locales}
            onItemClick={(e) => {
                const lang = e.itemData;
                changeLocale(lang);
                setLang(lang);
            }}
            displayExpr="label"
            showArrowIcon={false}
        />
    );
};
