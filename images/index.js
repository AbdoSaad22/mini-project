const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const registerRoutes = require("./register");
const loginRoutes = require("./login");
const scheduleRoutes = require("./schedule");
const professorAvailabilityRoutes = require("./professorAvailability");
const newsRoutes = require("./news");
const notificationsRoutes = require("./notifications"); // Add this line

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/professorAvailability", professorAvailabilityRoutes);
app.use("/news", newsRoutes);
app.use("/notifications", notificationsRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
