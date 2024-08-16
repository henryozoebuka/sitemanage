import { createSlice } from "@reduxjs/toolkit";

const todoCompletedSlice = createSlice({
    name: 'todo completed',
    
    initialState: {
        todoCompleted: false
    },
    
    reducers: {
        setCompletedTrue: state => {state.todoCompleted = true},
        setCompletedFalse: state => {state.todoCompleted = false}
    }
})

export const {setCompletedTrue, setCompletedFalse} = todoCompletedSlice.actions
export default todoCompletedSlice.reducer