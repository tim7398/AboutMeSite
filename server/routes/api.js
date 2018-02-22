const express = require('express');
const router = express.Router();
const emailService = require('../util/email');
const AWS = require("aws-sdk");
const projectGet = require("../getData/projectGet");

// set authorization.
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//the default get request
router.get('/', function (req, res) {
    console.log("got in here:");
});
//get request for dynamoDB projectList content
router.get('/getprojects', function(req, res){
    projectGet.GetProject().then(
        function(data){
            console.log("The datas:", data);
            res.status(201);
            res.json(data);
        },
        function(error){
            console.log("I got an error:", error);
            res.status(400);
            res.send(error);
        }
    )
});
//Post request to send an email 
router.post('/email', function (req, res) {

    emailService.Email(req.body).then(
        function (info) {
            res.status(201);
            res.json(info)
        }, function (error) {
            res.status(404);
            res.send(error);
        }

    )
});

module.exports = router;