import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorage} from "../enums/LocalStorage";
import {RootState} from "./index";

export type BalancesState = {
    income: number;
    invest: number;
    rest: number;
    crypto: number;
    bank: number;
    cash: number;
}

type UpdateBalance = {
    name: keyof BalancesState;
    value: number;
}

const initialState: BalancesState = {
    income: 0,
    invest: 0,
    rest: 0,
    crypto: 0,
    bank: 0,
    cash: 0,
};

export const getBalances = createAsyncThunk<BalancesState>(
    'balances/get',
    async function () {
        const balances = JSON.parse(localStorage.getItem(LocalStorage.Balances) || 'null');
        return new Promise((resolve) => {
            resolve(balances)
        });
    }
)

export const saveBalances = createAsyncThunk<void, void, { state: RootState }>(
    'balances/save',
    async function (_, {getState}) {
        localStorage.setItem(LocalStorage.Balances, JSON.stringify(getState().balances))
        return new Promise((resolve) => {
            resolve()
        });
    }
)

const balancesSlice = createSlice({
    name: 'balances',
    initialState,
    reducers: {
        updateBalances: (state, {payload}: PayloadAction<UpdateBalance>) => {
            state[payload.name] = payload.value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBalances.fulfilled, (state, action) => {
                return action.payload || initialState;
            })
    },
})

export const {updateBalances} = balancesSlice.actions;

export default balancesSlice.reducer;
