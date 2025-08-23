import express from "express"
import { fetchCurrentUser, login, logOut, register } from "../controllers/authController.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"

const authRouter=express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logOut)
authRouter.get("/current-user",isLoggedIn,fetchCurrentUser)

export default authRouter