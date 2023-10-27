import React, {HTMLAttributes} from "react";

type Props = {
    icon?: string;
};

export const Icon: React.FC<Props & HTMLAttributes<HTMLAnchorElement>> = (props) => {
    const {icon, className = ""} = props;

    return (
        <i
            {...props}
            className={`dx-icon-${icon} cursor-pointer select-none ${className}`}
        />
    );
};
