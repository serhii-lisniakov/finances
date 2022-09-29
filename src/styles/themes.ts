export enum ThemesNames {
    Light = 'light',
    Dark = 'dark',
}

export const light = {
    _name: ThemesNames.Light,
    scrollBar: '#0C3C64',
    background: 'linear-gradient(45deg, rgba(234,245,120,1) 0%, rgba(197,125,255,1) 100%)',
    bgPrimary: '#f5f5f5',
    bgSecondary: '#2c325c',
    hover: 'rgba(0, 0, 0, 0.05)',
    colorPrimary: '#000000'
};

export const dark = {
    _name: ThemesNames.Dark,
    scrollBar: '#0C3C64',
    background: 'linear-gradient(27deg, rgba(78,82,40,1) 0%, rgb(21,24,52) 100%)',
    bgPrimary: '#2c325c',
    bgSecondary: '#98a7c4',
    hover: 'rgba(183,183,183,0.05)',
    colorPrimary: '#98a7c4'
};

export type ThemeType = typeof light;

type Themes = {
    [key in string]: ThemeType;
}

export const themes: Themes = {
    [ThemesNames.Light]: light,
    [ThemesNames.Dark]: dark,
}
