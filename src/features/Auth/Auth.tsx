import React from "react";
import {Login} from "./Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import {useTranslation} from "react-i18next";

export const Auth: React.FC = () => {
    const [loading] = useAuthState(auth);
    const {t} = useTranslation();

    return (
        <div className="grid place-content-center">
            {loading && <h3>{t("loading")}...</h3>}
            {!loading && <Login />}
        </div>
    );
};
