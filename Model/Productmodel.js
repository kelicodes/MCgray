import mongoose from "mongoose";

const juiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    flavour: {
      type: String,
      required: [true, "Flavour is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    category: {
      type: String,
      default: "Juice",
    },

    size: {
      type: String, // e.g. 250ml, 500ml, 1L
      default: "500ml",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    discount: {
      type: Number,
      default: 0, // percentage e.g. 10 = 10%
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    ingredients: [
      {
        type: String,
      },
    ],

    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Optional: Virtual field for discounted price
juiceSchema.virtual("finalPrice").get(function () {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price;
});

// Ensure virtuals are included when converting to JSON
juiceSchema.set("toJSON", { virtuals: true });
juiceSchema.set("toObject", { virtuals: true });

const Juice = mongoose.model("Juice", juiceSchema);

export default Juice;