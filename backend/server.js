require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const sequelize = require("./config/db.js");
const { notFound, errorHandler } = require("./utils/errorHandler.js");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS if needed
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser()); 

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  return res.send("Welcome to Maxlence Assignment API");
});
 
app.use(notFound);
app.use(errorHandler);


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ alter: true }); 
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
