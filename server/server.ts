import express, { Application, Request, Response } from 'express';
import { promises } from 'fs';
import { PORT } from './config';
import bodyParser from 'body-parser';
import path from 'path';
import { sendEmail } from './sendEmail';

const sendHtml = async (res: Response, message?:string)  => {
    let html:string = await readFile(path.join(process.cwd(),'index.html'),'utf-8');
    if(message){
        html.replace('Send Message',message);
    }
    return res.status(200).send(html);
}

const { readFile } = promises;
const server: Application = express(); 

server.use(express.static('public')); 
server.use(bodyParser.urlencoded({ extended: true })); 

server.get('/', async (req:Request, res: Response )=>{
   try {
       return sendHtml(res);
   } catch (error) {
       console.log(error);
       res.status(500).send(`
       <h1>A Error Occured</h1>
    `);
   }
});

server.post('/sendemail',async (req: Request, res: Response)=>{
    try {
        let body = req.body;
        sendEmail('ndubuisijrchukuigwe@gmail.com',body.subject,`${body.message} by ${body.name}`);
        res.redirect('/');
    } catch (error) {
        console.log(error);
       res.status(500).send(`
       <h1>A Error Occured</h1>
    `);
    }
})


server.listen(PORT || 9000, ()=>{
    console.log(`Listening on port ${PORT || 9000}`);
});