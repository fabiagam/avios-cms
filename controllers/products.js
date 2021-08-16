/*************************************
 * Products Controller
 * @file: controllers/products.js
 * @author: James Abiagam
 ************************************/
"use  strict";
const Joi = require("joi");
const productHelper = require("../helpers/product");
const Constants = require("../constants/constants");
const { ERROR_OCCURED, PRODUCT } = Constants;

exports.addProduct = async (req, res) => {
  const { productName, description, variants } = req.body;
  const schema = Joi.object().keys({
    productName: Joi.string().required(),
    description: Joi.string().required(),
    variants: Joi.array().items(
      Joi.object()
        .keys({
          size: Joi.number().integer().required(),
          color: Joi.string().required(),
          quantity: Joi.number().integer().required(),
          images: Joi.array().items(Joi.string()).required(),
          price: Joi.number().integer().required(),
        })
        .required()
    ),
  });
  const validation = Joi.validate(req.body, schema);
  if (validation.error) {
    return res.status(400).json({
      success: false,
      error: validation.error.details[0].message,
    });
  }
  try {
    const check = await productHelper.findProduct(productName);
    if (check.success) {
      return res.status(200).json({
        success: true,
        message: check.message,
        data: [],
      });
    }
    const result = await productHelper.makeProductEntry({
      productName,
      description,
      variants,
    });
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: PRODUCT.NEWLY_ADDED,
      data: result.data,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).json({
      success: false,
      error: ERROR_OCCURED,
    });
  }
};
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productHelper.getSingleProduct(id);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: PRODUCT.FOUND_RECORD,
      data: result.data,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).json({
      success: false,
      error: ERROR_OCCURED,
    });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const result = await productHelper.getAllProducts();
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: PRODUCT.FOUND_RECORD,
      data: result.data,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).json({
      success: false,
      error: ERROR_OCCURED,
    });
  }
};
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, description, variants } = req.body;
  try {
    const result = await productHelper.updateProductById({
      id,
      productName,
      description,
      variants,
    });
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: PRODUCT.UPDATED_SUCCESSFULLY,
      data: result.data,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).json({
      success: false,
      error: ERROR_OCCURED,
    });
  }
};

exports.removeVariant = async (req, res) => {
  const { id } = req.params;
  const { variant } = req.body;
  try {
    const result = await productHelper.updateVariantById({
      id,
      variant,
    });
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }
    return res.status(200).json({
      success: true,
      message: PRODUCT.UPDATED_SUCCESSFULLY,
      data: result.data,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).json({
      success: false,
      error: ERROR_OCCURED,
    });
  }
};

exports.removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productHelper.removeProductById(id);
    return res.status(200).json({
      success: true,
      message: PRODUCT.REMOVED_SUCCESSFULLY,
    });
  } catch (err) {
    console.info(err);
    return res.status(500).json({
      success: false,
      error: ERROR_OCCURED,
    });
  }
};
