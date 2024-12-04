
// const express = require('express');
// const Product = require('../models/Product');
// const Shop = require('../models/Shop');
// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const { fromBuffer } = require('file-type');
// const mime = require('mime-types');
// const router = express.Router();

// // Helper function to save base64-encoded image to file
// // const saveBase64Image = (base64Image, filePath) => {
// //     const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove base64 header
    
// //     return fs.promises.writeFile(filePath, base64Data, 'base64');
// // };

// const saveBase64Image = async (base64Image, filePath) => {
//     // Convert base64 image data to a buffer
//     const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove base64 header
//     const imageBuffer = Buffer.from(base64Data, 'base64');

//     // Detect the file type from the buffer
//     const fileType = await fromBuffer(imageBuffer);
    
//     // Verify that the file is a valid image (JPEG or PNG)
//     if (!fileType || !['image/jpeg', 'image/png'].includes(fileType.mime)) {
//         throw new Error('Invalid image format. Only JPEG and PNG are allowed.');
//     }

//     // Save the image to the file system
//     await fs.promises.writeFile(filePath, imageBuffer);
// };





// // POST request to add or update a product and link it to shops
// router.post('/add-product', async (req, res) => {
//     const { id, name, brand, description, quantity, image, category, tax, shops,casebarcode } = req.body;
//     const productid = id
//     console.log("hitting the add product ");

//     try {
//         let product = await Product.findOne({ id });

//         if (!product) {
//             // Create a new product if it doesn't exist
//             product = new Product({
//                 id,
//                 name,
//                 brand,
//                 description,
//                 quantity,
//                 image: null, // Initialize image as null
//                 category,
//                 tax, 
//                 shops: [],
//                 casebarcode // We'll populate this later
//             });
//         }

//         // Define the image path where the image will be saved
//         const imagePath = path.join(__dirname, '../uploads', `${id}.jpg`); // Save image as {id}.jpg

//         // If the image is a base64 string, save it to a file
//         if (image && image.startsWith('data:image')) {
//             await saveBase64Image(image, imagePath);
//             product.image = imagePath; // Store the path to the saved image
//         } 
//         // If the image is a URL, download and save it
//         else if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
//             const response = await axios({
//                 url: image,
//                 responseType: 'stream'
//             });

//             // Download the image and save it to the file system as {id}.jpg
//             const writer = fs.createWriteStream(imagePath);
//             response.data.pipe(writer);
//             await new Promise((resolve, reject) => {
//                 writer.on('finish', resolve);
//                 writer.on('error', reject);
//             });

//             product.image = imagePath; // Store the downloaded image path
//         }

//         // Save the product first to get the ObjectId
//         const savedProduct = await product.save();

//         // For each shop in the request, update the shop and link it to the product
//         for (const shopInfo of shops) {
//             const { id: shopId, price, Product_addr, type } = shopInfo;

//             // Find the shop by its unique ID
//             const shop = await Shop.findOne({ id: shopId });

//             if (shop) {
//                 // Check if the product is already linked to this shop
//                 const existingProductLink = shop.products.find(p => p.product.equals(savedProduct._id));
//                 if (!existingProductLink) {
//                     shop.products.push({
//                         product: savedProduct._id,
//                         price: price,
//                         Product_addr: Product_addr,
//                         type: type,
//                         id: productid
//                     });
//                     await shop.save(); // Save shop with product info
//                 }

//                 // Also link the shop to the product if not already linked
//                 if (!product.shops.some(s => s.shop.equals(shop._id))) {
//                     product.shops.push({
//                         shop: shop._id,
//                         price: price,
//                         Product_addr: Product_addr,
//                         type: type,
//                         id: shopId
//                     });
//                 }
//             }
//         }

//         // Save the updated product again if any new shops were linked
//         const finalSavedProduct = await product.save();

//         res.status(201).json({ message: 'Product added/updated successfully', product: finalSavedProduct });
//     } catch (error) {
//         console.error('Error adding or updating product:', error);
//         res.status(500).json({ message: 'Error adding or updating product', error });
//     }
// });

// module.exports = router;



const express = require('express');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { fromBuffer } = require('file-type');
const mime = require('mime-types');
const router = express.Router();

// Helper function to save base64-encoded image to file
const saveBase64Image = async (base64Image, filePath) => {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove base64 header
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const fileType = await fromBuffer(imageBuffer);
    
    if (!fileType || !['image/jpeg', 'image/png'].includes(fileType.mime)) {
        throw new Error('Invalid image format. Only JPEG and PNG are allowed.');
    }

    await fs.promises.writeFile(filePath, imageBuffer);
};

// POST request to add or update a product and link it to shops
// POST request to add or update a product and link it to shops
router.post('/add-product', async (req, res) => {
    const { id, name, brand, description, quantity, image, category, tax, shops, casebarcode } = req.body;
    const productid = id;

    try {
        let product = await Product.findOne({ id });

        if (!product) {
            // Create a new product if it doesn't exist
            product = new Product({
                id,
                name,
                brand,
                description,
                quantity,
                image: null, // Initialize image as null
                category,
                tax,
                shops: [],
                casebarcode
            });
        }

        // Define the image path where the image will be saved
        const imagePath = path.join(__dirname, '../uploads', `${id}.jpg`);

        // If the image is a base64 string, save it to a file
        if (image && image.startsWith('data:image')) {
            await saveBase64Image(image, imagePath);
            product.image = imagePath;
        } else if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
            const response = await axios({
                url: image,
                responseType: 'stream'
            });

            const writer = fs.createWriteStream(imagePath);
            response.data.pipe(writer);
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            product.image = imagePath;
        }

        // Save the product first to get the ObjectId
        const savedProduct = await product.save();

        // For each shop in the request, update the shop and link it to the product
        for (const shopInfo of shops) {
            const { id: shopId, price, Product_addr, type } = shopInfo;

            const shop = await Shop.findOne({ id: shopId });

            if (shop) {
                // Check if the product already exists in this shop
                const existingProductIndex = shop.products.findIndex(p => p.id === productid);

                if (existingProductIndex !== -1) {
                    // Product exists, update its details
                    shop.products[existingProductIndex] = {
                        product: savedProduct._id,
                        price: price,
                        Product_addr: Product_addr,
                        type: type,
                        id: productid
                    };
                } else {
                    // Product does not exist, push the new product to the array
                    shop.products.push({
                        product: savedProduct._id,
                        price: price,
                        Product_addr: Product_addr,
                        type: type,
                        id: productid
                    });
                }

                await shop.save(); // Save the shop with updated product info

                // Check if the shop is already linked to the product
                const existingShopIndex = product.shops.findIndex(s => s.shop.equals(shop._id));

                if (existingShopIndex !== -1) {
                    // Shop exists in product, update the details
                    product.shops[existingShopIndex] = {
                        shop: shop._id,
                        price: price,
                        Product_addr: Product_addr,
                        type: type,
                        id: shopId
                    };
                } else {
                    // Shop does not exist, push the new shop details to the array
                    product.shops.push({
                        shop: shop._id,
                        price: price,
                        Product_addr: Product_addr,
                        type: type,
                        id: shopId
                    });
                }
            }
        }

        // Save the updated product again if any new shops were linked
        const finalSavedProduct = await product.save();

        res.status(201).json({ message: 'Product added/updated successfully', product: finalSavedProduct });
    } catch (error) {
        console.error('Error adding or updating product:', error);
        res.status(500).json({ message: 'Error adding or updating product', error });
    }
});

module.exports = router;
