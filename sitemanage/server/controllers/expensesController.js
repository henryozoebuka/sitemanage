import ExpensesModel from "../models/expenses.js";

//post expenses
const postExpense = async (req, res) => {
    try {
        const expense = await ExpensesModel.create(req.body)
        if(expense){
            res.status(200).json({message: 'You have successfully posted an expense.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error occurred while processing your request.'})
    }
}

//fetch expense
const fetchExpenses = async (req, res) => {
    const {id} = req.params
    try {
        const expenses = await ExpensesModel.find({spenderId: id})
        if(expenses){
            res.status(200).json(expenses)
        }
        if(!expenses){
            res.status(201).json({message: 'You do not have any expenses in your record.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error occurred while processing your request.'})
    }
}

export {postExpense, fetchExpenses}