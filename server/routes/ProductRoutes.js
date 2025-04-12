const express = require('express');
const router = express.Router();
const Product = require('./models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add more routes (create, update, delete) similarly