"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./addNewsPage.module.css";
import Footer from "../../admin/footer";
import { useRouter } from "next/navigation";
import Spinner from "../../../component/spinner/Spinner";

const AddNewsPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileType = file.type.split("/")[0];

      if (fileType === "image") {
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setImage(null);
        setImageUrl(null);
        setError("Please select a valid image file.");
      }
    }
  };

  const handleCheckboxChange = (level: number) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("levels", JSON.stringify(selectedLevels));

    try {
      const res = await fetch("http://localhost:5000/news/add", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to add news.");
      }

      setImage(null);
      setImageUrl(null);
      setTitle("");
      setDescription("");
      setSelectedLevels([]);
      setError(null);

      console.log("News added successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to add news. Please try again.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.head}>Create a New Announcement</h1>
          <p className={styles.subHeader}>
            Please fill out the form below to share the latest updates.
          </p>

          <div className={styles.field}>
            <label htmlFor="file" className={styles.label}>
              Upload Image:
            </label>
            <div className={styles.fileInputContainer}>
              <label htmlFor="file" className={styles.fileInputLabel}>
                Choose File
              </label>
              <input
                type="file"
                id="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              {imageUrl && (
                <div className={styles.imagePreview}>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                </div>
              )}
              {error && <p className={styles.error}>{error}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.inputText}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.levelsContainer}>
            {Array.from({ length: 4 }, (_, index) => (
              <label key={index} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={index + 1}
                  onChange={() => handleCheckboxChange(index + 1)}
                  checked={selectedLevels.includes(index + 1)}
                />
                Level {index + 1}
              </label>
            ))}
          </div>

          <button type="submit" className={styles.button}>
            Publish
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddNewsPage;
