import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UID} from "../../models/UID";
import {IncomeExpense} from "./IncomeExpense";
import {deleteField, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {RootState} from "../../store";

/* Inputs */

type Item = IncomeExpense;
const NAME = "incomes_expenses";

/* Inputs */

type IUID = {uid: UID};

type CreateItem = IUID & Omit<Item, "id">;

type UpdateItem = IUID & {id: number};

type DeleteItem = IUID & {id: number};

type State = {
    dataSource: Item[];
};

const itemDoc = (uid: string) => doc(db, NAME, uid);

export const getDataSource = createAsyncThunk<Item[], UID>(`${NAME}/get`, async function (uid) {
    if (!uid) {
        return [];
    }
    const doc = await getDoc(itemDoc(uid));
    return Object.values(doc.data() || []) || [];
});

export const addItem = createAsyncThunk<Item | null, CreateItem>(
    `${NAME}/post`,
    async function ({uid, ...rest}) {
        if (!uid) {
            return null;
        }
        const item: Item = {
            id: new Date().getTime(),
            ...rest,
            startDate: rest.startDate || new Date().getTime(),
        };
        await setDoc(itemDoc(uid), {[item.id]: item}, {merge: true});
        return item;
    },
);

export const updateItem = createAsyncThunk<void, UpdateItem, {state: RootState}>(
    `${NAME}/put`,
    async function ({uid, id}, {getState}) {
        if (!uid) {
            return;
        }
        const item = getState()[NAME].dataSource.find((c) => c.id === id);
        await setDoc(itemDoc(uid), {[id]: item}, {merge: true});
    },
);

export const deleteItem = createAsyncThunk<number | void, DeleteItem>(
    `${NAME}/delete`,
    async function ({id, uid}) {
        if (!uid) {
            return;
        }
        await updateDoc(itemDoc(uid), {[id]: deleteField()});
        return id;
    },
);

const initialState: State = {
    dataSource: [],
};

const slice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        changeItem: (state, {payload}: PayloadAction<Item>) => {
            const item = state.dataSource.find((g) => g.id === payload.id);
            if (!item) {
                return;
            }
            Object.assign(item, {
                ...item,
                ...payload,
                ...("startDate" in payload && {startDate: new Date(payload.startDate!).getTime()}),
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataSource.fulfilled, (state, action) => {
                state.dataSource = action.payload;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                if (action.payload) {
                    state.dataSource.push(action.payload);
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.dataSource = state.dataSource.filter((g) => g.id !== action.payload);
            });
    },
});

export const {changeItem} = slice.actions;

export default slice.reducer;
