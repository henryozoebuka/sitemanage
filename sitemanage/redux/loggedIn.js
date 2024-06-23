import { createSlice } from '@reduxjs/toolkit';

const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    toggleLoggedIn: (state) => {
      state.loggedIn = !state.loggedIn; // Corrected typo and state update
    },
  },
});

export const { toggleLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
