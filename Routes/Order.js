import express from "express";
import { Create, Ao, Mysub } from "../controllers/Order.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const Orderrouter = express.Router();

// CREATE ORDER
Orderrouter.post("/",authMiddleware ,Create);

// GET ALL ORDERS (for admin later)
Orderrouter.get("/",authMiddleware, Ao);

Orderrouter.get("/mysub", authMiddleware,Mysub)

export default Orderrouter;