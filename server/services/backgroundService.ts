import { clearInterval } from 'timers';
import { ReadRssUrl } from '../utils/rssReader';
import { FeedService } from './feedService';

export class BackgroundService {
    private _timeOut: any;
    private static instance: BackgroundService;
    previewLength: number = 10;
    private constructor() {}

    static GetInstance() {
        if (!this.instance) {
            this.instance = new BackgroundService();
        }
        return this.instance;
    }

    async Reset(minute: number) {
        clearInterval(this._timeOut);
        this.Init(minute);
    }

    async Init(minute: number) {
        this._timeOut = setInterval(async () => {
            try {
                console.log('refreshing...');
                let exitingFeeds = await FeedService.get({});
                for (let exitingFeed of exitingFeeds) {
                    const newFeed = await ReadRssUrl(exitingFeed.url);
                    if (exitingFeed.items.length === newFeed.items?.length)
                        continue;
                    if (!newFeed.items) continue;

                    const items = exitingFeed.items;
                    exitingFeed.items = [newFeed.items[0], ...items];
                    await FeedService.updateModel(exitingFeed._id, exitingFeed);
                    console.log('feed Refreshed');
                }
            } catch (error) {
                console.log(error);
            }
        }, 1000 * 60 * minute);
    }
}
