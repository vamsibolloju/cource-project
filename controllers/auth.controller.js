const Users = require("../models/auth.model");
var jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = 'secretkey';

const signUp = async (req, res) => {
    const user = req.body;
    if(!user.email){
        return res.status(400).end("Invalid data")
    }
    try {
        const existingUser = await Users.findOne({ email: user.email });
        if(existingUser){
            return res.status(400).end('Try any other email, this email is already registered!');            
        }
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;

        const userRecord = new Users(user);
        const userObj = await userRecord.save(user);
        const { firstName, lastName, email, contactNumber } = userObj;
        return res.status(200).json({ firstName, lastName, email, contactNumber });
    } catch(err) {
        /*
        if(err.errors){
            console.log(err);
        };
        */
        return res.status(500).end(err.message);
    }
}

const auth = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await Users.findOne({ email });
    if(userFound){
        const compare = bcrypt.compareSync(password, userFound.password);
        if(compare){
            const token = jwt.sign({
                data: userFound._id
              }, secretKey, { expiresIn: '24h' });
            res.set('x-auth-token', token);
            return res.status(200).json({
                email: email,
                name: userFound.firstName + " " + userFound.lastName,
                isAuthenticated: true
            });
        } else {
            return res.status(400).end('Invalid Credentials!');

        }
    } else {
        return res.status(404).end('This email has not been registered!');
    }
}

module.exports = {
    signUp,
    auth
}

