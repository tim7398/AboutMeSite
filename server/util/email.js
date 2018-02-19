var nodemailer 	= require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tim7398@gmail.com',
      pass: 'monkeysodamcool'
    }
  });
 function Email(emailInfo){

    return new Promise((resolve, reject)=>{
        let message = "sender: "+emailInfo.name+"\nEmail:"+emailInfo.from +"\n------------------------------------\n"+ emailInfo.message;
        let mailOptions = {
            from: "",
            to: emailInfo.to,
            subject: emailInfo.subject,
            text: message
          };
        
    // send the message and get a callback with an error or details of the message that was sent
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          reject(error)
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info.response);
        }
      });

    })

    

}
module.exports = {
    Email: Email
}