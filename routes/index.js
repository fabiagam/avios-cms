/***************************************
 * App Routes
 * @file: routes/index.js
 * @author: James N. Abiagam
 *****************************************/
"use strict";
const products = require("../controllers/products");

module.exports = (app) => {
  app.post("/avios/product", products.addProduct); // Add product
  app.get("/avios/product/:id", products.getProduct); // Get single product
  app.get("/avios/products", products.allProducts); // get all products
  app.put("/avios/product/update/:id", products.updateProduct); // Update product record
  app.delete("/avios/product/delete/:id", products.removeProduct); // Delete product with variants
  app.put("/avios/variant/delete/:id", products.removeVariant); // Delete Product variants
};
