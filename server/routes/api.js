const express = require('express');
const router = express.Router();
const emailService = require('../util/email');

router.get('/', function(req, res){
    console.log("got in here:");
    res.send('api works');

})

router.post('/email', function(req, res){
    
emailService.Email(req.body).then(
    function(info){
        res.status(201);
        res.json(info)
    },function(error){
        res.status(404);
        res.send(error);
    }
   
)});

module.exports = router;