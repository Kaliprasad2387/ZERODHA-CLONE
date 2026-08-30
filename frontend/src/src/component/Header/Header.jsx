import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const loadUser = () => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      setUser({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
      });
    } catch (error) {
      console.error("USER LOAD ERROR:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href =
      "http://localhost:5173/login";
  };

  return (
    <header className="dashboard-header">

      <div className="dashboard-title">
        Zerodha Dashboard
      </div>

      <div className="header-right">

        <NavLink
          to="/profile"
          className="profile-button"
        >
          Profile
        </NavLink>

        <span className="welcome-user">
          👋 {user.name || "User"}
        </span>

        <button
          type="button"
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Header;