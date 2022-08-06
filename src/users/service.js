const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");

const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getByID = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const updateUser = async (id, product) => {
  const collection = await Database(COLLECTION);
  const options = { upsert: true };
  const updateCollection = {
    $set: {
      ...product,
    },
  };
  let result = await collection.updateOne(
    { _id: ObjectId(id) },
    updateCollection,
    options
  );
  return result;
};

const deleteUser = async (id) => {
  const collection = await Database(COLLECTION);
  const query = { _id: ObjectId(id) };
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) {
    return "Successfully deleted one document.";
  } else {
    return "No documents matched the query. Delete 0 documents.";
  }
};

module.exports.UsersService = {
  getAll,
  getByID,
  create,
  updateUser,
  deleteUser,
};
