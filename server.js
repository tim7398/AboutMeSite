const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const api = require('./server/routes/api');
const port = 3010;

const app = express();

//point static path to the index.html
app.use(express.static(path.join(__dirname, 'dist')));

//parsing the post data that comes in
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret: "thisisawebsitesecretduh", //used to validate that the cookie has not been tampered with
    resave:false, // 
    saveUninitialized:true, // saves new sessions
    rolling:true // active as long as there are requests made to the server 
}))

//api route
app.use('/api',api);

//catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });


app.listen(port, function(){
    console.log("Server running on localhost:", port);
});
