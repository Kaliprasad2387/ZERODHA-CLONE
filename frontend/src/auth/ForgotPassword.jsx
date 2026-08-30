import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/api";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const sendOTP = async () => {
    try {
      const res = await API.post("/password/forgot", {
        email: form.email,
      });

      toast.success(res.data.message);

      setStep(2);

    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  const resetPassword = async () => {
    try {
      const res = await API.post("/password/reset", form);

      toast.success(res.data.message);

      window.location.href = "/login";

    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value,
            })
          }
        />

        {step===2 && (
          <>
            <input
              type="text"
              placeholder="OTP"
              value={form.otp}
              onChange={(e)=>
                setForm({
                  ...form,
                  otp:e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={(e)=>
                setForm({
                  ...form,
                  password:e.target.value,
                })
              }
            />
          </>
        )}

        {step===1 ? (

          <button onClick={sendOTP}>
            Send OTP
          </button>

        ) : (

          <button onClick={resetPassword}>
            Reset Password
          </button>

        )}

      </div>

    </div>
  );
}

export default ForgotPassword;