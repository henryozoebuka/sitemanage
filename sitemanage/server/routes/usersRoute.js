import express from 'express';
import { fetchUsers, signUp, login, fetchUser, fetchUserByAccountNumber, editUser, deleteUser, uploadPhoto } from '../controllers/usersController.js';
import multer from 'multer';

const usersRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

usersRouter.post('/signup', signUp);
usersRouter.post('/login', login);
usersRouter.get('/users', fetchUsers);
usersRouter.get('/user/:id', fetchUser);
usersRouter.get('/useraccount/:id', fetchUserByAccountNumber); 
usersRouter.patch('/user/:id', upload.single('photo'), editUser);
usersRouter.delete('/user/:id', deleteUser);
usersRouter.post('/upload', upload.single('photo'), uploadPhoto);

export default usersRouter;
