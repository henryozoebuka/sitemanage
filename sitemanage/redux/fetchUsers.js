// import {createSlice} from '@reduxjs/toolkit'
// import axios from 'axios'


// const fetchUsersSlice = createSlice({
//     name: 'fetch-users',
//     initialState: {
//         fetchUsers: [],
//         loading: false,
//         error: null
//     },

//     reducers: {

//         fetchUsersStart: (state) => {
//             state.loading = true
//             state.error = null
//         },

//         fetchUsersAll: (state, action) => {
//             state.fetchUsers = action.payload
//         },

//         fetchUsersFailure: (state, action) => {
//             state.loading = false
//             state.error = action.payload
//         }
//     }
// })

// export const {fetchUsersAll} = fetchUsersSlice.actions

// export const fetchUsers = () => async dispatch => {
//     try {
//         const response = await axios.get('http://192.168.179.83:3001/users')
//         dispatch(fetchUsersAll(response.data))
//     } catch (error) {
//         console.log(error)
//     }
// }


// export default fetchUsersSlice.reducer





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a thunk using createAsyncThunk
export const fetchUsers = createAsyncThunk(
  'fetchUsers/fetchUsers',
  async () => {
    try {
      const response = await axios.get('http://192.168.179.83:3001/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice
const fetchUsersSlice = createSlice({
  name: 'fetchUsers',
  initialState: {
    fetchUsers: [],    
  },
  reducers: {
    [fetchUsers.fulfilled]: (state, action) => {
        state.fetchUsers = action.payload;
      },
  },
  
});

export const { fetchUsersAll } = fetchUsersSlice.actions;


export default fetchUsersSlice.reducer;
