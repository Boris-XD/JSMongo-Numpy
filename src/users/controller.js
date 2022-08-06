const debug = require("debug")("app:module-products-controller");
const { Response } = require("../common/response");
const { UsersService } = require("./service");
const createError = require("http-errors");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getByID(id);
      if (!user) {
        Response.error(res, createError(404, "Document not found"));
      } else {
        Response.success(res, 200, `User ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "User agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      res.status(500).json({
        message: "Internal server error when we try create a product",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.updateUser(id, body);
        Response.success(res, 201, "User actualizado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      if (!id) {
        Response.error(res, new createError.BadRequest());
      } else {
        const result = await UsersService.deleteUser(id);
        Response.success(res, 200, `Producto ${id}`, result);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
