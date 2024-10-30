import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import mongoose from "mongoose";
import Project_route from './ROUTES/Project_route.js';
import Register_route from './ROUTES/Register_route.js';

const app =express()
app.use(express.json())
app.use(cors());

dotenv.config(); 

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log(err);
    
})


app.use('/auth',Register_route)

app.use('/project',Project_route)

app.use('/view',Project_route)

app.use('/Todo',Project_route)



app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
  })