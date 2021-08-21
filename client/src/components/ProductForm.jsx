import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ProductForm = (props) => {
  const [variant, setVariant] = useState(1);
  const [product, setProduct] = useState(() => {
    return {
      product_name: props.product ? props.product.product_name : "",
      product_description: props.product
        ? props.product.product_descriprion
        : "",
      size: props.product ? props.product.size : 0,
      quantity: props.product ? props.product.quantity : 0,
      price: props.product ? props.product.price : 0,
      color: props.product ? props.product.color : "",
      images: props.product ? props.product.images : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const {
    product_name,
    product_description,
    size,
    color,
    quantity,
    images,
    price,
  } = product;

  const addVariant = (count) => {
    setVariant(count + 1);
  };

  const removeVariant = (count) => {
    setVariant(count - 1);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [
      product_name,
      product_description,
      size,
      color,
      quantity,
      images,
      price,
    ];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const product = {
        product_name,
        product_description,
        sizeOpt: Number(size),
        color,
        quantityOpt: Number(quantity),
        images,
        priceOpt: Number(price),
      };
      props.handleOnSubmit(product);
    } else {
      errorMsg = "Please fill out all the fields.";
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "quantity":
        if (value === "" || parseInt(value) === +value) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      case "size":
        if (value === "" || parseInt(value) === +value) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      case "price":
        if (value === "" || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setProduct((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  return (
    <div className="container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <h2>Admin CMS &nbsp;&raquo;&nbsp;Add More Products</h2>

      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="product_name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="product_name"
            value={product_name}
            placeholder="Enter name of product"
            onChange={handleInputChange}
            style={{ width: "500px" }}
          />
        </Form.Group>
        <Form.Group controlId="product_description">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="product_description"
            value={product_description}
            placeholder="Enter Product Description"
            onChange={handleInputChange}
            style={{ width: "500px" }}
          />
        </Form.Group>

        <h4>
          <strong>Product Variants</strong>
        </h4>
        <Button
          className="pull-right"
          style={{ width: "180px" }}
          variant="danger"
          onClick={() => addVariant(variant)}
        >
          <i className="fa fa-plus"></i> Add Variant
        </Button>
        {[...Array(variant)].map((x, i) => (
          <div key={`inline-${i}`} className="mb-3">
            <div className="row">
              <div className="spacer-sm"></div>
              <div className="col-md-2">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="size"
                  value={size}
                  placeholder="Enter Size of Variant"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-1">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="quantity"
                  value={quantity}
                  placeholder="Enter Quantity for Variant"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="price"
                  value={price}
                  placeholder="Enter Price for Variant"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="color"
                  value={color}
                  placeholder="Enter Color for Variant"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <Form.Label>
                  ( <small>Seperate image with comma</small>)
                </Form.Label>
                <Form.Control
                  className="input-control"
                  type="text"
                  name="images"
                  value={images}
                  placeholder="Enter Images for Variant"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-1">
                <Button
                  style={{ width: "120px" }}
                  variant="danger"
                  onClick={() => removeVariant(variant)}
                >
                  <i className="fa fa-minus"></i> Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          variant="primary"
          type="submit"
          className="submit-btn"
          style={{ width: "260px" }}
        >
          Submit New Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
