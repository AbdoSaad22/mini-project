"use client";
import React, { useState, useEffect } from "react";
import styles from "./Schedules.module.css";
import Footer from "../../component/footer/Footer";
import { useRouter } from "next/navigation";
import Spinner from "../../component/spinner/Spinner";

const Schedules = () => {
  const [level, setLevel] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const levels = ["First Year", "Second Year", "Third Year", "Fourth Year"];

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/login/check-login",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!data.loggedIn) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        router.push("/login");
      }
    };

    checkLoginStatus();
  }, [router]);

  useEffect(() => {
    if (level) {
      fetchScheduleData(level);
    }
  }, [level]);

  const fetchScheduleData = async (selectedLevel) => {
    setScheduleData(null);
    try {
      const response = await fetch(
        `http://localhost:5000/schedule/getSchedule?year=${encodeURIComponent(
          selectedLevel
        )}`
      );
      if (response.ok) {
        const data = await response.json();

        if (data.jsondata) {
          try {
            const parsedData = JSON.parse(data.jsondata);
            setScheduleData({
              ...data,
              jsondata: parsedData,
            });
          } catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
          }
        } else {
          console.error("jsonData field is missing or undefined");
        }
      } else {
        console.error("Failed to fetch schedule data", await response.text());
      }
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  const renderTable = (jsonData) => {
    const timeSlots = [" ", "8:10", "10:12", "12:2", "2:4"];

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {timeSlots.map((timeSlot, index) => (
              <th key={index} className={styles.th}>
                {timeSlot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jsonData.slice(0).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.aside}>
          <div className={styles.header}>Lecture Schedules</div>
          <ul className={styles.list}>
            {levels.map((levelName, index) => (
              <li key={index} className={styles.item}>
                <button
                  className={styles.button}
                  onClick={() => setLevel(levelName)}
                >
                  {levelName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {level && scheduleData && (
          <div className={styles.scheduleContainer}>
            <h1 align="center">{level}</h1>
            {renderTable(scheduleData.jsondata)}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Schedules;
