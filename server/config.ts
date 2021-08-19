import dotenv from 'dotenv';

dotenv.config();

interface mailData{
    email: string | undefined,
    password: string | undefined
}

export const mailInfo: mailData = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
};

export const PORT: string|undefined = process.env.PORT;