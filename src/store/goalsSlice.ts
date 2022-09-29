import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Goal} from "../models/Goal";
import {GoalStatus} from "../enums/GoalStatus";
import {LocalStorage} from "../enums/LocalStorage";
import {RootState} from "./index";

type PutGoal = {
    id: number;
    value: any;
    property: keyof Goal;
}

type PutStatus = {
    id: number;
    status: GoalStatus;
}

type State = {
    goals: Goal[];
}

export const getGoals = createAsyncThunk<Goal[]>(
    'goals/get',
    async function () {
        const goals = JSON.parse(localStorage.getItem(LocalStorage.Goals) || 'null') || [];
        return new Promise((resolve) => {
            resolve(goals)
        });
    }
)

export const addGoal = createAsyncThunk<Goal, string>(
    'goals/add',
    async function (title) {
        const goal: Goal = {
            id: new Date().getTime(),
            title,
            status: GoalStatus.Open,
            price: 0,
        }
        return new Promise((resolve) => {
            resolve(goal)
        });
    }
)

export const removeGoal = createAsyncThunk<number, number>(
    'goals/remove',
    async function (id) {
        return new Promise((resolve) => {
            resolve(id)
        });
    }
)

export const statusGoal = createAsyncThunk<PutStatus, PutStatus>(
    'goals/status',
    async function (payload) {
        return new Promise((resolve) => {
            resolve(payload)
        });
    }
)

export const putGoal = createAsyncThunk<void, void, { state: RootState }>(
    'goals/savePrice',
    async function (_, {getState}) {
        saveToLocalStorage(getState().goals)
        return new Promise((resolve) => {
            resolve()
        });
    }
)

const initialState: State = {
    goals: [],
}

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        updateGoal: (state, {payload}: PayloadAction<PutGoal>) => {
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
                state.goals.push(action.payload)
                saveToLocalStorage(state)
            })
            .addCase(removeGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter(g => g.id !== action.payload)
                saveToLocalStorage(state)
            })
            .addCase(statusGoal.fulfilled, (state, {payload}) => {
                const goal = state.goals.find(g => g.id === payload.id);
                if (goal) {
                    goal.status = payload.status
                    saveToLocalStorage(state)
                }
            })
    }
})

export const {updateGoal} = goalsSlice.actions;

export default goalsSlice.reducer;

function saveToLocalStorage(state: State) {
    localStorage.setItem(LocalStorage.Goals, JSON.stringify(state.goals))
}
