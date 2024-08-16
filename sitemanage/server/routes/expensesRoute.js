import express from 'express'
import { postExpense, fetchExpenses } from '../controllers/expensesController.js'

const ExpensesRouter = express.Router()

ExpensesRouter.post('/postexpense', postExpense)
ExpensesRouter.get('/fetchexpenses/:id', fetchExpenses)

export default ExpensesRouter