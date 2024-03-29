const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./websoc.js');

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


secureApiRouter.post('/user/maxes', async (req, res) => {
    const { username } = req.body;
    try {
        const maxesData = await DB.getMaxes(username);
        if (!maxesData) {
            res.status(404).json({ message: 'Maxes data not found' });
            return;
        }
        res.status(200).json({
            message: 'Maxes retrieved successfully',
            maxes: maxesData
        });
    } catch (error) {
        console.error('Error fetching user maxes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/user/updateMaxes', async (req, res) => {
    const { username, squatMax, benchMax, deadliftMax } = req.body;
    try {
        const updatedUser = await DB.updateUserMaxes(username, { squatMax, benchMax, deadliftMax });
        
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.status(200).json({
            message: 'Maxes updated successfully',
            maxes: {
                squatMax: updatedUser.squatMax,
                benchMax: updatedUser.benchMax,
                deadliftMax: updatedUser.deadliftMax
            }
        });
    } catch (error) {
        console.error('Error updating user maxes:', error);
        res.status(500).json({ message: 'Internal server error' });
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

app.post('/api/check-username', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await DB.findUserByUsername(username);
        if (user) {
            res.status(400).send('Username already exists');
        } else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).send('Internal server error');
    }
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
//const port = process.env.PORT || 4000;
//app.listen(port, () => {
    //console.log(`Server is running on port ${port}`);
//});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  peerProxy(httpService);
