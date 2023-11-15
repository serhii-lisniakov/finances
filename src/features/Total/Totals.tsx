import React, {useEffect, useMemo} from "react";
import {Form, SimpleItem} from "devextreme-react/form";
import {NumberBox} from "devextreme-react/number-box";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hook";
import {useWithUID} from "../../hooks/useWithUID";
import {getDataSource as getSavings} from "../Savings/store";
import {getDataSource as getIncomes} from "../IncomesExpenses/store";
import {calcTotals} from "../IncomesExpenses/calcTotals";

export const Totals: React.FC = () => {
    const {t} = useTranslation();
    const {dataSource} = useAppSelector((state) => state.incomes_expenses);
    const uid = useWithUID();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSavings(uid.uid));
        dispatch(getIncomes(uid.uid));
    }, []);

    const state: any = useMemo(() => calcTotals(dataSource), [dataSource]);

    return (
        <div className="totals p-2">
            <Form
                showColonAfterLabel={false}
                scrollingEnabled={true}
                labelMode="floating"
                className=""
            >
                <SimpleItem>
                    <div className="flex gap-1">
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={state.incomes}
                            label={`${t("total_one")} ${t("income")}`}
                            readOnly
                        />
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={state.expenses}
                            label={`${t("total", {count: 2})} ${t("expenses")}`}
                            readOnly
                        />
                    </div>
                </SimpleItem>
                <SimpleItem>
                    <div className="flex gap-1">
                        <NumberBox
                            format="currency"
                            className="flex-grow tracking-widest"
                            value={state.PnL}
                            label="P&L"
                            readOnly
                        />
                    </div>
                </SimpleItem>
            </Form>
        </div>
    );
};
