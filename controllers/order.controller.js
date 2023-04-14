const Product = require("../models/product.model");
const Address = require("../models/address.model");
const Order = require("../models/order.model");

const createOrder = async (req, res) => {
    try{
        const { productId, addressId, quantity = 1 } = req.body;
        if(!productId || !addressId){
            return res.status(400).end('Bad request!');
        }
    
        const product = await Product.findOne({ _id: productId });
        if(!product){
            return res.status(400).end(`No Product found for ID - ${productId}!`);
        }
    
        const address = await Address.findOne({ _id: addressId });
        if(!address){
            return res.status(400).end(`No Address found for ID - ${addressId}!`);
        }
    
        if(!product.availableItems || product.availableItems < quantity){
            return res.status(404).end(`Product with ID - ${productId} is currently out of stock!`);
        }
    
        const order = new Order({
            productId,
            addressId,
            quantity
        });
    
        const orderRec = await order.save();
        const response = {            
            ...orderRec._doc,
            amount: orderRec.quantity * product.price,
            address,
            product
        }
        return res.status(200).json(response);    
    } catch (err) {
        return res.status(400).end(err.message);
    }
}

module.exports = { createOrder };