import mongoose from "mongoose";
import { Product } from "./Productschema";
// Define a schema for billing
const Billing = new mongoose.Schema({
  
    username: { type: String, required: true },
    items: [Product],
    totalbill:{type:Number,required:true}, 
    createdAt: { type: Date, default: Date.now },
});

// Create a model
export const Bill =mongoose.model('Bill', Billing);
