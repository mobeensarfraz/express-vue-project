import {User, UserModel} from '../models/userschema.js';
//get all user
 export const getuser=async (req, res) => {
  try {
   // console.log('reached in user')
   const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get a single user
export const postUserBynameorpassword=async (req, res) => {
  try {
    const {username,password}=req.body;
   const user = await UserModel.find({username:username,password:password},{ username: 1, password: 1 } 
   ).lean(); 
   user.forEach(user => {
     user.id = user._id;
     delete user._id;
   });  
    console.log(req.body)
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//create user
 export const createUser = async (req,res) => {
    try {
      console.log(req.body);
       const {username, email,password }=req.body;
       if (!username || !password) {
          return res.status(400).json({ error: 'Name,password and Email are required' });
        }
 
      const user = new UserModel({
        username,
        email,
        password
      });
 
      const savedUser = await user.save();
      res.status(201).json(savedUser);
 
      console.log('User Created:', savedUser);
    } catch (err) {
      console.error('Error creating user:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
 
    }
  };
  //update the user
 
  export const updateUser = async (req, res) => {
    try {
      const { username } = req.params; 
      const updates = req.body; 
  
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No update fields provided" });
      }
  
    
      const updatedUser = await UserModel.findOneAndUpdate(
        { username },     
        updates,       
        { new: true, runValidators: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser); 
    } catch (err) {
      console.error("Error updating user:", err.message);
  
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid data format" });
      }
  
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  //delete user by name
  export const deleteUser = async (req, res) => {
    try {
      const { username } = req.params; 
  
      const deletedUser = await UserModel.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      console.error("Error deleting user:", err.message);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };