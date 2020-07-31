const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const Owner = require('../db').Owner;

router.get('/', function(req, res){
    res.render('loginUser');
})

router.post('/', function(req, res){
    const ownerId = req.body.ownerId;
    console.log(ownerId)
    Owner.findOne({ownerId: ownerId}, function(err, doc){
        if (err){
        console.log(err);
        res.sendFile('failure.html', {root: './public'});
        }

        else{
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