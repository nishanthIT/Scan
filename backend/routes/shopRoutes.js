// routes/shopRoutes.js
const express = require('express');
const Shop = require('../models/Shop');

const router = express.Router();

// POST request to add shops
router.post('/add-shops', async (req, res) => {
    const shops = req.body;
    console.log("hited the add shop")

    try {
        // Create new shops
        const savedShops = [];
        for (const shopData of shops) {
            const newShop = new Shop({
                name: shopData.name,
                address: shopData.address,
                phone: shopData.phone,
                id:shopData.id
            });

            const savedShop = await newShop.save();
            savedShops.push(savedShop);
        }

        res.status(201).json({ message: 'Shops added successfully', shops: savedShops });
    } catch (error) {
        console.error('Error adding shops:', error);
        res.status(500).json({ message: 'Error adding shops', error });
    }
});
// GET request to retrieve all shops
router.get('/get-shops', async (req, res) => {
    console.log("hitting the get shops");

    try {
        // Fetch all shops from the database
        const shops = await Shop.find();

        // Return the fetched shops
        res.status(200).json({ message: 'Shops retrieved successfully', shops });
    } catch (error) {
        console.error('Error retrieving shops:', error);
        res.status(500).json({ message: 'Error retrieving shops', error });
    }
});

module.exports = router;
