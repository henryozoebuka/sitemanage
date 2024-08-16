import express from 'express'
import { postToDo, fetchToDos, updateToDo, deleteToDo } from '../controllers/toDoController.js'

const toDoRouter = express.Router()

toDoRouter.post('/posttodo', postToDo)
toDoRouter.get('/fetchtodos', fetchToDos)
toDoRouter.patch('/updatetodo/:id', updateToDo)
toDoRouter.delete('/deletetodo', deleteToDo)

export default toDoRouter