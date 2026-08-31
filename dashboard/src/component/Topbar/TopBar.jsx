import "./TopBar.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopBar() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  // =========================
  // LOAD USER
  // =========================

  const loadUser = () => {
    try {
      const savedUser =
        localStorage.getItem("user");

      if (!savedUser) {
        setUser({
          name: "",
          email: "",
        });

        return;
      }

      const parsedUser =
        JSON.parse(savedUser);

      setUser({
        name: parsedUser?.name || "",
        email: parsedUser?.email || "",
      });

    } catch (error) {
      console.error(
        "TOPBAR USER ERROR:",
        error
      );

      setUser({
        name: "",
        email: "",
      });
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadUser();

    window.addEventListener(
      "storage",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadUser
      );
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    try {
      // Remove authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear session data
      sessionStorage.clear();

      // Clear React state
      setUser({
        name: "",
        email: "",
      });

      // Redirect to frontend login
      window.location.replace(
  "https://zerodha-clone-frontend-ct52.onrender.com/login"
);
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error
      );
    }
  };

  return (
    <div className="topbar">

      {/* =========================
          TITLE
      ========================= */}

      <div className="topbar-title">

        <h3>
          Zerodha Dashboard
        </h3>

      </div>

      {/* =========================
          USER AREA
      ========================= */}

      <div className="profile">

        {/* PROFILE */}

        <Link
          to="/profile"
          className="btn btn-outline-primary btn-sm"
        >
          Profile
        </Link>

        {/* USER */}

        <div className="topbar-user">

          <span className="user-greeting">
            👋
          </span>

          <span className="user-name">
            {user.name || "User"}
          </span>

        </div>

        {/* LOGOUT */}

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default TopBar;