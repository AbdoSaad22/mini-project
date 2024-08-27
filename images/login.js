const express = require("express");
const cookieParser = require("cookie-parser");
const pool = require("./dataBase");

const router = express.Router();

// Middleware
router.use(express.json());
router.use(cookieParser());

// Routes
router.post("/add", async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    if (isAdmin) {
      if (email === "admin@gmail.com" && password === "admin123") {
        res.cookie("userSession", "true", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        res.cookie("isAdmin", "true", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        return res.json({ success: true, isAdmin: true });
      } else {
        return res.json({
          success: false,
          message: "Invalid admin credentials",
        });
      }
    }

    const result = await pool.query("SELECT * FROM _user WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      res.json({ success: false, message: "Email not found" });
    } else {
      const user = result.rows[0];
      if (user.password !== password) {
        res.json({ success: false, message: "Incorrect password" });
      } else {
        res.cookie("userSession", "true", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        res.cookie("isAdmin", "false", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        res.json({ success: true, isAdmin: false });
      }
    }
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("An error occurred while processing your request.");
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("userSession");
  res.clearCookie("isAdmin");
  res.json({ success: true, message: "Logged out successfully" });
});

router.get("/check-login", (req, res) => {
  console.log("Cookies received:", req.cookies);
  const isLoggedIn = req.cookies.userSession === "true";
  const isAdmin = req.cookies.isAdmin === "true";
  console.log(`Login status: ${isLoggedIn}, Admin status: ${isAdmin}`);
  res.json({ loggedIn: isLoggedIn, isAdmin });
});

module.exports = router;
