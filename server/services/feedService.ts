import { IFeedData } from '../contracts/feeds';
import Feed from '../models/feedData';

export class FeedService {
    static async getAll() {
        return await Feed.find({}).lean();
    }

    static async get(filter: IFeedData) {
        return await Feed.find(filter).lean();
    }

    static async create(data: IFeedData) {
        return await Feed.create(data);
    }

    static async update(id: string, feedTitle: string, isRead: boolean) {
        const feedData = (await Feed.findById(id)) as IFeedData;

        if (!feedData) return;
        if (!feedData.items) return;

        let feedIndex = feedData.items?.findIndex((x) => x.title === feedTitle);
        if (feedIndex >= 0) {
            let feed = feedData.items.splice(feedIndex, 1)[0];
            feed = {
                ...feed,
                read: isRead,
            };
            feedData.items.push(feed);
            await Feed.findByIdAndUpdate(id, feedData);
        }
    }

    static async delete(id: string) {
        return await Feed.findByIdAndDelete(id);
    }
}
