const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/app.html")
});
app.post("/", function(req, res) {
      const date = "req.body.Date";
      const appid = "075c23a62emshc2722a7c542d998p13785cjsn5fcb10b1c6c1";
      const url = "https://covid-19-data.p.rapidapi.com/report/totals?date=" + date + "&appid=" + appid;
      https.get(url, function(respose) {
        response.on("data", function(data) {
          console.log(data);
          // const activecases = data.active;
          // const confirmedcases = data.confirmed;
          // const deaths = data.deaths;
          // const recoveries = data.recovered;
          // res.write("<h1>Active Cases are" + activecases + "</h1>");
          // res.write("<h1>Confirmed Cases are" + confirmedcases + "</p>");
          // res.write("<p>Deaths Cases are" + deaths + "</p>");
          // res.write("<p>recoveries Cases are" + recoveries + "</p>");
          // res.send;
        });
      });









      app.listen(3000, function() {
        console.log("Server is running on post 3000");
      });
