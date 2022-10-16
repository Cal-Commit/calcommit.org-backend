import express, { Express } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'

const app: Express = express()

dotenv.config()

import announcementRoutes from './routes/announcement.routes'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(`/api/v1`, announcementRoutes)

mongoose
    .connect(String(process.env.MONGO_URI))
    .then(() => {
        app.listen(3000, () => {
            console.log('Example app listening on port 3000!')
        })
    })
    .catch((err) => {
        throw new Error(err)
    })
