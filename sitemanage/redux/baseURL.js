import {createSlice} from '@reduxjs/toolkit'

const baseURLSlice = createSlice({
    name: 'base_url',
    initialState: {
        url: 'https://ozstiwhaw1.execute-api.eu-north-1.amazonaws.com/prod'
    }
})

export default baseURLSlice.reducer