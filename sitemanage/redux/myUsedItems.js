import { createSlice } from "@reduxjs/toolkit";

const myUsedItemsSlice = createSlice({
    name: 'my used items',
    initialState: {
        myUsedItems: []
    },
    reducers: {
        setMyUsedItems: (state, action) => {
            state.myUsedItems = action.payload
        }
    }
})

export const {setMyUsedItems} = myUsedItemsSlice.actions

export default myUsedItemsSlice.reducer