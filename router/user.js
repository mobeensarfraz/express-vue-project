import express from 'express';
import { createUser,getuser,postUserBynameorpassword,updateUser,deleteUser} from "../controller/usercontroller.js"
const router= express.Router();

//get all user
router.get('/',getuser);
//get a sinfle user
router.post('/:login',postUserBynameorpassword);
//cre
router.post('/',createUser);
//update user
router.put('/:username',updateUser);
//delete user
router.delete('/:username',deleteUser)
export default router;