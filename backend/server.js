// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const productRoutes = require('./routes/productRoutes');
// const shopRoutes = require('./routes/shopRoutes'); // Import shop routes

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected!'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Use routes
// app.use('/api', productRoutes);
// app.use('/api', shopRoutes ); // Use shop routes

// // Start Server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });




// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import cors
// const productRoutes = require('./routes/productRoutes');
// const shopRoutes = require('./routes/shopRoutes'); // Import shop routes

// const app = express();
// const port = process.env.PORT || 3000;


// app.use(bodyParser.json());

// // MongoDB Connection
// app.use((req, res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin',"*");
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE');
//   next()
// })

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected!'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Use routes
// app.use('/api', productRoutes);
// app.use('/api', shopRoutes); // Use shop routes

// // Start Server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import cors
// const productRoutes = require('./routes/productRoutes');
// const shopRoutes = require('./routes/shopRoutes'); // Import shop routes
// const https = require('https');
// const fs = require('fs');

// const app = express();
// const port = process.env.PORT || 3000;

// // Use cors middleware to handle CORS policy
// app.use(cors({
//     origin: 'https://localhost:5173', // Allow requests from this origin
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
// }));

// // Middleware
// app.use(bodyParser.json({ limit: '50mb' }));  // Increase limit to 50MB (you can adjust this based on your needs)
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected!'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const key = fs.readFileSync('localhost+2-key.pem');
// const cert = fs.readFileSync('localhost+2.pem');

// // Use routes
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', productRoutes);
// app.use('/api', shopRoutes); // Use shop routes

// // Start Server
// // app.listen(port, () => {
// //     console.log(`Server running on port ${port}`);
// // });

// https.createServer({ key, cert }, app).listen(port, () => {
//     console.log(`Secure server running on https://localhost:${port}`);
// });



// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const productRoutes = require('./routes/productRoutes');
// const shopRoutes = require('./routes/shopRoutes');
// const https = require('https');
// const fs = require('fs');
// const path = require('path'); // Add path module

// const app = express();
// const port = process.env.PORT || 3000;

// // Use cors middleware to handle CORS policy
// app.use(cors({
//     origin: 'https://localhost:5173', // Allow requests from this origin
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
// }));

// // Middleware
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected!'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Serve static files from uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Correct usage of static middleware

// // Use routes
// app.use('/api', productRoutes);
// app.use('/api', shopRoutes);

// const key = fs.readFileSync('localhost+2-key.pem');
// const cert = fs.readFileSync('localhost+2.pem');

// // Start Secure HTTPS Server
// https.createServer({ key, cert }, app).listen(port, () => {
//     console.log(`Secure server running on https://localhost:${port}`);
// });



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const shopRoutes = require('./routes/shopRoutes');
const app = express();
const port = process.env.PORT || 3001;  // NGINX will forward HTTP traffic here
const path = require('path'); // Add path module
const scanRoutes = require('./routes/scanRouter'); 

// Use cors middleware to handle CORS policy
app.use(cors({
    origin: 'https://scan.h7tex.com', // Allow requests from your front-end domain
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api', productRoutes);
app.use('/api', shopRoutes);
app.use('/api', scanRoutes);

// Start HTTP Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
