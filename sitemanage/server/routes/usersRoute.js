import express from 'express'
import { fetchUsers, signUp } from '../controllers/usersController.js'

const usersRouter = express.Router()

usersRouter.post('/signup', signUp)
usersRouter.get('/users', fetchUsers)

export default usersRouter