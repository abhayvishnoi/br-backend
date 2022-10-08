let [email, pass] = ["mailer@abhayvishnoi.in", "P5bJMCrYv8p!7T$"];
("use strict");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mailer(recipient, token) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();
  // "smtp.hostinger.com", 587;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: pass, // generated ethereal password
    },
  });
  let url = `https://contentkingav.surge.sh/#/reset/${token}`;
  // let url = `http://localhost:4200/#/reset/${token}`;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `no-reply <${email}>`, // sender address
    to: recipient, // list of receivers
    subject: "BrandRocket - Password Reset", // Subject line
    // text: "Hello world?", // plain text body
    // <a href="https://contentkingav.surge.sh">Token ${token}</a>

    html: `<p>
<h1>Hello Buddy,having some trouble?</h1>
<h3>Fear Not, We are here with the rescue</h3>
<button style="{width:"150px";height:"100px";background:"blue";"border-radius":"20px";border:"1px solid white";}">
<a href="${url}">Reset Password Buddy</a>
</button>
</p>`, // html body
  });

  {
    /* <img width="150px" src="cid:attach"/> */
  }
  // attachments: [
  //   {
  //     filename: "tg",
  //     path: __dirname + "./telegram.png",
  //     cid: "attach",
  //   },
  // ],
  console.log(info);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// mailer("abhayvishnoi6@gmail.com", "12343");
module.exports = mailer;
