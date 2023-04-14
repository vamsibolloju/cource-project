const express = require('express');
const bodyParser = require('body-parser');

const { signUp, auth } = require("../controllers/auth.controller");
const { address } = require("../controllers/shippingAddress.controller");
const { 
    getProducts,
    getProductCategories,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct } = require("../controllers/product.controller");
const { createOrder } = require("../controllers/order.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authentication
app.post('/signup', signUp);
app.post('/auth', auth);

// add address
app.post('/address', authMiddleware, address);

// product routes
app.get('/products', getProducts);
app.get('/products/categories', getProductCategories);
app.get('/products/:id', getProductById);
app.post('/products', authMiddleware, adminMiddleware, saveProduct);
app.put('/products/:id', authMiddleware, adminMiddleware, updateProduct);
app.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

// order routes
app.post('/orders', createOrder);

module.exports = app;
