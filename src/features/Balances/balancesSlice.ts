import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {UID} from "../../models/UID";

type UpdateBalance = {
    name: keyof BalancesState;
    value: number;
};

export type BalancesState = {
    income: number;
    invest: number;
    rest: number;
    crypto: number;
    bank: number;
    cash: number;
    taxes: number;
    taxes2: number;
};

const initialState: BalancesState = {
    income: 0,
    invest: 0,
    rest: 0,
    crypto: 0,
    bank: 0,
    cash: 0,
    taxes: 0,
    taxes2: 0,
};

const balancesDoc = (uid: string) => doc(db, "balances", uid);

export const getBalances = createAsyncThunk<BalancesState, UID>(
    "balances/get",
    async function (uid) {
        if (!uid) {
            return initialState;
        }
        const doc = await getDoc(balancesDoc(uid));
        const balances = doc.data() || initialState;
        return (balances as BalancesState) || initialState;
    },
);

export const saveBalances = createAsyncThunk<void, UID, {state: RootState}>(
    "balances/save",
    async function (uid, {getState}) {
        if (!uid) {
            return;
        }
        await setDoc(balancesDoc(uid), getState().balances);
    },
);

const balancesSlice = createSlice({
    name: "balances",
    initialState,
    reducers: {
        updateBalances: (state, {payload}: PayloadAction<UpdateBalance>) => {
            state[payload.name] = payload.value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBalances.fulfilled, (state, action) => {
            return action.payload || initialState;
        });
    },
});

export const {updateBalances} = balancesSlice.actions;

export default balancesSlice.reducer;
