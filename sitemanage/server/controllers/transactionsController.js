import TransactionsModel from "../models/transactions.js";
import UsersModel from "../models/users.js";

//transfer fund
const transferFund = async (req, res) => {
    try {
        const fund =await TransactionsModel.create(req.body)
        const user = await UsersModel.findById(req.body.receiver)
        console.log(req.body.amount)
        console.log(req.body.receiver)
        if (!user) {
            return res.status(400).json({message: `Something went wrong, please try again.`})
        }
        else {
            user.balance += req.body.amount
            user.save()
            return res.status(200).json({message: `You have successfully added ${req.body.amount} to this account.`})
        }

    } catch (error) {
        console.log(error)
    }
}

//fetch all transactions
const fetchTransactions = async (req, res) => {
    try {
        const transactions = await TransactionsModel.find()
        if(!transactions) {
            return res.status(201).json({message: 'No transactions found.'})
        }
        else {
            return res.status(200).json(transactions)
        }
    } catch (error) {
        console.log(error)
    }
}

export { transferFund, fetchTransactions }