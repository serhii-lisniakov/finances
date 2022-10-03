import {Button} from "./Button";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export const Auth = () => {
    const [user] = useAuthState(auth);

    const signIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err: any) {
            alert(err.message)
        }
    }

    return user ? (
        <div>
            <span style={{marginRight: '3px'}}>Hello, {user.displayName}</span>
            <Button onClick={() => signOut(auth)}>
                Sign Out
            </Button>
        </div>
    ) : (
        <Button onClick={signIn}>
            Sign In
        </Button>
    )
}
