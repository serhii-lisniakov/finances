import React, {HTMLAttributes} from "react";
import {useMediaQuery} from "../hooks/useMediaQuery";

export const DataGridMobileTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
    const screenLg = useMediaQuery("lg");

    if (screenLg) {
        return null;
    }

    return <h4 {...props}>{props.children}</h4>;
};
