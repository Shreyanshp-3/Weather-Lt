const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true })); //this one is necassary to parse the bodu
//like really get the data

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityname;
  const apikey = "8af96f31dd4c62276cbba40fc6f3e63e";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    // console.log(response.statusCode);

    response.on("data", function (data) {
      //   console.log(data); this direct gives us the hexi code so we have to convert into the JSON
      // both the way its showing the black image
      const weatherdata = JSON.parse(data); //converting the data in json and by using the strignfy we can just reverse this process
      const temp = weatherdata.main.temp;
      const place = weatherdata.name;
      const des = weatherdata.weather[0].description;
      //   const { des, icon } = weatherdata.weather[0];
      //   const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      const icon = weatherdata.weather[0].icon;
      //   const imageurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //the normal way is not working as plan lets try this method

      const imageurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      //   console.log("The current temperature in " + place + " is");
      //   console.log("Temperature : " + temp);
      //   console.log("Description : " + des);
      //   res.write("<h2> The Temperature in " + place + " is " + temp + ".</h2>");
      //   res.write("<p>The weather is : " + des + ".</p>");
      //   res.write(`<h2> The Temperature in  ${place}   is  ${temp}  .</h2>`);
      //   res.write("<p>The weather is : " + des + ".</p>");
      //   res.send("<p>The weather is : " + des + ".</p>");
      // i guess  the write method is not styling any more or i am doing something
      //wronge so style it while sending it

      res.send(`
    <h2>The Temperature in  ${place}   is  ${temp} </h2>
    <p>The weather is :  ${des}. </p>
    <img src="${imageurl}">      `);
    });
  });
});
///////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
app.listen(3000, function () {
  console.log("Server is running in the port 3000");
});
