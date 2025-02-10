import express from 'express';
import {create} from '../controller/billingcontroller.js';
const router= express.Router();
//create bill
router.post('/',create)