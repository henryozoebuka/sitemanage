import {createSlice} from '@reduxjs/toolkit'

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: []
    },

    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        }
    }
})

export const {setTransactions} = transactionsSlice.actions
export default transactionsSlice.reducer