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
  const [authenticated, setAuthenticated] = useState(false);

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
        localStorage.setItem("token", token);
      }

      // ======================================
      // USER FROM FRONTEND LOGIN
      // ======================================

      if (user) {
        try {
          const parsedUser = JSON.parse(user);

          localStorage.setItem(
            "user",
            JSON.stringify(parsedUser)
          );
        } catch (error) {
          console.error(
            "USER PARSE ERROR:",
            error
          );
        }
      }

      // ======================================
      // CHECK TOKEN
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
          window.location.pathname
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

  // ==========================================
  // CHECKING
  // ==========================================

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Loading...
      </div>
    );
  }

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // ==========================================
  // AUTHENTICATED
  // ==========================================

  return children;
}

// ==========================================
// APP
// ==========================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================
            LOGIN
        ================================== */}

        <Route
          path="/login"
          element={
            <div
              style={{
                padding: "40px",
                textAlign: "center",
              }}
            >
              Please login from the main frontend.
            </div>
          }
        />

        {/* ==================================
            PROTECTED DASHBOARD
        ================================== */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="holdings"
            element={<Holdings />}
          />

          <Route
            path="positions"
            element={<Positions />}
          />

          <Route
            path="funds"
            element={<Funds />}
          />

          <Route
            path="transactions"
            element={<Transactions />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

        {/* ==================================
            UNKNOWN ROUTE
        ================================== */}

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;