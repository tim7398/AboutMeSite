const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3010;

const app = express();

//point static path to the index.html
app.use(express.static(path.join(__dirname, 'dist')));

//parsing the post data that comes in
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//api route
app.use('/api',api);

//catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });


app.listen(port, function(){
    console.log("Server running on localhost:", port);
});
