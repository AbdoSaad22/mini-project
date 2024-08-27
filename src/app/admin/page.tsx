"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewsCard from "./NewsCard";
import LectureScheduleCard from "./LectureScheduleCard";
import ProfessorAvailabilityCard from "./ProfessorAvailabilityCard";
import Aside from "./Aside";
import Footer from "./footer";
import styles from "./adminDashboard.module.css";
import Spinner from "../../component/spinner/Spinner";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/login/check-login",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.loggedIn && data.isAdmin) {
          setIsAdmin(true);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  if (!isAdmin) {
    return null;
  }

  const cards = [
    <NewsCard key="news" />,
    <LectureScheduleCard key="schedule" />,
    <ProfessorAvailabilityCard key="availability" />,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Aside />
        <main className={styles.main}>
          {cards.map((card) => (
            <div className={styles.card} key={card.key}>
              {card}
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
