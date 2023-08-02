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
            const text1 = "DM for your cvs, sops, personal statements, study-gap letters, motivation-letters, recommendation-letters, LinkedIn optimization and scholarship essays";
            const text2 = "DM for your assignments and research proposals"
            const text3 = "DM if you intend to know why you don't get any response after you apply for a remote tech job."
            const BretId = '2348130135975@c.us';
            const scholarshipGroupId = '120363045867794165@g.us';
            const usaPhdMastersGroup = '120363045640077939@g.us';
            const hndGraduatesGroup = '120363044283854718@g.us';
            const finlandGroup = '120363042210032667@g.us';
            const schForDevsGroup = '120363046922877419@g.us'
            const enu2023Group = '120363045906255937@g.us'
            setInterval(() => {
                const today = new Date();
                if (today.getDay() === 1 && today.getHours() === 9) {
                    try {
                        client.sendMessage(usaPhdMastersGroup, text1);
                    } catch (error) {
                        console.log(error)
                    }
                  } else if (today.getDay() === 4 && today.getHours() === 20) {
                   try {
                    client.sendMessage(hndGraduatesGroup, text1);
                    client.sendMessage(finlandGroup, text1);
                    client.sendMessage(schForDevsGroup, text3)
                   } catch (error) {
                        console.log(error)
                   }
                  } else if (today.getDay() === 5 && today.getHours() === 20){
                    try {
                        client.sendMessage(enu2023Group, text2)
                    } catch (error) {
                        console.log(error)
                    }
                  }
                  else {console.log('not the given date')}
            }, 30*60*1000);
        });
        
        client.on("auth_failure", (session) => {
            console.log("WHATSAPP WEB => Auth Failure");
          });
          
          client.on("disconnected", (reason) => {
            console.log("WHATSAPP WEB => Disconnected");
          });
          
        client.initialize();
        




 
