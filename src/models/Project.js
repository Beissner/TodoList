const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Inbox',
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;