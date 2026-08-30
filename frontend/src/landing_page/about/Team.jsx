import nithinKamath from "../../assets/nithinKamath.jpg";

function Team() {
  return (
    <section className="container py-5">

      <h2 className="text-center mb-5">People</h2>

      <div className="row align-items-center">

        <div className="col-md-4 text-center">

          <img
            src={nithinKamath}
            alt="Nithin Kamath"
            className="img-fluid rounded-circle"
            style={{ width: "250px" }}
          />

          <h4 className="mt-3">Nithin Kamath</h4>

          <p className="text-muted">
            Founder & CEO
          </p>

        </div>

        <div className="col-md-8">

          <p>
            Nithin Kamath founded Zerodha in 2010 with the vision of making
            investing simple and affordable for everyone.
          </p>

          <p>
            Today, Zerodha is India's largest stock broker and continues to
            innovate in the fintech ecosystem.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Team;