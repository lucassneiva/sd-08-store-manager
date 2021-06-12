const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGODB_URL = 'mongodb://mongodb:27017/StoreManager';
// const MONGODB_URL = 'mongodb://localhost:27017/StoreManager';
const OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

let db = null;
const connection = () => {
	if (db) {
		return Promise.resolve(db);
	}
	return MongoClient.connect(MONGODB_URL, OPTIONS)
		.then((conn) => {
			db = conn.db(DB_NAME);
			return db;
		});
};

module.exports = connection;
