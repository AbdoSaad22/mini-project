"use client"
import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from "./LectureScheduleCard.module.css";

const LectureCard = () => {
  const [year, setYear] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [jsonData, setJsonData] = useState([]);

  const levels = ["First Year", "Second Year", "Third Year", "Fourth Year"];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleUpload = (event, selectedYear) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const uploadDate = formatDate(new Date());
          const arrayBuffer = data;
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: "array",
          });

          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          setYear(selectedYear);
          setUploadDate(uploadDate);
          setJsonData(jsonData);



          const jsonDataString = JSON.stringify(jsonData);
          console.log("JSON Data :", jsonDataString);




          sendPostRequest({
            year: selectedYear,
            uploadDate: uploadDate,
            jsonData: jsonDataString,
          });
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const sendPostRequest = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/schedule/addSchedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Failed to send data", await response.text());
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const handleInput = (selectedYear) => {
    const fileInput = document.querySelector(
      `input[type="file"][data-year="${selectedYear}"]`
    );
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Lecture Schedules</h2>
      <ul className={styles.list}>
        {levels.map((level) => (
          <li key={level}>
            {level}
            <input
              type="file"
              accept=".xlsx, .xls"
              data-year={level}
              onChange={(event) => handleUpload(event, level)}
              className={styles.fileInput}
            />
            <button
              className={styles.editButton}
              onClick={() => handleInput(level)}
            >
              Upload
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LectureCard;
