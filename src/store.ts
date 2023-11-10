import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./features/ThemeSelector/store";
import goalsReducer from "./features/Goals/store";
import currencyReducer from "./features/CurrencySelector/store";
import totalsReducer from "./features/Total/store";
import incomesExpensesSlice from "./features/IncomesExpenses/store";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        goals: goalsReducer,
        currency: currencyReducer,
        totals: totalsReducer,
        incomesExpenses: incomesExpensesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
