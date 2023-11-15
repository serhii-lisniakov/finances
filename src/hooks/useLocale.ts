import i18n from "../i18n";
import {locale} from "devextreme/localization";
import {setDefaultOptions} from "date-fns";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const locales: Locale[] = [
    {
        dx: "en",
        default: "en-US",
        label: "EN",
    },
    {
        default: "uk",
        i18n: "ua",
        label: "UA",
    },
];

export type Locale = {
    dx?: string;
    i18n?: string;
    default: string;
    label: string;
};

const changeLocale = async (lang: Locale) => {
    localStorage.setItem("lang", lang.default);

    await i18n.changeLanguage(lang.i18n || lang.default);

    locale(lang.dx || lang.default);

    setDefaultOptions({
        locale: (await import(`date-fns/locale/${lang.default}`)).default,
    });
};

export const useLocale = (
    init = false,
): {
    lang: Locale;
    setLang: Dispatch<SetStateAction<Locale>>;
    changeLocale: (lang: Locale) => void;
    locales: Locale[];
} => {
    const defaultLang = (localStorage.getItem("lang") as string) || "en-US";
    const defaultLocale = locales.find((l) => l.default === defaultLang) as Locale;
    const [lang, setLang] = useState<Locale>(defaultLocale);

    useEffect(() => {
        if (init) {
            changeLocale(defaultLocale);
        }
    }, []);

    return {lang, setLang, changeLocale, locales};
};
