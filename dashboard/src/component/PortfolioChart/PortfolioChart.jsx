import "./PortfolioChart.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import API from "../../api/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PortfolioChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
    total: 0,
    loading: true,
  });

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const res = await API.get("/holdings");

      const holdings = Array.isArray(res.data)
        ? res.data
        : [];

      const labels = holdings.map(
        (item) => item.name || "Unknown"
      );

      const values = holdings.map(
        (item) =>
          Number(item.qty || 0) *
          Number(
            item.price ||
            item.avg ||
            0
          )
      );

      const total = values.reduce(
        (sum, value) => sum + value,
        0
      );

      setChartData({
        labels,
        values,
        total,
        loading: false,
      });

    } catch (err) {
      console.error(
        "PORTFOLIO CHART ERROR:",
        err
      );

      setChartData({
        labels: [],
        values: [],
        total: 0,
        loading: false,
      });
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (chartData.loading) {
    return (
      <div className="portfolio-chart-card">

        <h3 className="portfolio-chart-title">
          Portfolio Distribution
        </h3>

        <div className="portfolio-chart-empty">
          <p>
            Loading portfolio...
          </p>
        </div>

      </div>
    );
  }

  // ==============================
  // CHECK DATA
  // ==============================

  const hasData =
    chartData.labels.length > 0 &&
    chartData.values.some(
      (value) => value > 0
    );

  return (
    <div className="portfolio-chart-card">

      {/* TITLE */}

      <h3 className="portfolio-chart-title">
        Portfolio Distribution
      </h3>

      {/* CHART */}

      {hasData ? (

        <div className="portfolio-chart">

          <Pie
            data={{
              labels: chartData.labels,

              datasets: [
                {
                  label: "Portfolio Value",

                  data: chartData.values,

                  backgroundColor: [
                    "#387ed1",
                    "#13c296",
                    "#ff9800",
                    "#ff4d4f",
                    "#8b5cf6",
                    "#06b6d4",
                    "#22c55e",
                    "#f43f5e",
                    "#facc15",
                    "#0ea5e9",
                  ],

                  borderWidth: 1,
                },
              ],
            }}

            options={{
              responsive: true,

              maintainAspectRatio: true,

              plugins: {
                legend: {
                  position: "bottom",

                  labels: {
                    padding: 15,
                    usePointStyle: true,
                  },
                },

                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const value =
                        context.raw || 0;

                      return ` ₹${Number(
                        value
                      ).toLocaleString(
                        "en-IN"
                      )}`;
                    },
                  },
                },
              },
            }}
          />

        </div>

      ) : (

        /* NO HOLDINGS */

        <div className="portfolio-chart-empty">

          <h5>
            No holdings available
          </h5>

          <p>
            Buy stocks to see your portfolio
            distribution here.
          </p>

        </div>

      )}

      {/* TOTAL */}

      <div className="portfolio-chart-total">

        <h5>
          Total Portfolio Value
        </h5>

        <h3>
          ₹
          {chartData.total.toLocaleString(
            "en-IN"
          )}
        </h3>

      </div>

    </div>
  );
}

export default PortfolioChart;