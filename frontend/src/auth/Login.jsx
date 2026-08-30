import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/login",
        form
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (!res.data.token) {
        toast.error("Login token not received");
        return;
      }

      // =================================
      // SAVE TOKEN
      // =================================

      localStorage.setItem(
        "token",
        res.data.token
      );

      // =================================
      // SAVE USER
      // =================================

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
          ? "TOKEN FOUND"
          : "TOKEN NULL"
      );

      toast.success("Login Successful");

      // =================================
      // GO TO DASHBOARD
      // =================================

      setTimeout(() => {
        const token = encodeURIComponent(
          res.data.token
        );

        const user = encodeURIComponent(
          JSON.stringify(res.data.user)
        );

        window.location.href =
          `http://localhost:5174/?token=${token}&user=${user}`;
      }, 700);

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <form
        className="auth-box"
        onSubmit={handleSubmit}
      >

        <h2>Zerodha Login</h2>

        <p className="auth-subtitle">
          Login to your trading account
        </p>

        {/* EMAIL */}

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

        </div>

        {/* PASSWORD */}

        <div className="form-group">

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

        </div>

        {/* FORGOT PASSWORD */}

        <div className="forgot-password">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

        {/* LOGIN */}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* REGISTER */}

        <p className="register-text">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;