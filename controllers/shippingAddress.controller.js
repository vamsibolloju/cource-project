const Address = require("../models/address.model");
const User = require("../models/auth.model");

const address = async (req, res) => {
    const addressRec =  new Address({ ...req.body });
    let addressObj;
    try{
        addressObj = await addressRec.save();
        console.log(addressObj);
    } catch(err) {
        return res.status(400).end(err.message);
    }
    const user = await User.findOne({ _id: req.userId });

    return res.status(200).json({...addressObj});
}

module.exports = {
    address
}