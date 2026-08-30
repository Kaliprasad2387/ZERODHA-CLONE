const User = require("../models/user");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const sendEmail = require("../utils/sendEmail");

// ================= SEND OTP =================

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail(
      email,
      "Zerodha Clone OTP",
      `Your OTP is ${otp}. It is valid for 5 minutes.`
    );

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= VERIFY OTP =================

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDoc = await Otp.findOne({ email });

    if (!otpDoc) {
      return res.status(404).json({
        message: "OTP Not Found",
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      await Otp.deleteMany({ email });

      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await Otp.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= RESEND OTP =================

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail(
      email,
      "Zerodha Clone OTP",
      `Your New OTP is ${otp}.`
    );

    res.status(200).json({
      success: true,
      message: "OTP Resent Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};