const crypto = require('crypto');

//register a new user. 
function NewUser(password) {
    // store the salt:iteration:then hashed password
    var passwordInfo = {
        salt: crypto.randomBytes(128).toString('base64'),
        iterations: 100000,
        hash: ""
    };


    return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, passwordInfo.salt, passwordInfo.iterations, 64, 'sha512', (err, derivedKey) => {
                if (err) {
                    console("error:", error);
                    return reject(err)

                }
                else {
                    console.log("derived pw generated");
                    passwordInfo.hash = derivedKey.toString('hex');
                    return resolve(passwordInfo);
                }

            });
         
    });
}

// checking to see if user is authorized
function IsAuthenticated(passwordAttempt, savedSalt, savedHash, savedIteration) {

    return new Promise((resolve, reject)=>{
        crypto.pbkdf2(passwordAttempt, savedSalt, savedIteration, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                console("error:", error);
                return reject(error);

            }
            else {
                console.log("verfication done:", savedHash, "\n", derivedKey.toString('hex'));
                return resolve(savedHash === derivedKey.toString('hex'));
            }

        });
    })
        

}

module.exports = {
    IsAuthenticated: IsAuthenticated,
    NewUser: NewUser
};