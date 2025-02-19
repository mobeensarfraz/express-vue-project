import mongoose from "mongoose";
// Define a schema for products
export const Product = new mongoose.Schema({
  
    itemname: { type: String, required: true },
  purchaseprice: { type: Number, required: true, },
  sellingprice: { type: Number, required:true },
  iteminstock:{type:Number},
  itempicturenumber:{type:String, required:true},


});

// Create a model
export const productModel =mongoose.model('productModel', Product);
