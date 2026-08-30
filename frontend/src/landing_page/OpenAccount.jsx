import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      <h1>Open a Zerodha Account</h1>

      <p
        style={{
          color: "gray",
          fontSize: "18px",
          marginTop: "15px",
        }}
      >
        Modern platform and mobile apps with zero brokerage on equity delivery.
      </p>

      <Link to="/signup">
        <button
          style={{
            marginTop: "30px",
            padding: "12px 35px",
            background: "#387ed1",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Sign up for Free
        </button>
      </Link>
    </div>
  );
}

export default OpenAccount;