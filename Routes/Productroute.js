import express from "express"
import { uploadJuice,deleteJuice,fetchAllJuices,fetchOneJuice } from "../controllers/Productcontroller.js"
import upload from "../Middleware/Upload.js"

const ProductRouter=express.Router()

ProductRouter.post(
  "/upload",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  uploadJuice
);


ProductRouter.delete("/delete", deleteJuice)
ProductRouter.get("/all",fetchAllJuices)
ProductRouter.get("/juice/:juiceid",fetchOneJuice)


export default ProductRouter