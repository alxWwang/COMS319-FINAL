var express = require("express")

var cors = require('cors')
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser")
var nodemailer = require('nodemailer')

app.use(cors())
app.use(bodyParser.json())

const port = '3000';
const host = 'localhost';

app.listen(port, () => {
    console.log("app listening at http://%s:%s", host, port)
})


app.post('/sendEmail', (req,res)=>{
    console.log("function executed")
    const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'nicholaspribadi.1209@gmail.com',
        pass: 'nrvn dlym qpyr wfjr'
    }
    });
    console.log(req.body)
    async function main(){
        const info = await transporter.sendMail({
        from: '"Mappy" <93coms319@gmail.com>', // sender address
        to: `Hello <${req.body['email']}>`, // list of receivers
        subject: "Testing nodemailer", // Subject line
        text: "Test Email", // plain text body
        html: `<b>This is from the js Server. Selected: ${req.body['displayName']}, To: ${req.body['email']}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }

    //main().catch(console.error)


  res.sendStatus(200)
})