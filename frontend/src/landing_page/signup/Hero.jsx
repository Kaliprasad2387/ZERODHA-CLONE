import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";

function Hero({ onContinue }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================

  const handleContinue = async (e) => {
    e.preventDefault();

    const userEmail =
      email.trim().toLowerCase();

    if (!userEmail) {
      toast.error(
        "Please enter your email"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/otp/send",
          {
            email: userEmail,
          }
        );

      toast.success(
        response.data?.message ||
          "OTP Sent Successfully"
      );

      // Pass email to next step
      onContinue(userEmail);

    } catch (error) {
      console.error(
        "SEND OTP ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to send OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-hero">

      <div className="signup-content">

        <h1>
          Open a free account
        </h1>

        <p>
          Start investing and trading
          with our simple and powerful
          platform.
        </p>

        <form
          onSubmit={handleContinue}
        >

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              disabled={loading}
            />

          </div>

          <button
            type="submit"
            className="continue-btn"
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Continue"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Hero;