const express = require('express');
const router = express.Router();

router.get("/", function(req, res){
    console.log("inside order");
});

router.post("/", function(req, res){
    res.send(req.body);
    console.log('----------');
    console.log(req);
});

module.exports = router;