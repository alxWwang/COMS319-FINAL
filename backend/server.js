var express = require("express")

var cors = require('cors')
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser")
var nodemailer = require('nodemailer')
var {MongoClient} = require('mongodb')

app.use(cors())
app.use(bodyParser.json())

const url = 'mongodb://localhost:27017'
const dbName = 'mappyDB'

const client = new MongoClient(url)
const db = client.db(dbName);

const port = '3000';
const host = 'localhost';

app.listen(port, () => {
    console.log("app listening at http://%s:%s", host, port)
})

app.get('/getRoute', async (req, res) => {
  console.log('gettingRoute')
  try{
    await client.connect()
    console.log('connected to mongodb')
    const results = await db.collection('routes').find({}).toArray()
    console.log(results)
    res.status(200)
    res.send(results)
  }catch(error){
    console.error("An error occured: ", error)
  }finally{
    await client.close()
  }
  
});

app.delete('/delete/:id', async (req,res)=>{

  const id = (req.params.id);
  console.log(`deleting ${id}`);
  await client.connect()
  console.log('connected to mongodb')
  const coll = await db.collection('routes').deleteOne({id: id})
  if (coll.deletedCount === 0){
       console.log('no such document found')
  }else{
       console.log('document deleted successfully!')
  }
})

app.post('/addRoute', async(req,res)=>{
  try{
    await client.connect()
    console.log('connected to mongodb')
    const coll = await db.collection('routes').insertOne(req.body)
    console.log("Document inserted");
  }catch(error){
    console.error("An error occured: ", error)
  }finally{
    await client.close()
  }
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