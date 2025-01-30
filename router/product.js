import express from 'express';
import { create } from '../controller/productcontroller';
const router= express.Router();

//create product
router.post('/',create);
export default router;