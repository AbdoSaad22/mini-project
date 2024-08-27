import React from "react";
import Image from "next/image";
import styles from "./about.module.css";
import aboutImg from "../../../public/images/about.jpg";

const About = () => {
  return (
    <div className={styles.container} id="about">
      <div className={styles.text}>
        <h1 className={styles.header}>About Us</h1>
        Welcome to the FCI website, where you can easily access lecture
        schedules, college events, achievements, announcements, professor
        availability for consultations, valuable resources and guidance for your
        academic journey, and a 24/7 chatbot to assist you with any questions or
        concerns.
      </div>
      <div className={styles.aboutImg}>
        <div className={styles.imageCard}>
          <Image
            src={aboutImg}
            alt="About FCI"
            width={500}
            height={500}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
