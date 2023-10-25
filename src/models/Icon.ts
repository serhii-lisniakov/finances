export type Icon = {
    icon?: string;
    color?: string;
};

export type Icons = {
    [key in string]: Icon;
};
