import express from 'express';
import user from './router/user.js';
import product from './router/product.js';
import mongoose from 'mongoose';
import Bill from './router/bill.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors'
// Connect to MongoDB
mongoose.connect('mongodb+srv://mobeensarfrazahmad:YMeLluYFJYhA7RH9@cluster0.yku5r.mongodb.net/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,

})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));
  const port= process.env.PORT || 8000;

const app= express();
//body prases middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
 
app.use(cors())


// Create uploads directory if it doesn't exist
const uploadPath = 'uploads/images';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error('Only JPEG files are allowed!'), false);
        }
        cb(undefined, true);
    }
}).single('image');
 //router
app.get('/',(req,res)=>{
  res.send({status:'ok'})
})
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

 app.use('/api/user',user);
 app.use('/api/product',product);
 app.use('/api/billing',Bill);
app.listen(port, () => console.log(`server running on port ${port}`));