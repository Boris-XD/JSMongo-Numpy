const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");

const { Config } = require("../config/index");

let connection = null;
module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug("Nueva conexion realizada a Mongo Atlas");
      }
      debug("Reutilizando conexion");
      const db = connection.db(Config.mongoDbName);
      resolve(db.collection(collection));
    } catch (error) {
      reject(error);
    }
  });
