"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Aside.module.css";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <aside className={`${styles.aside} ${isOpen ? styles.open : ""}`}>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        {isOpen ? "×" : "≡"}
        {/* لحد ما اجيب الايكون */}
      </button>
      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
        <ul className={styles.menu}>
          <li className={`${styles.menuItem} ${styles.active}`}>
            <Link href="/admin-dashboard" className={styles.link}>
              Admin Dashboard
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/news" className={styles.link}>
              News
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/Schedules" className={styles.link}>
              Student Lecture Schedules
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/Availability" className={styles.link}>
              Professor Availability
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/map" className={styles.link}>
              Guidance for New Students
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/regulation" className={styles.link}>
              Faculty Regulations
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/chatbot" className={styles.link}>
              Interactive Chat Bot
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
