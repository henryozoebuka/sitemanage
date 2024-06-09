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

export {signUp, fetchUsers}