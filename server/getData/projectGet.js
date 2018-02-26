const projectList = require("../dataStore/projectList.json");
const Auth = require("../authentication/authenticate");
function RegisterUser(AWS, userInfo) {

    const dynamoDB = new AWS.DynamoDB.DocumentClient(); // gets the instance of dynamo
    let params;
    let exists;
    let getParams = {
        TableName: "UserInfo",
        Key: {
            username: userInfo.username
        }
    };


    return new Promise((resolve, reject) => {
        //check to see if its verified before registering the username
        dynamoDB.get(getParams, function (error, data) {
            if (error) {
                console.log("error in get item:(Regist)", error);
            }
            else {
                // checks to see if the username exists
                checkValid(data, true).then(isValid => {
                    if (!isValid) {
                        Auth.NewUser(userInfo.password).then(
                            (password) => {

                                params = {
                                    TableName: "UserInfo",
                                    Item: {
                                        username: userInfo.username,
                                        password: password.hash,
                                        salt: password.salt,
                                        iterations: password.iterations,
                                        company:userInfo.company,
                                        email:userInfo.email

                                    }
                                };
                                console.log("params:", params);
                                dynamoDB.put(params, function (error, data) {
                                    if (error) {
                                        console.log("error in put item:", error);
                                        return reject("error in put item:", error);
                                    }
                                    else {
                                        console.log("User Registration Success", data);

                                        return resolve(data);

                                    }
                                });

                            },
                            (error) => {
                                return reject(error);
                            }
                        );
                    }
                    else {
                        reject("username already exists")
                    }
                },
                    error => {
                        return reject(error);
                    });

            }
        });




    });



}

// function to authenticate the users credentials 
function IsAuthenticated(AWS, userInfo) {

    console.log("USER:", userInfo);
    let dynamoDB = new AWS.DynamoDB.DocumentClient(); // gets the instance of dynamo
    let params = {
        TableName: "UserInfo",
        Key: {
            username: userInfo.username
        }
    };

    console.log("The AUth Params:", params);
    return new Promise((resolve, reject) => {
        dynamoDB.get(params, function (error, data) {
            if (error) {
                console.log("error in get item(is Auth):", error);
                return reject(error);
            }
            else if (data.Item === undefined) {
                return resolve(false);
            }
            else {
                console.log("", data);
                data.Item.passwordAttempt = userInfo.password;

                //checks to see if password is valid
                return resolve(checkValid(data, false));

            }
        });
    });




}

// checks to see if user data exists
function checkValid(userData, register) {

    return new Promise((resolve, reject) => {
        // check to see if an account exists before registering them
        console.log("")
        if (register && userData !== undefined && userData.Item !== undefined) {
            return resolve(true);
        }

        // returns false for already registered. 
        else if (register) {
            console.log("Comes HERE")

            return resolve(false);
        }

        // makes sure data was retrieved from the database
        if (userData === undefined || userData === null || userData.Item === undefined) {
            return resolve(false);
        }

        console.log("userData:", userData.Item.salt);
        // calls function to verify the password. 
        Auth.IsAuthenticated(userData.Item.passwordAttempt, userData.Item.salt, userData.Item.password, userData.Item.iterations).then(isAuth => {
            console.log("Auth Status:", isAuth);
            return resolve(isAuth);
        },
            error => {
                return reject(error)
            });
    })


}
function GetProject() {
    // let dynamoDB = new AWS.DynamoDB.DocumentClient();

    // let params = {
    //     TableName: "projectList",
    //     Key:"1"

    // }

    console.log("projectList:", projectList);

    return new Promise((resolve, reject) => {
        if (projectList === undefined || projectList.Items.length < 1) {
            reject("Could not grab Project List");
        }
        else {
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
    GetProject: GetProject,
    RegisterUser: RegisterUser,
    IsAuthenticated: IsAuthenticated
};