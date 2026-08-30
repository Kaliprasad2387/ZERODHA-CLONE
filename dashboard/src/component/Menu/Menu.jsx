import "./Menu.css";
import { NavLink } from "react-router-dom";

function Menu() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "menu-link active"
      : "menu-link";

  return (
    <aside className="menu">

      <h2 className="logo">
        Zerodha
      </h2>

      <nav>
        <ul>

          <li>
            <NavLink
              to="/"
              end
              className={linkClass}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              className={linkClass}
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/holdings"
              className={linkClass}
            >
              Holdings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/positions"
              className={linkClass}
            >
              Positions
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/funds"
              className={linkClass}
            >
              Funds
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/transactions"
              className={linkClass}
            >
              Transactions
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={linkClass}
            >
              Profile
            </NavLink>
          </li>

        </ul>
      </nav>

    </aside>
  );
}

export default Menu;