// index.js

var http = require("http");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./inndex.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

var server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */
const port = 3000;

app.set("port", port);

/**
 * Create HTTP server.
 */

// Define the port to listen on

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
