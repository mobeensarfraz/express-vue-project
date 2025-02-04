import express from 'express';
import user from './router/user.js';
import mongoose from 'mongoose';
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


//app.use (express.static(path.join(__dirname,'public')));
 //router
app.get('/',(req,res)=>{
  res.send({ststus:'ok'})
})
 app.use('/api/user',user);
app.listen(port, () => console.log(`server running on port ${port}`));