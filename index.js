const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require("fs");
const qrcode = require('qrcode-terminal');
const express = require ('express');
const app = express();
const port = process.env.PORT || 5727 ;

var hostName;
app.listen(port, ()=>{
  console.log (`server listening on port ${port}`)
});
app.get('/', (req, res)=>{
  hostName = req.headers.host;
  console.log(`server listening on https://${hostName}`);
  res.send('testing server connection')
});

  const client = new Client({
    authStrategy: new LocalAuth(),
      puppeteer: {
        args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        ],
      }

  });

  client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on("authenticated", (session) => {
    console.log("WHATSAPP WEB => Authenticated");
  });

  client.on('ready', () => {
    console.log('Client is ready!');
    const text1 = "DM for your cvs, sops, personal statements, study-gap letters, motivation-letters, recommendation-letters, and scholarship essays";
    const text2 = "DM for your assignments and research proposals"
    const chatId = '2348130135975@c.us';
    const groupId = '120363045867794165@g.us';
    setInterval(() => {
        setTimeout(() => {
            client.sendMessage(chatId, text2);
            console.log('second text sent') 
        }, 30000);
        client.sendMessage(chatId, text1);
        console.log('first text sent') 
    }, 60000);
});

client.on("auth_failure", (session) => {
    console.log("WHATSAPP WEB => Auth Failure");
  });
  
  client.on("disconnected", (reason) => {
    console.log("WHATSAPP WEB => Disconnected");
  });
  


client.initialize();





 
