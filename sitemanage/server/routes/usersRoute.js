import express from 'express';
import { fetchUsers, signUp, login, fetchUser, fetchUserByAccountNumber, editUser, deleteUser, addFund } from '../controllers/usersController.js';
import multer from 'multer';

const usersRouter = express.Router();


usersRouter.post('/signup', signUp);
usersRouter.patch('/addfund', addFund);
usersRouter.post('/login', login);
usersRouter.get('/users', fetchUsers);
usersRouter.get('/user/:id', fetchUser);
usersRouter.get('/useraccount/:id', fetchUserByAccountNumber); 
usersRouter.patch('/user/:id', editUser);
usersRouter.delete('/user/:id', deleteUser);


export default usersRouter;
