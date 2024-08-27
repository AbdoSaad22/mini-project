"use client";
import React, { useState } from "react";
import styles from "./login.module.css";

const LoginForm = ({ isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include this line to handle cookies
        body: JSON.stringify({ email, password, isAdmin }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.isAdmin) {
          window.location.href = "/admin"; // Redirect to the admin page
        } else {
          window.location.href = "/"; // Redirect to the home page
          console.log("Yes")

        }
      } else {
        // Set specific error messages based on the response
        const newErrors = { email: "", password: "" };
        if (data.message === "Invalid admin credentials") {
          newErrors.email = "Invalid email or password";
          newErrors.password = "Invalid email or password";
        } else if (data.message === "Email not found") {
          newErrors.email = "Email not found";
        } else if (data.message === "Incorrect password") {
          newErrors.password = "Incorrect password";
        }
        setErrors(newErrors);
      }
    } catch (err) {
      console.error("Error during the login process:", err);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="email"
        placeholder="Email"
        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors({ ...errors, email: "" });
        }}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        className={`${styles.input} ${
          errors.password ? styles.inputError : ""
        }`}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors({ ...errors, password: "" });
        }}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}
      <button type="submit" className={styles.signInButton}>
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
