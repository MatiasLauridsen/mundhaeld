const express = require('express')
const router = express.Router();
const nodemailer = require("nodemailer");


router.get('/booking', (req, res) => {
    res.render('booking', {tid : tidspunkter})
})


router.post('', (req, res) => {
  sendmail().catch().then(console.log(Error)),
  readInputs(),
  res.render('booking', {tid: tidspunkter})
  
})
module.exports = router;


//-------- Tidsvælger
const tidspunkter = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02']
let navn;
let email;
let telefon;
let antal;
let beskrivelse;
let dato;
let starttidspunkt;
let sluttidspunkt;


function readInputs(){
  navn = document.getElementById('bName')
  email = document.getElementById('bEmail')
  telefon = document.getElementById('bPhone')
  antal = document.getElementById('bPersons')
  beskrivelse = document.getElementById('bComment')
  dato = document.getElementById('datepicker')
  starttidspunkt = document.getElementById('starttimepicker')
  sluttidspunkt = document.getElementById('sluttimepicker')

}

//-------- SMTP Mails
async function sendmail() {
  
  // skaber genbruglig transportør-object med SMTP transport
  let transporter = await nodemailer.createTransport({
    
    service: 'gmail',
      port: 587,
      secure: true, // sand for port 465, falsk for anden port
      auth: {
        user: 'mundhaelddeveloper@gmail.com', 
        pass: 'lkbsomdrnbnqvzos' 
      },
      tls:{
          rejectUnauthorized:false,
      }
    });
  
    // send mail med specificeret transport-object
    let ctb = transporter.sendMail({
      from: `"${navn}" <${email}>`, // sender address
      to: "kevinjoergensen@outlook.com", // list of receivers
      subject: `Reservation - d: ${dato} kl: ${starttidspunkt} til kl: ${sluttidspunkt}`, // Subject line
      text: `${beskrivelse} ${antal} ${telefon}`, // plain text body
      html: "<b>Hello world?</b>" // html body
    });
  
    console.log(`Message sent to: ${ctb.to}`);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
}


