import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "react-toastify";
import API from "../../api/api";

function OtpPage({
  email,
  onVerify,
}) {
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [timer, setTimer] =
    useState(30);

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const inputRefs =
    useRef([]);

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval =
      setInterval(() => {
        setTimer((prev) =>
          prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [timer]);

  // =========================
  // OTP INPUT
  // =========================

  const handleChange = (
    value,
    index
  ) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (
      value &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  // =========================
  // BACKSPACE
  // =========================

  const handleKeyDown = (
    e,
    index
  ) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const handleVerify = async () => {
    const otpValue =
      otp.join("");

    if (otpValue.length !== 6) {
      toast.error(
        "Please enter the 6-digit OTP"
      );
      return;
    }

    if (!email) {
      toast.error(
        "Email is missing"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await API.post(
          "/otp/verify",
          {
            email,
            otp: otpValue,
          }
        );

      toast.success(
        response.data?.message ||
          "OTP Verified Successfully"
      );

      onVerify();

    } catch (error) {
      console.error(
        "VERIFY OTP ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================

  const resendOTP = async () => {
    if (timer > 0 || resending) {
      return;
    }

    if (!email) {
      toast.error(
        "Email is missing"
      );
      return;
    }

    try {
      setResending(true);

      const response =
        await API.post(
          "/otp/resend",
          {
            email,
          }
        );

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setTimer(30);

      toast.success(
        response.data?.message ||
          "OTP Resent Successfully"
      );

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

    } catch (error) {
      console.error(
        "RESEND OTP ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to resend OTP"
      );

    } finally {
      setResending(false);
    }
  };

  return (
    <div className="otp-container">

      {/* BACK */}

      <button
        type="button"
        className="back-btn"
        onClick={() =>
          window.history.back()
        }
        disabled={loading}
      >
        ← Back
      </button>

      {/* TITLE */}

      <h2>
        Verify your email
      </h2>

      <p>
        We've sent a 6-digit OTP to
        <br />
        <strong>
          {email}
        </strong>
      </p>

      {/* OTP BOXES */}

      <div className="otp-boxes">

        {otp.map(
          (digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[
                  index
                ] = el;
              }}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  index
                )
              }
              disabled={loading}
              autoComplete="one-time-code"
            />
          )
        )}

      </div>

      {/* VERIFY */}

      <button
        type="button"
        className="verify-btn"
        onClick={handleVerify}
        disabled={
          loading || resending
        }
      >
        {loading
          ? "Verifying..."
          : "Verify OTP"}
      </button>

      {/* RESEND */}

      {timer > 0 ? (

        <p className="resend">
          Resend OTP in{" "}
          <span>
            00:
            {timer < 10
              ? `0${timer}`
              : timer}
          </span>
        </p>

      ) : (

        <p className="resend">

          <span
            style={{
              cursor:
                resending
                  ? "default"
                  : "pointer",
            }}
            onClick={
              resendOTP
            }
          >
            {resending
              ? "Sending..."
              : "Resend OTP"}
          </span>

        </p>

      )}

    </div>
  );
}

export default OtpPage;