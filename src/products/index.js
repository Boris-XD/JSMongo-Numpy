const { application } = require("express");
const { ProductsController } = require("./controller");

const express = require("express");

const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts) //http://localhost:300/api/products/
    .get("/:id", ProductsController.getProduct) //http://localhost:300/api/products/23
    .post("/", ProductsController.createProduct);

  app.use("/api/products", router);
};
