/***************************************
 * Product Model
 * @file: models/Product.js
 * @author: James N. Abiagam
 ****************************************/
"use  strict";

const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "Product",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      product_varieties: {
        type: Sequelize.JSON,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      timestamps: true,
      createdAt: "date_uploaded",
      updatedAt: "date_edited",
      tableName: "products",
    }
  );

  class Product extends Model {
    static async add({ productName, description, variants }) {
      return await product.create({
        product_name: productName,
        product_description: description,
        product_varieties: variants,
      });
    }

    static async getById(id) {
      return await product.findOne({ where: { id: id } });
    }

    static async getByName(name) {
      return await product.findOne({ where: { product_name: name } });
    }

    static async getAll() {
      return await product.findAll({ order: [["date_uploaded", "DESC"]] });
    }

    static async updateById({ id, update }) {
      await product.update(update, { where: { id: id } });
    }

    static async deleteVariant({ id, variant }) {
      try {
        const newDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        await product.update(
          {
            product_varieties: variant,
            date_edited: newDate,
          },
          { where: { id: id } }
        );
        return await product.findOne({ where: { id: id } });
      } catch (error) {
        console.info(error);
        return null;
      }
    }

    static async updateQueryById({ id, productName, description, variants }) {
      try {
        const newVariant = [...variants];
        const newDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        await product.update(
          {
            product_name: productName,
            product_description: description,
            product_varieties: newVariant,
            date_edited: newDate,
          },
          { where: { id: id } }
        );
        return await product.findOne({ where: { id: id } });
      } catch (error) {
        console.info(error);
        return null;
      }
    }

    static async deleteById(id) {
      await product.destroy({ where: { id: id } });
    }
  }

  return Product;
};
