import React, { useState, useEffect, useRef, useContext } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductDataService from "../services/product.Service";
import AllProducts from "../components/AllProducts";
import ProductsContext from "../context/ProductsContext";

const Admin = () => {
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { products, setProducts } = useContext(ProductsContext);
  const history = useHistory();
  const mounted = useRef(true);

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    ProductDataService.delete(id).then((odata) => {
      console.info(odata);
    });
  };

  useEffect(() => {
    if (!_.isEmpty(data) && !alert) {
      return;
    }
    ProductDataService.getAll().then((odata) => {
      if (mounted.current) {
        //console.info(odata);
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
        <h2>Admin CMS &nbsp;&raquo;&nbsp;All Products</h2>
        <Button
          style={{ width: "160px" }}
          variant="primary"
          className="pull-right"
          onClick={() => history.push("admin/product/add")}
        >
          {" "}
          Add New Product
        </Button>
        <div className="spacer-lg"></div>
        <div>
          {error ? <p className="load-text">{error}</p> : <></>}
          <div className="row">
            {!_.isEmpty(products) ? (
              products.map((item, key) => (
                <AllProducts
                  key={key}
                  {...item}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))
            ) : (
              <div className="col-md-12">
                <p className="load-text">
                  <i className="fa fa-spinner fa-spin"></i> Loading Products...
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

export default Admin;
