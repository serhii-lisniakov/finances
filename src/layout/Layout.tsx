import React from "react";
import {Outlet} from "react-router-dom";
import {Navigation} from "../features/Navigation/Navigation";
import {useMediaQuery} from "../hooks/useMediaQuery";

export const Layout: React.FC = () => {
    const mobile = useMediaQuery("lg");
    const className = mobile
        ? "grid-rows-[minmax(100px,_1fr)_auto]"
        : "grid-rows-[auto_minmax(100px,_1fr)]";

    return (
        <div className={`grid h-full grid-cols-1 ${className}`}>
            {!mobile && <Navigation />}
            <Outlet />
            {mobile && <Navigation />}
        </div>
    );
};
