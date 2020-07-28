const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))


const index = require("./routes/index.js");
const adminPage = require("./routes/admin.js");
const resturants = require("./routes/resturants");

app.use('/admin', adminPage);
app.use('/user/resturants', resturants)
app.use('/user', index);

var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/pec-eats", function(err, database) {
  if(err) throw err;

  db = database;
  console.log("db connected");
});

app.get('/', function(req, res){
    console.log('here');
    res.redirect('/user');
})



app.listen(3000, function(req, res){
    console.log('working')
})