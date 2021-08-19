import nodemailer, { Transporter } from 'nodemailer';
import { mailInfo } from './config';


const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: mailInfo.email,
        pass: mailInfo.password
    }
});

export const sendEmail = (email: string, subject: string, message: string ) =>{
    return new Promise((resolve, reject)=>{
        transporter.sendMail({
            from: mailInfo.email,
            to: email,
            subject: subject,
            text: message
        }, (err, info)=>{
            if(err)
                reject(err);
            else
                resolve(info);
        });
    });
};

