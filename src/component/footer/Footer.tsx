import React from "react";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <h3>Contact us</h3>
        <p>123 Main Street</p>
        <p>Assiut, State, ZIP</p>
        <p>Email: info@company.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div className={styles.logo}>
        <h1 className={styles.logoImage}>F C I</h1>
        <p>&copy; 2024 Company, Inc. All rights reserved.</p>
      </div>
      <div className={styles.services}>
        <h3>Services</h3>
        <ul>
          <li>News Page</li>
          <li>Student Lecture Schedules</li>
          <li>Professor Availability</li>
          <li>Guidance for New Students</li>
          <li>Faculty Regulations</li>
          <li>Interactive Chat Bot</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
