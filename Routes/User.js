import express from "express"
import { userReg, userLogin, logout  } from "../controllers/User.js"

const userRouter=express.Router()

userRouter.post("/userreg", userReg)
userRouter.post("/", userLogin)
userRouter.post("/logout",logout)


export default userRouter