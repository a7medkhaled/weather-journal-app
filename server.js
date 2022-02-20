// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5555;
const listen = () => {
  console.log(`server is running at port ${port}`);
};

const server = app.listen(port, listen);

app.get("/projectData", function (req, res) {
  console.log(req);
  res.send(JSON.stringify(projectData));
});

// POST method route
app.post("/addWhether", function (req, res) {
  console.log("req body", req.body);
  // res.send("POST received");

  //   projectData[req.body.date] = req.body;

  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["feelingsInput"] = req.body.userFeeling;

  console.log("proj data", projectData);
  res.send({ msg: "movie added successfuly" });
});
