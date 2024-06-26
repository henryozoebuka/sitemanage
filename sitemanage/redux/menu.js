import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: false
    },

    reducers: {
        toggleMenu: (state) => {state.menu = !state.menu}
    }
})

export const { toggleMenu } = menuSlice.actions
export default menuSlice.reducer