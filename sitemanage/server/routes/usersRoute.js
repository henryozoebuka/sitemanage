import express from 'express'
import { fetchUsers, signUp, login, fetchUser, editUser, deleteUser } from '../controllers/usersController.js'

const usersRouter = express.Router()

usersRouter.post('/signup', signUp)
usersRouter.post('/login', login)
usersRouter.get('/users', fetchUsers)
usersRouter.get('/user/:id', fetchUser)
usersRouter.patch('/user/:id', editUser)
usersRouter.delete('/user/:id', deleteUser)

export default usersRouter