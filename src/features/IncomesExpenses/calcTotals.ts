import {IncomeExpense} from "./IncomeExpense";

export function calcTotals(data: IncomeExpense[]): {
    incomes: number;
    expenses: number;
    PnL: number;
} {
    return data.reduce(
        (res, i) => ({
            incomes: (res.incomes +=
                i.isDisabled || i.isExpense ? 0 : i.price - i.price * (i.taxesPercent || 0)),
            expenses: (res.expenses += i.isDisabled ? 0 : i.isExpense ? i.price : 0),
            PnL: res.incomes - res.expenses,
        }),
        {
            incomes: 0,
            expenses: 0,
            PnL: 0,
        },
    );
}
