import "./Summary.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../../api/api";

import {
  getPnL,
} from "../../utils/pnl";

function Summary() {
  const [summary, setSummary] = useState({
    equity: 0,
    holdings: 0,
    orders: 0,
    funds: 0,
    investment: 0,

    unrealizedPnL: 0,
    unrealizedPnLPercent: 0,

    realizedPnL: 0,

    totalPnL: 0,
    totalPnLPercent: 0,
  });

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH SUMMARY
  // =========================

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const [
        holdingsRes,
        ordersRes,
        fundsRes,
        transactionsRes,
      ] = await Promise.all([
        API.get("/holdings"),
        API.get("/orders"),
        API.get("/funds"),
        API.get("/transactions"),
      ]);

      // =========================
      // DATA
      // =========================

      const holdings =
        Array.isArray(
          holdingsRes.data
        )
          ? holdingsRes.data
          : [];

      const orders =
        Array.isArray(
          ordersRes.data
        )
          ? ordersRes.data
          : [];

      const funds =
        fundsRes.data || {};

      const transactions =
        Array.isArray(
          transactionsRes.data
        )
          ? transactionsRes.data
          : [];

      // =========================
      // INVESTMENT
      // =========================

      const investment =
        holdings.reduce(
          (total, item) =>
            total +
            Number(item.qty || 0) *
              Number(item.avg || 0),
          0
        );

      // =========================
      // CURRENT VALUE
      // =========================

      const equity =
        holdings.reduce(
          (total, item) =>
            total +
            Number(item.qty || 0) *
              Number(item.price || 0),
          0
        );

      // =========================
      // UNREALIZED P/L
      // =========================

      const unrealizedPnL =
        holdings.reduce(
          (total, item) =>
            total + getPnL(item),
          0
        );

      // =========================
      // UNREALIZED P/L %
      // =========================

      const unrealizedPnLPercent =
        investment > 0
          ? (unrealizedPnL /
              investment) *
            100
          : 0;

      // =========================
      // REALIZED P/L
      // =========================

      const realizedPnL =
        transactions.reduce(
          (total, transaction) =>
            total +
            Number(
              transaction.pnl || 0
            ),
          0
        );

      // =========================
      // TOTAL P/L
      // =========================

      const totalPnL =
        unrealizedPnL +
        realizedPnL;

      // =========================
      // TOTAL P/L %
      // =========================

      const totalPnLPercent =
        investment > 0
          ? (totalPnL / investment) *
            100
          : 0;

      // =========================
      // SET SUMMARY
      // =========================

      setSummary({
        equity,

        investment,

        holdings:
          holdings.length,

        orders:
          orders.length,

        funds:
          Number(
            funds.available || 0
          ),

        unrealizedPnL,

        unrealizedPnLPercent,

        realizedPnL,

        totalPnL,

        totalPnLPercent,
      });

    } catch (err) {

      console.error(
        "SUMMARY ERROR:",
        err
      );

      setSummary({
        equity: 0,
        investment: 0,

        holdings: 0,
        orders: 0,
        funds: 0,

        unrealizedPnL: 0,
        unrealizedPnLPercent: 0,

        realizedPnL: 0,

        totalPnL: 0,
        totalPnLPercent: 0,
      });

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="container-fluid mb-4">

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="text-muted mb-3">
          Loading portfolio summary...
        </div>
      )}

      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="row g-3">

        {/* PORTFOLIO */}

        <div className="col-md-4 col-lg-2">

          <div className="card shadow-sm p-3 h-100">

            <h6>
              Portfolio
            </h6>

            <h4>
              ₹
              {summary.equity.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h4>

          </div>

        </div>

        {/* INVESTMENT */}

        <div className="col-md-4 col-lg-2">

          <div className="card shadow-sm p-3 h-100">

            <h6>
              Investment
            </h6>

            <h4>
              ₹
              {summary.investment.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h4>

          </div>

        </div>

        {/* UNREALIZED P/L */}

        <div className="col-md-4 col-lg-2">

          <div className="card shadow-sm p-3 h-100">

            <h6>
              Unrealized P/L
            </h6>

            <h4
              className={
                summary.unrealizedPnL >= 0
                  ? "text-success"
                  : "text-danger"
              }
            >

              {summary.unrealizedPnL >= 0
                ? "+"
                : "-"}

              ₹
              {Math.abs(
                summary.unrealizedPnL
              ).toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}

              <small className="ms-1">
                (
                {summary.unrealizedPnL >= 0
                  ? "+"
                  : ""}
                {summary.unrealizedPnLPercent.toFixed(
                  2
                )}
                %)
              </small>

            </h4>

          </div>

        </div>

        {/* REALIZED P/L */}

        <div className="col-md-4 col-lg-2">

          <div className="card shadow-sm p-3 h-100">

            <h6>
              Realized P/L
            </h6>

            <h4
              className={
                summary.realizedPnL >= 0
                  ? "text-success"
                  : "text-danger"
              }
            >

              {summary.realizedPnL >= 0
                ? "+"
                : "-"}

              ₹
              {Math.abs(
                summary.realizedPnL
              ).toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}

            </h4>

          </div>

        </div>

        {/* TOTAL P/L */}

        <div className="col-md-4 col-lg-2">

          <div className="card shadow-sm p-3 h-100">

            <h6>
              Total P/L
            </h6>

            <h4
              className={
                summary.totalPnL >= 0
                  ? "text-success"
                  : "text-danger"
              }
            >

              {summary.totalPnL >= 0
                ? "+"
                : "-"}

              ₹
              {Math.abs(
                summary.totalPnL
              ).toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}

              <small className="ms-1">
                (
                {summary.totalPnL >= 0
                  ? "+"
                  : ""}
                {summary.totalPnLPercent.toFixed(
                  2
                )}
                %)
              </small>

            </h4>

          </div>

        </div>

        {/* FUNDS */}

        <div className="col-md-4 col-lg-2">

          <div className="card shadow-sm p-3 h-100">

            <h6>
              Funds
            </h6>

            <h4>
              ₹
              {summary.funds.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h4>

          </div>

        </div>

      </div>

      {/* =========================
          SECOND ROW
      ========================= */}

      <div className="row g-3 mt-1">

        {/* HOLDINGS */}

        <div className="col-md-6">

          <div className="card shadow-sm p-3">

            <h6>
              Holdings
            </h6>

            <h4>
              {summary.holdings}
            </h4>

          </div>

        </div>

        {/* ORDERS */}

        <div className="col-md-6">

          <div className="card shadow-sm p-3">

            <h6>
              Orders
            </h6>

            <h4>
              {summary.orders}
            </h4>

          </div>

        </div>

      </div>

      {/* =========================
          ACTIONS
      ========================= */}

      <div className="mt-4 d-flex gap-3">

        <Link
          to="/transactions"
          className="btn btn-primary"
        >
          Transactions
        </Link>

        <button
          type="button"
          className="btn btn-success"
          onClick={fetchSummary}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "↻ Refresh"}
        </button>

      </div>

    </div>
  );
}

export default Summary;