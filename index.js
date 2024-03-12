const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

const users = [
    { username: 'jaco', password: 'password1', squatMax: '500 Lbs', benchMax: '405 lbs', deadliftMax: '505 Lbs' },
    { username: 'user2', password: 'password2', squatMax: '400 Lbs', benchMax: '300 Lbs', deadliftMax: '450 Lbs' }
];

app.put('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful', username: username });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.get('/api/user/maxes', (req, res) => {
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
