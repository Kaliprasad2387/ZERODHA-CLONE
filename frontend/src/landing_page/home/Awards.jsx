
import largestBroker from "../../assets/largestBroker.svg";

function Awards() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">

        {/* Left Side */}
        <div className="col-lg-6 text-center mb-5 mb-lg-0">
          <img
            src={largestBroker}
            alt="Largest Broker"
            className="img-fluid"
            style={{
              maxWidth: "90%",
              height: "auto",
            }}
          />
        </div>

        {/* Right Side */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-4">
            Largest stock broker in India
          </h2>

          <p className="text-muted fs-5">
            2+ crore Zerodha clients contribute to over 15% of all retail order
            volumes in India daily by trading and investing in:
          </p>

          <div className="row mt-4">
            <div className="col-6">
              <ul className="lh-lg">
                <li>Stocks</li>
                <li>F&O</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>

            <div className="col-6">
              <ul className="lh-lg">
                <li>Mutual Funds</li>
                <li>Bonds</li>
                <li>ETFs</li>
                <li>Government Securities</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Awards;