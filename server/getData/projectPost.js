const projectList = require("../dataStore/projectList.json");
const fs = require("fs");
var path = require('path');
function PostProject(){
    return new Promise((resolve, reject)=>{
        let objectTest ={
            "date": "1/20/18",
            "ID": 5,
            "picture": "path to picture",
            "video": "path to video",
            "body": "This is just an example of project 5",
            "title": "project 5"
        }

        projectList.Items.push(objectTest);
        projectList.Count++;
        let test = JSON.stringify(projectList)
        fs.writeFile(path.join(__dirname,'../dataStore/projectList.json'), test,(error)=>{
            console.log("error:", error)
        })
        resolve(true)
    });
}

module.exports = {
    PostProject: PostProject,

};