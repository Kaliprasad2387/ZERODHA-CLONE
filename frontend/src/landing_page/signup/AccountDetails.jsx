import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../../api/api";

function AccountDetails({ email }) {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: email || "",
      password: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName =
      formData.fullName.trim();

    const userEmail =
      formData.email.trim().toLowerCase();

    const password =
      formData.password;

    const confirmPassword =
      formData.confirmPassword;

    if (
      !fullName ||
      !userEmail ||
      !password ||
      !confirmPassword
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/auth/register",
          {
            name: fullName,
            email: userEmail,
            password,
          }
        );

      toast.success(
        response.data?.message ||
          "Account Created Successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(
        "ACCOUNT REGISTRATION ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card shadow border-0 p-4">

            <h2 className="text-center mb-2">
              Complete your profile
            </h2>

            <p className="text-center text-muted mb-4">
              Create your trading account
            </p>

            <form
              onSubmit={handleSubmit}
            >

              {/* FULL NAME */}

              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  disabled={loading}
                  required
                />

                <small className="text-success">
                  ✓ Email verified
                </small>

              </div>

              {/* PASSWORD */}

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  minLength={6}
                  disabled={loading}
                  required
                />

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="mb-4">

                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  minLength={6}
                  disabled={loading}
                  required
                />

              </div>

              {/* SUBMIT */}

              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AccountDetails;