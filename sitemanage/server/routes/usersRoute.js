import express from 'express'
import { fetchUsers, signUp, fetchUser, editUser } from '../controllers/usersController.js'

const usersRouter = express.Router()

usersRouter.post('/signup', signUp)
usersRouter.get('/users', fetchUsers)
usersRouter.get('/user/:id', fetchUser)
usersRouter.patch('/user/:id', editUser)

export default usersRouter