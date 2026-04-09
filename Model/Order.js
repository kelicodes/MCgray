import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  { 
    clientId:{
      type: objectId,
      required:true
    },
    // CUSTOMER INFO
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    // PLAN INFO
  

    planName: {
      type: String,
      required: true,
    },

    planPrice: {
      type: Number,
      required: true,
    },

    planPeriod: {
      type: String, // "/ week"
      default: "/ week",
    },

    // BUSINESS LOGIC
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    // OPTIONAL (VERY USEFUL LATER)
    notes: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;