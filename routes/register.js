const express = require("express");
const router = express.Router();
const connection = require('../db');
var bcrypt = require('bcryptjs');
const { resolveInclude } = require("ejs");
var User = require('../db').User;



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/pec-eats";
// var db;



router.get('/', function(req, res){
    res.render("register");
})

function get_hashpw(password){

    return new Promise(function(resolve, reject){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                console.log(password, hash);
                resolve(hash);
            });
        });
    })
    
}

router.post('/', async function(req, res){
    const name = req.body.name;
    const userId = req.body.userId;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const address = req.body.address;
    var password = req.body.password;

    const hashkey= await get_hashpw(password);

    const user = new User ({
        name: name,
        userId : userId,
        email: email,
        phoneNo: phoneNo,
        address: address,
        password: hashkey
    });
    console.log(user);

    user.save();

    res.sendFile('success.html', {root: './public'});

})

module.exports = router;