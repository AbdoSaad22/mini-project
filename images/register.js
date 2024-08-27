const express = require("express");
const router = express.Router();
const pool = require("./dataBase");

// Define POST route
router.post("/add", async (req, res) => {
  const { email, password, name, grade } = req.body;

  try {
    // Check if the email already exists
    const emailCheck = await pool.query(
      "SELECT * FROM _user WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      // Email already exists
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // If the email doesn't exist, insert the new user
    await pool.query(
      "INSERT INTO _user(email, password, name, grade) VALUES($1, $2, $3, $4)",
      [email, password, name, grade]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, message: "Error inserting data" });
  }
});

// Define GET route
router.get("/print", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM _user"); // Fetch data from _user table
    res.json(result.rows); // Return data as JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
});

module.exports = router;
