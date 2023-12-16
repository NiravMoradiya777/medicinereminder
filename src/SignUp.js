import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
    userType: "Patients",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Initialize confirmPassword error state

  const history = useNavigate();

  const isStrongPassword = (password) => {
    // Define your password strength criteria here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;

    // Password validation logic (same as before)

    // Set password error
    if (!isStrongPassword(value)) {
      setPasswordError(
        "Password must be strong, containing at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
    } else {
      setPasswordError("");
    }

    setFormData({ ...formData, password: value });
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;

    if (value !== formData.password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }

    setFormData({ ...formData, confirmPassword: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are password or confirm password errors
    if (passwordError || confirmPasswordError) {
      setError("Please fix the password and confirm password errors.");
      return;
    }

    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        history.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordError && (
            <div className="text-danger">{confirmPasswordError}</div>
          )}
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <select
            className="form-control"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="Patients">Patients</option>
            <option value="Doctor">Doctor</option>
            <option value="CareGiver">CareGiver</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
