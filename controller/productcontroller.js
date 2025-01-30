import { productModel } from "../models/Productschema";
//create product
export const create = async (req,res) => {
    try {
      console.log(req.body);
       const {itemname,purchaseprice,sellingprice,iteminstock,itempicturenumber }=req.body;
       if (!itemname || !sellingprice) {
          return res.status(400).json({ error: 'itemname are required' });
        }
 
      const product = new productModel({
        itemname,
        purchaseprice,
        sellingprice,
        iteminstock,
        itempicturenumber 
      });
 
      const savedproduct = await product.save();
      res.status(201).json(savedproduct);
 
      console.log('product Created:', savedproduct);
    } catch (err) {
      console.error('Error creating product:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
 
    }
  };
  