const express = require("express");
require("dotenv").config();
const globalerrorHandler = require("./Error-Handling/globalErrorHandler");
const userRoutes = require("./Routes/userRoutes");
const { connectDB } = require("./Database/conn");
const AppError = require("./Error-Handling/error");
const trainerRoutes = require("./Routes/trainerRoute");
const exerciseRoutes = require("./Routes/exercisesRoutes");
const postRoutes = require("./Routes/postRoutes");
const challengeRoutes = require("./Routes/challangesRoutes");
const requestRoutes = require("./Routes/requestRoutes");
const cors = require("cors");
connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/post", postRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/request", requestRoutes);

// app.use("/api/trainerPortal", trainerRoutes);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`${req.originalUrl} This URL is not running on this server`)
  );
});
app.use(globalerrorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server Connected on port: ${process.env.PORT}`);
});
