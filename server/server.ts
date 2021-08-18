import express, { Application, Request, Response } from 'express';
import { promises } from 'fs';
import path from 'path';
const { readFile } = promises;


const server: Application = express(); 

server.use(express.static('public'));  

server.get('/', async(req:Request, res: Response )=>{
   try {
       let html:string = await readFile(path.join(process.cwd(),'index.html'),'utf-8');
        res.status(200).send(html);
   } catch (error) {
       console.log(error);
       res.status(500).send(`
       <h1>A Error Occured</h1>
    `);
   }
});

server.post('/sendemail',(req: Request, res: Response)=>{
    res.send('sending email');
})


server.listen(9000, ()=>{
    console.log(`Listening on port ${9000}`);
});