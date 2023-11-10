import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Goal} from "./Goal";
import {PutEntity} from "../../models/PutEntity";
import {deleteField, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {UID} from "../../models/UID";
import {db} from "../../firebase";
import {RootState} from "../../store";

type IUID = {uid: UID};

type CreateItem = IUID & Partial<Omit<Goal, "id">>;

type UpdateItem = IUID & {id: number};

type DeleteItem = IUID & {id: number};

type State = {
    dataSource: Goal[];
};

const NAME = "goals";

const itemDoc = (uid: string) => doc(db, NAME, uid);

export const getDataSource = createAsyncThunk<Goal[], UID>(`${NAME}/get`, async function (uid) {
    if (!uid) {
        return [];
    }
    const doc = await getDoc(itemDoc(uid));
    return Object.values(doc.data() || []) || [];
});

export const addItem = createAsyncThunk<Goal | null, CreateItem>(
    `${NAME}/post`,
    async function ({uid, ...rest}) {
        if (!uid) {
            return null;
        }
        const item: Goal = {
            id: new Date().getTime(),
            title: rest.title || "",
            isFavourite: rest.isFavourite || false,
            isCompleted: rest.isCompleted || false,
            price: rest.price || 0,
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
        const item = getState().goals.dataSource.find((g) => g.id === id);
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
        changeItem: (state, {payload}: PayloadAction<PutEntity<Goal>>) => {
            const goal = state.dataSource.find((g) => g.id === payload.id);
            if (goal) {
                goal[payload.property] = payload.value as never;
            }
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
