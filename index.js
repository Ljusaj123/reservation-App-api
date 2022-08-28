import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import connectDB from "./database/connect.js";

const app = express();

dotenv.config();

//middlewares
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, () => {
    try {
      connectDB(process.env.MONGO_URI);
      console.log(`Server is listening on the port ${port}`);
    } catch (error) {
      console.log("Failed to connect to MongoDB", error);
    }
  });
};

start();
