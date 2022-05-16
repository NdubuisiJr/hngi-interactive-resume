import express, { Application, NextFunction, Request, Response } from 'express';
import { PORT } from './utils/config';
import { json, urlencoded } from 'body-parser';
import { sendEmail } from './utils/sendEmail';
import path from 'path';
import * as handlebars from 'express-handlebars';
import ExpressHandlebars from 'express-handlebars/dist/express-handlebars';
import { ReadRss } from './utils/rssReader';
import router from './route';
import connectDb from './utils/connectToDb';
import { FeedService } from './services/feedService';
import { BackgroundService } from './services/backgroundService';

const server: Application = express();

const hbs: ExpressHandlebars = handlebars.create({
    extname: 'hbs',
    layoutsDir: path.join(process.cwd(), 'views'),
    defaultLayout: 'layout',
    partialsDir: path.join(process.cwd(), 'views', 'partials'),
    helpers: {},
});

server.engine('hbs', hbs.engine);
server.set('views', path.join(process.cwd(), 'views'));
server.set('view engine', 'hbs');

server.use(express.static('public'));
server.use(urlencoded({ extended: true }));
server.use(json());

connectDb();

// start background service
BackgroundService.GetInstance().Init(10);

// API routes
server.use('/api/v1', router);

// View routes
server.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.render('index');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

server.get('/following', async (req: Request, res: Response, next) => {
    try {
        const feedData = await FeedService.getAll();
        return res.render('following', {
            feeds: feedData,
            showMange: true,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

server.get('/manage', async (req: Request, res: Response, next) => {
    try {
        const feedData = await FeedService.getAll();
        return res.render('manage', {
            feeds: feedData,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

server.post(
    '/sendemail',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body = req.body;
            await sendEmail(
                'ndubuisijrchukuigwe@gmail.com',
                body.subject,
                `${body.message} by ${body.name}`
            );
            return res.render('thanks');
        } catch (error) {
            return res.render('thanks');
        }
    }
);

server.use((req: Request, res: Response) => {
    const message = `could not locate the resource at method = ${
        req.method
    }, url = ${req.url}, accept = ${req.header('accept')}`;
    res.status(404).send(message);
});

server.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(`
        <h1>An Error occured. It's our fault</h1>
    `);
});

server.listen(PORT || 9000, () => {
    console.log(`Listening on port ${PORT || 9000}`);
});
