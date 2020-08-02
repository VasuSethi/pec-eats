const express = require("express");
const router = express.Router();
const Owner = require('../db').Owner;
const Resturant = require('../db').Resturant;




router.get('/', function(req, res){
    // const deshraj = new Resturant({
    //     resId: "03",
    //     resName: "deshraj",
    //     menu: [['Channa Samosa', 'Samosa', 'Patty', 'Omlette', 'Cold drink', 'Maggi'], [30, 10, 20, 50, 15, 20]]
    // });
    // console.log(deshraj);

    // deshraj.save();
})

router.post('/:customName', function(req, res){
    const customName = req.params.customName;
    const userId = req.body.userId;
    Resturant.findOne({resName: customName}, function(err, result){
        if (err) throw err;
        
        res.render("resturantMenu", {userId: userId, resName:customName, food: result.menu[0], price: result.menu[1]});
    })
    
})

router.post('/', function(req, res){
    res.render('resturants');
})

module.exports = router;