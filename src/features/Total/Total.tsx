import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import {getBalances} from "../Balances/balancesSlice";
import {Icon} from "../../components/Icon";
import {Totals} from "./Totals";

export const Total = () => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState<boolean>(true);

    const {bank, cash, crypto} = useAppSelector((state) => state.balances);

    useEffect(() => {
        dispatch(getBalances(user?.uid));
    }, []);

    const toggleExpanded = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    return (
        <div className="dx-theme-background-color grid gap-1 px-2 py-1">
            <div
                onClick={toggleExpanded}
                className="cursor-pointer text-right text-3xl font-bold"
            >
                ${bank + cash + crypto}
                <Icon
                    icon={expanded ? "spinup" : "spindown"}
                    className="relative -top-1"
                />
            </div>
            <div
                className={`transition-[max-height] duration-200 ${
                    expanded ? "max-h-[500px]" : "max-h-0"
                }`}
            >
                <Totals />
            </div>
        </div>
    );
};
