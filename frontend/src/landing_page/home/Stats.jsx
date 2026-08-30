import ecosystem from "../../assets/ecosystem.png";

function Stats() {
  return (
    <section className="container my-5">
      <div className="row align-items-center">

        {/* Left Content */}
        <div className="col-lg-5">
          <h2 className="fw-bold mb-4">
            Trust with confidence
          </h2>

          <div className="mb-4">
            <h5>Customer-first always</h5>
            <p className="text-muted">
              That's why 2+ crore customers trust Zerodha with their investments.
            </p>
          </div>

          <div className="mb-4">
            <h5>No spam or gimmicks</h5>
            <p className="text-muted">
              No gimmicks, spam, "gamification", or intrusive push notifications.
            </p>
          </div>

          <div>
            <h5>The Zerodha universe</h5>
            <p className="text-muted">
              More than just an app. Our ecosystem supports every type of investor.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-lg-7 text-center">
          <img
            src={ecosystem}
            alt="Ecosystem"
            className="img-fluid"
            style={{
              maxWidth: "650px",
              width: "100%",
              height: "auto",
            }}
          />
        </div>

      </div>
    </section>
  );
}

export default Stats;