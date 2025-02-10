
import { BillModel } from "../models/Bill.js";
import { Product } from "../models/Productschema.js";


//  Create a Bill
export const create= async (req, res) => {
  try {
    const { username, products, discount, tax } = req.body;

    if (!username || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let totalBill = 0;
    let productDetails = [];

    for (let item of products) {
      const product = await Product.findOne({ itemname: item.itemname });

      if (!product) {
        return res.status(404).json({ message: `Product ${item.itemname} not found` });
      }

      const productPrice = product.sellingprice * item.quantity;
      totalBill += productPrice;

      productDetails.push({
        itemname: product.itemname,
        quantity: item.quantity,
        price: product.sellingprice,
      });
    }

    // Apply discount
    const discountAmount = (totalBill * discount) / 100;
    totalBill -= discountAmount;

    // Apply tax
    const taxAmount = (totalBill * tax) / 100;
    totalBill += taxAmount;

    // Create a new bill
    const newBill = new BillModel({
      username,
      products: productDetails,
      totalbill: totalBill,
      discount,
      tax,
    });

    await newBill.save();
    res.status(201).json({ message: "Bill created successfully", bill: newBill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get All Bills
router.get("/", async (req, res) => {
  try {
    const bills = await BillModel.find().sort({ createdAt: -1 }); // Sort by latest
    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
