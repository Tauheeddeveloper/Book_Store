const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongo_url = "mongodb://localhost:27017/Book_Store_App";
mongoose
  .connect(mongo_url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("Error connecting to MongoDB:", error.message));

// Models
const usermodel = require("./db/user.js");
const new_model = require("./db/New_scheme.js");
const contact_modal = require("./db/Conact_scheme.js");

// Serving Frontend Files
app.use(express.static(path.join(__dirname, "frontend", "my-portfolio", "dist")));

app.get("/", (req, res) => {
  console.log("Serving frontend");
  res.sendFile(path.join(__dirname, "frontend", "my-portfolio", "dist", "index.html"));
});

// Routes
// Get free books
app.get("/books", async (req, res) => {
  try {
    const books = await new_model.find({ price: 0 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get paid books
app.get("/paid", async (req, res) => {
  try {
    const Paid_book = await new_model.find({ price: { $gt: 0 } });
    res.json(Paid_book);
  } catch (error) {
    res.status(500).json({ message: "Error in data fetching" });
  }
});

// User signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user_find = await usermodel.findOne({ email });
    if (user_find) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash_password = await bcryptjs.hash(password, 10);
    const user = new usermodel({
      name,
      email,
      password: hash_password,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user_find = await usermodel.findOne({ email });
    if (!user_find) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const isMatch = await bcryptjs.compare(password, user_find.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid User" });
    }

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Contact form
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const check = await usermodel.findOne({ email });
    if (!check) {
      return res.status(404).json({ message: "User not found" });
    }

    const contact_info = new contact_modal({
      name,
      email,
      message,
    });

    await contact_info.save();
    console.log("Message saved successfully");
    res.status(201).json({ message: "Message reached successfully and saved" });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start Server
app.listen(4000, () => {
  console.log("Server working on port 4000");
});
