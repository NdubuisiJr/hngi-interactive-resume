import { readFile } from 'fs/promises';
import path from 'path';
import Parser from 'rss-parser';
import { IFeedData } from '../contracts/feeds';

export const ReadRsses = async (files: string[]): Promise<IFeedData[]> => {
    const feeds: IFeedData[] = [];

    for (const file of files) {
        const xmlUrl = path.join(process.cwd(), 'feeds', file);
        const xml = await readFile(xmlUrl, 'utf-8');
        let parser = new Parser();
        let feed = (await parser.parseString(xml)) as unknown;

        feeds.push(feed as IFeedData);
    }

    return feeds;
};

export const ReadRss = async (file: string): Promise<IFeedData> => {
    const xmlUrl = path.join(process.cwd(), 'feeds', file);
    const xml = await readFile(xmlUrl, 'utf-8');
    let parser = new Parser();
    let feed = (await parser.parseString(xml)) as unknown;

    return feed as IFeedData;
};

export const ReadRssUrl = async (url: string) => {
    let parser = new Parser();
    let feed = (await parser.parseURL(url)) as object;
    feed = {
        ...feed,
        url,
    };
    return feed as IFeedData;
};

export const ReadRssUrls = async (urls: string[]): Promise<IFeedData[]> => {
    const feeds: IFeedData[] = [];

    for (const url of urls) {
        let parser = new Parser();
        let feed = (await parser.parseURL(url)) as unknown;

        feeds.push(feed as IFeedData);
    }

    return feeds;
};
