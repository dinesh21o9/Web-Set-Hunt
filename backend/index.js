const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};


// Import routes
const leaderRoutes = require("./routes/LeaderRoutes");
const quesRoutes = require("./routes/QuesRoutes");
const quizRoutes = require("./routes/QuizRoutes");
// const teamRoutes = require("./routes/TeamRoutes");
const userRoutes = require("./routes/UserRoutes");

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Middleware
// app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use("/api/teamdetails", teamRoutes);
app.use("/api/leaderboard", leaderRoutes);
app.use("/api/dashboard", quizRoutes);
app.use("/api/que", quesRoutes);
app.use("/api/auth", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`App is running on the port ${port}`);
});
