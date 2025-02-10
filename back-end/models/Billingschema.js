import mongoose from "mongoose";
// Define a schema for billing
const Billing = new mongoose.Schema({
  
    username: { type: String, required: true },
    products: [
        {
          itemname: String,
          quantity: Number,
          price: Number, 
        },
      ],    totalbill:{type:Number,required:true}, 
    createdAt: { type: Date, default: Date.now },
    discount:{type:Number},
    tax:{type:Number},
});

// Create a model
export const BillModel =mongoose.model('BillModel', Billing);
