import React, {HTMLAttributes} from "react";

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div
            {...props}
            className={`relative overflow-hidden rounded-2xl bg-white shadow-md ${
                props.className || ""
            }`}
        >
            {props.children}
        </div>
    );
};
