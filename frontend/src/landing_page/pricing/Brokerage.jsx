import React from "react";

function Brokerage() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row text-center">

        <div className="col-md-4">
          <h1 className="display-4 text-primary">₹0</h1>
          <h4 className="mt-3">Free equity delivery</h4>
          <p className="text-muted">
            All equity delivery investments are absolutely free.
          </p>
        </div>

        <div className="col-md-4">
          <h1 className="display-4 text-primary">₹20</h1>
          <h4 className="mt-3">Intraday & F&O</h4>
          <p className="text-muted">
            Flat ₹20 or 0.03% per executed order, whichever is lower.
          </p>
        </div>

        <div className="col-md-4">
          <h1 className="display-4 text-primary">Free</h1>
          <h4 className="mt-3">Direct Mutual Funds</h4>
          <p className="text-muted">
            Invest in direct mutual funds with no commission.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Brokerage;