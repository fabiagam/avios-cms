import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Numeral from "react-numeral";

const Shop = ({ id, product_varieties, product_name, addToCart }) => {
  let price = product_varieties[0].price;
  return (
    <>
      <div className="col-md-4" key={id}>
        <div className="media d-block d-sm-flex text-center text-sm-left">
          <Link className="cart-item-thumb mx-auto mr-sm-4" to={"#"}>
            <img
              src="https://via.placeholder.com/240x240/FF0000/000000"
              alt="Product"
              className="thumbnail"
            />
          </Link>
          <div className="media-body pt-3">
            <h3 className="product-card-title font-weight-semibold border-0 pb-0 high3">
              <Link to={`/products`}>{product_name}</Link>
            </h3>
            <h5 className="price">
              Price : &nbsp;{" "}
              <strong>
                &#8358; <Numeral value={price} format={"0,0.00"} />
              </strong>
            </h5>
            <p>
              <Button
                style={{ width: "120px" }}
                variant="danger"
                onClick={() => addToCart(id)}
              >
                Add ToCart
              </Button>
            </p>
            <div className="spacer"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
