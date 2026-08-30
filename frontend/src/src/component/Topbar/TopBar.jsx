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
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href =
      "http://localhost:5173/login";
  };

  return (
    <div className="topbar">

      {/* TITLE */}

      <div className="topbar-title">
        <h3>
          Zerodha Dashboard
        </h3>
      </div>

      {/* USER AREA */}

      <div className="profile">

        <Link
          to="/profile"
          className="btn btn-outline-primary btn-sm"
        >
          Profile
        </Link>

        <div className="topbar-user">

          <span className="user-greeting">
            👋
          </span>

          <span className="user-name">
            {user.name || "User"}
          </span>

        </div>

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