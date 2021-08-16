/***************************************
 * Product Helper
 * @file: helpers/product.js
 * @author: James N. Abiagam
 ****************************************/
"use  strict";
require("dotenv").config();
const moment = require("moment-timezone");
const Constants = require("../constants/constants");
const { Product } = require("../models");
const { PRODUCT } = Constants;

const makeProductEntry = async ({ productName, description, variants }) => {
  try {
    const check = await Product.getByName(productName);
    if (check) {
      return { succes: false, error: PRODUCT_EXISTS };
    }
    const result = await Product.add({ productName, description, variants });
    if (!result) {
      return { succes: false, error: PRODUCT.UNABLE_TO_ADD };
    }
    if (result) {
      return { success: true, data: result };
    }
  } catch (error) {
    console.info(error);
    return { succes: false, error: error.message };
  }
};

const findProduct = async (name) => {
  try {
    const result = await Product.getByName(name);
    if (result) {
      return { succes: true, message: PRODUCT.PRODUCT_EXISTS };
    }
    if (!result) {
      return { success: false, error: "Product does not already exist" };
    }
  } catch (error) {
    console.info(error);
    return { succes: false, error: error.message };
  }
};

const getSingleProduct = async (id) => {
  try {
    const result = await Product.getById(id);
    if (!result) {
      return { succes: false, error: PRODUCT.NOT_FOUND };
    }
    if (result) {
      return { success: true, data: result };
    }
  } catch (error) {
    console.info(error);
    return { succes: false, error: error.message };
  }
};

const getAllProducts = async () => {
  try {
    const result = await Product.getAll();
    if (!result) {
      return { succes: false, error: PRODUCT.NOT_FOUND };
    }
    if (result) {
      return { success: true, data: result };
    }
  } catch (error) {
    console.info(error);
    return { succes: false, error: error.message };
  }
};

const updateProductById = async ({
  id,
  productName,
  description,
  variants,
}) => {
  try {
    const result = await Product.updateQueryById({
      id,
      productName,
      description,
      variants,
    });
    if (!result) {
      return { success: false, error: PRODUCT.UNABLE_TO_UPDATE };
    }
    if (result) {
      return { success: true, data: result };
    }
  } catch (error) {
    console.info(error);
    return { success: false, error: error.message };
  }
};

const updateVariantById = async ({ id, variant }) => {
  try {
    const result = await Product.deleteVariant({
      id,
      variant,
    });
    if (!result) {
      return { success: false, error: PRODUCT.UNABLE_TO_DELETE_VARIANT };
    }
    if (result) {
      return { success: true, data: result };
    }
  } catch (error) {
    console.info(error);
    return { success: false, error: error.message };
  }
};

const removeProductById = async (id) => {
  try {
    await Product.deleteById(id);
    return { success: true };
  } catch (error) {
    console.info(error);
    return { succes: false, error: error.message };
  }
};

module.exports = {
  makeProductEntry,
  getSingleProduct,
  getAllProducts,
  updateProductById,
  removeProductById,
  updateVariantById,
  findProduct,
};
