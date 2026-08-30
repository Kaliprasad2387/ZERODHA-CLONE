const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const otpGenerator = require("otp-generator");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendEmail(
      email,
      "Reset Password OTP",
      `Your OTP is ${otp}. Valid for 5 minutes.`
    );

    res.json({
      message: "OTP Sent Successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Password Reset Successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};