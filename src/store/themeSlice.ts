import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorage} from "../enums/LocalStorage";

const initialState = {
    theme: localStorage.getItem(LocalStorage.Theme) || 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle(state, {payload}: PayloadAction<string>) {
            state.theme = payload;
            localStorage.setItem(LocalStorage.Theme, payload);
        }
    }
})

export const {toggle} = themeSlice.actions;

export default themeSlice.reducer;
