import express from 'express';
import { create, deleteproduct, getproducts, postproductBynameorId, updateProduct } from '../controller/productcontroller.js';

const router = express.Router();

// POST /api/product - create a product with an image upload
router.post('/', create);

// Other routes (update, get, delete)
router.post('/get', postproductBynameorId);
router.get('/', getproducts);
router.put('/:itemname', updateProduct);
router.delete('/:itemname', deleteproduct);

export default router;
