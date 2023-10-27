import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import {getBalances} from "../../store/balancesSlice";

export const Total = () => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();

    const {bank, cash, crypto} = useAppSelector((state) => state.balances);

    useEffect(() => {
        dispatch(getBalances(user?.uid));
    }, []);

    return (
        <div className="dx-theme-background-color px-2 py-1 text-right text-2xl font-bold">
            ${bank + cash + crypto}
        </div>
    );
};
