const appName = require('path').resolve(__dirname, '../../').split('/').slice(-1)[0];
const { MongoClient } = require('mongodb');
const MONGO_URI = `mongodb://localhost:27017/${appName}`;

const dbCollection = (collection) => 
  MongoClient.connect(MONGO_URI, { useNewUrlParser: true })
    .then(client => client.db(appName).collection(collection));

module.exports = dbCollection;