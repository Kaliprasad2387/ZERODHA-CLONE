import { useCallback, useState } from "react";

import "./Dashboard.css";

import Summary from "../component/summary/Summary";
import PortfolioChart from "../component/PortfolioChart/PortfolioChart";
import WatchList from "../component/watchlist/WatchList";
import PortfolioGrowth from "../component/PortfolioGrowth/PortfolioGrowth";

function Dashboard() {
  const [refreshKey, setRefreshKey] =
    useState(0);

  // =========================
  // ORDER SUCCESS
  // =========================

  const handleOrderSuccess =
    useCallback(() => {

      setRefreshKey(
        (prev) => prev + 1
      );

    }, []);

  return (
    <div className="dashboard-page">

      {/* =========================
          SUMMARY
      ========================= */}

      <section className="dashboard-summary">
        <Summary
          key={`summary-${refreshKey}`}
        />
      </section>

      {/* =========================
          PORTFOLIO + WATCHLIST
      ========================= */}

      <section className="dashboard-main-grid">

        <div className="dashboard-chart">
          <PortfolioChart
            key={`chart-${refreshKey}`}
          />
        </div>

        <div className="dashboard-watchlist">
          <WatchList
            onOrderSuccess={
              handleOrderSuccess
            }
          />
        </div>

      </section>

      {/* =========================
          PORTFOLIO GROWTH
      ========================= */}

      <section className="dashboard-growth">
        <PortfolioGrowth
          key={`growth-${refreshKey}`}
        />
      </section>

    </div>
  );
}

export default Dashboard;