import express from "express";
import Order from "../Model/Order.js";



// CREATE ORDER
export const Create=async (req, res) => {
  try {
    const { name, phone, location, planName, planPeriod, planPrice } = req.body;
    const clientId=req.userId

    const newOrder = new Order({
      name,
      phone,
      location,
      planName, planPeriod, planPrice,clientId
    });

    await newOrder.save();

    res.status(201).json({
      message: "Subscription successfull",
      order: newOrder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL ORDERS (for admin later)
export const Ao=async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};



export const Mysub=async(req,res)=>{
  const myId= req.userId
  const mySub= await Order.findById(myId)
  res.json({message:"my subs",mySub})
}