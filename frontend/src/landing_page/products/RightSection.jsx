import React from "react";
import "./Products.css";

function RightSection({ image, title, description }) {
  return (
    <section className="container product-section">
      <div className="row align-items-center">

        {/* Content */}
        <div className="col-lg-5 product-content">
          <h2>{title}</h2>

          <p>{description}</p>

          <div className="product-links">
            <a href="#">Learn More →</a>
            <a href="#">Try Demo →</a>
          </div>
        </div>

        {/* Image */}
        <div className="col-lg-6 offset-lg-1 text-center product-image">
          <img
            src={new URL(`../../assets/${image}`, import.meta.url).href}
            alt={title}
            className="img-fluid"
          />
        </div>

      </div>
    </section>
  );
}

export default RightSection;