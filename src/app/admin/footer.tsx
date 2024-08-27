import React from "react";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <h1 className={styles.logoImage}>F C I</h1>
      </div>
      <div className={styles.rights}>
        <p>&copy; 2024 Company, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
