"use client";
import React, { useActionState} from "react";
import styles from "./addNewsPage.module.css";
import Footer from "../../admin/footer";

const AddNewsPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleImageChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      console.log("Image:", image);
      console.log("Title:", title);
      console.log("Description:", description);
    } else {
      setError("Please upload a valid image.");
    }
  };

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
