const mongoose = require("mongoose");
const User = require("./model");

const MONGO_USERNAME = 'julian';
const MONGO_PASSWORD = 'miseenplace';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'fastlist';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
//const MongoClient = mongodb.MongoClient;//({useUnifiedTopology: true});
function connect() {
    mongoose.connect(url);
    mongoose.connection.on('error', error => console.log(error));
    mongoose.Promise = global.Promise;
    // mongoose.connection.on('connected', () => console.log(mongoose.connection));
}

function getList(listID) {
    return User.findOne({
        id: listID
    });
}

module.exports = {
    connect: connect
};