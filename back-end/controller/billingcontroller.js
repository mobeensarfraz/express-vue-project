import { BillModel } from "../models/Billingschema.js";
import { Product, productModel } from "../models/Productschema.js";

//  Create a Bill
export const create=async (req, res) => {
  try {
    const { username, products, discount, tax } = req.body;

    if (!username || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let totalBill = 0;
    let productDetails = [];

    for (let item of products) {
      const product = await productModel.findById(item.productId).exec();

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({ message: `Invalid quantity for product ${product.itemname}` });
      }

      const productPrice = product.sellingprice * item.quantity;

      if (isNaN(productPrice)) {
        return res.status(500).json({ message: `Error calculating price for ${product.itemname}` });
      }

      totalBill += productPrice;

      productDetails.push({
        productId: product.id,
        itemname: product.itemname,
        quantity: item.quantity,
        price: product.sellingprice,
      });
    }


    if (isNaN(totalBill) || totalBill < 0) {
      return res.status(500).json({ message: "Error calculating total bill amount" });
    }

    const newBill = new BillModel({
      username,
      products: productDetails,
      totalbill: totalBill,
      discount,
      tax,
    });

    await newBill.save();
    res.status(201).json({ message: " Bill created successfully", bill: newBill });
  } catch (error) {
    console.error(" Error creating bill:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get All Bills
export const getbill= async (req, res) => {
  try {
    const bills = await BillModel.find().sort({ createdAt: -1 }); 
    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete bill by username
export const deletebill = async (req, res) => {
  try {
    const { username } = req.params;

    const deletedbill = await BillModel.findOneAndDelete({ username });

    if (!deletedbill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({
      message: "bill deleted successfully",
      bill: deletedbill,
    });
  } catch (err) {
    console.error("Error deleting  Bill:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};