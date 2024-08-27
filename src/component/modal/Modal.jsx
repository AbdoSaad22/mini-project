"use client";
import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import styles from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";

const professors = {
  CS: ["Dr. Ahmed Hosny", "Dr. Khaled Fathy"],
  IS: ["Dr. Ibrahim Al-Awadhi", "Dr. Suha"],
  IT: ["Dr. Nagwa"],
};

const Modal = ({ isOpen, onClose }) => {
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [uploadDate, setUploadDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedProfessor("");
  };

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleFileInputChange = (event) => {
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

          setJsonData(jsonData);
          setUploadDate(uploadDate);
          setFileContent({
            selectedProfessor: selectedProfessor,
            uploadDate: uploadDate,
            jsonData: JSON.stringify(jsonData),
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpload = async () => {
    if (!fileContent) {
      console.error("No file content to upload");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/professorAvailability/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fileContent),
        }
      );

      if (response.ok) {
        console.log("Data sent successfully");
        // Optionally, clear the file content after successful upload
        setFileContent(null);
      } else {
        console.error("Failed to send data", await response.text());
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <IoCloseSharp />
        </button>
        <h2 className={styles.title}>Professor Availability</h2>
        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Select Department
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="CS">Computer Science</option>
              <option value="IS">Information System</option>
              <option value="IT">Information Technology</option>
            </select>
          </div>
          {selectedCategory && (
            <div className={styles.formGroup}>
              <label htmlFor="professor" className={styles.label}>
                Select Professor
              </label>
              <select
                id="professor"
                value={selectedProfessor}
                onChange={handleProfessorChange}
                className={styles.select}
              >
                <option value="">Select</option>
                {professors[selectedCategory].map((professor) => (
                  <option key={professor} value={professor}>
                    {professor}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.uploadSection}>
            <button
              className={styles.fileButton}
              onClick={handleFileInputClick}
            >
              Choose File
            </button>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileInputChange}
              ref={fileInputRef}
              className={styles.fileInput}
            />
            <button className={styles.uploadButton} onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
