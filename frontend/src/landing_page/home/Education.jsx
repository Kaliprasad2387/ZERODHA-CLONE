import educationImage from "../../assets/education.svg";

function Education() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">

        {/* Left Side Image */}
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img
            src={educationImage}
            alt="Education"
            className="img-fluid"
            style={{
              maxWidth: "500px",
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* Right Side Content */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-4">
            Free and open market education
          </h2>

          <p
            className="text-muted"
            style={{
              fontSize: "18px",
              lineHeight: "32px",
            }}
          >
            Varsity is one of the largest online stock market education books
            in the world, covering everything from the basics to advanced
            trading.
          </p>

          <a href="#" className="text-decoration-none fw-semibold">
            Learn More →
          </a>
        </div>

      </div>
    </section>
  );
}

export default Education;