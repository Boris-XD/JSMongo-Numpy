const express = require('express');
const debug = require('debug')('app:main.js');
const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require("./src/users/index");

const { Config } = require('./src/config/index');

const app = express();

app.use(express.json());


//Modulos
ProductsAPI(app);
UsersAPI(app);

app.listen(Config.port, () => {
    debug(`Servidor escuhando en el puerto ${Config.port}`);
});