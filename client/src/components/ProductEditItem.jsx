import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductsContext from "../context/ProductsContext";
import ProductDataService from "../services/product.Service";

const ProductEditItem = ({ history }) => {
  const { products, setProducts } = useContext(ProductsContext);
  const { id } = useParams();
  const productToEdit = products.find((product) => product.id === id);
  console.info(productToEdit);

  const handleOnSubmit = (product) => {
    let product_varieties = [];
    const {
      product_name,
      product_description,
      sizeOpt,
      color,
      quantityOpt,
      images,
      priceOpt,
    } = product;
    let imgArray = images.split(",");
    product_varieties = [
      {
        size: sizeOpt,
        color,
        quantity: quantityOpt,
        price: priceOpt,
        images: imgArray,
      },
    ];
    const productData = {
      id,
      productName: product_name,
      description: product_description,
      variants: product_varieties,
    };
    console.info(productData);
    ProductDataService.update(id, productData).then((odata) => {
      console.info(odata);
      let dataUpdated = odata.data;
      const filteredProducts = products.filter(
        (dataUpdated) => dataUpdated.id !== id
      );
      setProducts([dataUpdated, ...filteredProducts]);
      history.push("/admin");
    });
  };

  return (
    <div>
      <ProductForm product={productToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};
export default ProductEditItem;
