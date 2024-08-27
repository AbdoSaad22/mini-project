import { useState } from "react";
import styles from "./Card.module.css"

interface CardData {
  title: string;
  description: string;
  image: string;
  link: string;
}

function Card({ title, description, image, link }: CardData) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImg} />
      <div className={styles.cardBody}>
        <h1>{title}</h1>
        <p
          className={`${styles.description} ${
            isExpanded ? styles.expanded : styles.collapsed
          }`}
        >
          {description}
        </p>
        <button onClick={handleShowMoreClick} className={styles.textControl}>
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}

export default Card;
