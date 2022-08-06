const { application } = require("express");
const { UsersController } = require("./controller");

const express = require("express");

const router = express.Router();

module.exports.UsersAPI = (app) => {
  router
    .get("/", UsersController.getUsers) //http://localhost:300/api/products/
    .get("/:id", UsersController.getUser) //http://localhost:300/api/products/23
    .post("/", UsersController.createUser)
    .patch("/:id", UsersController.updateUser)
    .delete("/:id", UsersController.deleteUser);
  app.use("/api/users", router);
};
