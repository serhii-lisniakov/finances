import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Currency} from "../models/Currency";

export const getCurrency = createAsyncThunk<[Currency], void>(
    'currency/get',
    async function () {
        const date = new Date().toISOString().split('-').join('').slice(0, 8);
        const currency = 'USD';
        const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&date=${date}&json`;
        const response = await fetch(url);
        return await response.json();
    }
)

type State = {
    currency: string;
    price: number;
}


const initialState: State = {
    currency: 'N/A',
    price: 0,
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        change(state, {payload}: PayloadAction<string>) {
            state.currency = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrency.fulfilled, (state, action) => {
                state.currency = action.payload[0].cc;
                state.price = action.payload[0].rate;
            })
    },
})

export const {change} = currencySlice.actions;

export default currencySlice.reducer;
