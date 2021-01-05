const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// @route   POST /api/users/register 
// @desc    Register and login a user
// @access  Public
router.post('/register', async (req, res) => {

    //check if user already exists
    let userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
        res.status(400).send('Unable to register. User already exists.');
    } else {

        const user = new User(req.body);

        try {
            await user.save();

            //generate web auth token and save it to user 
            const token = await user.generateAuthToken();

            res.status(201).send({ user, token });

        } catch (e) {
            res.status(400).send(e);
        }

    }
});


// @route   POST /api/users/login 
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {

    try {

        //findByCredentials is a custom function we added to the model - if can't login user, will stop here
        const user = await User.findByCredentials(req.body.email, req.body.password);

        //generate web auth token and saves it to user 
        const token = await user.generateAuthToken();

        res.send({ user, token });

    } catch (e) {
        res.status(401).send('Unable to login user');
    }
});

// @route   POST /api/users/logout 
// @desc    Logout a user
// @access  Private
router.get('/logout', auth, async (req, res) => {

    try {
        //filter out token for active session
        req.user.tokens = req.user.tokens.filter(t => {
            return t.token !== req.token;
        });
        await req.user.save();
        res.send('Logged user out');
    } catch (e) {
        res.status(500).send('Failed to logout user',e);
    }
});


// @route   PATCH /users/update 
// @desc    Update a user
// @access  Private
router.patch('/update', auth, async (req, res) => {

    // TODO implement custom error messages

    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// @route   DELETE /api/users/delete 
// @desc    Delete a user
// @access  Private
router.delete('/delete', auth, async (req, res) => {

    try {
        await req.user.remove();
        //await Task.deleteMany({ owner: req.user._id });
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;