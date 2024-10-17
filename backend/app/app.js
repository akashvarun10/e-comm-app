const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const productRoutes = require('./routes/productRoutes');

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Backend Auth, Collection & Product Server is running');
});

// Use routes
app.use('/auth', authRoutes);
app.use('/collections', collectionRoutes);
app.use('/products', productRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});