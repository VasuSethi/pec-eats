const express = require("express");
const router = express.Router();
const User = require('../db').User;
var bcrypt = require('bcryptjs');

router.get('/', function(req, res){
    res.render("login");
})



router.post('/', function(req, res){
    const userId = req.body.userId;
    console.log(req.body, '-------');
    User.findOne({userId: userId}, function(err, doc){
        console.log('---', err, doc);
        if (err || doc===null){
        console.log('erro', err);
        res.sendFile('failureLogin.html', {root: './public'});
        }

        else{
            console.log(doc);
            bcrypt.compare(req.body.password, doc.password, function(err, result) {
                console.log(req.body.password, doc.password);
                if (result==true){
                    res.render('resturants');
                }

                else{
                    res.sendFile('failure.html', {root: './public'});
                }
            });
        }
    })
    
})

module.exports = router;