import React from "react";

function Charges() {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Charges</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Segment</th>
            <th>Brokerage</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Equity Delivery</td>
            <td>₹0</td>
          </tr>

          <tr>
            <td>Equity Intraday</td>
            <td>0.03% or ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Equity Futures</td>
            <td>0.03% or ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Equity Options</td>
            <td>Flat ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Currency Futures</td>
            <td>0.03% or ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Currency Options</td>
            <td>Flat ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Commodity Futures</td>
            <td>0.03% or ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Commodity Options</td>
            <td>Flat ₹20 per executed order</td>
          </tr>

          <tr>
            <td>Direct Mutual Funds</td>
            <td>₹0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Charges;