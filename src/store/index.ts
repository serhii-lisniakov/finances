import {configureStore} from '@reduxjs/toolkit'
import themeReducer from "./themeSlice";
import goalsReducer from "./goalsSlice";
import currencyReducer from "./currencySlice";
import balancesReducer from "./balancesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        goals: goalsReducer,
        currency: currencyReducer,
        balances: balancesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
