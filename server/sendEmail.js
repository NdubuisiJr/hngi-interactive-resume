import nodemailer from 'nodemailer';
import { mailInfo } from '../config';

const mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: mailInfo.email,
        pass: mailInfo.pass
    }
});

const sendEmail = (mail) =>{
    mail.from = mailInfo.email;
    return new Promise((resolve, reject)=>{
        mailer.sendMail(mail, (err, info)=>{
            if(err)
                reject(err);
            else
                resolve(info);
        });
    });
};

export default sendEmail;