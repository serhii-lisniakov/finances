import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Goal} from "../models/Goal";
import {GoalStatus} from "../enums/GoalStatus";
import {PutEntity} from "../models/PutEntity";
import {deleteField, doc, getDoc, setDoc, updateDoc} from "firebase/firestore"
import {UID} from "../models/UID";
import {db} from "../firebase";

type IUID = {
    uid: UID;
}

type PostGoal = IUID & {
    title: string;
};

type UpdatedGoal = IUID & Goal;

type DeleteGoal = IUID & {
    id: number;
};

type State = {
    goals: Goal[];
}

const goalsDoc = (uid: string) => doc(db, 'goals', uid);

export const getGoals = createAsyncThunk<Goal[], UID>(
    'goals/get',
    async function (uid) {
        if (!uid) {
            return [];
        }
        const doc = await getDoc(goalsDoc(uid));
        const goals = doc.data() || [];
        return Object.values(goals) || [];
    }
)

export const addGoal = createAsyncThunk<Goal | null, PostGoal>(
    'goals/post',
    async function ({title, uid}) {
        if (!uid) {
            return null;
        }
        const goal: Goal = {
            id: new Date().getTime(),
            title,
            status: GoalStatus.Open,
            price: 0,
        }
        await setDoc(goalsDoc(uid), {[goal.id]: goal}, {merge: true});
        return goal;
    }
)

export const removeGoal = createAsyncThunk<number | void, DeleteGoal>(
    'goals/delete',
    async function ({id, uid}) {
        if (!uid) {
            return;
        }
        await updateDoc(goalsDoc(uid), {[id]: deleteField()})
        return id;
    }
)

export const updateGoal = createAsyncThunk<void, UpdatedGoal>(
    'goals/put',
    async function ({uid, ...goal}) {
        if (!uid) {
            return;
        }
        await setDoc(goalsDoc(uid), {[goal.id]: goal}, {merge: true});
    }
)

const initialState: State = {
    goals: [],
}

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        changeGoal: (state, {payload}: PayloadAction<PutEntity<Goal>>) => {
            const goal = state.goals.find(g => g.id === payload.id);
            if (goal) {
                goal[payload.property] = payload.value as never
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getGoals.fulfilled, (state, action) => {
                state.goals = action.payload;
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                if (action.payload) {
                    state.goals.push(action.payload)
                }
            })
            .addCase(removeGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter(g => g.id !== action.payload)
            })
    }
})

export const {changeGoal} = goalsSlice.actions;

export default goalsSlice.reducer;
