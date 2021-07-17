//----------------------< Importing required modules >--------------------------

var {spawn} = require('child_process');
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const socket = require('socket.io');
const _http_ = require('http');
const {MongoClient} = require('mongodb');
const fetch = require("node-fetch");



//--------------------------< Defining variables >------------------------------

const app = express();
const http = _http_.createServer(app);
const io = socket(http);
const child = spawn('python', ['app.py']);
const url = "mongodb+srv://admin:kanishk@cluster1.v5rkc.mongodb.net/movies?retryWrites=true&w=majority";
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});



//--------------------------< Configuring app >---------------------------------

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));



//-------------------------< Defining routes >----------------------------------

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/About", function(req, res) {
  res.render("about");
});

app.get("/Contact", function(req, res) {
  res.render("contact");
});

app.get("/recommendation", function(req, res) {
  res.render("recommendation");
});

app.get("/recommendation/:moviename", function(req, res) {
  const requestedmovie = req.params.moviename;
  res.render("moviepost");
});





//-------------------------->>>>>>>>>>>>>---------------------------------------

//main function
async function run() {

  //Set-up database connection
  await client.connect();
  console.log('Connected to database!');
  db = client.db("movies");
  col = db.collection("movies_metadata");

  //Set-up connection to python
  io.on('connection', (soc) => {
    console.log('Connected to Python Client!');

    //Defining events

    //Search event
    app.post("/", function(req, res) {
       let typedmovie = req.body.search
       soc.emit('search', typedmovie, function(obj) {
         col.find({'$or': obj}).toArray(function(err, data) {
           console.log(data);
           res.render("recommendation",{Moviename:data});
         });
       });
    });

    //event 2

  });
};


//Subroutines
var base_url="https://api.themoviedb.org/3/movie/";
var api_key="30d7de721f9ac1c958640499561b574a";
var query='/images?'
var img="https://image.tmdb.org/t/p/w185/"

function get_poster(movie_id){
  let endpoint=base_url+movie_id+query+"api_key="+api_key;
  fetch(endpoint).then(res=>res.json()).then(data=>{
    var path=data['posters'][0]['file_path'];
    return img+path;
  })
}

//------------------------->>>>>>>>>>>>>>>>>>-----------------------------------





//----------------< Keeping track of client response >--------------------------

run().catch(console.dir);
child.stdout.on('data', (data) => console.log(data.toString()));
child.stderr.on('data', (data) => console.log(data.toString()));



//----------------------< Deploying app on port >-------------------------------

http.listen(3000,function(req, res) {
  console.log("Server is running on port 3000");
});
