const excelGenerator = (products, res) => {
  const xl = require("excel4node");

  products = products.map((product) => {
    let id = product._id.toString();
    delete product._id;
    return {
      id,
      ...products,
    };
  });
};

module.exports.ProductUtils = {
  excelGenerator,
};
