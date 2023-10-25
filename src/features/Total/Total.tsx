import React from "react";
import {useAppSelector} from "../../hook";
import {Card} from "../../components/Card";

export const Total = () => {
    const {bank, cash, crypto} = useAppSelector((state) => state.balances);

    return (
        <Card className="!bg-fuchsia-800 p-0.5 text-center text-2xl font-bold text-white">
            ${bank + cash + crypto}
        </Card>
    );
};
