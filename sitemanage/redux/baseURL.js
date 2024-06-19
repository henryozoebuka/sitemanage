import {createSlice} from '@reduxjs/toolkit'

const baseURLSlice = createSlice({
    name: 'base_url',
    initialState: {
        url: 'http://192.168.150.83:3001'
    }
})

export default baseURLSlice.reducer