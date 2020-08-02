const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const db = require(__dirname+'/db.js');


const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))


const index = require("./routes/index.js");
const adminPage = require("./routes/admin.js");
const resturants = require("./routes/resturants");
const register = require("./routes/register");
const owner = require('./routes/owner');
const submitOrder = require('./routes/submitOrder');
const orderPlaced = require('./routes/orderPlaced');
const removeOrder = require('./routes/removeOrder');


app.use('/admin', adminPage);
app.use('/user/resturants', resturants)
app.use('/user', index);
app.use('/register', register);
app.use('/owner', owner);
app.use('/user/submitorder', submitOrder);
app.use('/user/orderPlaced', orderPlaced);
app.use('/removeOrder', removeOrder);
// app.use('/user/resturantMenu', resturantMenu);


app.get('/', function(req, res){
    console.log('here');
    res.redirect('/user');
})


app.listen(3000, function(req, res){
    console.log('working')
})