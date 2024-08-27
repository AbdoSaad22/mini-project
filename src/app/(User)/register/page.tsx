import styles from "./register.module.css";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import React from "react";
const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h1 className={styles.fci}>F C I</h1>
          <RegisterForm />
        </div>
        <div className={styles.right}>
          <h2 className={styles.text}>Hello, Friend!</h2>
          <p className={styles.p}>
            Fill up personal information and start journey with us.
          </p>
          <Link href="/login" className={styles.signInButton}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
