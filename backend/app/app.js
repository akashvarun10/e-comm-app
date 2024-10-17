// app.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./routes/authRoutes");

// Use routes

app.get("/", (req, res) => {
    res.send("Backend Auth Server is running");
    });

app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
