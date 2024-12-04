const express = require('express');
const axios = require('axios');  // To make HTTP requests to Scanbot
const router = express.Router();

// New route to proxy requests to Scanbot
router.get('/scanbot/:barcode', async (req, res) => {
  const { barcode } = req.params;
  const scanbotApiUrl = `https://scanbot.io/wp-json/upc/v1/lookup/${barcode}`;  // Scanbot API URL

  try {
    console.log("hit scan bot")
    const response = await axios.get(scanbotApiUrl);
    res.json(response.data);  // Send the response data back to the frontend
  } catch (error) {
    console.error("Error fetching from Scanbot API:", error);
    res.status(500).json({ message: "Failed to fetch data from Scanbot." });
  }
});

module.exports = router;
