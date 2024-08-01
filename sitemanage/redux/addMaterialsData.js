import { createSlice } from "@reduxjs/toolkit";

const addMaterialsDataSlice = createSlice({
    name: 'addMaterialsData',
    initialState: {
        addMaterialsData: {}
    },

    reducers: {
        setAddMaterialsData: (state, action) =>{
            state.addMaterialsData = action.payload
        }
    }
})

export const {setAddMaterialsData} = addMaterialsDataSlice.actions
export default addMaterialsDataSlice.reducer