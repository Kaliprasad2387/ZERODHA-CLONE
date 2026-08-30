import "./Profile.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../api/api";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [originalUser, setOriginalUser] =
    useState({
      name: "",
      email: "",
      mobile: "",
    });

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // =========================
  // LOAD PROFILE
  // =========================

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res =
        await API.get("/profile");

      const profile = {
        name:
          res.data?.name || "",

        email:
          res.data?.email || "",

        mobile:
          res.data?.mobile || "",
      };

      setUser(profile);

      setOriginalUser(profile);

      // Keep localStorage in sync
      const oldUser =
        JSON.parse(
          localStorage.getItem("user") ||
            "{}"
        );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          ...profile,
        })
      );

    } catch (err) {
      console.error(
        "PROFILE ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Unable to load profile"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadProfile();
  }, []);

  // =========================
  // UPDATE PROFILE
  // =========================

  const updateProfile = async () => {
    const name =
      user.name.trim();

    const mobile =
      user.mobile.trim();

    if (!name) {
      toast.error(
        "Name is required"
      );
      return;
    }

    try {
      setSaving(true);

      const res =
        await API.put(
          "/profile",
          {
            name,
            mobile,
          }
        );

      const updatedUser = {
        name:
          res.data?.user?.name ||
          name,

        email:
          res.data?.user?.email ||
          user.email,

        mobile:
          res.data?.user?.mobile ||
          mobile,
      };

      setUser(updatedUser);

      setOriginalUser(
        updatedUser
      );

      // Update localStorage
      const oldUser =
        JSON.parse(
          localStorage.getItem("user") ||
            "{}"
        );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          ...updatedUser,
        })
      );

      toast.success(
        "Profile Updated Successfully"
      );

      setEditing(false);

    } catch (err) {
      console.error(
        "PROFILE UPDATE ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Profile update failed"
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setUser(originalUser);

    setEditing(false);
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "http://localhost:5173/login";
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="profile-loading">

        <h4>
          Loading Profile...
        </h4>

      </div>
    );
  }

  // =========================
  // PROFILE
  // =========================

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* HEADER */}

        <div className="profile-header">

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "User"
            )}&background=387ed1&color=fff&size=120`}
            alt="Profile"
            className="profile-avatar"
          />

          <h2>
            My Profile
          </h2>

          <p>
            Manage your account
            information
          </p>

        </div>

        {/* NAME */}

        <div className="profile-field">

          <label>
            Full Name
          </label>

          <input
            type="text"
            value={user.name}
            disabled={!editing}
            placeholder="Enter your name"
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
          />

        </div>

        {/* EMAIL */}

        <div className="profile-field">

          <label>
            Email
          </label>

          <input
            type="email"
            value={user.email}
            disabled
          />

          <small>
            Email cannot be changed.
          </small>

        </div>

        {/* MOBILE */}

        <div className="profile-field">

          <label>
            Mobile Number
          </label>

          <input
            type="tel"
            value={user.mobile}
            disabled={!editing}
            placeholder="Enter mobile number"
            onChange={(e) =>
              setUser({
                ...user,
                mobile:
                  e.target.value,
              })
            }
          />

        </div>

        {/* ACTIONS */}

        {!editing ? (

          <button
            type="button"
            className="profile-edit-btn"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit Profile
          </button>

        ) : (

          <div className="profile-actions">

            <button
              type="button"
              className="profile-save-btn"
              onClick={
                updateProfile
              }
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              className="profile-cancel-btn"
              onClick={
                cancelEdit
              }
              disabled={saving}
            >
              Cancel
            </button>

          </div>

        )}

        {/* LOGOUT */}

        <button
          type="button"
          className="profile-logout-btn"
          onClick={logout}
          disabled={saving}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;