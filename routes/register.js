const express = require("express");
const router = express.Router();
const connection = require('../db');



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pec-eats";
var db;



router.get('/', function(req, res){
    res.render("register");
})

router.post('/', function(req, res){
    const name = req.body.name;
    const userId = req.body.userId;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const address = req.body.address;
    const password = req.body.password;

    const user={
        name: name,
        userId : userId,
        email: email,
        phoneNo: phoneNo,
        address: address,
        password: password
    };

    MongoClient.connect(url, function(err, database) {
        if (err) throw err;

        db = database.db('pec-eats');
        db.collection('users').findOne({userId: userId}, function(err, result){
            if (err)
            res.sendFile('failure.html', {root: './public'});

            db.collection('users').insertOne(user, function(err, res){
                if (err) throw err;

                console.log("document inserted");
            })
        })
        res.sendFile('success.html', {root: './public'});
        
      });
})

module.exports = router;