"use client"
import { useState } from "react";
import styles from "./ProfessorAvailabilityCard.module.css";
import Modal from "../../component/modal/Modal";

const AdminProfessorAvailabilityCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Professor Availability</h2>
      <p className={styles.description}>
        Manage and update the availability of professors for student
        consultations and guidance.
      </p>
      <button className={styles.button} onClick={handleModalOpen}>
        Manage Availability
      </button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default AdminProfessorAvailabilityCard;
