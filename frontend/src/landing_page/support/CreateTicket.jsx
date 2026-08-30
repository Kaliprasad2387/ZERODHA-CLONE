import React from "react";

function CreateTicket() {
  return (
    <div className="container py-5">

      <h2 className="mb-5">
        To create a ticket, select a relevant topic
      </h2>

      <div className="row gy-5">

        <div className="col-md-4">
          <h5 className="mb-3">📈 Account Opening</h5>

          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-decoration-none">Resident individual</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Minor account</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">NRI account</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Company, Partnership & HUF</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Charges at Zerodha</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5 className="mb-3">👤 Your Zerodha Account</h5>

          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-decoration-none">Login credentials</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Password reset</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Profile update</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Bank account</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Nomination</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5 className="mb-3">💰 Funds</h5>

          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-decoration-none">Add funds</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Withdraw funds</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Fund statement</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Bank transfer issues</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">UPI payments</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5 className="mb-3">📱 Kite</h5>

          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-decoration-none">Orders & Trades</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Positions</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Holdings</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Charts</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5 className="mb-3">📊 Console</h5>

          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-decoration-none">Portfolio</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Reports</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Tax P&L</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Corporate actions</a></li>
          </ul>
        </div>

        <div className="col-md-4">
          <h5 className="mb-3">🪙 Coin & IPO</h5>

          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-decoration-none">Mutual Funds</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">SIP</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">IPO Application</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none">Mandates</a></li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default CreateTicket;