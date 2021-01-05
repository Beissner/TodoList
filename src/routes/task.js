const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');


// @route   POST /api/tasks/addTask 
// @desc    Create new task
// @access  Private
router.post('/addTask', auth, async (req, res) => {

    //before saving new task need to attach owner field (which is required in model)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});


// @route   GET /api/tasks/mytasks/<projectTitle> 
// @desc    Get user's tasks 
// @access  Private
router.get('/mytasks/:projectTitle', auth, async (req, res) => {

    try {
       
        const title = req.params.projectTitle;
        const tasks = await Task.find({ owner: req.user.id,  project: title});

        res.status(200).send(tasks);
    } catch (e) {
        res.status(400).send(e);
    }
});

// @route   PATCH /api/tasks/update/<id> 
// @desc    Update a task
// @access  Private
router.patch('/update/:id', auth, async (req, res) => {

    // TODO implement custom error messages

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(201).send(updatedTask);
    } catch (e) {
        res.status(400).send(e);
    }
});

// @route   DELETE /api/tasks/delete/<id> 
// @desc    delete a task
// @access  Private
router.delete('/delete/:id', auth, async (req, res) => {

    try {
        await Task.findByIdAndDelete(req.params.id);
        res.send('Successfully deleted task');
    } catch (e) {
        res.status(500).send('Unble to delete task');
    }
});


module.exports = router;