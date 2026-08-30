import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          {/* Logo */}
          <div className="col-lg-4 mb-4">
            <img src={logo} alt="Zerodha" className="footer-logo" />

            <p className="text-muted mt-3">
              © 2026 Zerodha Clone.
              <br />
              All rights reserved.
            </p>

            <div className="social-icons">
              <i className="fa-brands fa-x-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-6 mb-4">
            <h5>Company</h5>

            <Link to="/about">About</Link><br />
            <Link to="/products">Products</Link><br />
            <Link to="/pricing">Pricing</Link><br />
            <Link to="/support">Support</Link>
          </div>

          {/* Account */}
          <div className="col-lg-2 col-6 mb-4">
            <h5>Account</h5>

            <Link to="/signup">Open Account</Link><br />
            <Link to="/login">Login</Link><br />
            <Link to="/register">Register</Link>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-6 mb-4">
            <h5>Resources</h5>

            <a href="#">Blog</a><br />
            <a href="#">Varsity</a><br />
            <a href="#">Careers</a>
          </div>

          {/* Legal */}
          <div className="col-lg-2 col-6 mb-4">
            <h5>Legal</h5>

            <a href="#">Privacy Policy</a><br />
            <a href="#">Terms</a><br />
            <a href="#">Disclaimer</a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;