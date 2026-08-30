import React, { useState } from "react";

import Hero from "./Hero";
import OtpPage from "./OtpPage";
import AccountDetails from "./AccountDetails";

function SignupPage() {
  const [step, setStep] =
    useState(1);

  const [email, setEmail] =
    useState("");

  // =========================
  // HERO → OTP
  // =========================

  const handleContinue = (
    userEmail
  ) => {
    setEmail(userEmail);
    setStep(2);
  };

  // =========================
  // OTP → ACCOUNT DETAILS
  // =========================

  const handleVerify = () => {
    setStep(3);
  };

  return (
    <>
      {step === 1 && (
        <Hero
          onContinue={
            handleContinue
          }
        />
      )}

      {step === 2 && (
        <OtpPage
          email={email}
          onVerify={
            handleVerify
          }
        />
      )}

      {step === 3 && (
        <AccountDetails
          email={email}
        />
      )}
    </>
  );
}

export default SignupPage;