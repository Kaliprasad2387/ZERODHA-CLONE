import React from "react";

function Hero() {
  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#387ed1", color: "white" }}
    >
      <div className="container">

        <div className="row mb-4">
          <div className="col-md-6">
            <h3>Support Portal</h3>
          </div>

          <div className="col-md-6 text-md-end">
            <a
              href="#"
              className="text-white text-decoration-underline"
            >
              Track tickets
            </a>
          </div>
        </div>

        <div className="row align-items-center">

          <div className="col-lg-7">
            <h2 className="fw-bold mb-4">
              Search for an answer or browse help topics
            </h2>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Eg: How do I activate F&O? Why is my order getting rejected?"
            />

            <div className="mt-4">
              <a href="#" className="text-white me-4">
                Track account opening
              </a>

              <a href="#" className="text-white me-4">
                Track segment activation
              </a>

              <a href="#" className="text-white">
                Intraday margins
              </a>
            </div>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0">
            <h4>Featured</h4>

            <ol className="mt-3">
              <li className="mb-2">
                Current Takeovers and Delisting – July 2026
              </li>

              <li className="mb-2">
                Latest Margin Reporting Circular
              </li>

              <li className="mb-2">
                How to activate F&O in your account
              </li>
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Hero;