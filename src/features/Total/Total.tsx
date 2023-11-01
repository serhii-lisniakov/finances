import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import {getBalances} from "../Balances/balancesSlice";
import {Icon} from "../../components/Icon";

export const Total = () => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState<boolean>(false);

    const {bank, cash, crypto} = useAppSelector((state) => state.balances);

    useEffect(() => {
        dispatch(getBalances(user?.uid));
    }, []);

    const toggleExpanded = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    return (
        <div
            onClick={toggleExpanded}
            className="dx-theme-background-color grid cursor-pointer gap-1 px-2 py-1"
        >
            <div className="text-right text-3xl font-bold">
                ${bank + cash + crypto}
                <Icon
                    icon={expanded ? "spinup" : "spindown"}
                    className="relative -top-1"
                />
            </div>
            <div className={`transition-[height] duration-150 ${expanded ? "h-auto" : "h-0"}`}>
                Form
            </div>
        </div>
    );
};
