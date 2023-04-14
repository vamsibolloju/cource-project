const Product = require("../models/product.model");

const getProducts = async (req, res) => {
    const products = Product.find({});
    return res.status(200).json({ content: products });
}

const getProductCategories = async (req, res) => {
    try{
        const categories = await Product.find({ }, { category: 1, _id: 0 });
        return res.status(200).json(categories.map(p => p.category));    
    } catch(err) {
        return res.status(500).end(err.message);
    }
}

const getProductById = async (req, res) => {
    try{
        const product = await Product.findOne({ _id: req.params.id });
        return res.status(200).json(product)    
    } catch(err) {
        return res.status(500).end(err.message);
    }
}

const saveProduct = async (req, res) => {
    try{
        const product = new Product(req.body);
        const productRec = await product.save();
        return res.status(200).json(productRec);    
    } catch(err){
        return res.status(400).end(err.message);
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = req.body;
        await Product.findOneAndUpdate({ _id: req.params.id }, product);
        const updatedRec = await Product.findOne({ _id: req.params.id })
        return res.status(200).json(updatedRec);    
    } catch(err) {
        return res.staus(500).end(err.message);
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const response = await Product.deleteOne({ _id: productId })
    console.log(response);
    if(response.deletedCount === 1){
        return res.status(200).end(`Product with ID - ${productId} deleted successfully!`)
    } else {
        return res.status(200).end(`No Product found for ID - ${productId}!`)
    }
}

module.exports = {
    getProducts,
    getProductCategories,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
}