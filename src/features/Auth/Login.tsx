import React from "react";
import {Button} from "devextreme-react/button";
import {signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../../firebase";
import {useTranslation} from "react-i18next";
import {redirect} from "react-router-dom";
import {Google} from "../../components/svg/Google";

const signIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        return redirect("/home");
    } catch (err: any) {
        alert(err.message);
    }
};

export const Login: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Button
            onClick={signIn}
            className="text-xl"
        >
            {t("sign-in")} {t("with")}
            <span className="h-[50px] w-[50px]">
                <Google />
            </span>
        </Button>
    );
};
