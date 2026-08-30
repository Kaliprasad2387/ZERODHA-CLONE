const User = require("../models/User");

// =======================
// GET MY PROFILE
// =======================

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select(
      "-password -otp -otpExpiry"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error(
      "GET PROFILE ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// UPDATE MY PROFILE
// =======================

exports.updateProfile = async (req, res) => {
  try {
    const name =
      String(req.body.name || "").trim();

    const mobile =
      String(
        req.body.mobile || ""
      ).trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.user._id,
        {
          name,
          mobile,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select(
        "-password -otp -otpExpiry"
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Profile Updated Successfully",
      user,
    });

  } catch (err) {
    console.error(
      "UPDATE PROFILE ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};