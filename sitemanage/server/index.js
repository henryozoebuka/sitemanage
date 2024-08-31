import express from 'express';
import serverless from 'serverless-http';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';

// import routes
import usersRouter from './routes/usersRoute.js';
import materialsRouter from './routes/materialsRoute.js';
import transactionsRouter from './routes/transactionsRoute.js';
import reportsRouter from './routes/reportsRoute.js';
import reportCommentsRouter from './routes/reportCommentsRoute.js';
import ExpensesRouter from './routes/expensesRoute.js';
import toDoRouter from './routes/toDoRoute.js';

// Create an Express application
const app = express();

// Middleware and routes
app.use(express.json());
app.use(cors()); // Ensure to import cors if you haven't already
app.use('/', usersRouter);
app.use('/', materialsRouter);
app.use('/', transactionsRouter);
app.use('/', reportsRouter);
app.use('/', reportCommentsRouter);
app.use('/', ExpensesRouter);
app.use('/', toDoRouter);


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            console.log('Connected to database')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

}
app.get('/hello', (req, res)=>{res.send('getting somewhere therhe')})

startServer()

// Export the handler for AWS Lambda
export const handler = serverless(app);
