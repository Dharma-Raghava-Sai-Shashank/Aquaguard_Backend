import connectDB from "./DB/index.db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
app.use(express.json());
app.use(cors());
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 1000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT || 1000}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
