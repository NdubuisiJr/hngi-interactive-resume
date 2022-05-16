export interface IFeedData {
    link?: string;
    title?: string;
    description?: string;
    image?: IFeedData;
    items?: IFeedDataItem[];
}

export interface IFeedDataItem {
    link?: string;
    title?: string;
    creator?: string;
    pubDate?: string;
    content?: string;
    read?: boolean;
}

export interface IFeedImage {
    url?: string;
    title?: string;
    height?: number;
    width?: number;
}
