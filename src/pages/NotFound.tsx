import React from "react";
import {Navigate, useNavigate, useRouteError} from "react-router-dom";
import {Button} from "devextreme-react/button";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

export const NotFound: React.FC = () => {
    const [user] = useAuthState(auth);
    const error: any = useRouteError();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return (
        <section className="grid h-full place-content-center gap-2 text-center">
            <h2>Ooops...</h2>
            <i>{error?.statusText || error?.message}</i>
            <Button
                onClick={() => navigate("/auth")}
                icon="back"
                text="Return back"
            />
        </section>
    );
};
