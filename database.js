const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const dbName = 'bulk_buddy';
const userCollectionName = 'users';

async function initializeDB() {
    try {
        await client.connect();
        await client.db().command({ ping: 1 });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Unable to connect to database with ${url} because ${error.message}`);
        process.exit(1);
    }
}

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username: username,
        password: hashedPassword
    };
    const db = client.db(dbName);
    const collection = db.collection(userCollectionName);
    await collection.insertOne(newUser);
}

async function loginUser(username, password) {
    const db = client.db(dbName);
    const collection = db.collection(userCollectionName);
    const user = await collection.findOne({ username: username });
    if (!user) {
        return null; // User not found
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return null; // Incorrect password
    }
    return user; // Return user data if login successful
}


module.exports = {
    initializeDB,
    createUser,
    loginUser,
};
