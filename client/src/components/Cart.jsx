import React, { useEffect, useContext } from "react";
import _ from "lodash";
import Numeral from "react-numeral";
import BasketContext from "../context/BasketContext";
let mounted = true;

const Cart = () => {
  const { basket, setBasket } = useContext(BasketContext);

  useEffect(() => {
    if (mounted) {
      console.info(basket);
    }
    return () => (mounted = false);
  }, [basket]);

  return (
    <div className="container-fluid">
      <h2>Your Shopping Basket</h2>
      <div className="spacer-lg"></div>
      <div className="shopping-cart">
        <div className="column-labels">
          <label className="product-details">Product</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
        </div>
        <div className="spacer-sm"></div>

        {!_.isEmpty(basket) ? (
          basket.map((item, key) => (
            <>
              <div className="product ">
                <div className="product-image ">
                  <img
                    src="https://via.placeholder.com/240x240/FF0000/000000"
                    alt=""
                  />
                </div>
                <div className="product-details ">
                  <div className="product-title">{item.product_name}</div>
                  <p className="product-description">
                    {item.product_description}
                  </p>
                </div>
                <div className="product-price ">
                  <h4>
                    {" "}
                    &#8358;{" "}
                    <Numeral
                      value={item.product_varieties[0].price}
                      format={"0,0.00"}
                    />
                  </h4>
                </div>
                <div className="product-quantity ">
                  <input type="number" value="2" min="1" />
                </div>
                <div className="product-removal ">
                  <button className="remove-product btnx">Remove</button>
                </div>
                <div className="product-line-price" style={{ paddingLeft: 40 }}>
                  <h4>
                    {" "}
                    &#8358;{" "}
                    <Numeral
                      value={item.product_varieties[0].price}
                      format={"0,0.00"}
                    />
                  </h4>
                </div>
              </div>
              <div className="spacer"></div>
            </>
          ))
        ) : (
          <div className="col-md-12">
            <p className="load-text">
              <i className="fa fa-fa-cart-plus"></i> Your Basket is empty
            </p>
          </div>
        )}

        <div className="spacer"></div>
        <div className="totals">
          <div className="totals-item">
            <table class="table table-responsive table-hover" width="100%">
              <th width="70%"></th>
              <th width="10%"></th>
              <th width="20%"></th>
              <tr>
                <td></td>
                <td>SubTotal:</td>
                <td>
                  <h4>
                    <strong>
                      {" "}
                      &#8358; <Numeral value={79.4} format={"0,0.00"} />
                    </strong>
                  </h4>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Tax (5%)</td>
                <td>
                  <h4>
                    <strong>
                      {" "}
                      &#8358; <Numeral value={3.6} format={"0,0.00"} />
                    </strong>
                  </h4>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Shipping</td>
                <td>
                  <h4>
                    <strong>
                      {" "}
                      &#8358; <Numeral value={15} format={"0,0.00"} />
                    </strong>
                  </h4>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Grand Total</td>
                <td>
                  <h4>
                    <strong>
                      {" "}
                      &#8358; <Numeral value={9073} format={"0,0.00"} />
                    </strong>
                  </h4>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
