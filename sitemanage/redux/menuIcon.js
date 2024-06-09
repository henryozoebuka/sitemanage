import { createSlice } from '@reduxjs/toolkit'

const menuIconSlice = createSlice({
    name: 'menuIcon',
    initialState: {
        menuIcon: false
    },

    reducers: {
        toggleMenuIcon: state => state.menuIcon = !state.menuIcon
    }
})

export const {toggleMenuIcon} = menuIconSlice.actions
export default menuIconSlice.reducer