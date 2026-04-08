import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import DB from "./Config/DB.js"
import ProductRouter from "./Routes/Productroute.js"
import cors from "cors"
import Orderrouter from "./Routes/Order.js"
import userRouter from "./Routes/User.js"

const app=express()
const port = process.env.PORT || 4000
app.use(cookieParser())
app.use(express.json())
DB()

app.use(cors({
  origin: [
    "http://localhost:5173",
   "https://m-cgray-f.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use('/juice',ProductRouter)
app.use("/sub", Orderrouter)
app.use("/reg", userRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
