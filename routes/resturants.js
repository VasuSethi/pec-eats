const express = require("express");
const router = express.Router();
const Owner = require('../db').Owner;
const Resturant = require('../db').Resturant;




router.get('/', function(req, res){
    res.render('resturants');
    // const combo = new Resturant({
    //     resId: "01",
    //     resName: "combo",
    //     // menu: [
    //     //     {fried_rice_rajma: 70},
    //     //     {fried_rice_dal: 70},
    //     //     {thali: 100},
    //     //     {lacha_parantha: 60},
    //     //     {paneer_roti: 80}
    //     // ]
    //     menu: [['fried rice rajma', 'fried rice dal', 'thali', 'lacha parantha', 'paneer roti'], [70, 70, 100, 60, 80]]
    // })
    // console.log(combo);

    // combo.save();
})

router.get('/:customName', function(req, res){
    const customName = req.params.customName;
    console.log('customName: ',customName);
    Resturant.findOne({resName: customName}, function(err, result){
        if (err) throw err;

        console.log(result.menu, "here");
        
        res.render("resturantMenu", {resName:customName, food: result.menu[0], price: result.menu[1]});
    })
    
})

router.post('/', function(req, res){
    res.render('resturants');
})

module.exports = router;