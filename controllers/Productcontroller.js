import Juice from "../Model/Productmodel.js"
import cloudinary from '../Config/Cloudinary.js'

// ===================== UPLOAD JUICE =====================
export const uploadJuice = async (req, res) => {
  try {
    const {
      name,
      price,
      flavour,
      description,
      category,
      size,
      isFeatured,
      discount,
      ingredients,
      expiryDate,
    } = req.body;

    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    // ===================== VALIDATION =====================
    if (!name || !price || !flavour) {
      return res.status(400).json({
        success: false,
        message: "Name, price and flavour are required",
      });
    }

    // Parse ingredients if string
    let parsedIngredients = [];
    if (ingredients) {
      try {
        parsedIngredients =
          typeof ingredients === "string"
            ? JSON.parse(ingredients)
            : ingredients;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid ingredients format",
        });
      }
    }

    // ===================== IMAGE UPLOAD =====================
    const uploadedImages = [];

    for (const key of ["image1", "image2", "image3", "image4"]) {
      if (req.files[key]) {
        const filePath = req.files[key][0].path;

        const result = await cloudinary.uploader.upload(filePath, {
          width: 500,
          height: 500,
          crop: "fill",
          quality: "auto",
          fetch_format: "auto",
        });

        uploadedImages.push(result.secure_url);
      }
    }

    if (uploadedImages.length < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // ===================== SAVE JUICE =====================
    const newJuice = new Juice({
      name,
      price,
      flavour,
      description,
      category,
      size,
      isFeatured,
      discount,
      images: uploadedImages,
      ingredients: parsedIngredients,
      expiryDate,
    });

    await newJuice.save();

    return res.status(201).json({
      success: true,
      message: "Juice uploaded successfully",
      juice: newJuice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Juice upload failed",
      error: error.message,
    });
  }
};

// ===================== FETCH ALL JUICES =====================
export const fetchAllJuices = async (req, res) => {
  try {
    const juices = await Juice.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: "Juices fetched",
      juices,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch juices",
      error: error.message,
    });
  }
};

// ===================== FETCH ONE JUICE =====================
export const fetchOneJuice = async (req, res) => {
  try {
    const { id } = req.params;

    const juice = await Juice.findById(id);

    if (!juice) {
      return res.status(404).json({
        success: false,
        message: "Juice not found",
      });
    }

    return res.json({
      success: true,
      message: "Juice fetched",
      juice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch juice",
      error: error.message,
    });
  }
};

// ===================== DELETE JUICE =====================
export const deleteJuice = async (req, res) => {
  try {
    const { id } = req.params;

    const juice = await Juice.findByIdAndDelete(id);

    if (!juice) {
      return res.status(404).json({
        success: false,
        message: "Juice not found",
      });
    }

    return res.json({
      success: true,
      message: "Juice deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete juice",
      error: error.message,
    });
  }
};