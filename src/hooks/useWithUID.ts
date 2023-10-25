import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

export function useWithUID(): {uid: string | undefined} {
    const [user] = useAuthState(auth);

    return {uid: user?.uid};
}
