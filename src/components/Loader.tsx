import React, {ComponentProps} from "react";
import {Icon} from "./Icon";

export const Loader: React.FC<ComponentProps<typeof Icon>> = (props) => {
    return (
        <i className="animate-spin">
            <Icon
                {...props}
                icon="isblank"
                className={`bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-extrabold text-transparent ${props.className}`}
            />
        </i>
    );
};
