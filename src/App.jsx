import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { verifyToken, logout, loadUser } from "./redux/actions/authAction";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { themeChange } from "theme-change";
import store from "./redux/store";
import Loader from "./components/common/Loader";

const DistributorLayout = lazy(() =>
  import("./components/Distributors/DistributorLayout")
);
const RetailerHome = lazy(() => import("./components/retailers/RetailerHome"));
const Products = lazy(() => import("./components/Products/Products"));
const RetailerLayout = lazy(() =>
  import("./components/retailers/RetailerLayout")
);
const ProductForm = lazy(() => import("./components/Products/ProductForm"));
const Cart = lazy(() => import("./components/retailers/Cart"));
const Sales = lazy(() => import("./components/Distributors/Sales"));
const DistProducts = lazy(() => import("./components/retailers/DistProducts"));
const Checkout = lazy(() => import("./components/retailers/Checkout"));
const DistributorDash = lazy(() =>
  import("./components/Distributors/DistributorDash")
);
const Registration = lazy(() => import("./components/Registration"));

const Login = lazy(() => import("./components/Login"));
const Landing = lazy(() => import("./components/Landing"));
const DistributorSignup = lazy(() =>
  import("./components/Distributors/DistributorSignup")
);
const RetailerSignup = lazy(() =>
  import("./components/retailers/RetailerSignup")
);

function App() {
  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.getItem("token");
      store.dispatch(verifyToken(token));
    }
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route
              exact
              path="/distributor-registration"
              component={DistributorSignup}
            />
            <Route
              exact
              path="/retailer-registration"
              component={RetailerSignup}
            />
          </Switch>
          <Switch>
            <Route path="/retailer">
              <RetailerLayout>
                <Route
                  exact
                  path="/retailer/retailer-home"
                  component={RetailerHome}
                />
                <Route path="/retailer/checkout" component={Checkout} />

                <Route exact path="/retailer/cart" component={Cart} />
                <Route path="/retailer/products">
                  <DistProducts />
                </Route>
              </RetailerLayout>
            </Route>
          </Switch>
          <Switch>
            <Route path="/distributor">
              <DistributorLayout>
                <Route path="/distributor/products">
                  <Products />
                </Route>
                <Route path="/distributor/product-form">
                  <ProductForm />
                </Route>
                <Route path="/distributor/sales">
                  <Sales />
                </Route>
                <Route path="/distributor/dashboard">
                  <DistributorDash />
                </Route>
              </DistributorLayout>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
