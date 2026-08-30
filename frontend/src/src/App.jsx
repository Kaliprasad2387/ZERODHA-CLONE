import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Holdings from "./pages/Holdings";
import Positions from "./pages/Positions";
import Funds from "./pages/Funds";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";


// ==========================================
// PROTECTED ROUTE
// ==========================================

function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {

    // URL parameters
    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");
    const user = params.get("user");

    // ======================================
    // TOKEN FROM LOGIN FRONTEND
    // ======================================

    if (token) {
      localStorage.setItem(
        "token",
        token
      );
    }

    // ======================================
    // USER FROM LOGIN FRONTEND
    // ======================================

    if (user) {
      localStorage.setItem(
        "user",
        user
      );
    }

    // ======================================
    // CHECK TOKEN
    // ======================================

    const savedToken =
      localStorage.getItem("token");

    if (savedToken) {

      setAuthenticated(true);

      // Remove token from URL
      if (token || user) {

        window.history.replaceState(
          {},
          document.title,
          "/"
        );

      }

    }

    setChecking(false);

  }, []);


  // ======================================
  // CHECKING
  // ======================================

  if (checking) {

    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "20px",
        }}
      >
        Loading Dashboard...
      </div>
    );

  }


  // ======================================
  // NOT LOGGED IN
  // ======================================

  if (!authenticated) {

    return (
      <Navigate
        to="/login-required"
        replace
      />
    );

  }


  // ======================================
  // LOGGED IN
  // ======================================

  return children;
}


// ==========================================
// LOGIN REQUIRED PAGE
// ==========================================

function LoginRequired() {

  useEffect(() => {

    window.location.href =
      "http://localhost:5173/login";

  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontSize: "20px",
      }}
    >
      Redirecting to login...
    </div>
  );
}


// ==========================================
// APP
// ==========================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =================================
            LOGIN REQUIRED
        ================================= */}

        <Route
          path="/login-required"
          element={<LoginRequired />}
        />


        {/* =================================
            PROTECTED DASHBOARD
        ================================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard */}

          <Route
            index
            element={<Dashboard />}
          />


          {/* Orders */}

          <Route
            path="orders"
            element={<Orders />}
          />


          {/* Holdings */}

          <Route
            path="holdings"
            element={<Holdings />}
          />


          {/* Positions */}

          <Route
            path="positions"
            element={<Positions />}
          />


          {/* Funds */}

          <Route
            path="funds"
            element={<Funds />}
          />


          {/* Transactions */}

          <Route
            path="transactions"
            element={<Transactions />}
          />


          {/* Profile */}

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>


        {/* =================================
            UNKNOWN URL
        ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;