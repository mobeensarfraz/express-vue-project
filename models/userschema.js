import mongoose from "mongoose";

// Define a schema for user
export const User = new mongoose.Schema({
  
    username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required:true,unique:true },
});

// Create a model
export const UserModel =mongoose.model('UserModel', User);
