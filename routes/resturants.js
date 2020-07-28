const express = require("express");
const router = express.Router();


router.get('/', function(req, res){
    res.render('resturants');
})

router.post('/', function(req, res){
    res.render('resturants');
})

module.exports = router;