const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes")

// for env varibales
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); //for parsing data

// connect DB
connectDB();


// API routes 
app.use("/training/auth" , authRoutes)

// testing
app.use("/", (req, res) => {
  res.send("API is working!");
});


// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
