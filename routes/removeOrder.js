const express = require('express');
const Order = require('../db').Order;
const router = express.Router();


router.post('/', function(req, res){
    console.log('removeOrder', req.body);

    Order.findOneAndDelete({orderId: req.body.orderId}, function(err){
        if (err)
            console.log(err);

        else
        console.log('success');
    })

    if (req.body.btn==="owner")
    res.redirect('/owner');

    else
    res.redirect('/user');

})
module.exports = router;