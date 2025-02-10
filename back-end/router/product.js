import express from 'express';
import {create, deleteproduct, getproducts, postproductBynameorId, updateProduct} from '../controller/productcontroller.js';
const router= express.Router();

//create product
router.post('/',create);
//get product by name or id
router.post('/get',postproductBynameorId);
//get all the products
router.get('/',getproducts);
//update product
router.put('/:itemname',updateProduct);
//delete product
router.delete('/:itemname',deleteproduct);
export default router;