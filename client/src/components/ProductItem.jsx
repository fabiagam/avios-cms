import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import ProductsContext from "../context/ProductsContext";
import BasketContext from "../context/BasketContext";
import Numeral from "react-numeral";
let mounted = true;

const ProductItem = () => {
  const history = useHistory();
  const { id } = useParams();
  const { products, setProducts } = useContext(ProductsContext);
  const { basket, setBasket } = useContext(BasketContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (mounted) {
      setProducts();
      let productData = products.find((product) => product.id === id);
      console.info(productData);
      setData(productData);
    }
    return () => (mounted = false);
  }, [id, setProducts, products]);

  const addToCart = (id) => {
    // const item = products.find((product) => product.id === id);
  };

  return (
    <Card style={{ width: "18rem" }} className="book">
      <Card.Body>
        <Card.Title className="book-title">{data.product_name}</Card.Title>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {" "}
              <p>Description: {data.product_description}</p>
            </div>
          </div>
          <h5>Varieties:</h5>d
          <div className="row">
            {!_.isEmpty(data.product_varieties) ? (
              data.product_varieties.map((item, key) => (
                <div className="col-md-2" key={key}>
                  <p>
                    {" "}
                    <img
                      src="https://via.placeholder.com/240x240/FF0000/000000"
                      alt="Product"
                      className="thumbnail"
                      style={{ width: 59, height: 58 }}
                    />
                  </p>
                  <div>Quantity: {item.quantity} </div>
                  <div>
                    Price:{" "}
                    <strong>
                      &#8358; <Numeral value={item.price} format={"0,0.00"} />
                    </strong>{" "}
                    {item.price}{" "}
                  </div>
                  <div>Color: {item.color} </div>
                  <div>Images: {item.images.map().join(",")}</div>
                </div>
              ))
            ) : (
              <div className="col-md-12">
                <p className="load-text">
                  <i className="fa fa-spinner fa-spin"></i> Loading Shop
                  Products...
                </p>
              </div>
            )}
          </div>
        </div>

        <Button variant="danger" onClick={() => addToCart(id)}>
          Add to Baket
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
