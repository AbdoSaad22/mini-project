"use client";
import React, { useState } from "react";
import styles from "./register.module.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name) => {
    const nameParts = name.trim().split(" ");
    const nameHasNumbers = /\d/.test(name);
    return nameParts.length >= 2 && !nameHasNumbers;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const validationErrors = {
      email: "",
      name: "",
      password: "",
      repeatPassword: "",
    };

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!validateFullName(name)) {
      validationErrors.name = "Please enter a valid full name without numbers.";
    }

    if (password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }

    if (password !== repeatPassword) {
      validationErrors.repeatPassword = "Passwords do not match.";
    }

    if (
      validationErrors.email ||
      validationErrors.name ||
      validationErrors.password ||
      validationErrors.repeatPassword
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, grade }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Registration successful");
        window.location.href = "/login";
      } else {
        console.error("Registration failed");
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: data.message || "Registration failed, please try again.",
        }));
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "An unexpected error occurred, please try again later.",
      }));
    }
  };

  const gradeLabels = {
    0: "First Year",
    1: "Second Year",
    2: "Third Year",
    3: "Fourth Year",
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        placeholder="Full Name"
        className={styles.input}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrors({ ...errors, name: "" });
        }}
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors({ ...errors, email: "" });
        }}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
      <select
        className={styles.input}
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      >
        <option value="" className={styles.grade} disabled>
          Entry Year
        </option>
        {Object.entries(gradeLabels).map(([key, label]) => (
          <option key={key} value={label}>
            {label}
          </option>
        ))}
      </select>

      <input
        type="password"
        placeholder="Password"
        className={styles.input}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors({ ...errors, password: "" });
        }}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}
      <input
        type="password"
        placeholder="Repeat Password"
        className={styles.input}
        value={repeatPassword}
        onChange={(e) => {
          setRepeatPassword(e.target.value);
          setErrors({ ...errors, repeatPassword: "" });
        }}
      />
      {errors.repeatPassword && (
        <p className={styles.error}>{errors.repeatPassword}</p>
      )}
      <button type="submit" className={styles.signUpButton}>
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
