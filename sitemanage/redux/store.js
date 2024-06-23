import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu.js'
import menuIconReducer from './menuIcon.js'
import baseURLReducer from './baseURL.js'
import fetchUsersReducer from './fetchUsers.js'
import loggedInReducer from './loggedIn.js'
import userReducer from './user.js'
import transferDataReducer from './transferData.js'
import users from './users.js'


export default configureStore({
    reducer: {
        menuState: menuReducer,
        menuIcon: menuIconReducer,
        baseURL: baseURLReducer,
        fetch: fetchUsersReducer,
        login: loggedInReducer,
        user: userReducer,
        transferData: transferDataReducer,
        users,
    }
})