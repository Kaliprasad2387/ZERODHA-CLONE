import "./Layout.css";

import { Outlet } from "react-router-dom";

import Menu from "./component/Menu/Menu";
import TopBar from "./component/Topbar/TopBar";

function Layout() {
  return (
    <div className="app-layout">

      {/* Sidebar */}
      <Menu />

      {/* Main Content */}
      <div className="app-main">

        <TopBar />

        <main className="app-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;