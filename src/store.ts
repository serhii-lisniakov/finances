import {configureStore} from "@reduxjs/toolkit";
import theme from "./features/ThemeSelector/store";
import goals from "./features/Goals/store";
import currency from "./features/CurrencySelector/store";
import totals from "./features/Total/store";
import incomes_expenses from "./features/IncomesExpenses/store";
import savings from "./features/Savings/store";
import timelines from "./features/Timeline/store";

export const store = configureStore({
    reducer: {
        theme,
        goals,
        currency,
        totals,
        incomes_expenses,
        savings,
        timelines,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
