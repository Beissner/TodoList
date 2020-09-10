const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Task = require('../models/Task');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// middleware - runs before saving new or updating user
// hash password before saving
UserSchema.pre('save', async function (next) {
    const user = this;

    //hash password only if field has changed
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();

});

//  middleware - runs when a user is deleted
UserSchema.pre('remove', async function (next) {
        const user = this;
        await Task.deleteMany({ owner: user._id });
        next();
});

// custom function
UserSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });

    //no user with that email
    if (!user) {
        throw new Error('Unable to login user');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Unable to login user');
    }

    return user;

};

// use regular function to have access to 'this'
UserSchema.methods.generateAuthToken = async function () {
    const user = this;

    //generate json web token
    const token = jwt.sign({ id: user.id }, config.get('jwt'), { expiresIn: 360000 });

    //add token to user
    user.tokens = user.tokens.concat({ token });

    //save to database
    await user.save();

    return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;