const Address = require("../models/address.model");

const address = async (req, res) => {
    const addressRec =  new Address({ ...req.body });
    let addressObj;
    try{
        addressObj = await addressRec.save();
    } catch(err) {
        return res.status(400).end(err.message);
    }
    return res.status(200).json({...addressObj._doc, user: req.user});
}

module.exports = {
    address
}
