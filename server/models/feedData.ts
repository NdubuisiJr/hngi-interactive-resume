import { Schema, model } from 'mongoose';

const feed = new Schema({
    link: String,
    title: String,
    description: String,
    image: {
        url: String,
        title: String,
        height: Number,
        width: Number,
    },
    items: {
        default: [],
        type: Array,
    },
});

const Feed = model('Feed', feed);

export default Feed;
