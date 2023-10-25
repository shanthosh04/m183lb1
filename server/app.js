const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
const { rateLimit } = require("express-rate-limit");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const server = http.createServer(app);


app.use(express.static("client"));

app.get("/", (req, res) => {
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
  console.log(`Express Server started on port ${serverPort}`);
});
