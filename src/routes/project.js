const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');


// @route   POST /users/addProject 
// @desc    add project
// @access  Private
router.post('/addProject', auth, async (req, res) => {

        //before saving new project, attach owner field
        const project = new Project({
        ...req.body,
        owner: req.user._id
        });

        try {
            await project.save();
            res.status(201).send(project);
        } catch (e) {
            res.status(400).send(e);
        }
});


// @route   GET 
// @desc    Get user's projects 
// @access  Private
router.get('/myprojects', auth, async (req, res) => {

    try {
        const projects = await Project.find({ owner: req.user.id });
        res.status(200).send(projects);
    } catch (e) {
        res.status(400).send(e);
    }
});

// @route   DELETE 
// @desc    delete a project
// @access  Private
router.delete('/delete/:id', auth, async (req, res) => {

    try {
        await Project.findByIdAndDelete(req.params.id);
        res.send('Successfully deleted project');
    } catch (e) {
        res.status(500).send('Unble to delete project');
    }
});




module.exports = router;