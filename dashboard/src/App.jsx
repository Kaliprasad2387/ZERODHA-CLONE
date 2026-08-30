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
    try {
      // ======================================
      // GET URL PARAMETERS
      // ======================================

      const params = new URLSearchParams(
        window.location.search
      );

      const token = params.get("token");
      const user = params.get("user");

      // ======================================
      // TOKEN FROM FRONTEND LOGIN
      // ======================================

      if (token) {
        localStorage.setItem(
          "token",
          token
        );
      }

      // ======================================
      // USER FROM FRONTEND LOGIN
      // ======================================

      if (user) {
        try {
          const decodedUser =
            decodeURIComponent(user);

          localStorage.setItem(
            "user",
            decodedUser
          );
        } catch (error) {
          console.error(
            "USER DECODE ERROR:",
            error
          );
        }
      }

      // ======================================
      // CHECK SAVED TOKEN
      // ======================================

      const savedToken =
        localStorage.getItem("token");

      if (savedToken) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      // ======================================
      // REMOVE TOKEN FROM URL
      // ======================================

      if (token || user) {
        window.history.replaceState(
          {},
          document.title,
          "/"
        );
      }

    } catch (error) {
      console.error(
        "AUTH CHECK ERROR:",
        error
      );

      setAuthenticated(false);

    } finally {
      setChecking(false);
    }
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
  // NOT AUTHENTICATED
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
  // AUTHENTICATED
  // ======================================

  return children;
}

// ==========================================
// LOGIN REQUIRED
// ==========================================

function LoginRequired() {
  useEffect(() => {
    window.location.replace(
      "http://localhost:5173/login"
    );
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

          {/* DASHBOARD */}

          <Route
            index
            element={<Dashboard />}
          />

          {/* ORDERS */}

          <Route
            path="orders"
            element={<Orders />}
          />

          {/* HOLDINGS */}

          <Route
            path="holdings"
            element={<Holdings />}
          />

          {/* POSITIONS */}

          <Route
            path="positions"
            element={<Positions />}
          />

          {/* FUNDS */}

          <Route
            path="funds"
            element={<Funds />}
          />

          {/* TRANSACTIONS */}

          <Route
            path="transactions"
            element={<Transactions />}
          />

          {/* PROFILE */}

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