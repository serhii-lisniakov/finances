export enum ThemesNames {
    Light = "light",
    Dark = "dark",
}

export const light = {
    background: "linear-gradient(45deg, rgba(234,245,120,1) 0%, rgba(197,125,255,1) 100%)",
};

export const dark = {
    background: "linear-gradient(27deg, rgba(78,82,40,1) 0%, rgb(21,24,52) 100%)",
};

export type ThemeType = typeof light;

type Themes = {
    [key in string]: ThemeType;
};

export const themes: Themes = {
    [ThemesNames.Light]: light,
    [ThemesNames.Dark]: dark,
};
