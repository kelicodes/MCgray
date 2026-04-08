import express from "express";
import { Create, Ao } from "../controllers/Order.js";

const Orderrouter = express.Router();

// CREATE ORDER
Orderrouter.post("/", Create);

// GET ALL ORDERS (for admin later)
Orderrouter.get("/", Ao);

export default Orderrouter;