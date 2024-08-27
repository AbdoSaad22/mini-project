import React from "react";
import styles from "./mainContent.module.css";

function MainContent() {
  return (
    <div className={styles.mainContent}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Streamline Your College Life</h1>
            <p>
              Manage schedules, connect with student services, and access key
              resources all in one place. Simplify your academic journey with
              our portal.
            </p>
            <a href="#" className={styles.ctaButton}>
              Explore Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainContent;
