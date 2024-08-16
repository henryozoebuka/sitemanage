import ToDoModel from "../models/todo.js";

const postToDo = async (req, res) => {
    try {
        const toDo = await ToDoModel.create(req.body)
        if(toDo){
            res.status(200).json({message: 'You have successfully added to your To Do list.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const fetchToDos = async (req, res) => {
    try {
        const toDos = await ToDoModel.find()
        if(!toDos){
            res.status(201).json({message: 'You do not have anything in your To Do list'})
        } else {
            res.status(200).json(toDos)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//update to do
const updateToDo = async (req, res) => {
    const {id} = req.params
    try {
        const toDo = await ToDoModel.findByIdAndUpdate(id, req.body)
        if(toDo){
            res.status(200).json({message: 'You have successfully updated your todo'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//delete to do
const deleteToDo = async (req, res) => {
    const {id} = req.body
    try {
        const toDo = await ToDoModel.findByIdAndDelete(id)
        if(toDo){
            res.status(200).json({message: 'You have successfully deleted the To Do.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export {postToDo, fetchToDos, updateToDo, deleteToDo}