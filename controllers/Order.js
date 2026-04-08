import express from "express";
import Order from "../Model/Order.js";



// CREATE ORDER
export const Create=async (req, res) => {
  try {
    const { name, phone, location, plan } = req.body;

    const newOrder = new Order({
      name,
      phone,
      location,
      planId: plan.id,
      planName: plan.name,
      price: Number(plan.price.replace(",", "")),
      period: plan.period,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
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
