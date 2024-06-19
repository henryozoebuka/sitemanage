import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import usersRouter from './routes/usersRoute.js'
import materialsRouter from './routes/materialsRoute.js'
import transactionsRouter from './routes/transactionsRoute.js'

const start =  async () => {
    const app = express();
    app.use(express.json());
    app.use(cors())
    app.use('/', usersRouter)
    app.use('/', materialsRouter)
    app.use('/', transactionsRouter)
    
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


