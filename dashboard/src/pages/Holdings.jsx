import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/api";

import {
  getPnL,
  getPnLPercent,
} from "../utils/pnl";

function Holdings() {
  const [holdings, setHoldings] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH HOLDINGS
  // =========================

  const fetchHoldings = async () => {
    try {
      setLoading(true);

      const res =
        await API.get("/holdings");

      setHoldings(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {
      console.error(
        "GET HOLDINGS ERROR:",
        err
      );

      setHoldings([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load holdings"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchHoldings();

    const handleOrderUpdated = () => {
      fetchHoldings();
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
  // SEARCH
  // =========================

  const filteredHoldings =
    holdings.filter((item) =>
      String(item?.name || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

   // =========================
  // TOTALS
  // =========================

  const totalInvestment =
    filteredHoldings.reduce(
      (sum, item) =>
        sum + getInvestment(item),
      0
    );

  const totalCurrent =
    filteredHoldings.reduce(
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

  return (
    <div className="container mt-4">

      {/* =========================
          HEADER
      ========================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="mb-1">
            My Holdings
          </h2>

          <small className="text-muted">
            Your current stock holdings
          </small>
        </div>

        <div className="d-flex gap-2">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Holdings..."
            style={{
              width: "250px",
            }}
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <button
            type="button"
            className="btn btn-success"
            onClick={fetchHoldings}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "↻ Refresh"}
          </button>

        </div>

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
          HOLDINGS TABLE
      ========================= */}

      <div className="table-responsive">

        <table className="table table-hover table-bordered align-middle">

          <thead className="table-dark">

            <tr>
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
                  colSpan="9"
                  className="text-center py-4"
                >
                  Loading Holdings...
                </td>

              </tr>

            ) : filteredHoldings.length > 0 ? (

              filteredHoldings.map(
                (item) => {

                  const investment =
                    getInvestment(item);

                  const current =
                    getCurrentValue(item);

                  const pnl =
                    getPnL(item);

                  const pnlPercent =
                    getPnLPercent(item);

                  const day =
                    item.day || "0%";

                  return (
                    <tr
                      key={item._id}
                    >

                      {/* STOCK */}

                      <td>
                        <strong>
                          {item.name}
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
                        {pnlPercent >= 0
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
                          day.startsWith("+")
                            ? "text-success fw-bold"
                            : day === "0%"
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
                  colSpan="9"
                  className="text-center text-muted py-4"
                >
                  {search
                    ? "No matching holdings found"
                    : "No Holdings Found"}
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Holdings;