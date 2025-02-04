const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://mobeensarfrazahmad:YMeLluYFJYhA7RH9@cluster0.yku5r.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));
