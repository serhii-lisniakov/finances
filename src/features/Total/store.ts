import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UpdateTotal = {
    name: keyof TotalsState;
    value: number;
};

type TotalsState = {
    incomes: number;
    expenses: number;
    savings: number;
    acc: number;
};

const initialState: TotalsState = {
    incomes: 0,
    expenses: 0,
    savings: 0,
    acc: 0,
};

const NAME = "totals";

const store = createSlice({
    name: NAME,
    initialState,
    reducers: {
        updateTotal: (state, {payload}: PayloadAction<UpdateTotal>) => {
            state[payload.name] = payload.value;
        },
    },
});

export const {updateTotal} = store.actions;

export default store.reducer;
