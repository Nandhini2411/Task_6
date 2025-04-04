const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/productsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

// Fetch all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Fetch a single product by ID
app.get('/api/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Update product details
app.put('/api/products/:id', async (req, res) => {
  const { name, price, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, category },
    { new: true }
  );
  res.json(product);
});

// Create a product (initial data, for testing)
app.post('/api/products', async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });
  await newProduct.save();
  res.json(newProduct);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
