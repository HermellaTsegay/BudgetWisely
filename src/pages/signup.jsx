import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div
      className="card shadow-lg p-3 pt-0 rounded-4"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <img
        src="/logo.svg"
        alt="BudgetWisely Logo"
        className="mx-auto d-block mb-0"
        style={{ width: "180px", height: "auto" }}
      />

        <h5 className="text-center mb-4">Create Account</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-3">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account? <Link to="/login">Log in</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
