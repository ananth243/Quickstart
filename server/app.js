const express = require("express");
const authRoutes = require("./routes/auth");
const appRoutes = require("./routes/app-routes");
const adminRoutes = require("./routes/admin");
const statRoutes = require("./routes/stats");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/dbconfig");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(
  rateLimit({
    windowMs: 10 * 1000, // 10 second window
    max: 6, // start blocking after 6 requests
    message:
      "Too many requests from this IP, please try again after a few minutes",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.json());

app.use(statRoutes);
app.use("/auth", authRoutes);
app.use("/app", appRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  const err = new Error("Unknown Route");
  err.status = 404;
  next(err);
});

//Global error handler
app.use(async (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 490).json({
    error: err.message,
  });
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
