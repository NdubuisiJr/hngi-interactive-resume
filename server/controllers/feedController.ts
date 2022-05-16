import { NextFunction, Request, Response } from 'express';
import { IFeedData } from '../contracts/feeds';
import { FeedService } from '../services/feedService';
import { ReadRssUrl } from '../utils/rssReader';

export class FeedController {
    static async AddFeed(req: Request, res: Response, next: NextFunction) {
        const { url } = req.body;
        if (!url) return res.status(404).send('/notfound');

        const feed: IFeedData = await ReadRssUrl(url);

        if (!feed) return res.status(404).send('/notfound');

        await FeedService.create(feed);

        res.redirect('/manage');
    }

    static async GetFeed(req: Request, res: Response, next: NextFunction) {
        return await FeedService.getAll();
    }

    static async Update(req: Request, res: Response, next: NextFunction) {
        let { title } = req.params;
        if (title.includes('*')) {
            title = `${title.split('*')[0]}?`;
        }
        const feeds = await FeedService.get({});
        const feed = feeds.filter((x) =>
            x.items.filter((y: any) => y.title === title)
        );
        if (feed.length > 0) {
            const id = feed[0]._id;
            await FeedService.update(id, title, true);
        }
        res.send(200);
    }

    static async Delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        await FeedService.delete(id as string);
        console.log('redirecting');
        res.redirect('/');
    }
}
