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

const allowedOrigins = [
  "https://m-cgray-g.vercel.app", // your frontend
  "http://localhost:5173"          // for local dev
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // if you use cookies or auth headers
}));



app.use('/juice',ProductRouter)
app.use("/sub", Orderrouter)
app.use("/reg", userRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
