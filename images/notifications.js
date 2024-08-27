const express = require("express");
const router = express.Router(); // Initialize the router

const pool = require("./dataBase"); // Ensure this path is correct

// GET route to fetch notifications
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notifications ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications." });
  }
});

module.exports = router;
