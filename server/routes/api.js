const express = require('express');
const router = express.Router();
const emailService = require('../util/email');
const AWS = require("aws-sdk");
const projectGet = require("../getData/projectGet");
const projectPost = require("../getData/projectPost");

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
            console.log("The datas:", isVerify);
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
router.get('/logout',function(req,res){
    if(req.session.pass !== undefined &&req.session.pass !== null){
        req.session.destroy(function(err){
            if(err !== null && err !== undefined){
                res.status(400);
                res.send(err);
              }
              res.redirect('/');
        });
    }
});
router.post('/postprojects', function(req, res){
    projectPost.PostProject().then(function(isPosted){
        res.status(201);
        res.send(isPosted)
    },
    function(error){
        res.status(400);
        res.send(error)
    });
});


//authenticate route
router.post('/authenticate',function(req,res){
    userInfo = {
        username:req.session.userName,
        password:req.session.pass
    };
    projectGet.IsAuthenticated(AWS, userInfo).then(
        function(data){
            info={
                username: req.session.userName,
                email: req.session.email,
                company: req.session.company,
                auth: data
            }
            console.log("Authe:", info.auth)
            res.status(201);
            res.send(info);
        },
        function(error){
            console.log("I got an error:", error);
            info={
                auth:false
            }
            res.status(401);
            res.send(info);
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

    //register the user
    if(userInfo.register){
        projectGet.RegisterUser(AWS, userInfo).then(
            function(data){
                req.session.userName = userInfo.username;
                req.session.pass = userInfo.password;
                req.session.email = userInfo.email;
                req.session.company = userInfo.company;
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
                if(data){
                    req.session.userName = userInfo.username;
                    req.session.pass = userInfo.password;
                    req.session.email = userInfo.email;
                }

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