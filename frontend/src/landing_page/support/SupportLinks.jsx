import React from "react";

function SupportLinks() {
  return (
    <div className="container py-5">
      <div className="row">

        <div className="col-md-4">
          <h5>📊 Console</h5>
          <ul className="list-unstyled mt-3">
            <li><a href="#" className="text-decoration-none">Portfolio</a></li>
            <li><a href="#" className="text-decoration-none">Reports</a></li>
            <li><a href="#" className="text-decoration-none">Tax P&L</a></li>
            <li><a href="#" className="text-decoration-none">Corporate actions</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5>📱 Kite</h5>
          <ul className="list-unstyled mt-3">
            <li><a href="#" className="text-decoration-none">Orders</a></li>
            <li><a href="#" className="text-decoration-none">Positions</a></li>
            <li><a href="#" className="text-decoration-none">Watchlist</a></li>
            <li><a href="#" className="text-decoration-none">Charts</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5>💳 IPO & Mutual Funds</h5>
          <ul className="list-unstyled mt-3">
            <li><a href="#" className="text-decoration-none">IPO Application</a></li>
            <li><a href="#" className="text-decoration-none">Mutual Funds</a></li>
            <li><a href="#" className="text-decoration-none">Coin</a></li>
            <li><a href="#" className="text-decoration-none">SIP</a></li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default SupportLinks;