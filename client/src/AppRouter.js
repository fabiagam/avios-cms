import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductItem from "./components/ProductItem";
import ProductEditItem from "./components/ProductEditItem";
import Admin from "./components/Admin";
import AddProduct from "./components/AddProduct";
import useLocalStorage from "./hooks/useLocalStorage";
import ProductsContext from "./context/ProductsContext";
import BasketContext from "./context/BasketContext";

const AppRouter = () => {
  const [products, setProducts] = useLocalStorage("products", []);
  const [basket, setBasket] = useLocalStorage("basket", []);
  return (
    <>
      <Header />
      <div className="container">
        <ProductsContext.Provider value={{ products, setProducts }}>
          <BasketContext.Provider value={{ basket, setBasket }}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/product/add" component={AddProduct} />
              <Route
                path="/admin/product/edit/:id"
                component={ProductEditItem}
              />
            </Switch>
          </BasketContext.Provider>
        </ProductsContext.Provider>
      </div>
    </>
  );
};

export default AppRouter;
