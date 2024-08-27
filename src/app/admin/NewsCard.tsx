import styles from "./NewsCard.module.css";
import Link from "next/link";

const AdminNewsCard = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.header}>News</h2>
      <p className={styles.description}>
        Post new updates and announcements for students. You can also send
        notifications to keep them informed instantly.
      </p>
      <Link href="/addNews">
        <button className={styles.button}>Add News & Notify</button>
      </Link>
    </div>
  );
};

export default AdminNewsCard;
