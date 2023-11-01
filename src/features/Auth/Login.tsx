import React from "react";
import {Button} from "devextreme-react/button";
import {signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../../firebase";

const signIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
        alert(err.message);
    }
};

export const Login: React.FC = () => {
    return <Button onClick={signIn}>Sign in with Google</Button>;
};
