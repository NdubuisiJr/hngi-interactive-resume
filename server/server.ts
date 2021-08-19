import express, { Application, NextFunction, Request, Response } from 'express';
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

server.get('/', async (req:Request, res: Response, next: NextFunction )=>{
   try {
       return sendHtml(res);
   } catch (error) {
       console.log(error);
       next(error); 
   }
});

server.post('/sendemail',async (req: Request, res: Response, next:NextFunction)=>{
    try {
        let body = req.body;
        sendEmail('ndubuisijrchukuigwe@gmail.com',body.subject,`${body.message} by ${body.name}`);
        res.redirect('/');
    } catch (error) {
        console.log(error);
       next(error)
    }
})

server.use((req: Request, res:Response)=>{
    const message=`could not locate the resource at method = ${
        req.method}, url = ${req.url}, accept = ${
        req.header('accept')}`;
    res.status(404).send(message);
});

server.use((error:any, req:Request, res:Response, next:NextFunction)  =>{
    res.status(500).send(`
        <h1>An Error occured. It's our fault</h1>
    `);
});


server.listen(PORT || 9000, ()=>{
    console.log(`Listening on port ${PORT || 9000}`);
});