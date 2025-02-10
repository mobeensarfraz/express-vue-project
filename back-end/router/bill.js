import express from 'express';
import {create, getbill} from '../controller/billingcontroller.js';
const router= express.Router();
//create bill
router.post('/',create);
router.get('/',getbill );

export default router;