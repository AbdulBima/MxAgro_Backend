require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const winston = require("winston");

const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const vendorRoute = require("./routes/vendorRoute");
const userRoutes = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const userTKNroute = require("./routes/userTKNroute");
const vendorTKNroute = require("./routes/vendorTKNroute");
const errorMiddleware = require("./middleware/errorMIddleWare");

const app = express();

const { MONGO_URL, PORT, FRONTEND, FRONTEND1, FRONTEND2 } = process.env;

// Middleware setup
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: [FRONTEND, FRONTEND1, FRONTEND2],
  credentials: true
}));

// Logging setup with Winston and Morgan
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const winstonStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

app.use(morgan("combined", { stream: winstonStream }));

// Routes setup
app.use("/api/userTKNroute", userTKNroute);
app.use("/api/vendorTKNroute", vendorTKNroute);
app.use("/api/products", productRoute);
app.use("/api/review", reviewRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoute);

// Error middleware
app.use(errorMiddleware);

// Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = app;
