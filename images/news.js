const express = require("express");
const router = express.Router();
const pool = require("./dataBase");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to add news and a notification
router.post("/add", upload.single("image"), async (req, res) => {
  const { title, description, levels } = req.body;
  const image = req.file ? req.file.buffer : null;
  const levelsArray = JSON.parse(levels);

  try {
    // Insert into news table
    await pool.query(
      "INSERT INTO news (title, description, image, levels) VALUES ($1, $2, $3, $4)",
      [title, description, image, levelsArray]
    );

    await pool.query("INSERT INTO notifications (title) VALUES ($1)", [title]);

    res.json({
      success: true,
      message: "News added and notification created successfully.",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, message: "Error inserting data" });
  }
});

// GET route to fetch all news
router.get("/get", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news");
    const newsItems = result.rows.map((item) => ({
      ...item,
      image: `data:image/jpeg;base64,${item.image.toString("base64")}`,
    }));

    res.status(200).json({ cards: newsItems });
  } catch (error) {
    console.error("Error retrieving news:", error);
    res.status(500).json({ success: false, message: "Failed to fetch news." });
  }
});

module.exports = router;
