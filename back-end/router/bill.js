import express from 'express';
import {create, deletebill, getbill} from '../controller/billingcontroller.js';
const router= express.Router();
//create bill
router.post('/',create);
router.get('/',getbill );
router.delete('/:username',deletebill)
export default router;