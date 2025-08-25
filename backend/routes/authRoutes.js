import express from "express"
import {  fetchMe, login, logOut, register, verifyUser } from "../controllers/authController.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"

const authRouter=express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logOut)
authRouter.get("/me",isLoggedIn,fetchMe)
authRouter.get("/verify",isLoggedIn,verifyUser)

export default authRouter