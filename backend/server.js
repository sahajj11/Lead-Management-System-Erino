import express from "express"
import connectDb from "./config/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoutes.js"
import cors from "cors"
import leadRouter from "./routes/leadRoutes.js"

dotenv.config()


const app=express()

const Port=process.env.PORT

connectDb()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/auth",authRouter)
app.use("/lead",leadRouter)

app.listen(Port,(req,res)=>{
    console.log("server started")
})