import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu.js'
import menuIconReducer from './menuIcon.js'
import baseURLReducer from './baseURL.js'
import fetchUsersReducer from './fetchUsers.js'


export default configureStore({
    reducer: {
        menuState: menuReducer,
        menuIcon: menuIconReducer,
        baseURL: baseURLReducer,
        fetch: fetchUsersReducer
    }
})