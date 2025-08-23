import express from "express"
import connectDb from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()


const app=express()

const Port=process.env.PORT

connectDb()

app.listen(Port,(req,res)=>{
    console.log("server started")
})