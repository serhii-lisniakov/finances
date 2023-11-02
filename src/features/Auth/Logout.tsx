import React from "react";
import {Button} from "devextreme-react/button";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useTranslation} from "react-i18next";
import {Navigate} from "react-router-dom";

const logout = async () => {
    await signOut(auth);
};

export const Logout: React.FC = () => {
    const [user] = useAuthState(auth);
    const {t} = useTranslation();

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return (
        <div className="flex items-center">
            <span className="mr-1">{user.displayName}</span>
            <Button onClick={logout}>{t("sign-out")}</Button>
        </div>
    );
};
