import "./Menu.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "menu-link active" : "menu-link";

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="menu-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`menu ${open ? "menu-open" : ""}`}>

        <div className="menu-header">
          <h2 className="logo">
            Zerodha
          </h2>

          <button
            className="menu-close-btn"
            onClick={() => setOpen(false)}
            type="button"
          >
            ✕
          </button>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={linkClass}
                onClick={handleLinkClick}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/holdings"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Holdings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/positions"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Positions
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/funds"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Funds
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/transactions"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Transactions
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={linkClass}
                onClick={handleLinkClick}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>

      </aside>
    </>
  );
}

export default Menu;