import express from "express";
import { Create, Ao } from "../controllers/Order.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const Orderrouter = express.Router();

// CREATE ORDER
Orderrouter.post("/",authMiddleware ,Create);

// GET ALL ORDERS (for admin later)
Orderrouter.get("/",authMiddleware, Ao);

export default Orderrouter;