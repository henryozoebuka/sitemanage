import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: false
    },

    reducers: {
        toggleMenu: (state) => {state.menu = !state.menu},
        setMenuFalse: (state) => {state.menu = false},
    }
})

export const { toggleMenu, setMenuFalse } = menuSlice.actions
export default menuSlice.reducer