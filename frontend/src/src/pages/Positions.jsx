import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/api";

import {
  getPnL,
  getPnLPercent,
} from "../utils/pnl";

function Positions() {
  const [positions, setPositions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH POSITIONS
  // =========================

  const fetchPositions = async () => {
    try {
      setLoading(true);

      const res =
        await API.get("/positions");

      setPositions(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {
      console.error(
        "GET POSITIONS ERROR:",
        err
      );

      setPositions([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load positions"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
  fetchPositions();

  const handleOrderUpdated = () => {
    console.log(
      "🔄 POSITIONS UPDATED"
    );

    fetchPositions();
  };

  window.addEventListener(
    "orderUpdated",
    handleOrderUpdated
  );

  return () => {
    window.removeEventListener(
      "orderUpdated",
      handleOrderUpdated
    );
  };
}, []);
  // =========================
  // INVESTMENT
  // =========================

  const getInvestment = (item) => {
    return (
      Number(item?.qty || 0) *
      Number(item?.avg || 0)
    );
  };

  // =========================
  // CURRENT VALUE
  // =========================

  const getCurrentValue = (item) => {
    return (
      Number(item?.qty || 0) *
      Number(item?.price || 0)
    );
  };

  // =========================
  // TOTALS
  // =========================

  const totalInvestment =
    positions.reduce(
      (sum, item) =>
        sum + getInvestment(item),
      0
    );

  const totalCurrent =
    positions.reduce(
      (sum, item) =>
        sum + getCurrentValue(item),
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
  // RETURN
  // =========================

  return (
    <div className="container mt-4">

      {/* =========================
          HEADER
      ========================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="mb-1">
            Positions
          </h2>

          <small className="text-muted">
            Your current trading positions
          </small>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={fetchPositions}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "↻ Refresh"}
        </button>

      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="row mb-4">

        {/* INVESTMENT */}

        <div className="col-md-4 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Total Investment
            </h6>

            <h4>
              ₹
              {totalInvestment.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h4>

          </div>

        </div>

        {/* CURRENT */}

        <div className="col-md-4 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Current Value
            </h6>

            <h4>
              ₹
              {totalCurrent.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h4>

          </div>

        </div>

        {/* P/L */}

        <div className="col-md-4 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Total P/L
            </h6>

            <h4
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

              <small className="ms-2">
                (
                {totalPnL >= 0
                  ? "+"
                  : ""}
                {totalPnLPercent.toFixed(
                  2
                )}
                %)
              </small>

            </h4>

          </div>

        </div>

      </div>

      {/* =========================
          TABLE
      ========================= */}

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Product</th>
              <th>Stock</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>LTP</th>
              <th>Investment</th>
              <th>Current</th>
              <th>P/L</th>
              <th>Net %</th>
              <th>Day</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="10"
                  className="text-center py-4"
                >
                  Loading Positions...
                </td>

              </tr>

            ) : positions.length > 0 ? (

              positions.map(
                (item) => {

                  const investment =
                    getInvestment(
                      item
                    );

                  const current =
                    getCurrentValue(
                      item
                    );

                  const pnl =
                    getPnL(item);

                  const pnlPercent =
                    getPnLPercent(
                      item
                    );

                  const day =
                    item.day || "0%";

                  return (
                    <tr
                      key={
                        item._id
                      }
                    >

                      {/* PRODUCT */}

                      <td>
                        {item.product ||
                          "CNC"}
                      </td>

                      {/* STOCK */}

                      <td>
                        <strong>
                          {item.name ||
                            "Unknown"}
                        </strong>
                      </td>

                      {/* QTY */}

                      <td>
                        {Number(
                          item.qty || 0
                        )}
                      </td>

                      {/* AVG */}

                      <td>
                        ₹
                        {Number(
                          item.avg || 0
                        ).toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* LTP */}

                      <td>
                        ₹
                        {Number(
                          item.price || 0
                        ).toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* INVESTMENT */}

                      <td>
                        ₹
                        {investment.toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* CURRENT */}

                      <td>
                        ₹
                        {current.toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* P/L */}

                      <td
                        className={
                          pnl >= 0
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {pnl >= 0
                          ? "+"
                          : "-"}
                        ₹
                        {Math.abs(
                          pnl
                        ).toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* NET % */}

                      <td
                        className={
                          pnlPercent >= 0
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {pnlPercent >=
                        0
                          ? "+"
                          : ""}
                        {pnlPercent.toFixed(
                          2
                        )}
                        %
                      </td>

                      {/* DAY */}

                      <td
                        className={
                          day.startsWith(
                            "+"
                          )
                            ? "text-success fw-bold"
                            : day ===
                              "0%"
                            ? "text-muted"
                            : "text-danger fw-bold"
                        }
                      >
                        {day}
                      </td>

                    </tr>
                  );
                }
              )

            ) : (

              <tr>

                <td
                  colSpan="10"
                  className="text-center text-muted py-4"
                >
                  No Positions Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Positions;