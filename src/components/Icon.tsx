import React, {HTMLAttributes} from "react";
import {useAppSelector} from "../hook";

type Props = {
    icon?: string;
};

export const Icon: React.FC<Props & HTMLAttributes<HTMLAnchorElement>> = (
    props,
) => {
    const {theme} = useAppSelector((state) => state.theme);
    const {icon, className = ""} = props;

    return (
        <i
            {...props}
            className={`dx-icon-${icon} cursor-pointer select-none ${className}`}
        />
    );
};
