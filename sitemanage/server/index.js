import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import usersRouter from './routes/usersRoute.js'
import materialsRouter from './routes/materialsRoute.js'
import transactionsRouter from './routes/transactionsRoute.js'
import reportsRouter from './routes/reportsRoute.js'
import reportCommentsRouter from './routes/reportCommentsRoute.js'
import ExpensesRouter from './routes/expensesRoute.js'
import toDoRouter from './routes/toDoRoute.js'

const start =  async () => {
    const app = express();
    app.use(express.json());
    app.use(cors())
    app.use('/', usersRouter)
    app.use('/', materialsRouter)
    app.use('/', transactionsRouter)
    app.use('/', reportsRouter)
    app.use('/', reportCommentsRouter)
    app.use('/', ExpensesRouter)
    app.use('/', toDoRouter)
    app.use("/uploads", express.static('uploads'))
    
    const port = process.env.PORT


    if (!process.env.MONGO_URI) {
        throw new error('auth MONGO_URI must be defined');

    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(console.log('Connected to database'))
            .catch(e => { console.log(e.message) })

    } catch (error) {
        console.log(error)

    }

    app.listen(port, () => {
        console.log(`Server connected on port ${port}`)
    })
}

start()


