"use client";
import React, { useState, useEffect } from "react";
import styles from "./Availability.module.css";
import Footer from "../../component/footer/Footer";
import { useRouter } from "next/navigation";
import Spinner from "../../component/spinner/Spinner";

const professors = {
  CS: ["Dr. Ahmed Hosny", "Dr. Khaled Fathy"],
  IS: ["Dr. Ibrahim Al-Awadhi", "Dr. Suha"],
  IT: ["Dr. Nagwa"],
};

const Availability = () => {
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [availabilityData, setAvailabilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const departments = Object.keys(professors);

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
    if (selectedProfessor) {
      fetchAvailabilityData(selectedProfessor);
    }
  }, [selectedProfessor]);

  const fetchAvailabilityData = async (professor) => {
    setAvailabilityData(null);
    try {
      const response = await fetch(
        `http://localhost:5000/professorAvailability/getAvailability?professor=${encodeURIComponent(
          professor
        )}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.jsondata) {
          console.log("Raw JSON data:", data.jsondata);

          setAvailabilityData({
            ...data,
            jsondata: data.jsondata,
          });
        } else {
          console.error("jsondata field is missing or undefined");
        }
      } else {
        console.error(
          "Failed to fetch availability data",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  const renderTable = (jsonData) => {
    const numberOfColumns = Math.max(...jsonData.map((row) => row.length));

    return (
      <table className={styles.table}>
        <tbody>
          {jsonData.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {cell}
                </td>
              ))}
              {Array.from({ length: numberOfColumns - row.length }).map(
                (_, emptyCellIndex) => (
                  <td
                    key={`empty-${emptyCellIndex}`}
                    className={styles.td}
                  ></td>
                )
              )}
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
          <div className={styles.header}>Select Professor</div>
          <ul className={styles.list}>
            {departments.map((department) => (
              <div key={department}>
                <div className={styles.departmentHeader}>{department}</div>
                {professors[department].map((professor) => (
                  <li
                    key={professor}
                    onClick={() => setSelectedProfessor(professor)}
                    className={styles.item}
                  >
                    <button className={styles.button}>{professor}</button>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>

        {selectedProfessor && availabilityData && (
          <div className={styles.availabilityContainer}>
            <h1 align="center">Availability for {selectedProfessor}</h1>
            {renderTable(availabilityData.jsondata)}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Availability;
