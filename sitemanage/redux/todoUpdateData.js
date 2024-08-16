import { createSlice } from "@reduxjs/toolkit";

const todoUpdateDataSlice = createSlice({
    name: 'todoUpdateData',

    initialState: {
        todoUpdateData: {}
    },

    reducers: {
        setTodoUpdateData: (state, action) => {
            state.todoUpdateData = action.payload
        }
    }
})

export const {setTodoUpdateData} = todoUpdateDataSlice.actions
export default todoUpdateDataSlice.reducer