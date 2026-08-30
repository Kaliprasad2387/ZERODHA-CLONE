import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="container my-5">
      <div className="row align-items-center gy-5">

        {/* Left Side */}
        <div className="col-lg-5">
          <h2 className="fw-bold mb-4">Unbeatable pricing</h2>

          <p
            className="text-muted"
            style={{
              fontSize: "18px",
              lineHeight: "32px",
            }}
          >
            We pioneered the concept of discount broking and price transparency
            in India. Flat ₹20 per order and free equity delivery.
          </p>

          <Link
            to="/pricing"
            className="text-decoration-none fw-semibold"
          >
            See Pricing →
          </Link>
        </div>

        {/* Right Side */}
        <div className="col-lg-7">
          <div className="row text-center">

            <div className="col-4">
              <h1 className="text-primary fw-light">₹0</h1>
              <p className="text-muted mb-0">
                Free equity delivery
              </p>
            </div>

            <div className="col-4">
              <h1 className="text-primary fw-light">₹20</h1>
              <p className="text-muted mb-0">
                Intraday & F&O
              </p>
            </div>

            <div className="col-4">
              <h1 className="text-primary fw-light">0%</h1>
              <p className="text-muted mb-0">
                Commission on MF
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Pricing;