const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
const { rateLimit } = require("express-rate-limit");
const bcrypt = require('bcrypt');
const pino = require('pino');

const app = express();
app.use(express.json());
const server = http.createServer(app);

// Configure Pino logger
const logger = pino();

// Middleware to attach the logger to the request object
app.use((req, res, next) => {
  req.log = logger.child({ requestId: req.id }); // Customize as needed
  next();
});

app.use(express.static("client"));

app.get("/", (req, res) => {
  req.log.info("Request received for /");
  res.sendFile(__dirname + "/client/index.html");
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 50,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);

initializeAPI(app);

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  req.log.info(`Express Server started on port ${serverPort}`);
});
