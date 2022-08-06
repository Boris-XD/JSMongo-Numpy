const debug = require("debug")("app:module-products-controller");
const { ProductsService } = require("./service");
const { Response } = require("../common/response");
const { createError } = require("http-errors");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getByID(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      res.status(500).json({
        message: "Internal server error when we try create a product",
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.updateProduct(id, body);
        Response.success(res, 201, "Producto actualizado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteProduct:  async (req, res) => {
    try{
      const { params: { id}  } = req;
      if(!id)
      {
        Response.error(res, new createError.BadRequest());
      }else{
        const result = await ProductsService.deleteProduct(id);
        Response.success(res, 200, `Producto ${id}`, result);
      }
    }catch(error){
      debug(error);
      Response.error(res);
    }
  },
  generateReport: async (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
