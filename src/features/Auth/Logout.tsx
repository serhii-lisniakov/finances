import React from "react";
import {Button} from "devextreme-react/button";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export const Logout: React.FC = () => {
    const [user] = useAuthState(auth);

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center">
            <span className="mr-1">{user.displayName}</span>
            <Button onClick={() => signOut(auth)}>Sign Out</Button>
        </div>
    );
};
