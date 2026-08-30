import { useState } from "react";
import { toast } from "react-toastify";

import API from "../../api/api";
import "./SellModal.css";

function SellModal({
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
  // SELL ORDER
  // =========================

  const handleSell = async () => {
    console.log(
      "🔥 SELL BUTTON CLICKED"
    );

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
        mode: "SELL",
      };

      console.log(
        "📤 SELL ORDER REQUEST:",
        orderData
      );

      // =========================
      // API REQUEST
      // =========================

      const response =
        await API.post(
          "/orders",
          orderData
        );

      console.log(
        "✅ SELL ORDER RESPONSE:",
        response.data
      );

      console.log(
        "💰 REALIZED P/L:",
        response.data.realizedPnL
      );

      console.log(
        "📄 TRANSACTION:",
        response.data.transaction
      );

      // =========================
      // SUCCESS MESSAGE
      // =========================

      const realizedPnL =
        Number(
          response.data.realizedPnL || 0
        );

      if (realizedPnL > 0) {

        toast.success(
          `Sell Successful! Realized P/L: +₹${realizedPnL.toLocaleString(
            "en-IN"
          )}`
        );

      } else if (realizedPnL < 0) {

        toast.error(
          `Sell Successful! Realized P/L: -₹${Math.abs(
            realizedPnL
          ).toLocaleString(
            "en-IN"
          )}`
        );

      } else {

        toast.success(
          response.data.message ||
            "Sell Order Placed Successfully"
        );
      }

      // =========================
      // CLOSE MODAL
      // =========================

      onClose();

      // =========================
      // TELL PARENT
      // =========================

      if (onOrderSuccess) {
        onOrderSuccess(
          response.data
        );
      }
      window.dispatchEvent(
  new Event("orderUpdated")
);

    } catch (err) {

      console.error(
        "❌ SELL ORDER ERROR:",
        err
      );

      console.error(
        "❌ SERVER RESPONSE:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to place sell order"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* TITLE */}

        <h2>
          Sell {stock.name}
        </h2>

        <hr />

        {/* PRICE */}

        <p>
          Current Price:

          <strong>
            {" "}₹
            {price.toLocaleString(
              "en-IN"
            )}
          </strong>
        </p>

        {/* QUANTITY */}

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

        {/* TOTAL */}

        <h4>
          Total:

          <span
            style={{
              color: "#dc2626",
            }}
          >
            {" "}₹
            {total.toLocaleString(
              "en-IN"
            )}
          </span>
        </h4>

        {/* BUTTONS */}

        <div className="btn-group">

          <button
            type="button"
            className="sell-btn"
            onClick={handleSell}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Confirm Sell"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default SellModal;