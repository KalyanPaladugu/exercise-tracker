const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const usersRouter=require('./routes/users')
const exercisesRouter=require('./routes/exercises');
dotenv.config()

mongoose.connect(process.env.ATLAS_URI,()=>console.log("Database is connected"))
app.use(cors());
app.use(express.json())
app.use('/users',usersRouter)
app.use('/exercise',exercisesRouter)
app.listen(5000,()=> console.log("Server is running"))