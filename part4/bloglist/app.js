const express = require("express");
require("express-async-errors"); // no need for try/catch for async call
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

logger.info(`Connecting to database at ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB: ", error.message);
  });

// Middlewares
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

// Bind paths to router
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

// Middlewares below are called when no routes handle HTTP requests
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler); // Must be last loaded middleware

module.exports = app;
