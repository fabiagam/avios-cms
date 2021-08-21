import React, { useState, useEffect, useRef, useContext } from "react";
import _ from "lodash";
import { useHistory, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductDataService from "../services/product.Service";
import Shop from "../components/Shop";
import ProductsContext from "../context/ProductsContext";
import BasketContext from "../context/BasketContext";

const Products = () => {
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { products, setProducts } = useContext(ProductsContext);
  const { basket, setBasket } = useContext(BasketContext);
  const history = useHistory();
  const mounted = useRef(true);

  const addToCart = (id) => {
    let productData = products.find((product) => product.id === id);
    console.info(productData);
    setBasket([productData, ...basket]);
    history.push("/cart");
  };

  useEffect(() => {
    if (!_.isEmpty(data) && !alert) {
      return;
    }
    ProductDataService.getAll().then((odata) => {
      if (mounted.current) {
        if (!odata.success) {
          return setError(odata.error);
        }
        const setAppData = (newData) => {
          setProducts([...newData]);
          setData(products);
        };
        setAppData(odata.data);
      }
    });
    return () => (mounted.current = false);
  }, [alert, data, products, setProducts]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert, mounted]);

  return (
    <>
      <div className="container">
        <h2>Shop &nbsp;&raquo;&nbsp;All Products</h2>
        <div className="col-md-8"></div>
        <div className="col-md-2">
          <Link to={"/cart"} className="btn btnx">
            {" "}
            <i className="fa fa-cart-plus" style={{ color: "#fff" }}></i>
            {"   "}
            {basket.length === 0 ? "Empty" : `${basket.length} item(s)`}
          </Link>
        </div>
        <div className="col-md-2">
          <Button
            style={{ width: "160px" }}
            variant="primary"
            className="pull-right"
            onClick={() => history.push("/cart")}
          >
            {" "}
            View Basket
          </Button>
        </div>

        <div className="spacer-lg"></div>
        <div>
          {error ? <p className="load-text">{error}</p> : <></>}
          <div className="row">
            {!_.isEmpty(products) ? (
              products.map((item, key) => (
                <Shop key={key} {...item} addToCart={addToCart} />
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
          <div className="spacer-lg"></div>
        </div>
      </div>
    </>
  );
};

export default Products;
