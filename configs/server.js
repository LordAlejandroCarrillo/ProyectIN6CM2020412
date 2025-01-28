'use_strict';

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'

const configureMiddlewares = (app) => {
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan('dev'))
}

const configureRoots = () => {

}

const connectDB = async () => {
    try {
        await dbConnection()
        console.log('Database connected succesfully')
    } catch (error) {
        console.log('Error trying to connect to the database')
        process.exit(1)
    }
}

export const startServer = async () => {
    const app = express()
    const port = process.env.PORT || 3000

    await connectDB()

    configureMiddlewares(app)
    configureRoots(app)

    app.listen(port, () =>{
        console.log(`Server running on port ${port}`)
    })
}