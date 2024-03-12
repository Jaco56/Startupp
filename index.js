const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const apiRouter = express.Router();

app.use(express.static('public'));
app.use(express.json());

const users = [
    { username: 'jaco', password: 'password1', squatMax: '500 Lbs', benchMax: '405 lbs', deadliftMax: '505 Lbs' },
    { username: 'user2', password: 'password2', squatMax: '400 Lbs', benchMax: '300 Lbs', deadliftMax: '450 Lbs' }
];

apiRouter.put('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful', username: username });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

apiRouter.get('/user/maxes', (req, res) => {
    const loggedInUsername = req.query.username;

    const user = users.find(user => user.username === loggedInUsername);
    if (user) {
        res.json({
            squatMax: user.squatMax,
            benchMax: user.benchMax,
            deadliftMax: user.deadliftMax
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.use('/api', apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 4000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
