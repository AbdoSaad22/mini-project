import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>FCI Buildings</h2>
        <Link href="/mainBuilding" className={styles.link}>
          Main Building
        </Link>
        <Link href="/laboratoriesBuilding" className={styles.link}>
          Laboratories Building
        </Link>
        <Link href="/cafeteria" className={styles.link}>
          Cafeteria
        </Link>
        <Link href="/ExplorePlaces" className={styles.exploreLink}>
          Explore Places
        </Link>
      </div>
      <div className={styles.map}>{children}</div>
    </div>
  );
};

export default Sidebar;
