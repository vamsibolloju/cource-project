
const jwt = require('jsonwebtoken'); 
const User = require('../models/auth.model');
const secretKey = 'secretkey';

module.exports = async (req, res, next) => {
    try{
        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.data;
        let user;
        if(token){
            user = await User.findOne({ _id: userId });
        }
        if(!token || !user){
            return res.status(401).end('Please login first to access this endpoint!');
        }

        req.user = user;
        next();    
    } catch (err){
        return res.status(401).end('Please login first to access this endpoint!');
    }
}
