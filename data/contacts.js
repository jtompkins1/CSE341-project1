//routes/contacts.js

const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let contacts;

const initDb = (callback) => {
    if (contacts) {
        console.log('Contacts database is already initialized!');
        return callback(null);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            contacts = client;
            callback(null, contacts);
        })
        .catch((err) => {
            callback(err);
        });
};

const getContacts = () => {
    if (!contacts) {
        throw new Error('Contacts database not initialized')
    }
        return contacts;
};

module.exports = {
    initDb,
    getContacts
};
