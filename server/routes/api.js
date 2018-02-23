const express = require('express');
const router = express.Router();
const emailService = require('../util/email');
const AWS = require("aws-sdk");
const projectGet = require("../getData/projectGet");

// set authorization.
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1"
});

//the default get request
router.get('/', function (req, res) {
    console.log("got in here:");
});

//get request for dynamoDB projectList content
router.get('/getprojects', function(req, res){
    projectGet.GetProject().then(
        function(isVerify){
            console.log("The datas:", data);
            res.status(201);
            res.send(isVerify);
        },
        function(error){
            console.log("I got an error:", error);
            res.status(400);
            res.send(error);
        }
    )
});

//verify the user
router.post('/userverify', function(req, res){
    let userInfo = {
        username:req.body.username,
        password:req.body.password,
        register:req.body.register,
        company:req.body.company,
        email: req.body.email
    };
    console.log(userInfo.register);
    if(userInfo.register){
        projectGet.RegisterUser(AWS, userInfo).then(
            function(data){
                console.log("The datas:", data);
                res.status(201);
                res.send(data);
            },
            function(error){
                console.log("I got an error:", error);
                res.status(400);
                res.send(error);
            }
        )
    }
    else{
        projectGet.IsAuthenticated(AWS, userInfo).then(
            function(data){
                console.log("is this verified:", data);
                res.status(201);
                res.send(data);
            },
            function(error){
                console.log("I got an error:", error);
                res.status(400);
                res.send(error);
            }
        )
    }

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