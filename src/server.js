const express = require('express');
const connectDB = require('./database/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// init middleware (allows access to req.body)
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('api running'));

// Define Routes
app.use('/users', require('./routes/user'));
app.use('/tasks', require('./routes/task'));
app.use('/projects', require('./routes/project'));

// serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));