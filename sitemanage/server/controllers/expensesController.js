import ExpensesModel from "../models/expenses.js";
import UserModel from "../models/users.js";

//post expenses
const postExpense = async (req, res) => {
    const { amount, spenderId } = req.body
    try {
        const expense = await ExpensesModel.create(req.body)
        const user = await UserModel.findById(spenderId)
    if(!user){
        console.log('No user found')
    }
    const newBalance = user.balance - amount 
    const updateBalance = await UserModel.findByIdAndUpdate(spenderId, {balance: newBalance})

        if (expense && updateBalance) {
            res.status(200).json({ message: 'You have successfully posted an expense.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error occurred while processing your request.' })
    }
}

//fetch expense
const fetchExpenses = async (req, res) => {
    const { id } = req.params
    try {
        const expenses = await ExpensesModel.find({ spenderId: id })
        if (expenses) {
            res.status(200).json(expenses)
        }
        if (!expenses) {
            res.status(201).json({ message: 'You do not have any expenses in your record.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error occurred while processing your request.' })
    }
}

export { postExpense, fetchExpenses }