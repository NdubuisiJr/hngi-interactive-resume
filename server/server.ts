import express, { Application, Request, Response } from 'express';

const server: Application = express(); 

server.use(express.static('public'));  

server.use('/',(req:Request, res: Response )=>{
    res.status(200).json({
        message:'It works like magic'
    });
});

server.listen(9000, ()=>{
    console.log(`Listening on port ${9000}`);
});