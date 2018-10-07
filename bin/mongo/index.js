const appName = require('path').resolve(__dirname, '../../').split('/').slice(-1)[0];
const { MongoClient } = require('mongodb');
let { MONGO_URI } = require('../../config/db.config.js');
MONGO_URI = MONGO_URI || `mongodb://localhost:27017/${appName}`;

console.log(MONGO_URI);
const dbCollection = (collection) => 
  MongoClient.connect(MONGO_URI, { useNewUrlParser: true })
    .then(client => client.db(appName).collection(collection));

module.exports = dbCollection;