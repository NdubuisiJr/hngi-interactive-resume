import { connect } from 'mongoose';

const connectDb = async () => {
    try {
        const connectionString: string =
            'mongodb+srv://ndubuisijr:chukuigwe@freemongo.eewl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        await connect(connectionString);
    } catch (error) {
        console.log('db not connected', error);
    }
};

export default connectDb;
