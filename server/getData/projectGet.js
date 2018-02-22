const projectList = require("../dataStore/projectList.json");

function GetProject(){
    // let dynamoDB = new AWS.DynamoDB.DocumentClient();

    // let params = {
    //     TableName: "projectList",
    //     Key:"1"
    
    // }

    console.log("projectList:", projectList);
    
    return new Promise((resolve, reject)=>{
        if(projectList === undefined || projectList.Items.length < 1){
            reject("Could not grab Project List");
        }
        else{
            resolve(projectList);
        }

            //***Dont need dynamo for read all. FLAT FILE IS BETTER */
        // dynamoDB.scan(params, function(err, data){
        //     if(err){
        //         console.log("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
        //         reject(err);
        //     }
        //     else{
        //         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        //         resolve(data);
        //     }
        // });
    })

}

module.exports = {
    GetProject:GetProject
};