import UserModel from "../models/users.js";
import bcrypt from 'bcrypt'

//Sign up
const signUp = async (req, res) => {
    try {
        //verify username availability 
        const username = await UserModel.findOne({username: req.body.username})
        if(username) {
            return res.status(201).json({message: 'Username already exists try another one.'})
        }
        else {
            const salt = 10
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
            const user = await UserModel.create(req.body)            
            console.log(user)
            return res.status(200).json({message: "Account created succesfully."})            
        }                    
        
    } catch (error) {
        console.log(error)
    }
}

//fetch users
const fetchUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

//fetch user

const fetchUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findById(id)
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error.message)
    }
}

const editUser = async (req, res) => {
    const id = req.body.params

    try {
        const user = await UserModel.findByIdAndUpdate(id, req.body)
        if(user){
            return res.status(200).json({message: `${user.username}'s profile edited successfully!`})
        }
        else {
            return res.status(201).json({message: `Something went wrong. Try again.`})
        }
    } catch (error) {
        console.log(error)
    }
}

export {signUp, fetchUsers, fetchUser, editUser}