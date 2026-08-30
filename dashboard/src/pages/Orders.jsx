import "./orders.css";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import API from "../api/api";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res =
        await API.get("/orders");

      const data =
        Array.isArray(res.data)
          ? res.data
          : [];

      // Latest order first
      const sortedOrders =
        [...data].sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

      setOrders(sortedOrders);

    } catch (err) {
      console.error(
        "GET ORDERS ERROR:",
        err
      );

      setOrders([]);

      toast.error(
        err.response?.data?.message ||
          "Unable to load orders"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD + AUTO REFRESH
  // =========================

  useEffect(() => {
    fetchOrders();

    const handleOrderUpdated = () => {
      fetchOrders();
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

  const filteredOrders =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return orders;
      }

      return orders.filter(
        (order) =>
          String(
            order.name || ""
          )
            .toLowerCase()
            .includes(query)
      );
    }, [orders, search]);

  // =========================
  // TOTAL BUY VALUE
  // =========================

  const totalBuy =
    filteredOrders
      .filter(
        (order) =>
          order.mode === "BUY"
      )
      .reduce(
        (sum, order) =>
          sum +
          Number(order.qty || 0) *
            Number(
              order.price || 0
            ),
        0
      );

  // =========================
  // TOTAL SELL VALUE
  // =========================

  const totalSell =
    filteredOrders
      .filter(
        (order) =>
          order.mode === "SELL"
      )
      .reduce(
        (sum, order) =>
          sum +
          Number(order.qty || 0) *
            Number(
              order.price || 0
            ),
        0
      );

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "-";
    }

    return parsed.toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  return (
    <div className="container mt-4">

      {/* =========================
          HEADER
      ========================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="mb-1">
            Orders
          </h2>

          <small className="text-muted">
            Your BUY and SELL orders
          </small>
        </div>

        <div className="d-flex gap-2">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Stock..."
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
            onClick={fetchOrders}
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

        {/* TOTAL ORDERS */}

        <div className="col-md-4 mb-3">

          <div className="card shadow-sm p-3">

            <h6>
              Total Orders
            </h6>

            <h4>
              {filteredOrders.length}
            </h4>

          </div>

        </div>

        {/* BUY VALUE */}

        <div className="col-md-4 mb-3">

          <div className="card shadow-sm p-3">

            <h6>
              BUY Value
            </h6>

            <h4 className="text-success">
              ₹
              {totalBuy.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2,
                }
              )}
            </h4>

          </div>

        </div>

        {/* SELL VALUE */}

        <div className="col-md-4 mb-3">

          <div className="card shadow-sm p-3">

            <h6>
              SELL Value
            </h6>

            <h4 className="text-danger">
              ₹
              {totalSell.toLocaleString(
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
          TABLE
      ========================= */}

      <div className="table-responsive">

        <table className="table table-hover table-bordered align-middle">

          <thead className="table-dark">

            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-4"
                >
                  Loading Orders...
                </td>

              </tr>

            ) : filteredOrders.length > 0 ? (

              filteredOrders.map(
                (order) => {

                  const qty =
                    Number(
                      order.qty || 0
                    );

                  const price =
                    Number(
                      order.price || 0
                    );

                  const amount =
                    qty * price;

                  const isBuy =
                    order.mode ===
                    "BUY";

                  return (
                    <tr
                      key={
                        order._id
                      }
                    >

                      {/* DATE */}

                      <td>
                        {formatDate(
                          order.createdAt
                        )}
                      </td>

                      {/* STOCK */}

                      <td>
                        <strong>
                          {order.name ||
                            "Unknown Stock"}
                        </strong>
                      </td>

                      {/* QTY */}

                      <td>
                        {qty}
                      </td>

                      {/* PRICE */}

                      <td>
                        ₹
                        {price.toLocaleString(
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
                          {amount.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </strong>
                      </td>

                      {/* MODE */}

                      <td>

                        <span
                          className={
                            isBuy
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {order.mode ||
                            "-"}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span className="badge bg-primary">
                          {order.status ||
                            "COMPLETED"}
                        </span>

                      </td>

                    </tr>
                  );
                }
              )

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center text-muted py-4"
                >
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;