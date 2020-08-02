const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();


const Owner = require('../db').Owner;
const Order = require('../db').Order;

router.get('/', function(req, res){
    res.render('loginOwner');
})

function getResturantOrder(resId){
    console.log('inside getresturantoder', resId);
    return new Promise(function(resolve, reject){
        Order.find({resId:resId}, function(error, document){
            resolve(document);
        })
    })
}

router.post('/', function(req, res){
    const ownerId = req.body.ownerId;
    console.log(ownerId)
    Owner.findOne({resName: ownerId}, async function(err, doc){
        if (err || doc===null){
        console.log(err);
        res.sendFile('failure.html', {root: './public'});
        }

        else{
            console.log(req.body.password, doc.password);
             
                console.log(req.body.password, doc.password);

                if (req.body.password === doc.password){
                    orders = await getResturantOrder(doc.resId);
                    console.log('order', orders.items);
                    res.render('checkOrders', {resName: doc.resName, orders: orders});
                }

                else{
                    res.sendFile('failure.html', {root: './public'});
                }
           
        }
    })
})

module.exports = router;