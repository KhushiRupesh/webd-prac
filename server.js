require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import Express.js
const app = express(); // Create Express app
app.use(express.json());

const mongoose = require("mongoose"); // Import Mongoose ODM

mongoose.connect(process.env.DATABASE_URL); // Connect to MongoDB
const db = mongoose.connection;
db.on("error", (error) => console.error(error)); // Error handling
db.once("open", () => console.log("Connected to Database")); // Success message

app.use(express.json()); // Parse JSON request bodies

const subscribersRouter = require("./routes/subscribers"); // Import route handlers
app.use("/subscribers", subscribersRouter); // Mount routes at /subscribers

app.listen(3000, () => console.log("Server Started"));
