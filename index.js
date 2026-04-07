import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import DB from "./Config/DB.js"
import ProductRouter from "./Routes/Productroute.js"

const app=express()
const port = process.env.PORT || 4000
app.use(cookieParser())

DB()

app.use('/juice',ProductRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
