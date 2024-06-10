import express from 'express'
import { fetchUsers, signUp, fetchUser } from '../controllers/usersController.js'

const usersRouter = express.Router()

usersRouter.post('/signup', signUp)
usersRouter.get('/users', fetchUsers)
usersRouter.get('/user/:id', fetchUser)

export default usersRouter