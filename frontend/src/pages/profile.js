import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css"; // Import the matching CSS

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <p className="text-center text-brown mt-20 animate-fadeInUp">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="fe-bg fe-profile-bg">
      <img
        className="fe-profile-bgimg"
        src="profile.png"
        alt="Loading..."
      />
      <div className="fe-profile-bg-overlay" />
      <div className="fe-profile-outer">
        <div className="fe-profile-card max-w-xl w-full animate-fadeInUp">
          <div className="fe-profile-header">
            <img
              src="/profile-placeholder.png"
              alt="Profile"
              className="fe-profile-avatar"
              style={{ objectFit: "cover" }}
            />

            <h2 className="fe-profile-name">
              {profile.name || profile.username || "Your Name"}
            </h2>
            <p className="fe-profile-role">FoodBridge Member</p>
          </div>

          <div className="fe-profile-info space-y-3">
            <div>
              <span className="fe-label">Username:</span>
              <span className="fe-value">{profile.username}</span>
            </div>
            <div>
              <span className="fe-label">Email:</span>
              <span className="fe-value">{profile.email}</span>
            </div>
            <div>
              <span className="fe-label">Donations:</span>
              <span className="fe-value">{profile.donation_count}</span>
            </div>
            <div>
              <span className="fe-label">Badge:</span>
              <span
                className={
                  profile.badge === "Bronze Donor"
                    ? "fe-badge bronze-gradient"
                    : "fe-badge"
                }
              >
                {profile.badge}
              </span>
            </div>
          </div>

          <button className="fe-btn fe-btn-gold mt-5">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
