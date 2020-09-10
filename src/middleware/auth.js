const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');


const auth = async (req, res, next) => {
    try {
        //get token that is coming from client
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, config.get('jwt'));

        //check if a user exists with this id and token
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
        
        if (!user) {
            throw new Error();
        }

        //identify which token being used (if user is logged into multiple devices)
        req.token = token;

        //since we already fetched the user will add it to the user object so the route handler can user it
        req.user = user;
        next();

    } catch (e) {
        res.status(401).send('Unable to authenticate user');
    }
};

module.exports = auth;