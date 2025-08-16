import React, { useEffect, useState } from "react";
import axios from "axios";
import generateCertificate from "../utils/generateCertificate";
import "../styles/Donation.css";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);

  // Retrieve user info
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}
  const userDisplay = user?.username || user?.name || user?.email || "Valued Donor";

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5001/my-donations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(res.data);
      } catch {
        setDonations([]);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="fe-bg">
      {/* Hero Section - centered */}
      <section className="fe-hero">
        <img
          src="/donation-community.png"
          alt="Community Food Donation"
          className="fe-hero-img"
        />
        <div className="fe-hero-text">
          <h1 className="fe-title mb-4">My Donations</h1>
          <p className="fe-hero-subtitle">
            Every meal you share is a story of hope.<br />
            Thank you for nurturing our community and helping reduce waste!
          </p>
        </div>
      </section>

      {/* Donations Grid - centered */}
      <div className="fe-grid">
        {donations.length === 0 && (
          <p className="fe-empty-note">
            You haven't made any donations yet.
            <br />
            Start making a difference today!
          </p>
        )}
        {donations.map((donation, index) => (
          <div key={index} className="fe-card flex flex-col gap-3">
            <img
              src="/login.png"
              alt="Donated Food"
              className="fe-card-img"
            />
            <p>
              <span className="font-semibold text-gold">Item:</span> {donation.name}
            </p>
            <p>
              <span className="font-semibold text-gold">Quantity:</span> {donation.quantity}
            </p>
            <p>
              <span className="font-semibold text-gold">Location:</span> {donation.location}
            </p>
            <p>
              <span className="font-semibold text-gold">Expiry:</span> {donation.expiry}
            </p>
            <button
              className="fe-btn fe-btn-gold mt-3"
              onClick={() =>
                generateCertificate({
                  ...donation,
                  username: userDisplay,
                })
              }
            >
              Download Certificate
            </button>
          </div>
        ))}
      </div>

      {/* Appreciation Callout */}
      <section className="fe-callout">
        <img
          src="/logo.png"
          alt="Community Support"
          className="fe-callout-img"
        />
        <div className="fe-callout-text text-brown">
          <h2 className="fe-callout-title mb-2">Thank You for Being a Changemaker!</h2>
          <p className="fe-callout-desc">
            Your kindness makes an impact every day.<br />
            Together, we bring nourishment and dignity to those in need.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MyDonations;
