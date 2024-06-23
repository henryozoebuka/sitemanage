import { createSlice } from "@reduxjs/toolkit";

const transferDataSlice = createSlice({
    name: 'transfer-data',
    initialState: {
        transferData: {}
    },

    reducers: {
        setTransferData: (state, action) => {
            state.transferData = action.payload;
        }
    }
})

export const {setTransferData} = transferDataSlice.actions
export default transferDataSlice.reducer