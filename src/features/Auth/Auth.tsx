import React from "react";
import {Login} from "./Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";

export const Auth: React.FC = () => {
    const [loading] = useAuthState(auth);

    return (
        <div className="grid place-content-center">
            {loading && <h3>Loading...</h3>}
            {!loading && <Login />}
        </div>
    );
};
