import "./PortfolioGrowth.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

import API from "../../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function PortfolioGrowth() {
  const [portfolio, setPortfolio] = useState({
    labels: [],
    investment: [],
    current: [],
    loading: true,
  });

  // =========================
  // LOAD PORTFOLIO
  // =========================

  const loadPortfolio = async () => {
    try {
      setPortfolio((prev) => ({
        ...prev,
        loading: true,
      }));

      const response =
        await API.get("/holdings");

      const holdings =
        Array.isArray(response.data)
          ? response.data
          : [];

      // =========================
      // LABELS
      // =========================

      const labels = holdings.map(
        (item) =>
          item.name || "Stock"
      );

      // =========================
      // INVESTMENT
      // =========================

      const investment =
        holdings.map((item) => {
          const qty =
            Number(item.qty || 0);

          const avg =
            Number(item.avg || 0);

          return qty * avg;
        });

      // =========================
      // CURRENT VALUE
      // =========================

      const current =
        holdings.map((item) => {
          const qty =
            Number(item.qty || 0);

          const price =
            Number(
              item.price ||
              item.avg ||
              0
            );

          return qty * price;
        });

      setPortfolio({
        labels,
        investment,
        current,
        loading: false,
      });

    } catch (error) {
      console.error(
        "PORTFOLIO GROWTH ERROR:",
        error
      );

      setPortfolio({
        labels: [],
        investment: [],
        current: [],
        loading: false,
      });
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadPortfolio();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (portfolio.loading) {
    return (
      <div className="portfolio-growth-card">

        <div className="portfolio-growth-header">
          <div>
            <h3>
              Portfolio Growth
            </h3>

            <p>
              Investment vs Current Value
            </p>
          </div>
        </div>

        <div className="portfolio-empty">

          <div className="portfolio-empty-icon">
            ⏳
          </div>

          <h5>
            Loading Portfolio
          </h5>

          <p>
            Calculating your portfolio...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // CHECK DATA
  // =========================

  const hasData =
    portfolio.labels.length > 0 &&
    portfolio.current.some(
      (value) => value > 0
    );

  // =========================
  // TOTALS
  // =========================

  const totalInvestment =
    portfolio.investment.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  const totalCurrent =
    portfolio.current.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  const totalPnL =
    totalCurrent -
    totalInvestment;

  const totalPnLPercent =
    totalInvestment > 0
      ? (totalPnL /
          totalInvestment) *
        100
      : 0;

  // =========================
  // CHART DATA
  // =========================

  const chartData = {
    labels: portfolio.labels,

    datasets: [
      {
        label: "Investment",

        data: portfolio.investment,

        borderColor: "#387ed1",

        backgroundColor:
          "rgba(56, 126, 209, 0.10)",

        borderWidth: 2,

        pointRadius: 4,

        pointHoverRadius: 6,

        tension: 0.3,

        fill: false,
      },

      {
        label: "Current Value",

        data: portfolio.current,

        borderColor: "#16a34a",

        backgroundColor:
          "rgba(22, 163, 74, 0.10)",

        borderWidth: 2,

        pointRadius: 4,

        pointHoverRadius: 6,

        tension: 0.3,

        fill: false,
      },
    ],
  };

  // =========================
  // CHART OPTIONS
  // =========================

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        position: "top",
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return (
              context.dataset.label +
              ": ₹" +
              Number(
                context.raw || 0
              ).toLocaleString(
                "en-IN"
              )
            );
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: function (value) {
            return (
              "₹" +
              Number(
                value
              ).toLocaleString(
                "en-IN"
              )
            );
          },
        },
      },

      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="portfolio-growth-card">

      {/* =========================
          HEADER
      ========================= */}

      <div className="portfolio-growth-header">

        <div>

          <h3>
            Portfolio Growth
          </h3>

          <p>
            Investment vs Current Value
          </p>

        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={loadPortfolio}
        >
          ↻ Refresh
        </button>

      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="portfolio-growth-summary">

        <div>
          <span>
            Investment
          </span>

          <strong>
            ₹
            {totalInvestment.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
              }
            )}
          </strong>
        </div>

        <div>
          <span>
            Current Value
          </span>

          <strong>
            ₹
            {totalCurrent.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
              }
            )}
          </strong>
        </div>

        <div>
          <span>
            P/L
          </span>

          <strong
            className={
              totalPnL >= 0
                ? "text-success"
                : "text-danger"
            }
          >
            {totalPnL >= 0
              ? "+"
              : "-"}
            ₹
            {Math.abs(
              totalPnL
            ).toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
              }
            )}
          </strong>

          <small
            className={
              totalPnL >= 0
                ? "text-success"
                : "text-danger"
            }
          >
            {totalPnL >= 0
              ? "+"
              : ""}
            {totalPnLPercent.toFixed(
              2
            )}
            %
          </small>

        </div>

      </div>

      {/* =========================
          CHART
      ========================= */}

      {hasData ? (

        <div className="portfolio-chart-wrapper">

          <Line
            data={chartData}
            options={options}
          />

        </div>

      ) : (

        <div className="portfolio-empty">

          <div className="portfolio-empty-icon">
            📊
          </div>

          <h5>
            No Portfolio Data
          </h5>

          <p>
            Buy stocks to see your
            portfolio growth here.
          </p>

        </div>

      )}

    </div>
  );
}

export default PortfolioGrowth;