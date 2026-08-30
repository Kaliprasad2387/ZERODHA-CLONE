import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./landing_page/Layout";
import Homepage from "./Homepage";

import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import SignupPage from "./landing_page/signup/SignupPage";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            LANDING WEBSITE
        ========================= */}

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Homepage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/pricing"
            element={<PricingPage />}
          />

          <Route
            path="/support"
            element={<SupportPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

        </Route>

        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;