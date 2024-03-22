const express = require('express');
const app = express();
const DB = require('./database.js');

app.use(express.json());
app.use(express.static('public'));
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);
DB.initializeDB();

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await DB.loginUser(username, password);
        if (user) {
            res.status(200).send({ message: 'Login successful', user: user });
        } else {
            res.status(401).send({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/api/create-account', async (req, res) => {
    const { username, password } = req.body;
    try {
        await DB.createUser(username, password);
        res.status(201).send({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
