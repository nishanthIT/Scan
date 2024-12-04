// models/Product.js
const mongoose = require('mongoose');

// Schema for shop information within the product
const shopInfoSchema = new mongoose.Schema({
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true }, // Reference to the shop
    price: String,
    Product_addr: String,
    type: String,
    id: String // Shop's unique ID (e.g., '1', '2')
});

// Schema for product
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    brand: String,
    description: String,
    quantity: String,
    image: String,
    category: String,
    tax: String,
    casebarcode:String,
    shops: [shopInfoSchema] // List of linked shops with details
});

module.exports = mongoose.model('Product', productSchema);
