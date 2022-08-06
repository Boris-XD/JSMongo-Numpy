const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const { ProductUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getByID = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const updateProduct = async (id, product) => {
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

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);
  const query = { _id: ObjectId(id) };
  const result = await collection.deleteOne(query);
  if (result.deletedCount === 1) {
    return "Successfully deleted one document.";
  } else {
    return "No documents matched the query. Delete 0 documents.";
  }
};

const generateReport = async (name, resp) => {
  const products = await getAll();
  const report = await ProductUtils.excelGenerator(products, name, resp);
};

module.exports.ProductsService = {
  getAll,
  getByID,
  create,
  generateReport,
  updateProduct,
  deleteProduct,
};
