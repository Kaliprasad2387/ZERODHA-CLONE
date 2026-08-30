import { Link } from "react-router-dom";
import heroImage from "../../assets/homeHero.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side - Image */}
          <div className="col-lg-6 text-center mb-5 mb-lg-0">
            <img
              src={heroImage}
              alt="Zerodha Hero"
              className="hero-image img-fluid"
            />
          </div>

          {/* Right Side - Content */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="hero-title">
              Invest in everything
            </h1>

            <p className="hero-description">
              Online platform to invest in stocks, derivatives,
              mutual funds, ETFs, bonds, and more.
            </p>

            <Link to="/signup">
              <button className="hero-btn">
                Sign up for free
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;