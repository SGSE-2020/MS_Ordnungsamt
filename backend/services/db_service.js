var MongoClient = require('mongodb').MongoClient;

var MONGODB_URL = "mongodb://localhost:27017/";
var MONGODB_DATABASE = "oamt";

let database = null;

exports.initialize = () => {
    MongoClient.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(client => {
        database = client.db(MONGODB_DATABASE);
        console.log("Database service started!");
    })
    .catch(console.error)  
}

exports.getDB = () => {
    return database;
};

exports.log = (type, msg) => {
    database.collection("log").insertOne({type: type, timestamp: new Date().toISOString(), msg: msg});
};