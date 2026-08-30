import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api/api";

function Funds() {
  const [funds, setFunds] = useState({
    available: 0,
    used: 0,
  });

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // =========================
  // FETCH FUNDS
  // =========================

  const fetchFunds = async () => {
    try {
      setFetching(true);

      const response = await API.get("/funds");

      setFunds({
        available: Number(response.data?.available) || 0,
        used: Number(response.data?.used) || 0,
      });
    } catch (error) {
      console.error("GET FUNDS ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load funds"
      );
    } finally {
      setFetching(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchFunds();

    const handleOrderUpdated = () => {
      fetchFunds();
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
  // ADD FUNDS
  // =========================

  const addFunds = async () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/funds/add",
        {
          amount: value,
        }
      );

      const fund = response.data?.fund;

      if (!fund) {
        throw new Error(
          "Invalid fund response"
        );
      }

      setFunds({
        available:
          Number(fund.available) || 0,
        used:
          Number(fund.used) || 0,
      });

      setAmount("");

      toast.success(
        "Funds Added Successfully"
      );
    } catch (error) {
      console.error(
        "ADD FUNDS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to add funds"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // WITHDRAW FUNDS
  // =========================

  const withdrawFunds = async () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (value > funds.available) {
      toast.error(
        "Insufficient available funds"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/funds/withdraw",
        {
          amount: value,
        }
      );

      const fund = response.data?.fund;

      if (!fund) {
        throw new Error(
          "Invalid fund response"
        );
      }

      setFunds({
        available:
          Number(fund.available) || 0,
        used:
          Number(fund.used) || 0,
      });

      setAmount("");

      toast.success(
        "Funds Withdrawn Successfully"
      );
    } catch (error) {
      console.error(
        "WITHDRAW FUNDS ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to withdraw funds"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CALCULATIONS
  // =========================

  const available =
    Number(funds.available) || 0;

  const used =
    Number(funds.used) || 0;

  const totalFunds =
    available + used;

  const formatMoney = (value) => {
    return Number(value).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (fetching) {
    return (
      <div className="container mt-5 text-center">
        <h4>
          Loading Funds...
        </h4>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="container mt-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          Funds
        </h2>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={fetchFunds}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "↻ Refresh"}
        </button>

      </div>

      {/* FUND CARDS */}

      <div className="row">

        {/* AVAILABLE */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Available Balance
            </h6>

            <h3 className="text-success">
              ₹
              {formatMoney(
                available
              )}
            </h3>

            <small className="text-muted">
              Available for trading
            </small>

          </div>

        </div>

        {/* USED */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Used Margin
            </h6>

            <h3 className="text-danger">
              ₹
              {formatMoney(
                used
              )}
            </h3>

            <small className="text-muted">
              Money invested
            </small>

          </div>

        </div>

        {/* TOTAL */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Total Funds
            </h6>

            <h3 className="text-primary">
              ₹
              {formatMoney(
                totalFunds
              )}
            </h3>

            <small className="text-muted">
              Available + Used
            </small>

          </div>

        </div>

        {/* WITHDRAWABLE */}

        <div className="col-md-3 mb-3">

          <div className="card p-3 shadow-sm h-100">

            <h6>
              Withdrawable
            </h6>

            <h3 className="text-success">
              ₹
              {formatMoney(
                available
              )}
            </h3>

            <small className="text-muted">
              Maximum withdrawable
            </small>

          </div>

        </div>

      </div>

      {/* MANAGE FUNDS */}

      <div className="card shadow-sm p-4 mt-4">

        <h4 className="mb-2">
          Manage Funds
        </h4>

        <p className="text-muted">
          Add money to your trading account
          or withdraw available balance.
        </p>

        <input
          type="number"
          min="1"
          step="0.01"
          className="form-control mb-3"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          disabled={loading}
        />

        <div className="d-flex gap-2">

          {/* ADD */}

          <button
            type="button"
            className="btn btn-success"
            onClick={addFunds}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Add Funds"}
          </button>

          {/* WITHDRAW */}

          <button
            type="button"
            className="btn btn-danger"
            onClick={withdrawFunds}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Withdraw"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Funds;