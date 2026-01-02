import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"

import { authRoute } from './routes/auth.routes.js'
import { noteRoute } from './routes/note.routes.js'



dotenv.config() 
const app=express()

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));

app.use("/auth", authRoute)
app.use("/notes", noteRoute)




mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected")
        app.listen(5000)
        console.log("Server started at port 5000")
}).catch((err) => {
    console.log(err)
})


