import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const AllProducts = ({ id, product_name, handleRemoveProduct }) => {
  const history = useHistory();
  return (
    <>
      <div className="col-md-4" key={id}>
        <div className="media d-block d-sm-flex text-center text-sm-left">
          <Link
            className="cart-item-thumb mx-auto mr-sm-4"
            to={`/admin/product/edit/${id}`}
          >
            <img
              src="https://via.placeholder.com/240x240/FF0000/000000"
              alt="Product"
              className="thumbnail"
            />
          </Link>
          <div className="media-body pt-3">
            <h3 className="product-card-title font-weight-semibold border-0 pb-0 high3">
              <Link to={`/admin/product/edit/${id}`}>{product_name}</Link>
            </h3>
            <p>
              <Button
                style={{ width: "120px" }}
                variant="primary"
                onClick={() => history.push(`/admin/product/edit/${id}`)}
              >
                Edit
              </Button>{" "}
              <Button
                style={{ width: "120px" }}
                variant="danger"
                onClick={() => handleRemoveProduct(id)}
              >
                Delete
              </Button>
            </p>
            <div className="spacer"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllProducts;
