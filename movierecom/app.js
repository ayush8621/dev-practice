var {spawn} = require('child_process');
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");
const socket = require('socket.io');
const _http_ = require('http');
const {MongoClient} = require('mongodb');

const app = express();
// const http = _http_.createServer(app);
// const io = socket(http);
// const child = spawn('python', ['app.py']);
// const url = "mongodb+srv://admin:kanishk@cluster1.v5rkc.mongodb.net/movies?retryWrites=true&w=majority";
// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });




app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/moviesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const movieschema = new mongoose.Schema({
  FIELD1: Number,
  title: "String",
  genres: "String",
  release_date: Number,
  vote_average: Number,
  popularity: Number,
  vote_count: Number,
});

const Movie = mongoose.model("movie", movieschema);



app.get("/", function(req, res) {
  res.render("home");
});

app.get("/About", function(req, res) {
  res.render("about");
})

app.get("/Contact", function(req, res) {
  res.render("contact");
})

app.get("/moviepost", function(req, res) {
  res.render("moviepost");
});

app.get("/moviepost/:moviename", function(req, res) {
  const requestedmovie = req.params.moviename;
  res.render("moviename");
})


//Set-up database connection
// async function run() {
//   await client.connect();
//   db = client.db("movies");
//   col = db.collection("movies_metadata");
//
//   //Set-up connection to python
//   io.on('connection', (soc) => {
//     console.log('Connected to Python Client!');


    app.post("/", function(req, res) {
       let typedmovie = req.body.searchbar
       res.redirect("/moviepost/typedmovie")
  //     soc.emit('search', typedmovie, function(obj) {
  //       col.find({
  //         '$or': obj
  //       }).toArray(function(err, data) {
  //         // res.redirect("/moviepost");
  //         console.log(data);
  //       });
  //     });
  //   });
  //
  // });
});



// run().catch(console.dir);
// child.stdout.on('data', (data) => console.log(data.toString()));
// child.stderr.on('data', (data) => console.log(data.toString()));



app.listen(3000, function(req, res) {
  console.log("Server is running on port 3000");
});
