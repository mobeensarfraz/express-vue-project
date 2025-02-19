import { productModel } from "../models/Productschema.js";
import { upload } from "../server.js";
import { MulterError } from "multer";
//create product
export const create = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof MulterError) {
        return res.status(400).json({ error: "File too large" });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { itemname, purchaseprice, sellingprice, iteminstock } = req.body;

      if (!itemname || !sellingprice) {
        return res.status(400).json({ error: "Item name and selling price are required" });
      }

      // Store only the unique filename in the database
      const product = new productModel({
        itemname,
        purchaseprice,
        sellingprice,
        iteminstock,
        itempicturenumber: req.file.filename, // Store the uploaded image filename
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//get user by id and name
import mongoose from "mongoose";

export const postproductBynameorId = async (req, res) => {
  try {
    const { itemname, id } = req.body;

    let query = {};
    if (itemname) query.itemname = itemname;
    if (id) {
      try {
        query._id = new mongoose.Types.ObjectId(id);
      } catch (err) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
    }

    const product = await productModel
      .find(query, { itemname: 1, id: 1 })
      .lean();

    product.forEach((prod) => {
      prod.id = prod._id;
      delete prod._id;
    });

    res.json(
      product.length > 0 ? product[0] : { message: "Product not found" }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all the product
export const getproducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update the product
export const updateProduct = async (req, res) => {
  try {
    console.log("Received update request:", req.params.itemname, req.body);

    const { itemname } = req.params;
    const updates = req.body;

    if (!itemname) {
      return res.status(400).json({ message: "Item name is required in URL" });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const updatedProduct = await productModel.findOneAndUpdate(
      { itemname },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Updated product successfully:", updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

//delete product by name
export const deleteproduct = async (req, res) => {
  try {
    const { itemname } = req.params;

    const deletedproduct = await productModel.findOneAndDelete({ itemname });

    if (!deletedproduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({
      message: "product deleted successfully",
      product: deletedproduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
