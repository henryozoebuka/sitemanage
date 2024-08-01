import UserModel from "../models/users.js";
import bcrypt from 'bcrypt';
import multer from 'multer';

// Function to generate unique account number
const generateUniqueAccountNumber = async () => {
    try {
        const lastUser = await UserModel.findOne({}, {}, { sort: { 'accountNumber': -1 } });
        let newAccountNumber;
        if (!lastUser) {
            newAccountNumber = '100000';
        } else {
            let lastAccountNumber = parseInt(lastUser.accountNumber, 10);
            newAccountNumber = lastAccountNumber + 1;
            newAccountNumber = newAccountNumber.toString().padStart(6, '0');
        }
        return newAccountNumber.toString();
    } catch (error) {
        console.log(error);
    }
};

// Sign up endpoint
const signUp = async (req, res) => {
    try {
        const username = await UserModel.findOne({ username: req.body.username });
        if (username) {
            return res.status(201).json({ message: 'Username already exists. Try another one.' });
        } else {
            const newAccountNumber = await generateUniqueAccountNumber();
            const salt = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
            const user = await UserModel.create({ ...req.body, accountNumber: newAccountNumber });
            return res.status(200).json({ message: "Account created successfully." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Login endpoint
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid login details.' });
        } else {
            const hashedPassword = await bcrypt.compare(password, user.password);
            if (!hashedPassword) {
                return res.status(401).json({ message: 'Invalid login details.' });
            } else if (hashedPassword && user.status === 'inactive') {
                return res.status(403).json({ message: 'Your account is inactive. Please contact the admin!' });
            } else if (hashedPassword && user.status === 'active') {
                return res.status(200).json({ user, message: 'Logged in successfully!' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Fetch all users endpoint
const fetchUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Fetch user by ID endpoint
const fetchUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'Account does not exist.' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

//fetch user by account number

const fetchUserByAccountNumber = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findOne({accountNumber: id})
    if(!user){
        return res.status(201).json({
            message: 'No user with this account number.'
        })
    }
    else {
        return res.status(200).json(user)
    }
    } catch (error) {
        console.log(error)
    }
}

// Edit user endpoint
const editUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedUser) {
            return res.status(200).json({ message: `${updatedUser.username}'s profile edited successfully!`, user: updatedUser });
        } else {
            return res.status(404).json({ message: `User not found.` });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete user endpoint
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (deletedUser) {
            return res.status(200).json({ message: 'User deleted successfully!' });
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Upload photo endpoint
const uploadPhoto = async (req, res) => {
    try {
        if (req.file) {
            // Assuming you save the path to the uploaded photo in the user document
            const photoPath = req.file.path; // Adjust as per your multer setup
            return res.status(200).json({ message: 'Photo uploaded successfully.', photoPath });
        } else {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export { signUp, fetchUsers, fetchUser, fetchUserByAccountNumber, editUser, deleteUser, login, uploadPhoto };