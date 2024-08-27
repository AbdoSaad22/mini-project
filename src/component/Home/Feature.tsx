import React from "react";
import styles from "./features.module.css";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface FeatureProps {
  image: string | StaticImageData;
  title: string;
  text: string;
  link?: string;
}

const Feature: React.FC<FeatureProps> = ({ image, title, text, link }) => {
  return (
    <div className={styles.card}>
      <img
        src={typeof image === "string" ? image : image.src}
        alt={title}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{text}</p>
        {link && (
          <Link href={link} className={styles.cardButton}>
            Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default Feature;
