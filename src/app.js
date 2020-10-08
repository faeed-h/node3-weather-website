const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../..'))
//console.log(path.join(__dirname, '../public'))
const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

//static page
// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>')
// })

//HBS - to render our view engine hbs
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Fareed Khan",
    Creator: "Myself",
  });
});

// app.get('/help', (req, res) => {
//   res.send([{
//     name: 'Fareed',
//     age: 36
//   },
//   {
//     name: 'Sarah',
//     age: 20
//   }
//   ])
// })

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Fareed Khan",
    Creator: "Myself",
    age: 36,
  });
});
//Render HBS of template folder
app.get("/test", (req, res) => {
  res.render("Test", {
    helpText: "This is some helpful text.",
    title: "Hello",
    name: "Fareed Khan",
    age: 36,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Fareed",
    Creator: "Myself",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send("Error:", error);
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
    }
  );

  // res.send({
  //   title: "Weather",
  //   forecast: 'It is snowing',
  //   location: 'Dubai',
  //   Creator: "Myself",
  //   address: req.query.address
  // })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (reg, res) => {
  res.render("404", {
    title: "404",
    name: "Fareed",
    Creator: "Myself",
    errorMessage: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Fareed Hussain",
    Creator: "Myself",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
