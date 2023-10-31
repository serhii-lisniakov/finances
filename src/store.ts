import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./features/ThemeSelector/themeSlice";
import goalsReducer from "./features/Goals/goalsSlice";
import currencyReducer from "./features/CurrencySelector/currencySlice";
import balancesReducer from "./features/Balances/balancesSlice";
import creditsReducer from "./features/Credits/creditsSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        goals: goalsReducer,
        currency: currencyReducer,
        balances: balancesReducer,
        credits: creditsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
