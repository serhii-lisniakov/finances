import React from "react";
import {useNavigate, useRouteError} from "react-router-dom";
import {Button} from "devextreme-react/button";

export const NotFound: React.FC = () => {
    const error: any = useRouteError();
    const navigate = useNavigate();

    return (
        <section className="grid h-full place-content-center gap-2 text-center">
            <h2>Ooops...</h2>
            <i>{error?.statusText || error?.message}</i>
            <Button
                onClick={() => navigate("/")}
                icon="back"
                text="Return back"
            />
        </section>
    );
};
