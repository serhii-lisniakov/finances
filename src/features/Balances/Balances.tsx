import React, {useEffect, useMemo, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";
import {useAppDispatch, useAppSelector} from "../../hook";
import {BalancesState, getBalances, saveBalances, updateBalances} from "./balancesSlice";
import {Form, GroupItem, SimpleItem, ISimpleItemProps} from "devextreme-react/form";
import {NumberBox} from "devextreme-react";
import {getCredits} from "../Credits/creditsSlice";

const currency: Partial<ISimpleItemProps> = {
    editorType: "dxNumberBox",
    editorOptions: {format: "currency"},
};

export const Balances: React.FC = () => {
    const [user] = useAuthState(auth);
    const balances = useAppSelector((state) => state.balances);
    const {price: currencyPrice} = useAppSelector((state) => state.currency);
    const [state, setState] = useState<BalancesState | null>(null);
    const {credits} = useAppSelector((state) => state.credits);
    const dispatch = useAppDispatch();

    const {invest, income, rest, taxes, taxes2} = balances;

    useEffect(() => {
        dispatch(getBalances(user?.uid));
        dispatch(getCredits(user?.uid));
    }, []);

    useEffect(() => {
        setState({...balances});
    }, [balances]);

    const calcCredits = useMemo(() => credits.reduce((sum, c) => sum + c.price, 0), [credits]);
    const calcTaxes = useMemo(() => income * taxes + taxes2, [income, taxes, taxes2]);
    const calcInvest = useMemo(() => invest * income, [invest, income]);
    const calcAcc = useMemo(() => {
        return +(income - calcTaxes - calcInvest - calcCredits - rest).toFixed();
    }, [income, calcTaxes, calcInvest, calcCredits, rest]);

    const update = (name: string | undefined, value: number) => {
        dispatch(updateBalances({name: name as keyof BalancesState, value}));
        dispatch(saveBalances(user?.uid));
    };

    return (
        <div className="dx-theme-background-color relative h-full p-2">
            <Form
                formData={state}
                onFieldDataChanged={(c) => update(c.dataField, c.value)}
                showColonAfterLabel={false}
                scrollingEnabled={true}
            >
                <GroupItem>
                    <SimpleItem
                        dataField="income"
                        {...currency}
                    />
                    <SimpleItem dataField="invest">
                        <div className="flex gap-1">
                            <NumberBox
                                format="percent"
                                value={balances.invest}
                                onValueChange={(value) => update("invest", value)}
                            />
                            <NumberBox
                                format="$#,##0"
                                className="flex-grow"
                                value={calcInvest}
                                readOnly
                            />
                        </div>
                    </SimpleItem>
                    <SimpleItem dataField="taxes">
                        <div className="flex items-center gap-1">
                            <NumberBox
                                format="percent"
                                value={balances.taxes}
                                onValueChange={(value) => update("taxes", value)}
                            />
                            <span>+</span>
                            <NumberBox
                                format="$#,##0"
                                value={balances.taxes2}
                                onValueChange={(value) => update("taxes2", value)}
                            />
                            <NumberBox
                                format="$#,##0"
                                className="flex-grow"
                                value={calcTaxes}
                                readOnly
                            />
                        </div>
                    </SimpleItem>
                </GroupItem>
                <GroupItem caption="Savings">
                    <SimpleItem
                        dataField="bank"
                        {...currency}
                    />
                    <SimpleItem
                        dataField="cash"
                        {...currency}
                    />
                    <SimpleItem
                        dataField="crypto"
                        {...currency}
                    />
                </GroupItem>
                <GroupItem caption="Summary">
                    <SimpleItem label={{text: "Expenses"}}>
                        <div className="flex gap-1">
                            <NumberBox
                                format="currency"
                                value={calcCredits}
                                readOnly
                                className="flex-grow"
                            />
                            <NumberBox
                                format="UAH #,##0"
                                value={calcCredits * currencyPrice}
                                readOnly
                                className="flex-grow"
                            />
                        </div>
                    </SimpleItem>
                    <SimpleItem label={{text: "Acc/month"}}>
                        <div className="flex gap-1">
                            <NumberBox
                                format="currency"
                                value={calcAcc}
                                readOnly
                                className="flex-grow"
                            />
                            <NumberBox
                                format="UAH #,##0"
                                value={calcAcc * currencyPrice}
                                readOnly
                                className="flex-grow"
                            />
                        </div>
                    </SimpleItem>
                </GroupItem>
            </Form>
        </div>
    );
};
