import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/api";

function Transactions() {
  const [transactions, setTransactions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD TRANSACTIONS
  // =========================

  const loadTransactions = async () => {
    try {
      setLoading(true);

      const res =
        await API.get("/transactions");

      const data =
        Array.isArray(res.data)
          ? res.data
          : [];

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setTransactions(sorted);

    } catch (err) {
      console.error(
        "GET TRANSACTIONS ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to load transactions"
      );

      setTransactions([]);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
  loadTransactions();

  const handleOrderUpdated = () => {
    console.log(
      "🔄 TRANSACTIONS UPDATED"
    );

    loadTransactions();
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
  // SEARCH
  // =========================

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (tx) =>
          (tx.stock || "")
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [transactions, search]);

  // =========================
  // TOTAL BUY
  // =========================

  const totalBuy =
    filteredTransactions
      .filter(
        (tx) => tx.type === "BUY"
      )
      .reduce(
        (sum, tx) =>
          sum + Number(tx.amount || 0),
        0
      );

  // =========================
  // TOTAL SELL
  // =========================

  const totalSell =
    filteredTransactions
      .filter(
        (tx) => tx.type === "SELL"
      )
      .reduce(
        (sum, tx) =>
          sum + Number(tx.amount || 0),
        0
      );

  // =========================
  // REALIZED PROFIT
  // =========================

  const realizedProfit =
    filteredTransactions
      .filter(
        (tx) =>
          tx.type === "SELL" &&
          Number(tx.pnl || 0) > 0
      )
      .reduce(
        (sum, tx) =>
          sum + Number(tx.pnl || 0),
        0
      );

  // =========================
  // REALIZED LOSS
  // =========================

  const realizedLoss =
    filteredTransactions
      .filter(
        (tx) =>
          tx.type === "SELL" &&
          Number(tx.pnl || 0) < 0
      )
      .reduce(
        (sum, tx) =>
          sum + Math.abs(Number(tx.pnl || 0)),
        0
      );

  // =========================
  // NET REALIZED P/L
  // =========================

  const netRealizedPnL =
    filteredTransactions
      .filter(
        (tx) => tx.type === "SELL"
      )
      .reduce(
        (sum, tx) =>
          sum + Number(tx.pnl || 0),
        0
      );

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =========================
  // FORMAT P/L
  // =========================

  const formatPnL = (pnl) => {
    const value = Number(pnl || 0);

    if (value > 0) {
      return `+₹${value.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`;
    }

    if (value < 0) {
      return `-₹${Math.abs(value).toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      )}`;
    }

    return "₹0";
  };

  return (
    <div className="container mt-4">

      {/* =========================
          HEADER
      ========================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Transaction History
        </h2>

        <div className="d-flex gap-2">

          <input
            type="text"
            className="form-control"
            style={{
              width: "280px",
            }}
            placeholder="🔍 Search Stock..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            type="button"
            className="btn btn-success"
            onClick={loadTransactions}
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

        {/* TOTAL BUY */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm">

            <h6>
              Total Buy
            </h6>

            <h3 className="text-success">
              ₹
              {totalBuy.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h3>

          </div>

        </div>

        {/* TOTAL SELL */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm">

            <h6>
              Total Sell
            </h6>

            <h3 className="text-danger">
              ₹
              {totalSell.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h3>

          </div>

        </div>

        {/* REALIZED PROFIT */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm">

            <h6>
              Realized Profit
            </h6>

            <h3 className="text-success">
              +₹
              {realizedProfit.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h3>

          </div>

        </div>

        {/* NET REALIZED P/L */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm">

            <h6>
              Net Realized P/L
            </h6>

            <h3
              className={
                netRealizedPnL >= 0
                  ? "text-success"
                  : "text-danger"
              }
            >
              {formatPnL(
                netRealizedPnL
              )}
            </h3>

          </div>

        </div>

      </div>

      {/* =========================
          REALIZED LOSS
      ========================= */}

      <div className="card p-3 shadow-sm mb-4">

        <div className="d-flex justify-content-between">

          <strong>
            Realized Loss
          </strong>

          <strong className="text-danger">
            -₹
            {realizedLoss.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
              }
            )}
          </strong>

        </div>

      </div>

      {/* =========================
          TABLE
      ========================= */}

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Realized P/L</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-4"
                >
                  Loading transactions...
                </td>

              </tr>

            ) : filteredTransactions.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center text-muted py-4"
                >
                  No Transactions Found
                </td>

              </tr>

            ) : (

              filteredTransactions.map(
                (tx) => {

                  const pnl =
                    Number(tx.pnl || 0);

                  return (
                    <tr key={tx._id}>

                      {/* DATE */}

                      <td>
                        {formatDate(
                          tx.createdAt
                        )}
                      </td>

                      {/* STOCK */}

                      <td>
                        <strong>
                          {tx.stock ||
                            "-"}
                        </strong>
                      </td>

                      {/* TYPE */}

                      <td>

                        <span
                          className={
                            tx.type ===
                            "BUY"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {tx.type ||
                            "-"}
                        </span>

                      </td>

                      {/* QTY */}

                      <td>
                        {Number(
                          tx.qty || 0
                        )}
                      </td>

                      {/* PRICE */}

                      <td>
                        ₹
                        {Number(
                          tx.price || 0
                        ).toLocaleString(
                          "en-IN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      {/* AMOUNT */}

                      <td>
                        <strong>
                          ₹
                          {Number(
                            tx.amount || 0
                          ).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </strong>
                      </td>

                      {/* REALIZED P/L */}

                      <td
                        className={
                          tx.type !== "SELL"
                            ? "text-muted"
                            : pnl > 0
                            ? "text-success fw-bold"
                            : pnl < 0
                            ? "text-danger fw-bold"
                            : "text-muted"
                        }
                      >
                        {tx.type === "SELL"
                          ? formatPnL(pnl)
                          : "-"}
                      </td>

                    </tr>
                  );
                }
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Transactions;