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
    const [opened, setOpened] = useState<boolean>(true);

    const {bank, cash, crypto} = useAppSelector((state) => state.balances);

    useEffect(() => {
        dispatch(getBalances(user?.uid));
    }, []);

    const toggleExpanded = useCallback(() => {
        setOpened((prev) => !prev);
    }, []);

    return (
        <div className="grid bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-2 py-1">
            <div
                onClick={toggleExpanded}
                className="cursor-pointer text-right text-3xl font-bold text-[#dedede]"
            >
                ${bank + cash + crypto}
                <Icon
                    icon={opened ? "spinup" : "spindown"}
                    className="relative -top-1"
                />
            </div>
            <div
                className={`overflow-hidden transition-[max-height] duration-200 ${
                    opened ? "h-auto max-h-[500px]" : "h-0 max-h-0"
                }`}
            >
                <Totals />
            </div>
        </div>
    );
};
