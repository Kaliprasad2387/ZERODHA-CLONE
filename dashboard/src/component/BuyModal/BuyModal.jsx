import { useState } from "react";
import { toast } from "react-toastify";

import API from "../../api/api";
import "./BuyModal.css";

function BuyModal({
  stock,
  onClose,
  onOrderSuccess,
}) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!stock) {
    return null;
  }

  const price = Number(stock.price) || 0;
  const quantity = Number(qty) || 0;

  const total =
    quantity * price;

  // =========================
  // BUY ORDER
  // =========================

  const handleBuy = async () => {

    // =========================
    // VALIDATION
    // =========================

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      toast.error(
        "Quantity must be a whole number greater than 0"
      );
      return;
    }

    if (price <= 0) {
      toast.error(
        "Invalid stock price"
      );
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        name: stock.name,
        qty: quantity,
        price,
        mode: "BUY",
      };

      // =========================
      // API REQUEST
      // =========================

      const response =
        await API.post(
          "/orders",
          orderData
        );

      // =========================
      // SUCCESS MESSAGE
      // =========================

      toast.success(
        response.data.message ||
          "Buy Order Placed Successfully"
      );

      // =========================
      // CLOSE MODAL
      // =========================

      onClose();

      // =========================
      // REFRESH PARENT DATA
      // =========================

      if (onOrderSuccess) {
        onOrderSuccess(
          response.data
        );
      }

      // =========================
      // UPDATE OTHER PAGES
      // =========================

      window.dispatchEvent(
        new Event("orderUpdated")
      );

    } catch (err) {

      console.error(
        "BUY ORDER ERROR:",
        err
      );

      console.error(
        "SERVER RESPONSE:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to place buy order"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Buy {stock.name}
        </h2>

        <hr />

        <p>
          Market Price:

          <strong>
            {" "}₹
            {price.toLocaleString(
              "en-IN"
            )}
          </strong>
        </p>

        <input
          type="number"
          min="1"
          step="1"
          value={qty}
          disabled={loading}
          onChange={(e) =>
            setQty(
              Number(e.target.value)
            )
          }
        />

        <h4>
          Total:

          <span
            style={{
              color: "#16a34a",
            }}
          >
            {" "}₹
            {total.toLocaleString(
              "en-IN"
            )}
          </span>
        </h4>

        <div className="btn-group">

          <button
            type="button"
            className="buy-btn"
            disabled={loading}
            onClick={handleBuy}
          >
            {loading
              ? "Processing..."
              : "Confirm Buy"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default BuyModal;