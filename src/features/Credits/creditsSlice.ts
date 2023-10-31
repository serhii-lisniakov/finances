import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PutEntity} from "../../models/PutEntity";
import {UID} from "../../models/UID";
import {Credit} from "./Credit";
import {deleteField, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {RootState} from "../../store";

type IUID = {
    uid: UID;
};

type PostCredit = IUID & Partial<Omit<Credit, "id">>;

type UpdateDeleteCredit = IUID & {
    id: number;
};

type State = {
    credits: Credit[];
};

const creditsDoc = (uid: string) => doc(db, "credits", uid);

export const getCredits = createAsyncThunk<Credit[], UID>("credits/get", async function (uid) {
    if (!uid) {
        return [];
    }
    const doc = await getDoc(creditsDoc(uid));
    const credits = doc.data() || [];
    return Object.values(credits) || [];
});

export const addCredit = createAsyncThunk<Credit | null, PostCredit>(
    "credit/post",
    async function ({uid, ...rest}) {
        if (!uid) {
            return null;
        }
        const credit: Credit = {
            id: new Date().getTime(),
            title: rest.title || "",
            price: rest.price || 0,
        };
        await setDoc(creditsDoc(uid), {[credit.id]: credit}, {merge: true});
        return credit;
    },
);

export const updateCredit = createAsyncThunk<void, UpdateDeleteCredit, {state: RootState}>(
    "credit/put",
    async function ({uid, id}, {getState}) {
        if (!uid) {
            return;
        }
        const credit = getState().credits.credits.find((c) => c.id === id);
        await setDoc(creditsDoc(uid), {[id]: credit}, {merge: true});
    },
);

export const removeCredit = createAsyncThunk<number | void, UpdateDeleteCredit>(
    "credit/delete",
    async function ({id, uid}) {
        if (!uid) {
            return;
        }
        await updateDoc(creditsDoc(uid), {[id]: deleteField()});
        return id;
    },
);

const initialState: State = {
    credits: [],
};

const creditsSlice = createSlice({
    name: "credits",
    initialState,
    reducers: {
        changeCredit: (state, {payload}: PayloadAction<PutEntity<Credit>>) => {
            const goal = state.credits.find((g) => g.id === payload.id);
            if (goal) {
                goal[payload.property] = payload.value as never;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCredits.fulfilled, (state, action) => {
                state.credits = action.payload;
            })
            .addCase(addCredit.fulfilled, (state, action) => {
                if (action.payload) {
                    state.credits.push(action.payload);
                }
            })
            .addCase(removeCredit.fulfilled, (state, action) => {
                state.credits = state.credits.filter((g) => g.id !== action.payload);
            });
    },
});

export const {changeCredit} = creditsSlice.actions;

export default creditsSlice.reducer;
