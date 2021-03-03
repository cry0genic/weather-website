const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// Define path for Express Config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aditya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aditya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Hey there! Need help?",
    title: "Help",
    name: "Aditya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location}={}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});                         

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aditya",
    errorMessage: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aditya",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("server is up and running");
});
