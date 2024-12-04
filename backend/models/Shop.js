const mongoose = require('mongoose');

// Schema for shop
const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    id: { type: String, required: true, unique: true }, // Ensure this is unique
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Linked product
        price: { type: String, required: true },
        Product_addr: { type: String, required: true },
        type: { type: String, required: true },
        id: { type: String, required: true } // Shop's unique ID
    }]
});

module.exports = mongoose.model('Shop', shopSchema);
