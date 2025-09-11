import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInAnonymously } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/dashboard");
    } catch (err) {
      console.error("Guest login failed", err);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-between bg-light"
      style={{
        background: "linear-gradient(to right, #f3f4f6, #e5ecf4)",
        paddingBottom: "60px"
      }}
    >
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Left Side */}
          <div className="col-lg-6 text-center text-lg-start">
            <img
              src="/logo.svg"
              alt="BudgetWisely Logo"
              style={{ width: "200px", height: "auto", marginBottom: "20px" }}
            />
            <h1 className="fw-bold text-primary display-5 mb-3">
              Welcome to Budget<span className="text-dark">Wisely</span>
            </h1>
            <p className="lead text-muted mb-4">
              Track your income, manage your expenses, and get clarity on your finances. No account required to get started.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link to="/signup" className="btn btn-primary btn-lg rounded-3">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-outline-primary btn-lg rounded-3">
                Log In
              </Link>
              <button
                className="btn btn-secondary btn-lg rounded-3"
                onClick={handleGuestLogin}
              >
                Continue as Guest
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2698/2698194.png"
              alt="Budget illustration"
              className="img-fluid"
              style={{ maxHeight: "350px" }}
            />
          </div>
        </div>

        {/* About Section */}
        <div className="row mt-5 pt-5 border-top">
          <div className="col text-center">
            <h2 className="fw-bold mb-3 text-dark">📘 About BudgetWisely</h2>
            <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "700px" }}>
              BudgetWisely is your smart budgeting companion built with simplicity and clarity in mind. Whether you’re a student, professional, or managing a household — gain visibility over your finances with ease. Built using React & Firebase, designed to help you stress less and save more.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted py-4 border-top">
        <small>&copy; {new Date().getFullYear()} BudgetWisely. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default Home;
