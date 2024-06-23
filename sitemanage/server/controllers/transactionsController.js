import TransactionsModel from "../models/transactions.js";
import UsersModel from "../models/users.js";

//transfer fund
const transferFund = async (req, res) => {
    try {
        const fund = await TransactionsModel.create(req.body)
        const sender = await UsersModel.findById(req.body.sender)

        const receiver = await UsersModel.findById(req.body.receiver)
        

        if (!receiver) {
            return res.status(400).json({ message: `Account not found` })
        }
        else {
            if (sender.balance < req.body.amount) {
                return res.status(201).json({ message: `Insufficient balance to tranfer $${req.body.amount}.` })
            }
            else {
                sender.balance -= req.body.amount
                await sender.save()
                receiver.balance += req.body.amount
                await receiver.save()
                return res.status(200).json({ message: `You have successfully transferred $${req.body.amount} to ${receiver.firstname}.` })
            }
        }

    } catch (error) {
        console.log(error)
    }
}

//fetch all transactions
const fetchTransactions = async (req, res) => {
    try {
        const transactions = await TransactionsModel.find()
        if (!transactions) {
            return res.status(201).json({ message: 'No transactions found.' })
        }
        else {
            return res.status(200).json(transactions)
        }
    } catch (error) {
        console.log(error)
    }
}

export { transferFund, fetchTransactions }