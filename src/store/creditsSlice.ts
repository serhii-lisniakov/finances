import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PutEntity} from "../models/PutEntity";
import {Goal} from "../models/Goal";
import {LocalStorage} from "../enums/LocalStorage";
import {RootState} from "./index";

export type Credit = {
    id: number;
    title: string;
    price: number;
}

type State = Credit[];

export const getCredits = createAsyncThunk<Goal[]>(
    'credits/get',
    async function () {
        const credits = JSON.parse(localStorage.getItem(LocalStorage.Credits) || 'null') || [];
        return new Promise((resolve) => {
            resolve(credits)
        });
    }
)

export const addCredit = createAsyncThunk<Credit, string>(
    'credit/add',
    async function (title) {
        const credit: Credit = {
            id: new Date().getTime(),
            title,
            price: 0,
        }
        return new Promise((resolve) => {
            resolve(credit)
        });
    }
)

export const removeCredit = createAsyncThunk<number, number>(
    'credit/remove',
    async function (id) {
        return new Promise((resolve) => {
            resolve(id)
        });
    }
)

export const putCredit = createAsyncThunk<void, void, { state: RootState }>(
    'credit/savePrice',
    async function (_, {getState}) {
        saveToLocalStorage(getState().credits)
        return new Promise((resolve) => {
            resolve()
        });
    }
)

const initialState: State = [];

const creditsSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {
        updateCredit: (state, {payload}: PayloadAction<PutEntity<Credit>>) => {
            const goal = state.find(g => g.id === payload.id);
            if (goal) {
                goal[payload.property] = payload.value as never
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCredits.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addCredit.fulfilled, (state, action) => {
                state.push(action.payload)
                saveToLocalStorage(state)
            })
            .addCase(removeCredit.fulfilled, (state, action) => {
                state = state.filter(g => g.id !== action.payload)
                saveToLocalStorage(state)
            })
    }
})

export const {updateCredit} = creditsSlice.actions;

export default creditsSlice.reducer;

function saveToLocalStorage(state: State) {
    localStorage.setItem(LocalStorage.Credits, JSON.stringify(state))
}
