"use client";
import React, { useState, useEffect } from "react";
import styles from "./ExplorePlaces.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Spinner from "../../../component/spinner/Spinner";

const ExplorePlaces = () => {
  const [isLaboratoriesOpen, setIsLaboratoriesOpen] = useState(false);
  const [isDoctorsOfficesOpen, setIsDoctorsOfficesOpen] = useState(false);
  const [isLectureHallOpen, setIsLectureHallOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) {
    return <Spinner />;
  }

  const toggleLaboratories = () => setIsLaboratoriesOpen(!isLaboratoriesOpen);
  const toggleDoctorsOffices = () =>
    setIsDoctorsOfficesOpen(!isDoctorsOfficesOpen);
  const toggleLectureHall = () => setIsLectureHallOpen(!isLectureHallOpen);
  const toggleOther = () => setIsOtherOpen(!isOtherOpen);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1 className={styles.header}>FCI Places</h1>
        <div className={styles.section} onClick={toggleLaboratories}>
          <h2>
            Laboratories{" "}
            <span className={styles.arrow}>
              {isLaboratoriesOpen ? (
                <FaArrowDownLong className={styles.downIcon} />
              ) : (
                <FaLongArrowAltRight className={styles.rightIcon} />
              )}
            </span>
          </h2>
          {isLaboratoriesOpen && (
            <ul>
              <li>A0</li>
              <li>B</li>
              <li>C</li>
            </ul>
          )}
        </div>
        <div className={styles.section} onClick={toggleDoctorsOffices}>
          <h2>
            Professor's offices{" "}
            <span className={styles.arrow}>
              {isDoctorsOfficesOpen ? (
                <FaArrowDownLong className={styles.downIcon} />
              ) : (
                <FaLongArrowAltRight className={styles.rightIcon} />
              )}
            </span>
          </h2>
          {isDoctorsOfficesOpen && (
            <ul>
              <li>Room 101</li>
              <li>Room 102</li>
            </ul>
          )}
        </div>
        <div className={styles.section} onClick={toggleLectureHall}>
          <h2>
            Lecture hall{" "}
            <span className={styles.arrow}>
              {isLectureHallOpen ? (
                <FaArrowDownLong className={styles.downIcon} />
              ) : (
                <FaLongArrowAltRight className={styles.rightIcon} />
              )}
            </span>
          </h2>
          {isLectureHallOpen && (
            <ul>
              <li>Main Hall</li>
            </ul>
          )}
        </div>
        <div className={styles.section} onClick={toggleOther}>
          <h2>
            Other{" "}
            <span className={styles.arrow}>
              {isOtherOpen ? (
                <FaArrowDownLong className={styles.downIcon} />
              ) : (
                <FaLongArrowAltRight className={styles.rightIcon} />
              )}
            </span>
          </h2>
          {isOtherOpen && (
            <ul>
              <li>Details</li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h3>Place's Description</h3>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className={styles.buttonContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="You don't know where the building is?"
          />
          <button className={styles.goBtn}>GO</button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePlaces;
