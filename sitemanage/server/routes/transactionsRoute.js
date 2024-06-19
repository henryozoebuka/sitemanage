import express from 'express'
import { transferFund, fetchTransactions } from '../controllers/transactionsController.js'

const transactionsRouter = express.Router()

transactionsRouter.post('/transferFund', transferFund)
transactionsRouter.get('/transactions', fetchTransactions)

export default transactionsRouter