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

app.post('/sendEmail', async (req,res)=>{
    console.log("function executed")
    try{
      await client.connect()
      console.log('connected to mongodb')
      const results = await db.collection('routes').find({}).toArray()
      console.log(results)
      res.status(200)
      res.send(results)

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: '93coms319@gmail.com',
            pass: 'ssbv hwdr iqlh wyay'
        }
        });
        console.log(req.body)

        let htmlContent = "<b>This is from the JS Server. Selected: </b>";

        results.forEach((el)=>{

          let url = "";
              if (el.photos === undefined) {
                url = "";
              } else {
                url = `https://places.googleapis.com/v1/${el.photos.name}/media?maxHeightPx=200&maxWidthPx=200&key=AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44`;
              }
              console.log(url)
              console.log()

          htmlContent += `

          <div>
            <div
              style="
                background-image: url(${url});
                background-repeat: no-repeat;
                display: flex;
                justify-content: center;
                align-items: center;
                width: calc(33.333% - 10px);
                border-radius: 10px;
                min-width: 200px;
                min-height: 300px;
                cursor: pointer;
                transition: all 0.3s ease 0s;
                overflow: hidden;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                background-size: cover;
                background-color: rgba(217, 217, 217, 1);
              "
            ></div>
            <strong>${el.displayName}</strong>
          </div>`;
        })
        htmlContent += `
        <div> To enable pictures: </div>
      <ul>
        <li> Open Trust Center</li>
        <li> Open Trust Center Settings</li>
        <li> Select Automatic Download</li>
        <li> Uncheck the Don't download pictures automatically in HTML email messages or RSS items option</li>
      </ul>
        `
        async function main(){
            const info = await transporter.sendMail({
            from: '"Mappy" <93coms319@gmail.com>', // sender address
            to: `<${req.body['email']}>`, // list of receivers
            subject: `Hello ${req.body['name']}`, // Subject line
            text: "Test Email", // plain text body
            html: htmlContent, // html body
        });
    
        console.log("Message sent: %s", info.messageId);

       
      }
        main().catch(console.error)
       
      res.sendStatus(200)
      
      

    }catch(error){
      console.error("An error occured: ", error)
    }finally{
      await client.close()
      

    }





    
})