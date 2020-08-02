const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.post('/', function(req, res){
    res.render('orderPlaced');
})

module.exports = router;