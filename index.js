const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config( { path : "./config.env" })
 const port = process.env.port || 3000 ;
const accountSid = 'AC231da50ba9eb6747db0090cea4ac3396'; 
const authToken =  process.env.authToken; 
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/login' ,(req,res) => {
  res.render("home.ejs");
} )

app.post('/login/verified' ,async (req,res) => {
    console.log(req.body.channelvalue );
    console.log( req.body.phonenumbervalue);
    const serviceID = await client.verify.services.create({friendlyName: 'Mysuccessfulapp'})
    .then(service =>  {
         client.verify.services(service.sid)
        .verifications
        .create({to: `+${req.body.phonenumbervalue}`, channel: req.body.channelvalue })
        .then(verification => res.status(200).send(verification.status))
        .catch( (err) => console.log(err))

        
    })
    .catch((err) => console.log(err) )
   


}) ;





app.listen(port ,() => {
    console.log(`server running on ${port}`);
} )

