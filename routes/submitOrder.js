const express = require('express');
const router = express.Router();
const Resturant = require('../db').Resturant;
const User = require('../db').User;
const Order = require('../db').Order;
const orderid = require('order-id')('mysecret')

router.get("/", function(req, res){
    console.log("inside order");
});

function getUserDetails(userId){
    return new Promise(function(resolve, reject){
        User.findOne({userId: userId}, function(err, result){
            const user ={
                name: result.name,
                email: result.email,
                phoneNo: result.phoneNo,
                address: result.address,
            };
            resolve(user);
        })
        
    })
}

router.post("/",async function(req, res){
    
    const nDoc = req.body.length;
    const resName = req.body.resName;

    const user = await getUserDetails(req.body.userId);

    


    Resturant.findOne({resName: resName}, function(err, result){
        if (err) throw err;

        console.log(result, 'resturant');
        var finalOrder = [];
        for (var i=0;i<nDoc; i++){
            if (req.body[i]>0){
                finalOrder.push([result.menu[0][i], result.menu[1][i], req.body[i]]);
            }
        }

        var bill = 0;
        for(var i=0;i<finalOrder.length;i++){
            bill+=(parseInt(finalOrder[i][1]) * parseInt(finalOrder[i][2]));
        }

        const item = {
            menu: finalOrder,
            bill: bill
        }

        const id = orderid.generate();

        const order = new Order({
            orderId : id,
            items: item,
            user: user,
            resName: resName,
            resId: result.resId
        });

        order.save();
        
        res.render("submitOrder", {user:user, resName:resName, order: finalOrder, bill:bill});
    })



});

module.exports = router;