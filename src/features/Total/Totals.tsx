import React, {useEffect} from "react";
import {Form, SimpleItem} from "devextreme-react/form";
import {NumberBox} from "devextreme-react/number-box";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hook";
import {useWithUID} from "../../hooks/useWithUID";
import {getDataSource as getSavings} from "../Savings/store";
import {getDataSource as getIncomes} from "../IncomesExpenses/store";

export const Totals: React.FC = () => {
    const {t} = useTranslation();
    const {dataSource} = useAppSelector((state) => state.incomes_expenses);
    const uid = useWithUID();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSavings(uid.uid));
        dispatch(getIncomes(uid.uid));
    }, []);

    const incomes = dataSource.reduce(
        (acc, i) => (acc += i.isExpense ? 0 : i.price - i.price * (i.taxesPercent || 1)),
        0,
    );

    const expenses = dataSource.reduce((acc, i) => (acc += i.isExpense ? i.price : 0), 0);
    const PnL = incomes - expenses;

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
                            value={incomes}
                            label={`${t("total_one")} ${t("income")}`}
                            readOnly
                        />
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={expenses}
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
                            value={PnL}
                            label="P&L"
                            readOnly
                        />
                    </div>
                </SimpleItem>
            </Form>
        </div>
    );
};
