import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorage} from "../../enums/LocalStorage";
import {Themes} from "../../enums/Themes";

const initialState: {theme: Themes} = {
    theme: (localStorage.getItem(LocalStorage.Theme) as Themes) || "dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle(state, {payload}: PayloadAction<Themes>) {
            state.theme = payload;
            localStorage.setItem(LocalStorage.Theme, payload);
        },
    },
});

export const {toggle} = themeSlice.actions;

export default themeSlice.reducer;
