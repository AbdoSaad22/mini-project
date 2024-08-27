"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import LoginForm from "./LoginForm";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h1 className={styles.fci}>F C I</h1>
          <LoginForm isAdmin={isAdmin} />
          <button
            className={styles.adminButton}
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? "Not Admin?" : "Are you admin?"}
          </button>
        </div>
        <div className={styles.right}>
          {!isAdmin && (
            <>
              <h2 className={styles.text}>Hello, Friend!</h2>
              <p className={styles.p}>
                Fill up personal information and start your journey with us.
              </p>
              <Link href="/register" className={styles.signUpButton}>
                Sign Up
              </Link>
            </>
          )}
          {isAdmin && (
            <>
              <h2 className={styles.text}>Admin Login</h2>
              <p className={styles.p}>
                Please enter admin credentials to access the admin dashboard.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
