import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {Header} from "./Header";
import {Total} from "../features/Total/Total";
import {useMediaQuery} from "../hooks/useMediaQuery";
import {Desktop} from "./Desktop";
import {Mobile} from "./Mobile";
import {Auth} from "../features/Auth/Auth";

export const Layout = () => {
    const [user, loading] = useAuthState(auth);
    const mobile = useMediaQuery("lg");

    return (
        <section className="grid h-full grid-cols-1 grid-rows-[auto_auto_1fr]">
            <Header />

            {user ? (
                <>
                    <Total />
                    {!mobile && <Desktop />}
                    {mobile && <Mobile />}
                </>
            ) : (
                <>
                    <div></div>
                    <Auth />
                </>
            )}
        </section>
    );
};
