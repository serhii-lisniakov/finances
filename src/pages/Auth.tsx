import React from "react";
import {Login} from "../features/Auth/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {Navigate} from "react-router-dom";
import {Loader} from "../components/Loader";

export const Auth: React.FC = () => {
    const [user, loading] = useAuthState(auth);

    if (user) {
        return <Navigate to="/home" />;
    }

    return (
        <section className="grid h-full place-content-center gap-3 text-center">
            {loading && <Loader className="text-8xl" />}
            {!loading && <Login />}
        </section>
    );
};
