import React, { useContext } from "react";
import ProductForm from "./ProductForm";
import ProductsContext from "../context/ProductsContext";
import ProductDataService from "../services/product.Service";

const AddProduct = ({ history }) => {
  const { products, setProducts } = useContext(ProductsContext);

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
      productName: product_name,
      description: product_description,
      variants: product_varieties,
    };
    console.info(productData);
    ProductDataService.create(productData).then((odata) => {
      console.info(odata);
      let dataStack = [odata.data];
      setProducts([...dataStack]);
      history.push("/admin");
    });
  };

  return (
    <React.Fragment>
      <ProductForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddProduct;
